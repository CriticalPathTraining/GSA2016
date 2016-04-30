cls
Write-Host "Running Setup Script for the WCM Lab..."

# setup for WCM Lab
Add-PSSnapin "Microsoft.SharePoint.PowerShell"

# create new web application to host WCM sites
$webAppName = “Wingtip Publishing Web Application” 
$port = 80
$hostHeader = “wcm.wingtip.com”
$urlWebApp = "http://" + $hostHeader
$ssl = $false
$authProvider = New-SPAuthenticationProvider -UseWindowsIntegratedAuthentication -UseBasicAuthentication 
$appPoolName = “SharePoint Default App Pool”
$dbServer = “WingtipServer”
$dbName = “SharePoint_ContentDB_WingtipPublishing”

Write-Host " - checking to see if web application already exists at $urlWebApp..." -ForegroundColor Yellow
$webApp = Get-SPWebApplication | where {$_.Url -eq $urlWebApp}

# create new web application if it doesn't already exist
if ($webApp -eq $null) {
    Write-Host " - creating new web application at $urlWebApp..." -ForegroundColor Green
    $webapp = New-SPWebApplication -Name $webAppName `
                                   -Port $port `
                                   -HostHeader $hostHeader `
                                   -SecureSocketsLayer:$ssl `
                                   -AuthenticationProvider $authProvider `
                                   -URL $urlWebApp `
                                   -ApplicationPool $appPoolName `
                                   -DatabaseServer $dbServer `
                                   -DatabaseName $dbName 

    Write-Host " - web application created at $urlWebApp..." -ForegroundColor Yellow
}
else {
    Write-Host "   web application found at $urlWebApp..." -ForegroundColor Yellow
}


# add entry to HOST file to redirect this domain to local machine
$hostsFilePath = "c:\Windows\System32\Drivers\etc\hosts"
$hostFileEntry = "127.0.0.1     $hostHeader"
Add-Content -Path $hostsFilePath -Value "`r`n$hostFileEntry"
Write-Host " - HOST file DNS entry added: $hostFileEntry" -ForegroundColor Green

# create new Blank site at root of new web application
$rootSiteUrl = $urlWebApp
$rootSiteDisplayName = "WCM Lab Site - Root"
$rootSSiteTemplate = "STS#0"
$rootSiteOwner = "WINGTIP\Administrator" 

$rootSite = Get-SPSite | Where-Object {$_.Url -eq $rootSiteUrl}

if ($rootSite -ne $null) {
    Write-Host " - deleting existing root site collection at $rootSiteUrl"  -ForegroundColor Red
    Remove-SPSite -Identity $rootSite -Confirm:$false
}

Write-Host " - creating new root site collection at $rootSiteUrl"  -ForegroundColor Green
$rootSite = New-SPSite -URL $rootSiteUrl `
                       -Name $rootSiteDisplayName `
                       -Template $rootSSiteTemplate `
                       -OwnerAlias $rootSiteOwner


Write-Host " - root site collection created at $rootSiteUrl" -ForegroundColor Yellow
Write-Host " - launching site in Internet Explorer..." -ForegroundColor Yellow
Start iexplore $rootSiteUrl

# create new Publishing site
$publishingSiteUrl = $rootSiteUrl + "/sites/pub"
$publishingSiteDisplayName = "Module WCM - Pub Site"
$publishingSiteTemplate = "BLANKINTERNETCONTAINER#0"
$publishingSiteOwner = "WINGTIP\Administrator" 

$publishingSite = Get-SPSite | Where-Object {$_.Url -eq $publishingSiteUrl}
if ($publishingSite -ne $null) {
  Write-Host " - deleting existing site collection at $publishingSiteUrl..." -ForegroundColor Red
  Remove-SPSite -Identity $publishingSite -Confirm:$false
}


Write-Host " - creating publishing site at $publishingSiteUrl..." -ForegroundColor Green
$publishingSite = New-SPSite -URL $publishingSiteUrl `
                             -Name $publishingSiteDisplayName `
                             -Template $publishingSiteTemplate `
                             -OwnerAlias $publishingSiteOwner

Write-Host " - publishing site created at $publishingSiteUrl" -ForegroundColor Yellow
Write-Host " - launching site in Internet Explorer..." -ForegroundColor Yellow
Start iexplore $publishingSiteUrl

Write-Host 
Write-Host 
Write-Host "This setup script has completed. It is now safe to close this window." -ForegroundColor White
Read-Host "Press any key to continue..."