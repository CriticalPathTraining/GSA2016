Add-PSSnapin Microsoft.SharePoint.PowerShell


$ContentSources = Get-SPEnterpriseSearchCrawlContentSource -SearchApplication “Search Service Application” 

$ContentSources | ForEach-Object {

  if ($_.CrawlStatus -ne “Idle”) {
    Write-Host “Stopping currently running crawl for content source $($_.Name)…”
    $_.StopCrawl()
    do { Start-Sleep -Seconds 1 }
        while ($_.CrawlStatus -ne “Idle”)
  }

  Write-Host “Starting full crawl for content source $($_.Name)…”
  $_.StartFullCrawl()
  do { 
    Write-Host -NoNewline "."
    Start-Sleep -Seconds 5 
  } while ($_.CrawlStatus -ne “Idle”)
  Write-Host
  Write-Host “Full crawl completed for content source $($_.Name)…”
}
