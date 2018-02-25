@echo off


set MY_QBT_PROFILE=E:\Programas\qBittorrent\myportable




rem Don't modify anything below this code!
rem --------------------------------------





set LAUNCH_COMMAND=\"%~dp0qbittorrent.exe\" \"--profile=%MY_QBT_PROFILE%\" \"%%1\"

setx QBT_PROFILE %MY_QBT_PROFILE%

reg add HKCR\magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKLM\SOFTWARE\Classes\Magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKCU\Software\Classes\magnet\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKCR\qBittorrent\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
reg add HKLM\SOFTWARE\Classes\qBittorrent\shell\open\command /ve /t REG_SZ /d "%LAUNCH_COMMAND%" /f
timeout 5