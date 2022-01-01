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

from classify import classifyText, predictText, classifyFeatures, predictFeaturesDict
import pymongo

ALLOWED_EXTENSIONS = {'xls', 'xlsx', 'xlsm', 'xlsb', 'odf', 'ods', 'odt'}

client = pymongo.MongoClient("mongodb+srv://JoadHamdan:Joe19973614@cluster0.fwxod.mongodb.net/?retryWrites=true&w=majority")
db = client.mydb

SignedUsersModels = db["signed-users-models"]
AnonymousUsersModels = db["anonymous-users-models"]

app = Flask(__name__)


@app.route('/classify-text/<uid>', methods=['POST'])
def classify_text(uid):
    collection = getCollectionByUserType(userType)
    checkFileAllowed(request)
    fileName = request.files['file'].filename

    try: 
        data = pd.read_excel(file_)
        trainedModel, modelFeatureVectors, modelTfidfTransformer, classesToTargetNamesDict, report = classifyText(data)
        fileObjectId = ObjectId()
        fileObject = {'_id': fileObjectId, 'file_name': fileName, 'model': trainedModel, 'feature_vectors': modelFeatureVectors,
            'tfidf_transformer': modelTfidfTransformer, 'classes_to_target_names_dict': classesToTargetNamesDict, 'report': report, 'date_time': datetime.datetime.now()}
        
        insertFileObjectToDatabase(collection, fileObject, uid)

    except pymongo.errors.DuplicateKeyError:
        pushFileObjectToDatabase(collection, fileObject, uid)

    return {"report": report, 'file_id': str(fileObjectId)}


@app.route('/predict-text/<uid>', methods=['POST'])
def predict_text(uid):
    # collection = getCollectionByUserType(userType)
    collection = SignedUsersModels

    reqData = request.get_json()
    fileId = ObjectId(reqData['modelId'])
    dataToPredict = reqData['dataToPredict']
    
    #try: 
    result = findFileObjectFromDatabase(collection, fileId, uid)
    files = result['files']
    file_ = files[0]
    model = file_['model']
    modelFeatureVectors = file_['feature_vectors']
    modelTfidfVectors = file_['tfidf_transformer']
    classesToTargetNamesDict = file_['classes_to_target_names_dict']

    Class = predictText(model, modelFeatureVectors, modelTfidfVectors, classesToTargetNamesDict, dataToPredict)
    #except:
     #   raise BadRequest('Wrong uid or object id')
    return {"class": Class}


@app.route('/classify-features/<uid>', methods=['POST'])
def classify_features(uid):
    #check id not none
    #collection = getCollectionByUserType(userType)
    collection = SignedUsersModels
    checkFileAllowed(request)
    fileName = request.files['file'].filename

    try: 
        data = pd.read_excel(file_)
        trainedModel, classesToTargetNamesDict, report = classifyFeatures(data)
        fileObjectId = ObjectId()
        fileObject = {'_id': fileObjectId, 'file_name': fileName, 'model': trainedModel, 'classes_to_target_names_dict': classesToTargetNamesDict, 'report': report, 'date_time': datetime.datetime.now()}
        
        insertFileObjectToDatabase(collection, fileObject, uid)

    except pymongo.errors.DuplicateKeyError:
        pushFileObjectToDatabase(collection, fileObject, uid)
    
    return {"report": report, 'file_id': str(fileObjectId)}


@app.route('/predict-features/<uid>', methods=['POST'])
def predict_features(uid):
    # collection = getCollectionByUserType(userType)
    collection = SignedUsersModels

    reqData = request.get_json()
    fileId = ObjectId(reqData['modelId'])
    dataToPredict = reqData['dataToPredict']
    
    #try: 
    result = findFileObjectFromDatabase(collection, fileId, uid)
    files = result['files']
    file_ = files[0]
    model = file_['model']
    classesToTargetNamesDict = file_['classes_to_target_names_dict']
    Class = predictFeaturesDict(model, classesToTargetNamesDict, dataToPredict)
    #except:
     #   raise BadRequest('Wrong uid or object id')
    return {"class": Class}


# Only accessed by signed user.
@app.route('/models-data/<uid>', methods=['GET'])
def get_models(uid):
    collection = SignedUsersModels
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
            modelData['date_time'] = file_['date_time']
            modelData['report'] = file_['report']

            modelsData.append(modelData)
    
    return {'models_data': modelsData}


@app.route('/model/<uid>', methods=['DELETE'])
def delete_model(uid):
    collection = SignedUsersModels
    reqData = request.get_json()
    fileIdToDelete = ObjectId(reqData['modelIdToDelete'])

    deleteFileObjectFromDatabase(collection, fileIdToDelete, uid)
    
    return "OK"

def getCollectionByUserType(userType):
    if userType == 'Anonymous':
        collection = AnonymousUsersModels
    elif userType == 'Signed':
        collection = SignedUsersModels
    else: 
        raise BadRequest('Request data should contain user id. e.g. Anonymous / Signed')


def checkFileAllowed(request):
    file_ = request.files['file']
    if not file_:
        raise BadRequest('Empty file')
    if not allowed_file(file_.filename):
        raise BadRequest(f'Only {ALLOWED_EXTENSIONS} files allowed')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



#database handling
def insertFileObjectToDatabase(collection, fileObject, uid):
    collection.insert_one(
        {'_id' : uid, 
            'files': [fileObject]
        }
    )

def pushFileObjectToDatabase(collection, fileObject, uid):
    collection.update_one(
        {'_id': uid}, 
            {"$push":  
                {'files': fileObject}
            }
    )

def findileObjectFromDatabase(collection, fileObject, uid):
    return collection.find_one(
        {'_id': uid}, {'files': {"$elemMatch": {'_id': fileId}}}
    )

def deleteFileObjectFromDatabase(collection, fileIdToDelete, uid):
    collection.update_one(
        {'_id': uid}, 
            {"$pull":  
                {'files': {'_id': fileIdToDelete}}
            }
    )


if __name__ == "__main__":
   app.run(debug=True)
