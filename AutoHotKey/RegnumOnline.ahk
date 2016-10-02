;Punto
NumpadDot::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +1
	else
		Send {.}
	Send {Blind}
	return
}

;Enter
NumpadEnter::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum") {
		SendInput +2
	} else {
		Send {NumpadEnter}
	}
	Send {Blind}
	return
}

;+
NumpadAdd::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +3
	else
		Send {+}
	Send {Blind}
	return
}

;-
NumpadSub::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +4
	else
		Send {-}
	Send {Blind}
	return
}

;*
NumpadMult::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +5
	else
		Send {*}

	Send {Blind}
	return
}

;/
NumpadDiv::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +6
	else
		Send {/}
	Send {Blind}
	return
}

;Izquierda
Left::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +7
	else
		Send {Left}

	Send {Blind}
	return
}

;Arriba
Up::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +8
	else
		Send {Up}
	Send {Blind}
	return
}

;Abajo
Down::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +9
	else
		Send {Down}
	Send {Blind}
	return
}

;Derecha
Right::
{
	WinGetActiveTitle, Title
	if (Title = "Champions of Regnum")
		SendInput +0
	else
		Send {Right}
	Send {Blind}
	return
}

;Cerrar CoD MW3
^F12::
{
	Process, Close, iw5mp.exe
}