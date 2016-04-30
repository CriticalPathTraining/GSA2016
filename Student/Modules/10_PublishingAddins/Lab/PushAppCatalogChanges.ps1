Add-PSSnapin Microsoft.SharePoint.PowerShell

# propagate update messahe as soon as possible
Set-SPInternalAppStateUpdateInterval -AppStateSyncHours 0


$TimerJob1 =  Get-SPTimerJob | where { $_.DisplayName -eq 'App Installation Service' } 
$TimerJob2 =  Get-SPTimerJob | where { $_.DisplayName -eq 'App State Update' } 
$TimerJob3 =  Get-SPTimerJob | where { $_.DisplayName -eq 'Internal App State Update' } 


$TimerJob1 | Start-SPTimerJob
$TimerJob2 | Start-SPTimerJob
$TimerJob3 | Start-SPTimerJob