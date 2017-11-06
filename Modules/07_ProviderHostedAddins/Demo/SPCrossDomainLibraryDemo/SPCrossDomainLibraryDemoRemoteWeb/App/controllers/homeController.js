'use strict';

(function () {

  var app = angular.module('AngularCRM');

  app.controller('homeController', homeController );

  function homeController($scope, wingtipCrmService) {
    wingtipCrmService.getCustomers().then(function (data) {
      $scope.customers = data.d.results;
      $scope.deleteCustomer = function (id) {
        wingtipCrmService.deleteCustomer(id).then(function (data) {
          $scope.$apply();
        });
      }
    });
  }

})();