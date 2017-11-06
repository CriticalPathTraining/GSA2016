'use strict';

(function () {

  var app = angular.module('AngularCRM');

  app.controller('viewController', viewController);

  function viewController($scope, $routeParams, wingtipCrmService) {
    var id = $routeParams.id;
    wingtipCrmService.getCustomer(id).then(function (data) {
      $scope.customer = data.d;
    });
  }

})();