Add-PSSnapin Microsoft.SharePoint.PowerShell

$webapp = Get-SPWebApplication -Identity "http://WingtipServer"
$siteDomain = "testsite.wingtip.com"
$siteUrl = "https://testsite.wingtip.com"
$siteTitle  = "My Other Test Site"
$siteAdmin = "Wingtip\Administrator"
$siteTemplate = "STS#0"

# delete current site if it already exists
$site = Get-SPSite | Where-Object {$_.Url -eq $siteUrl}
if ($site -ne $null) {
  Write-Host "Deleting existing site collection at $url..." -ForegroundColor Red
  Remove-SPSite -Identity $site -Confirm:$false
}

# create new site at target URL
$site = New-SPSite -HostHeaderWebApplication $webapp `
                   -Url $siteUrl `
                   -Name $siteTitle `
                   -OwnerAlias $siteAdmin `
                   -Template $siteTemplate

Write-Host "Site collection created at $site.Url" -ForegroundColor Green

# configure contributor site permissions for all domain users
$account = $site.RootWeb.EnsureUser(" WINGTIP\domain users")
$role = $site.RootWeb.RoleDefinitions["Contribute"] 
$assignment = New-Object Microsoft.SharePoint.SPRoleAssignment($account)
$assignment.RoleDefinitionBindings.Add($role)
$site.RootWeb.RoleAssignments.Add($assignment)

# add entry to HOST file to site URL for Visual Studio development
$hostsFilePath = "c:\Windows\System32\Drivers\etc\hosts"
$hostFileEntry = "127.0.0.1     $siteDomain"
Add-Content -Path $hostsFilePath -Value "`r`n$hostFileEntry"


# launch Internet Explorer and navigate to new site
Start iexplore $siteUrl