; F5: (Des)activamos el script
; Con F12 lo podemos recargar (Util para activar que se lance, por ejemplo, la 2ª habilidad sin necesidad de cerrar y volver a abrirlo)

; Cambia a true las habilidades que deban tirarse solas
Spell1 := true
Spell2 := false
Spell3 := false
Spell4 := false

#SingleInstance Force

Toggle := false ; true = activada la macro

F5::

	If (!Toggle)
	{

		If (Spell1) {
			GoSub, Loop1
			SetTimer, Loop1, 300 ; Tiempo en milisegundos entre cada casteo de la habilidad
		}

		If (Spell2) {
			GoSub, Loop2
			SetTimer, Loop2, 11400 ; Tiempo en milisegundos entre cada casteo de la habilidad
		}

		If (Spell3) {
			GoSub, Loop3
			SetTimer, Loop3, 120000 ; Tiempo en milisegundos entre cada casteo de la habilidad
		}

		If (Spell4) {
			GoSub, Loop4
			SetTimer, Loop4, 120000 ; Tiempo en milisegundos entre cada casteo de la habilidad
		}

	} Else {
		SetTimer, Loop1, Off
		SetTimer, Loop2, Off
		SetTimer, Loop3, Off
		SetTimer, Loop4, Off
	}

	Toggle := !Toggle

return

; Recarga del script
F12::Reload


Loop1:

Send, Q

return

Loop2:

Send, W

return

Loop3:

Send, E

return

Loop4:

Send, R

return

