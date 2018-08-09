@echo off
REM Portable Startscript for MySQL Workbench
SET USERPROFILE=%CD%\portable
IF NOT EXIST "%CD%\portable\AppData\Roaming\Spotify" MD "%CD%\portable\AppData\Roaming\Spotify"
START /B %USERPROFILE%\AppData\Roaming\Spotify\Spotify.exe
REM This close the DOS Box after starting the Workbench
EXIT