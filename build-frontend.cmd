@echo off

echo.
echo clean
rmdir /q /s node_modules

echo.
echo npm install --no-optional
call npm install --no-optional
if %ERRORLEVEL% neq 0 goto BuildFail

echo.
echo gulp
call .\node_modules\.bin\gulp
if %ERRORLEVEL% neq 0 goto BuildFail

goto BuildSuccess

:BuildFail
echo.
echo *** BUILD FAILED ***
goto End

:BuildSuccess
echo.
echo *** BUILD SUCCEEDED ***
goto End

:End
echo.
exit /B %ERRORLEVEL%