Add-PSSnapin Microsoft.SharePoint.PowerShell

$contentService = [Microsoft.SharePoint.Administration.SPWebService]::ContentService
$dashboardSettings = $contentService.DeveloperDashboardSettings

if ($dashboardSettings.DisplayLevel -eq "OnDemand"){
  # developer dashboard is on - turn it off
  $dashboardSettings.DisplayLevel = "Off"
  $dashboardSettings.Update()
  Write-Host "Developer dashboard disabled." -ForegroundColor Gray
} else {
  # developer dashboard is off - turn it on
  $dashboardSettings.DisplayLevel = "OnDemand"
  $dashboardSettings.Update()
  Write-Host "Developer dashboard enabled." -ForegroundColor Gray
}


