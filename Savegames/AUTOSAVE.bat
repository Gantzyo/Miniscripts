@echo off
set WINRARPATH=C:\Program Files\WinRAR\Rar.exe
set SAVEGAMEDIR=%LOCALAPPDATA%\...
set COMPRESSEDDIR=%SAVEGAMEDIR%
set RARNAME=save
set COMMENT=comentario.txt
set CURRENTDIR=%CD%

"%WINRARPATH%" a -ag"[yyyy-mm-dd hh;mm;ss]" -inul -ep1 -z%COMMENT% -y "%COMPRESSEDDIR%\%RARNAME%" @"lista ficheros.txt"

: %WINRARPATH%		Es el path donde est� instalado winrar (rar.exe)
: %SAVEGAMEDIR%		Es el directorio donde est�n guardados los savegames.
: %COMPRESSEDDIR%	Es el directorio donde se van a almacenar los .rar tras comprimir los saves
: %RARNAME%			Es el prefijo que van a llevar los rar. Si lo dejas en blanco el nombre de los ficheros ser� solo FECHA.rar
: %COMMENT%			Es el archivo que contiene el comentario con el que se generar� el .rar. Si no se especifica no se a�adir� ning�n comentario
: %CURRENTDIR%		No modificar. Es el directorio desde donde se ejecuta el .bat. Se utiliza para saber donde est� "lista ficheros.txt"
:
: "lista ficheros.txt"	Contiene los paths a los archivos que se deben comprimir.
:						Si se usa el path completo (Por ejemplo "%SAVEGAMEDIR%\save.dat") se generar� la estructura completa de directorios en el .rar
:						Se recomienda usar el path relativo
:
: Si quieres que se guarde la ruta completa a los saves, quita el par�metro -ep1
:
: Incluye esto si quieres guardar un log de la compresi�n (tambi�n tendr�s que quitar el par�metro -inul)
:
: >> "D:\log.txt"
