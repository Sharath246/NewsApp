import pandas as pd
import numpy as np
import sys
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from openpyxl import load_workbook

ENGLISH_STOP_WORDS = set( stopwords.words('english') ).union( set(ENGLISH_STOP_WORDS) )
ENGLISH_STOP_WORDS.discard('thin')
file_path = 'C:\\Users\\USER\\Desktop\\springLearn\\newsapp\\backend\\ml\\Dictionary.xlsx'
data = pd.read_excel(file_path)
data.set_index('word',inplace=True)
master_topics = ['technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']

def clean_data(text):
    clean_tokens = []
    for word in text.split():
        if word.lower() not in ENGLISH_STOP_WORDS:
            clean_tokens.append(word.lower())
    return clean_tokens

def naive_predict(text):
    tokens = clean_data(text)
    num_of_words = len(data.index)
    probability = [[0,i] for i in range(len(master_topics))]
    for (i,topic) in enumerate(master_topics):
        topic_sum = sum(data[topic])
        x = 1
        for token in tokens:
            count = 0
            if token in data.index:
                count = data.loc[token,topic]
            x = x * (count + 1)/(topic_sum + num_of_words)
        probability[i][0] = x
    probability = sorted(probability, key = lambda x: x[0], reverse=True)
    response = [master_topics[probability[i][1]] for i in range(3)]
    return response

def naive_train(texts,topics):
    wb = load_workbook(file_path)
    sheet = wb.active
    topic_dicts = []
    for text in texts:
        wdict = {}
        tokens = clean_data(text)
        for token in tokens:
            if token in wdict.keys():
                wdict[token] += 1
            else:
                wdict[token] = 1
        topic_dicts.append(wdict)
    for (i,topic) in enumerate(topics):
        for word in topic_dicts[i]:
            if word not in data.index:
                data.loc[word] = [1] * len(data.columns)
                sheet[f'A{2+data.index.get_loc(word)}'] = word
                ind = data.index.get_loc(word)
                for i in range(len(master_topics)):
                    sheet[f'{chr(66+i)}{2+ind}'] = 1        
            data.loc[word,topic] += 1
            sheet[f'{chr(66+master_topics.index(topic.lower()))}{2+data.index.get_loc(word)}'] = data.loc[word,topic]
    wb.save(file_path)
    

if __name__ == "__main__":
    print('hello')