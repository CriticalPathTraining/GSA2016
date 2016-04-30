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
$customAction = $customActions.Add();
$customAction.Sequence = 0;
$customAction.Description = "ScriptLinkController";
$customAction.Location = "ScriptLink";
$customAction.ScriptBlock = "

  CDNManager.getScript('angular.min.js',function() {

     angular.module('myApp',[]).controller('myCtrl', ['$scope', '$http', function myCtrl($scope, $http) {
         
       $scope.fullName ="";
       $scope.showWelcome = false;

        $http({
            url: '../_api/web/currentUser',
            params: {
                '$select': 'Title'
            },
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        }).then( function (json) {         
             $scope.fullName = json.data.Title;
             console.log(json.data.Title);
        }).catch( function (err) {
            alert(err.statusText);
        }).finally( function () {
            $scope.showWelcome = true
        });;
         
     }]);
    
  });
"
$customAction.Update();
$ctx.ExecuteQuery();


