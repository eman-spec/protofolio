@echo off
title Push Portofolio ke GitHub
color 0b
echo ========================================================
echo   PUSH PORTOFOLIO SOLEEMAN FIRDAUS ODE KE GITHUB
echo   Repository: https://github.com/eman-spec/protofolio
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\PortableGit\cmd;%PATH%"

echo [1/3] Memeriksa status Git...
git status
echo.

echo [2/3] Menyiapkan commit...
git add .
git commit -m "Update portfolio: Soleeman Firdaus Ode" 2>nul
echo.

echo [3/3] Melakukan push ke branch main...
echo Jika muncul browser/dialog login GitHub, silakan klik 'Sign in with your browser'.
echo.
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    color 0a
    echo ========================================================
    echo   BERHASIL! Website portofolio sudah di-push ke GitHub!
    echo   Cek di: https://github.com/eman-spec/protofolio
    echo ========================================================
) else (
    color 0c
    echo ========================================================
    echo   Gagal melakukan push. Pastikan Anda sudah login GitHub.
    echo ========================================================
)

echo.
pause
