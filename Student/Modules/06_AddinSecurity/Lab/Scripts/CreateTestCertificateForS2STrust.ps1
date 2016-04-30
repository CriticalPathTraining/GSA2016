CLS 

# create variable to call to makecert.exe command-line utility
$makecert =  $PSScriptRoot + "\makecert.exe"

$certname = "WingtipAppCertificate01"
$password = ConvertTo-SecureString "Password1" -AsPlainText -Force
$startdate = (Get-Date).ToString("MM/dd/yyyy")
$enddate =  ((Get-Date).AddYears(2)).ToString("MM/dd/yyyy")

# delete any pre-existing certifcates with same name
Get-ChildItem Cert:\CurrentUser\My | ? {$_.Subject -eq "CN=$certname"} | Remove-Item

Write-Host "Creating new x509 Certificate with subject name of $certname"
$silentResult = & $MakeCert -r -pe -n "CN=$certname" -b $startdate -e $enddate -ss my -eku 1.3.6.1.5.5.7.3.1 -sky exchange -sp "Microsoft RSA SChannel Cryptographic Provider" -sy 12

$cert = Get-ChildItem Cert:\CurrentUser\My | ? {$_.Subject -eq "CN=$certname"}


# create local directory to export SSL certificate files
$outputDirectory = "c:\Certs\"
New-Item $outputDirectory -ItemType Directory -Force -Confirm:$false | Out-Null

$publicCertificatePath  =  $outputDirectory + $certname + ".cer"
Write-Host "Exporting public key to $publicCertificatePath"
$result = Export-Certificate -Type CERT -FilePath $publicCertificatePath -Cert $cert -Force

$privateCertificatePath = $outputDirectory + $certname + ".pfx"
Write-Host "Exporting password-protected private key to $privateCertificatePath "
$result = Export-PfxCertificate -FilePath $privateCertificatePath -Cert $cert -Password $password -Force

