@echo off

rem ELIMINA DESDE AQUÍ
echo El script esta bloqueado por seguridad! Edita el fichero y elimina las lineas que se te indican.
echo.
pause
exit
rem HASTA AQUÍ


rem Este script permite extraer el contenido de todos los directorios y subdirectorios al directorio actual. Ejemplo:

rem Antes de ejecutarlo:
rem D:\extraer.bat
rem D:\carpeta1\subcarpeta\fichero1.txt
rem D:\carpeta2\fichero2.txt

rem Después de ejecutarlo:
rem D:\extraer.bat
rem D:\fichero1.txt
rem D:\fichero2.txt
rem D:\carpeta1\subcarpeta\
rem D:\carpeta2\

echo Se va a mover el contenido de los siguientes directorios:
echo.
dir /b /s /a:d
echo.
pause
FOR /f "tokens=*" %%i in ('dir /b /s /a:-d "%CD%"') do move "%%i" .
pause