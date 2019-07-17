mkdir -p _unpacked

ls $env:SYSTEM_ARTIFACTSDIRECTORY
ls $env:SYSTEM_ARTIFACTSDIRECTORY/Release_Windows

Write-Host "** Validating .zip package **"
Expand-Archive -Path $env:SYSTEM_ARTIFACTSDIRECTORY/Release_Windows/Onivim2.zip -DestinationPath _unpacked/
ls _unpacked
$env:ONI2_DEBUG=1
./_unpacked/win32/Oni2.exe -f --checkhealth

Write-Host "** Validating .exe installer **"
rm -r _unpacked
mkdir _unpacked
cp $env:SYSTEM_ARTIFACTSDIRECTORY/Release_Windows/Onivim2-0.2.0-win.exe _unpacked/Onivim2-0.2.0-win.exe
_unpacked/Onivim2-0.2.0-win.exe /silent /verysilent /sp /suppressmsgboxes /norestart /Dir="D:/a/1/s/Onivim2" /log="D:/a/1/s/install.log" | Out-Null

Write-Host "Ran installer!"

ls .
ls D:/a/1/s
ls _unpacked

Get-Content -Path install.log

ls D:/
ls D:/a/1/s
ls D:/a/1/s/Onivim2

D:/a/1/s/Onivim2/Oni2.exe -f --checkhealth

