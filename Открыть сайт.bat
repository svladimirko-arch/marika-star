@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   MARIKA STAR — локальный запуск сайта
echo ============================================
echo.
echo Сайт откроется в браузере через пару секунд.
echo Не закрывайте это окно, пока смотрите сайт.
echo Чтобы остановить — просто закройте окно.
echo.
start "" powershell -windowstyle hidden -command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000/'"
node server\server.mjs
pause
