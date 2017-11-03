cls

Add-PSSnapin "Microsoft.SharePoint.PowerShell"

$issuerID = "11111111-1111-1111-1111-111111111111"

# remove any pre-esisting with the same issuer ID
Get-SPTrustedSecurityTokenIssuer | where {$_.Name -eq $issuerID } | Remove-SPTrustedSecurityTokenIssuer -Confirm:$false

# get GUID for current SharePoint tenancy
$targetSiteUrl = "http://wingtipserver"
$targetSite = Get-SPSite $targetSiteUrl
$realm = Get-SPAuthenticationRealm -ServiceContext $targetSite

# parse together RegisteredIssuerName value
$registeredIssuerName = $issuerID + '@' + $realm


$publicCertificatePath = "C:\Certs\WingtipAppCertificate01.cer"
$publicCertificate = Get-PfxCertificate $publicCertificatePath

Write-Host 
Write-Host "Using .cer file to register certificate as root authority with local SharePoint farm"
# this is new requirement for SharePoint 2016 - not required in sharePoint 2013
$silentResult = New-SPTrustedRootAuthority -Name "WingtipAppCertificate01" -Certificate $publicCertificate 

Write-Host 
Write-Host "Using .cer file to register trusted token issuer in local SharePoint farm"
$secureTokenIssuer = New-SPTrustedSecurityTokenIssuer `
                     -Name $issuerID `
                     -RegisteredIssuerName $registeredIssuerName `
                     -Certificate $publicCertificate `
                     -IsTrustBroker

$secureTokenIssuer | Format-List Id, Name, RegisteredIssuerName
$secureTokenIssuer  | Format-List Id, Name, RegisteredIssuerName, SigningCertificate | Out-File -FilePath "SecureTokenIssuer.txt"


# configure SharePoint to suppport S2S Trusts with HTTP in addition to HTTPS
$serviceConfig = Get-SPSecurityTokenServiceConfig
$serviceConfig.AllowOAuthOverHttp = $true
$serviceConfig.Update()

Write-Host "All done..."