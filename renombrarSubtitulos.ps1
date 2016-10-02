# ELIMINAR DESDE AQUI
echo "El script esta bloqueado por seguridad! Edita el fichero y elimina las lineas que se te indican."
echo ""
$HOST.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | OUT-NULL
$HOST.UI.RawUI.Flushinputbuffer()
exit
# HASTA AQUI


$path = "$($PSScriptRoot)"
$video_files = "*.mkv"
$subtitle_files = "*.srt"

$file_list = new-object system.collections.arraylist

#Busqueda de ficheros
foreach($file in get-childitem -LiteralPath $path -Filter $video_files -Recurse) {
	if( -Not ((Get-Item $file.fullname) -is [System.IO.DirectoryInfo])) {
		
		if(($file.fullname -match "\.S..E..\.")) {
			$season = $matches[0].Substring(2,2)
			#Eliminamos los 0 por la izquierda en el numero de la season en caso de que los haya
			$season = [convert]::ToInt32($season, 10)
			$episode = $matches[0].Substring(5,2)
			foreach($subfile in get-childitem -LiteralPath $path -Filter $subtitle_files -Recurse) {
				if( -Not ((Get-Item $subfile.fullname) -is [System.IO.DirectoryInfo])) {
					# Patrones de búsqueda para saber qué subtitulo hay que renombrar para que coincida con el del capítulo:
					# S01E01 = S0$($season)E$($episode)
					# 1x01   = $($season)x$($episode)
					if(($subfile.fullname -match "S0$($season)E$($episode)")) {
						Rename-Item -LiteralPath $subfile.fullname -NewName "$($file.BaseName).Espanol.srt"
					}
				}
			}
		}
		
	}
}