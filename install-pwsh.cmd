@echo off
setlocal

echo Checking whether pwsh is already installed...
where pwsh >nul 2>nul
if %errorlevel%==0 (
  echo pwsh is already installed.
  pwsh --version
  goto :end
)

echo.
echo pwsh not found. Trying WinGet install...
where winget >nul 2>nul
if %errorlevel%==0 (
  winget install --id Microsoft.PowerShell --source winget
  if %errorlevel%==0 (
    echo.
    echo PowerShell installation command finished.
    echo Close and reopen your terminal, then run: pwsh --version
    goto :end
  )
)

echo.
echo WinGet install was unavailable or failed.
echo Opening official MSI download page...
start "" "https://github.com/PowerShell/PowerShell/releases/download/v7.5.5/PowerShell-7.5.5-win-x64.msi"
echo After MSI install completes, close and reopen your terminal and run: pwsh --version

:end
echo.
pause
