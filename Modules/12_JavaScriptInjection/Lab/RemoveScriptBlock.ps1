$siteurl = Read-Host 'Site Url'
$username = Read-Host "User Name"
$password = Read-Host -AsSecureString 'Password'

$programFiles = [environment]::getfolderpath("programfiles")
add-type -Path $programFiles'\SharePoint Online Management Shell\Microsoft.Online.SharePoint.PowerShell\Microsoft.SharePoint.Client.dll'
add-type -Path $programFiles'\SharePoint Online Management Shell\Microsoft.Online.SharePoint.PowerShell\Microsoft.SharePoint.Client.Runtime.dll'


$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($siteurl)
$creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($username, $password)
$ctx.Credentials = $creds

$web = $ctx.Web;
$customActions = $web.UserCustomActions;
$ctx.load($customActions);   
$ctx.ExecuteQuery();

foreach($customAction in $customActions){
    if ($customAction.Description -eq "ScriptLinkController"){
        $customAction.DeleteObject();
    }
}
$ctx.ExecuteQuery();

