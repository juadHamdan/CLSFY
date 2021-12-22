
from flask import Flask, flash, jsonify, redirect, render_template, request, session
import json
import os
import io
import pandas as pd
import datetime
from bson.objectid import ObjectId

#import firebase_admin
#from firebase import firebase
#from firebase_admin import credentials, db, auth
from sklearn.datasets import fetch_20newsgroups
from werkzeug.exceptions import BadRequest, InternalServerError, Conflict
from werkzeug.utils import secure_filename

from classify import classifyText, classifyFeatures, predictFeaturesDict
# from flask_pymongo import PyMongo
import pymongo
# from pymongo import



MandatoryCoursesRoute = "mandatoryCourses"
ElectiveCoursesRoute = "electiveCourses"
ALLOWED_EXTENSIONS = {'xls', 'xlsx', 'xlsm', 'xlsb', 'odf', 'ods', 'odt'}

client = pymongo.MongoClient("mongodb+srv://JoadHamdan:Joe19973614@cluster0.fwxod.mongodb.net/?retryWrites=true&w=majority")
db = client.mydb
collection = db["models"]

# Fetch the service account key JSON file contents
#cred = credentials.Certificate('serviceAccountKey.json')

# Initialize the app with a service account, granting admin privileges
#firebase_admin.initialize_app(cred, {
 #   'databaseURL': 'https://test-e3b45-default-rtdb.firebaseio.com/'
#})

#firebase = firebase.FirebaseApplication('https://test-e3b45-default-rtdb.firebaseio.com/', None)

app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb://JoadHamdan:Joe19973614@cluster0.fwxod.mongodb.net/mydb?retryWrites=true&w=majority"
#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

#mongo = PyMongo(app)
# users = mongo.db.users



@app.route('/classify-text/<uid>', methods=['POST'])
def classify_text(uid):
    file_ = request.files['file']
    if not file_:
        raise BadRequest('Empty file')
    if not allowed_file(file_.filename):
        raise BadRequest(f'Only {ALLOWED_EXTENSIONS} files allowed')
    # try: 
    data = pd.read_excel(file_)
    trainedModel, accuracy = classifyText(data)
    #if uid != 0:
     #   firebase.put('users1', uid, trainedModel)
      #  firebase.post(f'/users1/{uid}', trainedModel)
    # except:
    #    raise BadRequest('Excel file not in the right format')
    return accuracy
    #return {'accuracy': 0.43257302921168467}

@app.route('/classify-features/<uid>', methods=['POST'])
def classify_features(uid):
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
        fileObject = {'_id': fileObjectId, 'file_name': fileName, 'file': trainedModel, 'features': features, 'datetime': datetime.datetime.now()}
        
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


@app.route('/models-data/<uid>', methods=['GET'])
def get_models(uid):
    results = collection.find({'_id': uid})
    files = result['files']
    for file_ in files:
        models = files[0]['file']
    for file_ in files:
        print(file_)

    return "OK"





def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == "__main__":
   app.run(debug=True)
