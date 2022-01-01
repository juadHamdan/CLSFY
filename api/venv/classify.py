import json
import re
from sklearn.linear_model import LogisticRegression
from sklearn import svm
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.preprocessing import LabelEncoder
from sklearn import metrics
from sklearn.feature_selection import SelectKBest, chi2
import pickle
import nltk
from nltk.corpus import stopwords

nltk.download('wordnet')
nltk.download('stopwords')

TrainingPercentage = 0.75
TestingPercentage = 1 - TrainingPercentage

NumOfBestFeatures = 5  # num of features in text data is twice the size of NumOfBestFeatures


def classifyText(data):
    """
    classify [[text, class], ...] data

    Parameters
    ----------
    data: excel file data

    Returns
    -------
    scores & statistics :
    """
    numpyData = data.to_numpy()
    np.random.shuffle(numpyData)

    text = numpyData[:, 1]
    classes = numpyData[:, 2]
    labelEncoder = LabelEncoder()
    classes = transformStrClassesLabelsToFloat(labelEncoder, classes)  # typ object to type str

    textToPredict, textToTest = splitArrayIntoTrainAndTest(text)
    classesToPredict, trueClassesToTest = splitArrayIntoTrainAndTest(classes)
    # so that sklearn can recognize the type
    classesToPredict = classesToPredict.astype('float')
    trueClassesToTest = trueClassesToTest.astype('float')

    # preprocessText(textToPredict)
    # preprocessText(textToTest)

    count_vect = CountVectorizer()  # builds a dictionary of features and transforms documents to feature vectors
    tfidf_transformer = TfidfTransformer()  # occurrences => tf-idf
    textToPredictFeatures, textToTestFeatures = exctractFeaturesFromTextData(count_vect, tfidf_transformer,
                                                                             textToPredict, textToTest)
    modelFeatureVectors = pickle.dumps(count_vect)
    modelTfidfTransformer = pickle.dumps(tfidf_transformer)

    # Training the classifier
    clf = LogisticRegression(max_iter=200).fit(textToPredictFeatures, classesToPredict)
    trainedModel = pickle.dumps(clf)

    # Predict test data
    predicted = clf.predict(textToTestFeatures)

    targetNames = getClassesLabelsBeforeTransformation(labelEncoder, classes)
    report = metrics.classification_report(trueClassesToTest, predicted, zero_division=0, target_names=targetNames,
                                           output_dict=True)

    classesScores = []
    accuracy = report['accuracy']
    for targetName in targetNames:
        classesScores.append("{}: {}".format(targetName, report[targetName]['f1-score']))

    transformedTargetNames = list(np.unique(classes))
    classesToTargetNamesDict = dict(zip(transformedTargetNames, targetNames))

    ch2 = SelectKBest(chi2, k=NumOfBestFeatures)
    ch2.fit_transform(textToPredictFeatures, classesToPredict)
    bestFeaturesLabels = [count_vect.get_feature_names()[i] for i in ch2.get_support(indices=True)]

    report = {'accuracy': accuracy, 'classes_scores': classesScores, 'best_features_labels': bestFeaturesLabels, 'classification_type': "Text"}

    return trainedModel, modelFeatureVectors, modelTfidfTransformer, report


def classifyFeatures(data):
    """
     classify [[feature1, feature2, ..., class], ...] data

     Parameters
     ----------
     data: excel file data

     Returns
     -------
     scores & statistics :
     """
    allFeatures = []
    for col in data.columns:
        allFeatures.append(col)

    featuresLabels = allFeatures[1:len(allFeatures) - 1]

    numpyData = data.to_numpy()
    np.random.shuffle(numpyData)

    numOfColumns = numpyData.shape[1]

    classesIndex = numOfColumns - 1
    features = numpyData[:, 1: classesIndex]
    classes = numpyData[:, classesIndex]
    labelEncoder = LabelEncoder()
    classes = transformStrClassesLabelsToFloat(labelEncoder, classes)  # typ object to type str

    featuresToPredict, featuresToTest = splitArrayIntoTrainAndTest(features)
    classesToPredict, trueClassesToTest = splitArrayIntoTrainAndTest(classes)

    # so that sklearn can recognize the type
    classesToPredict = classesToPredict.astype('float')
    trueClassesToTest = trueClassesToTest.astype('float')

    clf = svm.SVC()
    clf.fit(featuresToPredict, classesToPredict)
    trainedModel = pickle.dumps(clf)

    predicted = clf.predict(featuresToTest)

    targetNames = getClassesLabelsBeforeTransformation(labelEncoder, classes)
    report = metrics.classification_report(trueClassesToTest, predicted, zero_division=0, target_names=targetNames, output_dict=True)

    classesScores = []
    accuracy = report['accuracy']
    for targetName in targetNames:
        classesScores.append("{}: {}".format(targetName, report[targetName]['f1-score']))

    bestFeaturesLabels = []
    if NumOfBestFeatures <= len(featuresLabels):
        bestFeaturesLabels = getBestFeatures(featuresToPredict, classesToPredict, featuresLabels)

    transformedTargetNames = list(np.unique(classes))
    classesToTargetNamesDict = dict(zip(transformedTargetNames, targetNames))

    report = {'accuracy': accuracy, 'classes_scores': classesScores, 'features_labels': featuresLabels,
              'best_features_labels': bestFeaturesLabels, 'classification_type': "Features"}

    return trainedModel, classesToTargetNamesDict, report


def splitArrayIntoTrainAndTest(ndarray):
    arrayLen = ndarray.shape[0]
    trainNum = round(TrainingPercentage * arrayLen)

    train = ndarray[:trainNum]
    test = ndarray[trainNum:]

    return train, test


def getBestFeatures(X, y, featuresLabels):
    X_new = SelectKBest(chi2, k=NumOfBestFeatures)
    X_new.fit_transform(X, y)

    cols = X_new.get_support(indices=True)
    bestFeatures = []
    for col in cols:
        bestFeatures.append(featuresLabels[col])

    return bestFeatures


def getNormalizedTokens(tokens):
    stemmer = nltk.stem.PorterStemmer()  # stemming, get to the root form of the word
    lemmatizer = nltk.stem.WordNetLemmatizer()  # lemmatization, get the base dictionary form of a word (the lemma)
    return (lemmatizer.lemmatize(stemmer.stem(token)) for token in tokens)


def removeStopWordsFromTokens(tokens):
    stopWords = set(stopwords.words('english'))
    for token in tokens:
        if token.lower() in stopWords or "'" in token:
            tokens.remove(token)
    return tokens


def tokenizeText(text):
    tokenizer = nltk.tokenize.TreebankWordTokenizer()
    return tokenizer.tokenize(text)


def textPreprocessing(text):
    """
     Remove punctuation marks from a text,
     Remove english stop words,
     Normalize each word (stemming + lemmatization)

     Parameters
     ----------
     text: string

     Returns
     -------
     processed text : string
     """
    return " ".join(getNormalizedTokens(removeStopWordsFromTokens(tokenizeText(re.sub(".,!?", "", text)))))


def preprocessText(text):
    for i in range(1, len(text)):
        text[i] = textPreprocessing(text[i])


def transformStrClassesLabelsToFloat(labelEncoder, classes):
    classes = classes.astype('str')
    return labelEncoder.fit_transform(classes)


def inverseClassesFloatTransformToStr(labelEncoder, classes):
    return labelEncoder.inverse_transform(classes)


def getClassesLabelsBeforeTransformation(labelEncoder, classes):
    return list(np.unique(inverseClassesFloatTransformToStr(labelEncoder, classes)))


def exctractFeaturesFromTextData(count_vect, tfidf_transformer, textToPredict, textToTest):
    # List of reviews to feature vectors (builds a dictionary of features)
    X_train_counts = count_vect.fit_transform(textToPredict)

    # Occurences => tf-idf (instead of the raw frequencies)
    # tf-idf:  scale down the impact of tokens that occur very frequently in a given corpus
    # and that are hence empirically less informative than features that occur in a small fraction of the training corpus.
    textToPredictFeatures = tfidf_transformer.fit_transform(X_train_counts)

    X_new_counts = count_vect.transform(textToTest)
    textToTextFeatures = tfidf_transformer.transform(X_new_counts)

    return textToPredictFeatures, textToTextFeatures


def predictText(model, modelFeatureVectors, modelTfidfTransformer, classesToTargetNamesDict, text):
    clf = pickle.loads(model)
    count_vect = pickle.loads(modelFeatureVectors)
    tfidf_transformer = pickle.loads(modelTfidfTransformer)

    X_new_counts = count_vect.transform([text])
    textFeatures = tfidf_transformer.transform(X_new_counts)
    transformedClass = clf.predict(textFeatures)
    classTargeName = classesToTargetNamesDict[transformedClass[0]]

    return classTargeName


def predictFeaturesDict(model, classesToTargetNamesDict, featuresDict):
    clf = pickle.loads(model)

    features = []
    for key in featuresDict:
        features.append(featuresDict[key])

    featuresAs2DArray = np.array([features])
    transformedClass = clf.predict(featuresAs2DArray)
    classTargeName = classesToTargetNamesDict[transformedClass[0]]

    return classTargeName