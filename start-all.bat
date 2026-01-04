@echo off
echo ================================================
echo  Kadlekai Parishe - Starting Full Application
echo ================================================
echo.

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0server && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Client...
start "Frontend Client" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ================================================
echo  Both servers are starting!
echo ================================================
echo.
echo  Backend:  http://localhost:5000
echo  Frontend: http://localhost:5173
echo.
echo  Press any key to exit this window...
pause > nul
