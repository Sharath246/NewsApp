import pandas as pd
import numpy as np
import math

stop_words = [
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", 
    "any", "are", "aren't", "as", "at", "be", "because", "been", "before", 
    "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", 
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", 
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", 
    "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", 
    "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", 
    "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", 
    "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", 
    "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", 
    "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", 
    "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", 
    "some", "such", "than", "that", "that's", "the", "their", "theirs", 
    "them", "themselves", "then", "there", "there's", "these", "they", "they'd", 
    "they'll", "they're", "they've", "this", "those", "through", "to", "too", 
    "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", 
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", 
    "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", 
    "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", 
    "you've", "your", "yours", "yourself", "yourselves"
]
master_topics = ['sports','technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']

def clean_data(text:str):
    if text == None or text == '[Removed]':
        return []
    clean_tokens = []
    clean_text = ''
    for i in text:
        if i==' ':
            clean_text+=i
        elif ('a' <= i <= 'z') or ('A' <= i <= 'Z'):
            clean_text += i
        else:
            clean_text += ' '
    for word in clean_text.split():
        if len(word) <= 2:
            continue
        if word.lower() not in stop_words:
            clean_tokens.append(word.lower())
    return clean_tokens

def naive_predict(data: pd.DataFrame,text: str):
    tokens = clean_data(text)
    num_of_words = len(data.index)
    probability = [[0,i] for i in range(len(master_topics))]
    for (i,topic) in enumerate(master_topics):
        topic_sum = sum(data[topic])
        prior_topic = topic_sum / data.sum().sum()
        x = math.log(prior_topic)
        for token in tokens:
            if token in data.index:
                count = data.loc[token, topic]
                x += math.log((count + 1) / (topic_sum + num_of_words))
            else:
                x += math.log(1 / (topic_sum + num_of_words))
        probability[i][0] = x
    probability = sorted(probability, key = lambda x: x[0], reverse=True)
    response = [master_topics[probability[i][1]] for i in range(3)]
    return response

def naive_train(data:pd.DataFrame, new_words:set[str], texts:list[str], topics:list[str]):
    updated_words = set()
    for (ind,text) in enumerate(texts):
        for word in clean_data(text):
            if word not in data.index:
                new_words.add(word)
                new_row = {'sports':1,'technology':1,'science':1,'politics':1,'business':1,'health':1,'education':1,'travel':1,'entertainment':1,'environment':1,'crime':1,'fashion':1,'movie':1,'economy':1}
                new_row = pd.DataFrame(new_row,index=[word])
                data = pd.concat([data,new_row])
            elif word not in new_words:
                updated_words.add(word)
            data.loc[word,topics[ind].lower()] += 1
    return data,new_words,updated_words

def update_naive_database(connection,naive_data,new_naive_words,updated_naive_words,update_column):
    words = new_naive_words.copy()
    for word in words:
        sql = f"INSERT INTO naive VALUES ('{word}'"
        for topic in master_topics:
            sql += ',' + str(naive_data.loc[word,topic])
        sql += ');'
        try:
            update_column(connection,sql)
            new_naive_words.remove(word)
        except:
            print(f'error inserting the word {word}')
    words = updated_naive_words.copy()
    for word in words:
        sql = f'UPDATE naive SET '
        for (i,topic) in enumerate(master_topics):
            if i != len(master_topics)-1:
                sql += topic + f'={naive_data.loc[word,topic]},'
            else:
                sql += topic + f'={naive_data.loc[word,topic]}'
        sql += f" WHERE word='{word}';"
        try:
            update_column(connection,sql)
            updated_naive_words.remove(word)
        except:
            print('Error occured in updating values in the DB')

def collect_naive_data(connection,naive_data:pd.DataFrame,get_all):
    if naive_data.empty:
        rows = get_all(connection,'naive')
        naive_data = pd.DataFrame(rows,columns = ['word'] + master_topics)
        naive_data = naive_data.set_index('word')
    return naive_data
