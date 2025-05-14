@echo off
echo Запуск Metasiberia...

REM Запускаем SpacetimeDB сервер
start powershell -NoExit -Command "cd C:\Three\metasiberia\server; spacetimedb-cli start"

REM Ждём пару секунд перед запуском клиента (можно увеличить, если сервер дольше запускается)
timeout /t 3 > nul

REM Запускаем Vite (frontend)
start powershell -NoExit -Command "cd C:\Three\metasiberia\client; npm run dev"
