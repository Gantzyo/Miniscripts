~capslock::
WinGetActiveTitle, Title
if getkeystate("capslock", "T") && Title = "Clicker Heroes - Mozilla Firefox" { ; checks if capslock is on or off
	settimer, playmygame, 200 ; clicks every 50ms if capslock is on
	SendInput, 1
	SendInput, 2
	SendInput, 3
	SendInput, 4
	SendInput, 5
	SendInput, 6
	SendInput, 7
	settimer, playmygame2, 10000 ; Habilidades 10 segs
} else {
	settimer, playmygame, Off ; Turns off the autoclicking if capslock is off
	settimer, playmygame2, Off ; Turns off the autoclicking if capslock is off
}
return

playmygame:
SendInput, {Click} ; send a click.
Return

playmygame2:
SendInput, 1
SendInput, 2
SendInput, 3
SendInput, 4
SendInput, 5
SendInput, 6
SendInput, 7
Return