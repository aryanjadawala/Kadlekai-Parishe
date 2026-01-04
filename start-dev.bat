@echo off
echo ========================================
echo   Kadlekai Parishe - Development Setup
echo ========================================
echo.

:: Check if .env exists
if not exist "server\.env" (
    echo [ERROR] server\.env file not found!
    echo Please create server\.env with your MongoDB connection string.
    pause
    exit /b 1
)

echo [1/2] Checking .env file... OK!
echo.

:: Start both servers
echo [2/2] Starting servers...
echo.

echo Starting backend server on port 5000...
cd server
start "Kadlekai Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
cd ..

echo Starting frontend on port 5173...
cd client
start "Kadlekai Frontend" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   SERVERS STARTED!
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin:    http://localhost:5173
echo.
echo Two terminal windows have opened.
echo Close them to stop the servers.
echo.
pause
