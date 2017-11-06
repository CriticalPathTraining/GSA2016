/// <reference path="C:\Student\Modules\WebApi\Lab\WingtipCRMService\WingtipCRMAngularClient\Scripts/angular.js" />
'use strict';

(function () {

  var app = angular.module('AngularCRM');

  app.factory("wingtipCrmService", createServiceObject);

  function createServiceObject($http) {
    // create service object
    var service = {};

    var baseUri = "https://localhost:44377/odata/";

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    service.getCustomers = function () {
      var restQueryUrl = baseUri + "Customers/?$select=ID,FirstName,LastName,WorkPhone,HomePhone,EmailAddress";
      return $http({
        method: 'GET',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      })
    }

    service.getCustomer = function (id) {
      var restQueryUrl = baseUri + "Customers(" + id + ")/" +
                         "?$select=ID,FirstName,LastName,WorkPhone,HomePhone,EmailAddress";
      return $http({
        method: 'GET',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      })
    }

    service.deleteCustomer = function (id) {
      var restQueryUrl = baseUri + "Customers(" + id + ")";
      return $http({
        method: 'DELETE',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      });
    }

    service.addCustomer = function (FirstName, LastName, WorkPhone, HomePhone, EmailAddress) {
      var restQueryUrl = baseUri + "Customers/";

      var customerData = {
        LastName: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        EmailAddress: EmailAddress
      };

      var requestBody = JSON.stringify(customerData);

      return $http({
        method: 'POST',
        url: restQueryUrl,
        contentType: "application/json",
        data: requestBody,
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        }
      });
    }

    service.updateCustomer = function (id, FirstName, LastName, WorkPhone, HomePhone, EmailAddress) {
      var restQueryUrl = baseUri + "Customers(" + id + ")";

      var customerData = {
        LastName: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        EmailAddress: EmailAddress
      };

      var requestBody = JSON.stringify(customerData);

      return $http({
        method: 'POST',
        url: restQueryUrl,
        contentType: "application/json",
        data: requestBody,
        headers: {
          "Accept": "application/json",
          "X-HTTP-METHOD": "PATCH"
        }
      });
    }

    // return service object to angular framework
    return service;
  }

})();

