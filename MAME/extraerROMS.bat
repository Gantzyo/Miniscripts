@echo off
set src_folder=E:\Juegos\MAME 0.139
set dst_folder=E:\Juegos\MAME 0.139\bestmame
for /f "tokens=*" %%i in (File-list.txt) DO (
    xcopy /S/E "%src_folder%\MAMEUI64\roms\%%i" "%dst_folder%\roms"
    xcopy /S/E "%src_folder%\MAMEUI64\samples\%%i" "%dst_folder%\samples"
)