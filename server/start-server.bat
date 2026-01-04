@echo off
echo ================================================
echo Starting Kadlekai Parishe Backend Server
echo ================================================
echo.

cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo Installing dependencies...
call npm install
echo.

echo Starting development server with nodemon...
call npm run dev
