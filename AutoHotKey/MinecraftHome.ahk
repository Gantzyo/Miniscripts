; Vuelve rápido a /home bed cuando pulsamos F12
; hay que hacer los sleeps para que de tiempo de que se introduzca el comando
F12::
{
	WinGetActiveTitle, Title
	if (Title = "Minecraft 1.7.4")
		SendInput t
		Sleep 200
		SendInput /home bed
		Sleep 200
		SendInput {Enter}
	return
}