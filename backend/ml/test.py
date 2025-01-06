# import nltk
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
# # nltk.download('stopwords')
# from NaiveBayes import naive_train
from Database import connect_to_DB,update_column
# from NaiveBayes import clean_data
import pandas as pd
import requests




# ENGLISH_STOP_WORDS = set( stopwords.words('english') ).union( set(ENGLISH_STOP_WORDS) )
# for i in ENGLISH_STOP_WORDS:
#     print(i,end='  ')
# if 'an' in ENGLISH_STOP_WORDS:
#     print("dfsdfsdf")

# cnx = connect_to_DB()
# if cnx and cnx.is_connected():
#     print("okay")
#     if get_column(cnx,'user','email','a@hh.com'):
#         print("rows present")
#     else:
#         print('no rows')

# a='asdAASDASDasdas'
# a=a.lower()
# print(a)

# a={'asdasd':1231,"asdad":34234}
# for i in a:
#     print(i)


# naive_train(["science and technoogy are very good for the future generations",'ypu are looking handsome brother'],['science','fashion'])
 

# a = clean_data("Hello, world! This   is a test:    1234, python@code #2024.")
# print(a)

# master_topics = ['word','technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']
# a = pd.DataFrame(master_topics)
# a=a.T
# print(a)
# a.to_excel('C:\\Users\\USER\\Desktop\\springLearn\\newsapp\\backend\\ml\\Dictionary.xlsx',index=False,header=False)

# print(chr(65))
# imgs = []
# headers = {
#     "Authorization":"aOKdEBzQVzLOA3M0RmPAzAxOp0IcXuCKCwrL15w1PKwYAhUx4L2RbTSU"
# }
connection = connect_to_DB()
master_topics = ['sports','technology','science','politics','business','health','education','travel','entertainment','environment','crime','fashion','movie','economy']
# for i in master_topics:
# response = requests.get(f'https://api.pexels.com/v1/search?query=badminton',headers=headers)
# response = response.json()
# for i in range(len(response['photos'])):
#     print(response['photos'][i]['src']['original'])
# for i in imgs:
#     print(i)
# from mysql.connector import (connection)

# try:
#     cnx = connection.MySQLConnection(user="root",password="sharath",host="localhost",database="newsapp")
# except:
#     print("Not able to connect")

# def get_all(table_name):
#     if cnx:
#         cursor = cnx.cursor()
#         sql = 'select * from ' + table_name + ";"
#         cursor.execute(sql)
#         rows = []
#         for row in cursor:
#             rows.append(row)
#         cursor.close()
#         return rows
#     else:
#         return None
# a = get_all('user')
# print(a)

# a=[(1, 'sharath@gmail.com', 'sharath', 'Chandra'), (2, 'a@a.com', 'sher', 'a'), (3, 'sharathchandra@gmail.com', 'Sharath Chandra', 'as')]
# a=pd.DataFrame(a,columns = ['id','email','name','password'])
# a=a.set_index('id')
# if type(a) == pd.core.frame.DataFrame:
# #     print('Hello')
# print('word VARCHAR(50) NOT NULL',end="")
# for i in master_topics:
#     print(f', {i} BIGINT NOT NULL',end="")
# print(' PRIMARY KEY(word)')


# new_naive_words = set(['asda','asdasd','asdasd','asdasd','aweqweqw','qweqwe'])

# for word in new_naive_words:
#     print(word)
#     new_naive_words.remove(word)
# updated_naive_words = ['qwewe','qweqwe','rtert','erttrhh','gfhddsddf']

# def update_naive_database():
#     for word in new_naive_words:
# sql = f"INSERT INTO naive VALUES ('Hello'"
# for topic in master_topics:
#     sql += ',' + str(1010)
# sql += ');'
# print(sql)
# update_column(connection,sql)
#         print(sql)
#     for word in updated_naive_words:
#         sql = f'UPDATE naive SET '
#         for (i,topic) in enumerate(master_topics):
#             if i != len(master_topics)-1:
#                 sql += topic + f'={1010},'
#             else:
#                 sql += topic + f'={10101010}'
#         sql += f" WHERE word='{word}';"
#         # update_column(connection,sql)
#         print(sql)
# update_naive_database()

# if connection:
#     def all():
#         if master_topics == None:
#             print('YES')
#         else:
#             print('NO')

# if __name__ == '__main__':
#     print('HELLO')
