$makecert = "C:\Program Files\Microsoft Office Servers\15.0\Tools\makecert.exe"
$certmgr = "C:\Program Files\Microsoft Office Servers\15.0\Tools\certmgr.exe"

# specify subject for SSL certificate
$subject = "searchapp.wingtip.com"

# create output directory to create SSL certificate file
$outputDirectory = "c:\Certs\"
New-Item $outputDirectory -ItemType Directory -Force -Confirm:$false | Out-Null

# create file name for SSL certificate files
$publicCertificatePath  =  $outputDirectory + $subject + ".cer"
$privateCertificatePath = $outputDirectory + $subject + ".pfx"

Write-Host 
Write-Host "Creating .cer certificate file..."
& $makecert -r -pe -n "CN=$subject" -b 01/01/2012 -e 01/01/2022 -eku 1.3.6.1.5.5.7.3.1 -ss my -sr localMachine -sky exchange -sp "Microsoft RSA SChannel Cryptographic Provider" -sy 12 $publicCertificatePath

Write-Host 
Write-Host "Registering certificate with IIS..."
& $certmgr /add $publicCertificatePath /s /r localMachine root