'use strict';

(function () {

  var app = angular.module('CustomersAngularApp');

  app.controller('navbarController', navbarController);
  app.controller('homeController', homeController);
  app.controller('newController', newController);
  app.controller('viewController', viewController);
  app.controller('editController', editController);


  function navbarController($scope) {
    var path = document.location.href;
    var index = path.indexOf("/CPT/");
    $scope.hostWebUrl = path.substring(0, index);
  }

  function homeController($scope, customersListService) {
    customersListService.getCustomers().success(function (data) {
      $scope.customers = data.d.results;
      $scope.deleteCustomer = function (id) {
        customersListService.deleteCustomer(id).success(function (data) {
          $scope.$apply();
        });
      }
    });
  }
 
  function newController($scope, $location, customersListService) {

    $scope.customer = {};
    $scope.customer.FirstName = "";
    $scope.customer.Title = "";
    $scope.customer.WorkPhone = "";
    $scope.customer.HomePhone = "";
    $scope.customer.Email = "";

    $scope.addCustomer = function () {
      var firstName = $scope.customer.FirstName;
      var lastName = $scope.customer.Title;
      var workPhone = $scope.customer.WorkPhone;
      var homePhone = $scope.customer.HomePhone;
      var email = $scope.customer.Email;
      customersListService.addCustomer(firstName, lastName, workPhone, homePhone, email)
        .success(function (data) {
          $location.path("/");
        });
    }
  }

  function viewController($scope, $routeParams, customersListService) {
    var id = $routeParams.id;
    customersListService.getCustomer(id).success(function (data) {
      $scope.customer = data.d;
    });
  }

  function editController($scope, $routeParams, $location, customersListService) {
    var id = $routeParams.id;
    customersListService.getCustomer(id).success(function (data) {
      $scope.customer = data.d;
      $scope.updateCustomer = function () {
        var firstName = $scope.customer.FirstName;
        var lastName = $scope.customer.Title;
        var workPhone = $scope.customer.WorkPhone;
        var homePhone = $scope.customer.HomePhone;
        var email = $scope.customer.Email;
        var etag = $scope.customer.__metadata.etag;
        customersListService.updateCustomer(id, firstName, lastName, workPhone, homePhone, email, etag)
        .success(function (data) {
          $location.path("/");
        });
      }
    });
  }

})();