@echo off

rem Don't modify anything below this code!
rem --------------------------------------





set LAUNCH_COMMAND=\"%~dp0qbittorrent.exe\" \"%%1\"

REG delete HKCU\Environment /F /V QBT_PROFILE

reg add HKCR\magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKLM\SOFTWARE\Classes\Magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKCU\Software\Classes\magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKCR\qBittorrent\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKLM\SOFTWARE\Classes\qBittorrent\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
timeout 5