import json
import re
from sklearn.linear_model import LogisticRegression
from sklearn import svm
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn import metrics
from sklearn.metrics import ConfusionMatrixDisplay
import pickle
import nltk
from nltk.corpus import stopwords

nltk.download('wordnet')
nltk.download('stopwords')

TrainingPercentage = 75
TestingPercentage = 100 - TrainingPercentage


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

    textToPredict, textToTest = splitArrayIntoTrainAndTest(text)
    classesToPredict, trueClassesToTest = splitArrayIntoTrainAndTest(classes)
    # so that sklearn can recognize the type
    classesToPredict = classesToPredict.astype('int')
    trueClassesToTest = trueClassesToTest.astype('int')

    preprocessText(textToPredict)
    preprocessText(textToTest)

    # List of reviews to feature vectors (builds a dictionary of features)
    count_vect = CountVectorizer()
    X_train_counts = count_vect.fit_transform(textToPredict)

    # Occurences => tf-idf (instead of the raw frequencies)
    # tf-idf:  scale down the impact of tokens that occur very frequently in a given corpus
    # and that are hence empirically less informative than features that occur in a small fraction of the training corpus.
    tfidf_transformer = TfidfTransformer()
    X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)

    # Training the classifier
    clf = LogisticRegression(max_iter=200).fit(X_train_tfidf, classesToPredict)
    trainedModel = pickle.dumps(clf)
    # Predict test set

    # Transform data...
    X_new_counts = count_vect.transform(textToTest)
    X_new_tfidf = tfidf_transformer.transform(X_new_counts)

    predicted = clf.predict(X_new_tfidf)
    report = metrics.classification_report(trueClassesToTest, predicted, output_dict=True)  # return as dictionary
    
    
    cf_matrix = metrics.confusion_matrix(trueClassesToTest, predicted, output_dict=True)

    #disp = ConfusionMatrixDisplay(confusion_matrix=cf_matrix)
    #disp.plot()

    #plt.show()
    # TODO need to save scores & stats in the database along the model.

    return trainedModel, report


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

    featuresToPredict, featuresToTest = splitArrayIntoTrainAndTest(features)
    classesToPredict, trueClassesToTest = splitArrayIntoTrainAndTest(classes)
    # so that sklearn can recognize the type
    classesToPredict = classesToPredict.astype('float')
    trueClassesToTest = trueClassesToTest.astype('float')

    clf = svm.SVC()
    clf.fit(featuresToPredict, classesToPredict)
    trainedModel = pickle.dumps(clf)

    predicted = clf.predict(featuresToTest)
    report = metrics.classification_report(trueClassesToTest, predicted, output_dict=True)  # return as dictionary

    return trainedModel, report, featuresLabels


def splitArrayIntoTrainAndTest(ndarray):
    arrayLen = ndarray.shape[0]
    trainNum = round(TrainingPercentage / 100 * arrayLen)

    train = ndarray[:trainNum]
    test = ndarray[trainNum:]

    return train, test



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



def predictText(data, text):
    clf = pickle.loads(data)
    clf.predict(text)

def predictFeaturesDict(model, featuresDict):
    clf = pickle.loads(model)

    features = []
    for key in featuresDict:
        features.append(featuresDict[key])

    featuresAs2DArray = np.array([features])
    Class = clf.predict(featuresAs2DArray)
    return Class[0]
