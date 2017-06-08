#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


SoundGet, microphone_volume, Microphone, volume
MsgBox, The microphone volume is %volume%

SoundGet, microphone_mute, Microphone, mute
if microphone_mute = Off
    MsgBox, The microphone is not muted.
else
    MsgBox, The microphone is muted.