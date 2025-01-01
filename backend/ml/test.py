# import nltk
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
# # nltk.download('stopwords')
# ENGLISH_STOP_WORDS = set( stopwords.words('english') ).union( set(ENGLISH_STOP_WORDS) )
# if 'an' in ENGLISH_STOP_WORDS:
#     print("dfsdfsdf")
# from Database import get_column,connect_to_DB

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

# from NaiveBayes import naive_train

# naive_train(["science and technoogy are very good for the future generations",'ypu are looking handsome brother'],['science','fashion'])