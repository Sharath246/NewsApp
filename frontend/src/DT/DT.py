from mysql.connector import connection, MySQLConnection
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def connect_to_DB():
    try:
        cnx = connection.MySQLConnection(
            user="root", password="sharath", host="localhost", database="DailyTasks"
        )
    except Exception as e:
        print(f"Not able to connect: {e}")
        return None
    return cnx

def get_task_for_date(cnx: MySQLConnection, sql:str): # Date passed from the frontend (format: 'YYYY-MM-DD')
    if cnx:
        cursor = cnx.cursor()
        try:
            cursor.execute(sql)
            tasks = cursor.fetchall()
            return tasks
        except Exception as e:
            print(f"Error fetching task for {sql}: {e}")
        finally:
            cursor.close()
    return None

def create_table(cnx: MySQLConnection, sql: str):
    cursor = cnx.cursor()
    try:
        cursor.execute(sql)
        print("Table created successfully.")
    except Exception as e:
        print(f"Error in creating table: {e}")
    cursor.close()

def update_column(cnx: MySQLConnection, sql: str):
    cursor = cnx.cursor()
    try:
        cursor.execute(sql)
        cnx.commit()
    except Exception as e:
        print(f"Error in updating column with SQL {sql}: {e}")
    cursor.close()

# Flask endpoints
@app.route('/addTask', methods=['POST'])
def add_task():
    cnx = connect_to_DB()
    if not cnx:
        return jsonify({'message': 'Database connection error'}), 500

    data = request.get_json()
    task_content = data.get('task')

    sql = "INSERT INTO tasks (task, date_created) VALUES (%s, CURDATE());"

    try:
        cursor = cnx.cursor()
        cursor.execute(sql, (task_content,))
        cnx.commit()
        return jsonify({'message': 'Task added successfully'}), 201
    except Exception as e:
        print(f"Error inserting task: {e}")
        return jsonify({'message': 'Error inserting task'}), 500
    finally:
        cursor.close()
        cnx.close()

@app.route('/updateTask', methods=['POST'])
def update_task():
    cnx = connect_to_DB()
    if not cnx:
        return jsonify({'message': 'Database connection error'}), 500

    data = request.get_json()
    task_content = data.get('task')
    date = data.get('date')  # Date passed from the frontend (format: 'YYYY-MM-DD')

    sqlFetch = f"SELECT * FROM tasks WHERE date_created = '{date}'"
    task_for_day = get_task_for_date(cnx, sqlFetch)

    if not task_for_day:
        return jsonify({'message': f'No task exists for {date} to update.'}), 404

    sql = f"UPDATE tasks SET task = '{task_content}' WHERE date_created = '{date}';"

    try:
        update_column(cnx, sql)
        return jsonify({'message': 'Task updated successfully'}), 200
    except Exception as e:
        print(f"Error updating task: {e}")
        return jsonify({'message': 'Error updating task'}), 500
    finally:
        cnx.close()

@app.route('/getTasksByDate', methods=['GET'])
def get_tasks_by_date():
    cnx = connect_to_DB()
    if not cnx:
        return jsonify({'message': 'Database connection error'}), 500
    
    start_date = request.headers.get('start') # Date passed from the frontend (format: 'YYYY-MM-DD')
    end_date = request.headers.get('end') # Date passed from the frontend (format: 'YYYY-MM-DD')

    sql = f"SELECT task, date_created FROM tasks;"

    try:
        rows = get_task_for_date(cnx, sql)
        tasks = [{'task': task, 'date': date} for task, date in rows]
        return jsonify(tasks), 200
    except Exception as e:
        print(f"Error fetching tasks by date: {e}")
        return jsonify({'message': 'Error fetching tasks'}), 500
    finally:
        cnx.close()

def get_tasks_by_date(start_date, end_date):
    cnx = connect_to_DB()
    if not cnx:
        return jsonify({'message': 'Database connection error'}), 500

    sql = f"SELECT task, date_created FROM tasks WHERE date_created >= '{start_date}' AND date_created <= '{end_date}';"

    try:
        rows = get_task_for_date(cnx, sql)
        tasks = [{'task': task, 'date': date} for task, date in rows]
        return jsonify(tasks), 200
    except Exception as e:
        print(f"Error fetching tasks by date: {e}")
        return jsonify({'message': 'Error fetching tasks'}), 500
    finally:
        cnx.close()

if __name__ == "__main__":
    # Initialize the database and create table if it doesn't exist
    cnx = connect_to_DB()
    if cnx:
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS tasks (
            task VARCHAR(2048) NOT NULL,
            date_created DATETIME NOT NULL PRIMARY KEY
        );
        """
        create_table(cnx, create_table_sql)
        cnx.close()

    app.run()
