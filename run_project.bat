@echo off
title SiteeForgeStudio - Unified Build & Launch
echo =====================================================================
echo              SITEEFORGESTUDIO UNIFIED RUN SYSTEM
echo =====================================================================
echo.

:: 1. Build React Frontend
echo [STEP 1/5] Building Frontend React Application...
cd frontend
if not exist node_modules (
    echo node_modules not found. Installing frontend dependencies...
    call npm install
)
echo Building static assets...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend build failed! Please check Vite configurations.
    pause
    exit /b %ERRORLEVEL%
)
cd ..
echo Frontend build complete!
echo.

:: 2. Setup Backend Virtual Environment & Dependencies
echo [STEP 2/5] Setting up Python dependencies...
cd backend
if not exist .venv (
    echo Python virtual environment not found! Creating one...
    python -m venv .venv
)
echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo Installing required Python packages...
pip install pymysql django-environ djangorestframework django-cors-headers
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install backend dependencies!
    pause
    exit /b %ERRORLEVEL%
)
echo Backend dependencies installed!
echo.

:: 3. Setup MySQL Database
echo [STEP 3/5] Setting up MySQL Database...
python db_setup.py
echo.

:: 4. Run Migrations & Seed Default Data
echo [STEP 4/5] Running migrations on MySQL...
python manage.py makemigrations
python manage.py migrate
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Database migrations failed! Please ensure MySQL is running.
    pause
    exit /b %ERRORLEVEL%
)

echo Seeding default data to database...
python seed_data.py
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Seeding script failed!
    pause
    exit /b %ERRORLEVEL%
)
echo Database migrations and seeding complete!
echo.

:: 5. Launch Django Server
echo [STEP 5/5] Launching unified full-stack server on http://127.0.0.1:8000...
echo.
echo =====================================================================
echo SUCCESS: Server is starting!
echo Visit http://127.0.0.1:8000 in your browser to view the live website.
echo Visit http://127.0.0.1:8000/admin for the Admin Dashboard (admin / admin123).
echo =====================================================================
echo.
python manage.py runserver 0.0.0.0:8000
pause
