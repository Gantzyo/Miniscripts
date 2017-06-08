;;;;;;;;;;;;
;; README ;;
;;;;;;;;;;;;
; Con bloq mayus activas el auto clicker (Tienes que tener la ventana activa y el ratón encima)
; Con Alt+Click haces el combo de habilidades.
; Después resetea con el poder de "Recargar" para volver a usar "Oro por click"
; 
; El nombre de la ventana que se usa es "ahk_class ApolloRuntimeContentWindow"
; Cambia ese String en el script si en el futuro cambiase el nombre de la ventana



;;;;;;;;;;;;
;; SCRIPT ;;
;;;;;;;;;;;;

#SingleInstance force

; See: https://autohotkey.com/docs/commands/_If.htm#Examples
MouseIsOver(WinTitle) {
    MouseGetPos,,, Win
    return WinExist(WinTitle . " ahk_id " . Win)
}

; This script only works while a specific window is active
#If WinActive("Clicker Heroes") and MouseIsOver("ahk_class ApolloRuntimeContentWindow")


; Enable/Disable autoclicker
~capslock::
	if getkeystate("capslock", "T") { ; checks if capslock is on or off
		settimer, autoclick, 20 ; clicks every 20ms if capslock is on
	} else {
		settimer, autoclick, Off ; Turns off the autoclicking if capslock is off
	}
return

autoclick:
	; The timer needs to check the active window because it's already executing and the directive is not applied
	If MouseIsOver("ahk_class ApolloRuntimeContentWindow") {
		SendInput, {Click} ; send a click.
	} else {
		settimer, autoclick, Off ; Turn off timer when mouse goes outside of the window
	}
Return

; Combo
~alt & LButton::
	SendInput, 8 ; Double effect
	SendInput, 7 ; +200% Damage per click
	SendInput, 4 ; +100% Gold
	SendInput, 3 ; +50% Crit chance
	SendInput, 2 ; +100% DPS
	SendInput, 1 ; +10 clicks/s
	SendInput, 5 ; Gold for each click
	; After This combo finishes use 9 to reload 5 and get even more gold
Return