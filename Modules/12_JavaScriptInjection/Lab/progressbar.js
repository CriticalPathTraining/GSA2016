(function () {
    var overrideCtx = {};
    overrideCtx.Templates = {};

    overrideCtx.Templates.Fields = {
        'PercentComplete': { 'View': '<div class="progress" data-toggle="tooltip" data-placement="right" title="<#=ctx.CurrentItem.PercentComplete.replace(" %", "")#>%"><div class="progress-bar" role="progressbar" aria-valuenow="<#=ctx.CurrentItem.PercentComplete.replace(" %", "")#>" aria-valuemin="0" aria-valuemax="100" style="width: <#=ctx.CurrentItem.PercentComplete.replace(" %", "")#>%;"></div></div>' }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();


if (typeof (_spBodyOnLoadCalled) === 'undefined' || _spBodyOnLoadCalled) {
    load();
}
else {
    _spBodyOnLoadFunctions.push(load);
}

function load() {

    CDNManager.getScript(['angular.min.js', 'jquery-1.11.2.min.js', 'bootstrap.min.js'], function () {

     angular.module('myApp',[]).controller('myCtrl', ['$scope', '$http', function myCtrl($scope, $http) {
         
       $scope.fullName ="";
       $scope.showWelcome = false;

        $http({
            url: "../_api/web/currentUser",
            params: {
                "$select": "Title"
            },
            method: "GET",
            headers: {
                "accept": "application/json"
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

};





