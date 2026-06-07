import os
import pymysql
import environ
from pathlib import Path
from urllib.parse import urlparse, unquote

# Initialize path
BASE_DIR = Path(__file__).resolve().parent

# Load environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

db_url = env('DATABASE_URL', default='mysql://root:Root%40123@127.0.0.1:3306/siteeforge_db')

# Parse URL
parsed = urlparse(db_url)
db_user = parsed.username or 'root'
db_password = unquote(parsed.password or '')
db_host = parsed.hostname or '127.0.0.1'
db_port = parsed.port or 3306
db_name = parsed.path.lstrip('/') or 'siteeforge_db'

print(f"Connecting to MySQL server at {db_host}:{db_port} as user '{db_user}'...")

try:
    connection = pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        port=db_port
    )
    
    with connection.cursor() as cursor:
        print(f"Creating database `{db_name}` if it does not exist...")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        print(f"Database `{db_name}` verified/created successfully!")
        
    connection.commit()
    connection.close()
except Exception as e:
    print("\n" + "="*50)
    print("WARNING: Could not connect to MySQL server to create the database automatically.")
    print("Error details:", e)
    print("Please make sure that:")
    print("1. Your MySQL server is running on localhost (127.0.0.1:3306).")
    print(f"2. User '{db_user}' has credentials matching your .env file.")
    print("="*50 + "\n")
