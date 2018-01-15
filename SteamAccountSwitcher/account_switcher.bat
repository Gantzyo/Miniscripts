@echo off
set username=%1
rem Display remembered accounts if none is provided and ask for a valid one
if "%username%"=="" (
	cls
	echo No account name provided, remembered accounts:
	rem Use quotes as delimiter: https://superuser.com/questions/514284/how-do-i-use-a-quote-as-a-for-f-delimiter-in-cmd-exe-on-windows-7#514298
	for /f tokens^=4^ delims^=^" %%A in ('findstr /r "AccountName" config\loginusers.vdf') do (
		echo %%A
	)
	echo.
	set /p username=Account name: 
)

:preventblank
if "%username%"=="" (
	set /p username=Please enter a valid account name: 
	goto preventblank
)

reg add "HKCU\Software\Valve\Steam" /v AutoLoginUser /t REG_SZ /d %username% /f
reg add "HKCU\Software\Valve\Steam" /v RememberPassword /t REG_DWORD /d 1 /f
rem start steam://open/main
rem start steam.exe -silent
start steam.exe