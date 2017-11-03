Clear-Host
Write-Host
Write-Host "Create new IIS site for the remote web" -ForegroundColor Black -BackgroundColor Gray


$IisWebSiteName = "Remote Web for Wingtip Search App"
$IisWebSitePath = "C:\inetpub\WingtipSearchApp"
$hostHeader     = "searchapp.wingtip.com"
$bindingPort    = 80
$appPoolName    = "DefaultAppPool"
$IisWebSite = Get-Website | Where-Object {$_.Name -eq $IisWebSiteName}

if ($IisWebSite -ne $null) {  Write-Host "    IIS Web site named $IisWebSiteName has already created" -ForegroundColor Gray }
 else {
  #check for existing physical path
  if (Test-Path $IisWebSitePath) {}
  else{
    $silence = New-Item -Path $IisWebSitePath -ItemType Directory
    Write-Host "    Path $IisWebSitePath created" -ForegroundColor Gray
  }

  Write-Host "    .. creating IIS web site: $IisWebSiteName..." -ForegroundColor Gray
  $IisWebSite = New-Website -Name $IisWebSiteName -PhysicalPath $IisWebSitePath -ApplicationPool $appPoolName -HostHeader $hostHeader -Port $bindingPort
  Write-Host "    $IisWebSiteName site created" -ForegroundColor Gray
}

# add entry to HOST file to fix Visual Studio bug
$hostsFilePath = "c:\Windows\System32\Drivers\etc\hosts"
$hostFileEntry = "127.0.0.1     $hostHeader"
Add-Content -Path $hostsFilePath -Value "`r`n$hostFileEntry"
Write-Host "HOST file entry added: $hostFileEntry" -ForegroundColor Gray


Write-Host
Write-Host "Finished! You can now import web applications." -ForegroundColor Green

