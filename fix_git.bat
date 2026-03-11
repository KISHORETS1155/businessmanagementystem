@echo off
echo ===============================
echo Fixing Git Repository Structure
echo ===============================

echo Removing nested frontend git repo if exists...
cd frontend

IF EXIST .git (
    rmdir /s /q .git
    echo Removed frontend/.git
) ELSE (
    echo No nested git repo found
)

cd ..

echo ===============================
echo Adding files to git
echo ===============================
git add .

echo ===============================
echo Committing changes
echo ===============================
git commit -m "Fix repository structure and update project"

echo ===============================
echo Pushing to GitHub
echo ===============================
git push origin main

echo ===============================
echo DONE
echo ===============================
pause