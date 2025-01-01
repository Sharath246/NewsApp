from mysql.connector import (connection)
from mysql.connector import errorcode

def connect_to_DB():
    try:
        cnx = connection.MySQLConnection(user="root",password="sharath",host="localhost",database="newsapp")
    except:
        print("Not able to connect")
        return None
    return cnx

def create_table(sql):
    pass

def insert_column(table_name,sql):
    pass

def update_column(table_name,sql):
    pass

def get_all(cnx,table_name):
    if cnx:
        cursor = cnx.cursor()
        sql = 'select * from ' + table_name + ";"
        cursor.execute(sql)
        for (id,email,name,password) in cursor:
            print(id," ",email, " " ,name, " " , password)
        cursor.close()
        # cnx.close()
    else:
        print("some error")

def get_column(cnx,table_name,column_name,column_value):
    rows = None
    if cnx:
        cursor = cnx.cursor()
        sql = f'select * from {table_name} where {column_name} = \'{column_value}\';'
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
            if rows:
                print(rows)
            else:
                print('no rows')
        except:
            print('error in conection')
        cursor.close()
        return rows
    else:
        return False