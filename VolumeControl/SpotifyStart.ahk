#NoTrayIcon
Run, %appdata%\Spotify\Spotify.exe
Sleep 2000
Run, nircmd.exe muteappvolume Spotify.exe 1, , Hide
Sleep 500
Send {Media_Play_Pause}
Send {Media_Play_Pause}
Sleep 500
Run, nircmd.exe muteappvolume Spotify.exe 0, , Hide