from mysql.connector import (connection,MySQLConnection)

def connect_to_DB():
    try:
        cnx = connection.MySQLConnection(user="root",password="sharath",host="localhost",database="newsapp")
    except:
        print("Not able to connect")
        return None
    return cnx

def create_table(sql):
    pass

def update_column(cnx:MySQLConnection,sql:str):
    cursor = cnx.cursor()
    try:
        cursor.execute(sql)
        cnx.commit()
    except:
        print(f'Error in inserting into the table with sql {sql}')
    cursor.close()

def get_all(cnx:MySQLConnection,table_name:str):
    if cnx:
        cursor = cnx.cursor()
        sql = 'select * from ' + table_name + ";"
        cursor.execute(sql)
        rows = []
        for row in cursor:
            rows.append(row)
        cursor.close()
        return rows
    else:
        print("some error")
        return None

def get_column(cnx,table_name,column_name,column_value):
    rows = None
    if cnx:
        cursor = cnx.cursor()
        sql = f'select * from {table_name} where {column_name} = \'{column_value}\';'
        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
        except:
            print('error in conection')
        cursor.close()
        return rows
    else:
        return False