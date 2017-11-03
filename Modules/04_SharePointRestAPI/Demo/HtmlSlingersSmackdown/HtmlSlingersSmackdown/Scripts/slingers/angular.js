'use strict';

/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />

var customerScope;

function customersController($scope) {
  $scope.status = "I am as happy as a clam";
  $scope.customers = [];
  Wingtip.Customers.DataAccess.getCustomers().then(onGetCustomersComplete, onError);
  customerScope = $scope;
}

function onGetCustomersComplete(data) {
  var customers = data.d.results;
  customerScope.customers = customers;
  customerScope.$apply();
}

function onError(error) {
  $("#content_box").text("Error on angular.js")
}
