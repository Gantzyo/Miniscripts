TrayTip, Voicemeeter, "Cargando configuracion comprimido", 3
Sleep 1000

Run, "E:\Scripts y programacion\Miniscripts\AutoHotKey\voicemeeter\establecer-vbCABLE.bat"

IfWinExist, VoiceMeeter		; Title of the prog
{
	WinActivate
	WinClose
}

Sleep 3000
Run, "C:\Program Files (x86)\VB\Voicemeeter\voicemeeterpro.exe" -L"E:\Scripts y programacion\Miniscripts\AutoHotKey\voicemeeter\comprimido.xml"