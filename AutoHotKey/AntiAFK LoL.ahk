~capslock::
WinGetActiveTitle, Title
if getkeystate("capslock", "T") && Title = "League of Legends (TM) Client" { ; checks if capslock is on or off
	MouseClick, Right , % Random(1425,1680), % Random(800,1050)
	settimer, playmygame, % Random(5000,30000) ; clicks every 5s-30s if capslock is on
} else {
	settimer, playmygame, Off ; Turns off the autoclicking if capslock is off
}
return

playmygame:
settimer, playmygame, % Random(2000,30000)
MouseClick, Right , % Random(1425,1680), % Random(800,1050)
Return

Random(min,max) {
	Random, out, %min%, %max%
	return	out
}