import pandas as pd
import numpy as np
from NaiveBayes import naive_predict,naive_train
from flask import Flask,request
from Database import connect_to_DB
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"])

connection = connect_to_DB()

if connection != None and connection.is_connected():

    @app.route('/train_nb',methods = ['POST'])
    def train_nb():
        news = request.get_json()['news']
        topic = request.get_json()['topic']
        naive_train(news,topic)
        return "Success"
    
    @app.route('/predict_nb',methods=['GET'])
    def predict_nb():
        news = request.headers.get('text')
        response = naive_predict(news)
        return response
    
else:
    print("DB not Connected")


if __name__ == '__main__':
    app.run(host="127.0.0.1",port=9000)
    