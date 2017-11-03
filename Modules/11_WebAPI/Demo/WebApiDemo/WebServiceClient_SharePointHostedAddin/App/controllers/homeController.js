'use strict';

(function () {

  var app = angular.module('WebServiceClient_Angular');

  app.controller('homeController', homeController );

  function homeController($scope, wingtipCrmService) {
    wingtipCrmService.getCustomers().success(function (data) {
      $scope.customers = data.value;
      $scope.deleteCustomer = function (id) {
        wingtipCrmService.deleteCustomer(id).success(function (data) {
          $scope.$apply();
        });
      }
    });
  }

})();