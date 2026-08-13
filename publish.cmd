@echo off
setlocal
cd /d "%~dp0"
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ERROR: This folder is not inside a Git repository.
  echo Copy the website files into your cloned tabish-irfan-portfolio folder first.
  pause
  exit /b 1
)
echo.
echo You are about to commit and push the current website to origin/main.
echo Review git status below:
echo.
git status
echo.
set /p CONFIRM=Type PUBLISH to continue: 
if /I not "%CONFIRM%"=="PUBLISH" (
  echo Cancelled.
  pause
  exit /b 0
)
git add -A
git commit -m "Launch Revorix Engineering website"
if errorlevel 1 echo Note: commit may have been skipped because there were no changes.
git push origin main
if errorlevel 1 (
  echo Push failed. Check your Git credentials / remote and try again.
  pause
  exit /b 1
)
echo.
echo Published. GitHub Pages may take a short time to update.
pause
