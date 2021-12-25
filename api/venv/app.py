from flask import Flask, flash, jsonify, redirect, render_template, request, session
import json
import os
import io
import pandas as pd
import datetime
from bson.objectid import ObjectId

from sklearn.datasets import fetch_20newsgroups
from werkzeug.exceptions import BadRequest, InternalServerError, Conflict, NotFound
from werkzeug.utils import secure_filename

from classify import classifyText, classifyFeatures, predictFeaturesDict
import pymongo

ALLOWED_EXTENSIONS = {'xls', 'xlsx', 'xlsm', 'xlsb', 'odf', 'ods', 'odt'}

client = pymongo.MongoClient("mongodb+srv://JoadHamdan:Joe19973614@cluster0.fwxod.mongodb.net/?retryWrites=true&w=majority")
db = client.mydb

signedUsersModels = db["signed-users-models"]
AnonymousUsersModels = db["anonymous-users-models"]

app = Flask(__name__)

@app.route('/classify-text/<uid>', methods=['POST'])
def classify_text(uid):
    userType = request.files['userType']
    collection = getCollectionByUserType(userType)

    file_ = request.files['file']
    if not file_:
        raise BadRequest('Empty file')
    if not allowed_file(file_.filename):
        raise BadRequest(f'Only {ALLOWED_EXTENSIONS} files allowed')
    # try: 
    data = pd.read_excel(file_)
    trainedModel, accuracy = classifyText(data)
    return accuracy
    #return {'accuracy': 0.43257302921168467}

@app.route('/classify-features/<uid>', methods=['POST'])
def classify_features(uid):
    #check id not none

    print(request)
    #reqData = request.get_json()
    #print(reqData)

    print(request.files)
    print(request.files['userType'])
    userType = request.files['userType']
    collection = getCollectionByUserType(userType)

    file_ = request.files['file']
    fileName = file_.filename
    if not file_:
        raise BadRequest('Empty file')
    if not allowed_file(fileName):
        raise BadRequest(f'Only {ALLOWED_EXTENSIONS} files allowed')
    
    try: 
        data = pd.read_excel(file_)
        trainedModel, report, features = classifyFeatures(data)

        fileObjectId = ObjectId()
        fileObject = {'_id': fileObjectId, 'file_name': fileName, 'file': trainedModel, 'features': features, 'datetime': datetime.datetime.now(), 'classification_type': "Features"}
        
        collection.insert_one(
            {'_id' : uid, 
                'files': [fileObject]
            }
        )

    except pymongo.errors.DuplicateKeyError:
        #push file to the same id
        collection.update_one(
            {'_id': uid}, 
                {"$push":  
                    {'files': fileObject}
                }
        )
    
        #raise Conflict('Model of file name already exists')
    # return accuracy
    return {"report": report, "features": features, 'file_id': str(fileObjectId)}

@app.route('/predict-features/<uid>', methods=['POST'])
def predict_features(uid):
    reqData = request.get_json()

    userType = reqData['userType']
    collection = getCollectionByUserType(userType)

    fileId = ObjectId(reqData['modelId'])
    dataToPredict = reqData['dataToPredict']
    
    #try: 
    result = collection.find_one(
        {'_id': uid}, {'files': {"$elemMatch": {'_id': fileId}}}
    )
    files = result['files']
    model = files[0]['file']
    Class = predictFeaturesDict(model, dataToPredict)
    #except:
     #   raise BadRequest('Wrong uid or object id')
    return {"class": Class}


# Only accessed by signed user.
@app.route('/models-data/<uid>', methods=['GET'])
def get_models(uid):
    results = collection.find({'_id': uid})
    #if len(list(results)) == 0:
     #  raise NotFound("No models for this user.")

    modelsData = []
    modelData = {}
    for result in results:
        files = result['files']
        for file_ in files:
            modelData['id'] = str(file_['_id'])
            modelData['file_name'] = file_['file_name']
            modelData['datetime'] = file_['datetime']
            modelData['features_names'] = file_['features']
            modelData['classification_type'] = file_['classification_type']

            modelsData.append(modelData)
    
    return {'models_data': modelsData}


@app.route('/model/<uid>', methods=['DELETE'])
def delete_model(uid):
    #results = collection.find_one({'_id': uid})
    #if len(list(results)) == 0:
     #  raise NotFound("No models for this user.")

     
    reqData = request.get_json()
    fileIdToDelete = ObjectId(reqData['modelIdToDelete'])

    #result = collection.update_one(
     #   {'_id': uid}, {'files': {"$pull": {'_id': fileIdToDelete}}}
    #)

    collection.update_one(
        {'_id': uid}, 
            {"$pull":  
                {'files': {'_id': fileIdToDelete}}
            }
    )

    #files = result['files']
    #model = files[0]['file']
    
    return "OK"

def getCollectionByUserType(userType):
    if userType == 'Anonymous':
        collection = AnonymousUsersModels
    elif userType == 'Signed':
        collection = SignedUsersModels
    else: 
        raise BadRequest('Request data should contain user id. e.g. Anonymous / Signed')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == "__main__":
   app.run(debug=True)
