import pandas as pd
import numpy as np
from NaiveBayes import naive_predict,naive_train,update_naive_database,collect_naive_data
from flask import Flask,request
from Database import connect_to_DB,get_all,update_column
from flask_cors import CORS
from threading import Timer,Lock

app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"])

connection = connect_to_DB()
naive_data:pd.DataFrame = pd.DataFrame()
naive_lock = Lock()
new_naive_words:set[str] = set()
updated_naive_words:set[str] = set()
naive_topics = ['sports','technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']

if connection != None and connection.is_connected():

    def safe_collect_naive_data():
        global naive_data
        with naive_lock:
            naive_data = collect_naive_data(connection,naive_data,get_all)
        
    def safe_update_data():
        print('Updating the DB')
        global naive_data
        with naive_lock:
            update_naive_database(connection,naive_data,new_naive_words,updated_naive_words,update_column)
        print('Updated the DB')
        Timer(300.0, safe_update_data).start()

    @app.route('/naive/<task>',methods = ['GET','POST'])
    def Naive_Bayes(task):
        global naive_data,updated_naive_words,new_naive_words
        if task == 'train':
            safe_collect_naive_data()
            news:list[str] = request.get_json()['news']
            topic:list[str] = request.get_json()['topic']
            naive_data,new_words,updated_words = naive_train(naive_data,new_naive_words,news,topic)
            new_naive_words = new_words.union(new_naive_words)
            updated_naive_words = updated_words.union(updated_naive_words)
            print(len(naive_data))
            return "Success"
        elif task == 'predict':
            safe_collect_naive_data()
            news = request.headers.get('text')
            response = naive_predict(naive_data,news)
            return response

    t = Timer(300.0, safe_update_data)
    t.start() 

else:
    print("DB not Connected")


if __name__ == '__main__':
    app.run(host="127.0.0.1",port=9000)
    