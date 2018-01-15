; Crea un acceso directo de este archivo y pasale el exe/url de steam del juego. Arrancará:
; - WindowedBorderlessGaming
; - El juego (Acepta parámetros)



; ---- SCRIPT
; 1. Ejecuta WindowedBorderlessGaming.exe si no está arrancado
Process, Exist, WindowedBorderlessGaming.exe ; check to see if WindowedBorderlessGaming.exe is running
If (ErrorLevel = 0) ; If it is not running
{
	Run WindowedBorderlessGaming.exe
}

; 2. Ejecuta el juego
; Run %1% ;De esta forma solo se ejecuta el juego, no acepta parámetros
Loop, %0%  ; For each parameter:
{
	param := %A_Index% ; Fetch the contents of the variable whose name is contained in A_Index.
	If InStr(param, A_Space)
	{
		; Entrecomillar si contiene algun espacio
		param = "%param%"
	}
	command = %command%%A_Space%%param%
}

; Debug: 
; MsgBox Complete command: --%command%--

Run, %comspec% /c %command%, , Hide