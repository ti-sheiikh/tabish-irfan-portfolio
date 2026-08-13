@echo off
setlocal
cd /d "%~dp0"
where python >nul 2>&1
if errorlevel 1 (
  echo Python was not found in PATH.
  echo You can still open index.html directly, but a local web server is recommended.
  pause
  exit /b 1
)
echo Revorix Engineering preview: http://localhost:8080
echo Press Ctrl+C to stop.
start "" http://localhost:8080
python -m http.server 8080
