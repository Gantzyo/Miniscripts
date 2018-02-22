@echo off
REM Portable Startscript for Rambox
SET USERPROFILE=%CD%
IF NOT EXIST "%CD%\AppData\Roaming\Rambox" MD "%CD%\AppData\Roaming\Rambox"
IF NOT EXIST "%CD%\Desktop" MD "%CD%\Desktop"
START /B Rambox.exe
REM This close the DOS Box after starting Rambox
EXIT