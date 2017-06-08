@echo off
rem Duración de la sesión:
set MINUTOSMAX=44

set MINUTOS=0
rem Dará el mensaje de que has acabado 5 veces
set ACABADO=0

set UNMINUTO=60
set SEGUNDOSPREPARACION=60
rem Primer minuto de margen para subir a la bici etc.
ECHO Preparate...
timeout %SEGUNDOSPREPARACION% >nul
echo.
ECHO Comenzamos! 

:RESTART
SET MINSECCION=0
:START
timeout %UNMINUTO% >nul
SET /A MINSECCION=MINSECCION+1
set /A MINUTOS=MINUTOS+1
echo Llevas %MINUTOS% minutos
if %MINUTOS%==%MINUTOSMAX% (
	goto LASTMIN
)

if %MINSECCION%==1 (
	ECHO Aprieta! 
)
if %MINSECCION%==10 (
	ECHO Descansa un poco! 
	goto RESTART
)
goto START
:LASTMIN
ECHO Ultimo minuto! 
timeout %UNMINUTO% >nul
:FINISH
ECHO Se acabo!  :) 
set /A ACABADO=ACABADO+1
if %ACABADO% LEQ 5 (
	timeout 1 >nul
	goto FINISH
)