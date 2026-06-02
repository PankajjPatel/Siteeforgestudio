import pymysql

def create_database():
    connection = None
    try:
        connection = pymysql.connect(
            host='127.0.0.1',
            user='root',
            password='Root@123',
            port=3306
        )
        with connection.cursor() as cursor:
            cursor.execute("CREATE DATABASE IF NOT EXISTS siteeforge_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
            print("Successfully created / verified database 'siteeforge_db'")
    except Exception as e:
        print(f"Error connecting to MySQL or creating database: {e}")
    finally:
        if connection:
            connection.close()

if __name__ == '__main__':
    create_database()
