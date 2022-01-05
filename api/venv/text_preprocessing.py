import nltk
from nltk.corpus import stopwords

nltk.download('wordnet')
nltk.download('stopwords')


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
