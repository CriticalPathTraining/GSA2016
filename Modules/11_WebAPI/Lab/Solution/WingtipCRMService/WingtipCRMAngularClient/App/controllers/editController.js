﻿'use strict';

(function () {

  var app = angular.module('AngularCRM');

  app.controller('editController', editController);

  function editController($scope, $routeParams, $location, wingtipCrmService) {
    var id = $routeParams.id;
    wingtipCrmService.getCustomer(id).success(function (data) {
      $scope.customer = data;
      $scope.updateCustomer = function () {
        var firstName = $scope.customer.FirstName;
        var lastName = $scope.customer.Title;
        var workPhone = $scope.customer.WorkPhone;
        var homePhone = $scope.customer.HomePhone;
        var email = $scope.customer.EmailAddress;
        wingtipCrmService.updateCustomer(id, firstName, lastName, workPhone, homePhone, email)
        .success(function (data) {
          $location.path("#/");
        });
      }
    });
  }
})();