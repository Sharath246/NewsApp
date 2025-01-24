import pandas as pd
import numpy as np
from NaiveBayes import naive_predict,naive_train,update_naive_database,collect_naive_data
from Database import connect_to_DB,get_all,update_column
from threading import Timer,Lock
import json
from fastapi import FastAPI, WebSocket, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
)
connection = connect_to_DB()
naive_data:pd.DataFrame = pd.DataFrame()
naive_lock = Lock()
new_naive_words:set[str] = set()
updated_naive_words:set[str] = set()
naive_topics = ['sports','technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']

def safe_collect_naive_data():
    global naive_data
    with naive_lock:
        naive_data = collect_naive_data(connection,naive_data,get_all)

# def safe_update_data():
#     print('Updating the DB')
#     global naive_data
#     with naive_lock:
#         update_naive_database(connection,naive_data,new_naive_words,updated_naive_words,update_column)
#     print('Updated the DB')
#     Timer(300.0, safe_update_data).start()

safe_collect_naive_data()

@app.post('/naive/{task}')
async def Naive_Bayes(task: str, request: Request):
    global naive_data,updated_naive_words,new_naive_words
    if task == 'train':
        # safe_collect_naive_data()
        payload = await request.json()
        news:list[str] = payload['news']
        topic:list[str] = payload['topic']
        naive_data,new_words,updated_words = naive_train(naive_data,new_naive_words,news,topic)
        new_naive_words = new_words.union(new_naive_words)
        updated_naive_words = updated_words.union(updated_naive_words)
        print(len(naive_data))
        return {"status":"Success"}
    # elif task == 'predict':
    #     safe_collect_naive_data()
    #     news = request.headers.get('text')
    #     response = naive_predict(naive_data,news)
    #     return response

@app.websocket('/naive_predict')
async def Naive_RT_Predict(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        response = naive_predict(naive_data,data)
        await websocket.send_json(response)


# t = Timer(300.0, safe_update_data)
# t.start() 


if __name__ == "__main__":
    import uvicorn
    if connection is None or not connection.is_connected():
        print("Database connection failed")
        exit()
    uvicorn.run(app, host="127.0.0.1", port=9000)