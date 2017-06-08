; Ejecuta algo oculto desde el CMD pasandolo a través de parámetros
; Uso: HiddenCMD.ahk COMMAND PARAMETERES "PARAMETER WITH SPACES" "PARAMETER WITH SPACES 2"
; Uso: HiddenCMD.ahk "PathToCustomScript.bat"
; Ejemplo: "echo" "Hello world > testMessage.txt"

#NoTrayIcon

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