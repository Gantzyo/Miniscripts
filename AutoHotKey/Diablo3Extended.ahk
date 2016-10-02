; F5: (Des)activamos el script
; Con F12 lo podemos recargar (Util para activar que se lance, por ejemplo, la 2ª habilidad sin necesidad de cerrar y volver a abrirlo)

#SingleInstance Force

; Para añadir una tecla usa: new AutomaticKey(KEY, TIMER, ENABLED)
; Si enabled = false la tecla no se pulsará automáticamente

arrayKeys := Array()
arrayKeys.Push(new AutomaticKey("Q", 300, true))
arrayKeys.Push(new AutomaticKey("W", 1000, true))
arrayKeys.Push(new AutomaticKey("E", 700, true))
arrayKeys.Push(new AutomaticKey("R", 100, false))

Toggle := false ; true = activada la macro

; El script solo funciona cuando la ventana "Diablo III" tiene el foco
#IfWinActive Diablo III
F5::

	Toggle := !Toggle
	
	If (Toggle)
	{
		For index, value in arrayKeys {
			If(value.enabled) {
				value.Start()
			}
		}

	} Else {
		For index, value in arrayKeys {
			If(value.enabled) {
				value.Stop()
			}
		}
	}

return


; Clase que contiene las diferentes propiedades de cada tecla

/*
Los métodos Start() y Stop():
Contienen la siguiente linea:
	func := this.timerFunc
Esto parece que es código redundante, sin embargo, "SetTimer % func" evalua una expresion,
la expresión '% func' apunta al "funcObject" Pulsar()
Debido a un fallo, si utilizasemos "SetTimer % this.timerFunc" NO FUNCIONARIA ya que no entiende 'this.'
así que debemos sacar el valor de this.FUNCION() a una variable para poder usarlo en SetTimer
Más información: https://autohotkey.com/boards/viewtopic.php?p=75639#p75639

TL;DR: La referencia a la funcion debe ser mediante una variable local y no mediante this.variable
*/

class AutomaticKey {
	
	
	__New(aKey, aTimer, aEnabled:=true) {
		this.enabled := aEnabled
		this.key := aKey
		this.timer := aTimer
		this.timerFunc := this.Pulsar.Bind(this)
		return this
	}
	
	Start() {
		func := this.timerFunc
		SetTimer % func, % this.timer
	}
	
	Stop() {
		func := this.timerFunc
		SetTimer, % func, Off
	}
	
	Pulsar() {
		; El timer ignora la directiva IfWinActive
		WinGetActiveTitle, Title
		If(Title = "Diablo III") {
			SendInput, % this.key
		}
	}
	
}

; Podemos recargar el script desde cualquier ventana
#IfWinActive
F12::Reload ; Recarga del script