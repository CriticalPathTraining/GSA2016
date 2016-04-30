'use strict';

(function () {

  var app = angular.module('WebServiceClient_Angular');

  app.factory("wingtipCrmService", createServiceObject);

  function createServiceObject($http) {
    // create service object
    var service = {};

    var baseUri = "https://localhost:44311/odata/";

    $http.defaults.useXDomain = true;

    service.getCustomers = function () {
      var restQueryUrl = baseUri + "Customers/";
      return $http({
        method: 'GET',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      })
    }

    service.getCustomersStartingWith = function (letters) {

      var restQueryUrl = baseUri + "Customers/?$orderby=LastName,FirstName";
      var letterFilters = letters.split(',');
      if(letterFilters.length > 0){
        restQueryUrl + "&$filter="  
        for (var i = 0; i < letterFilters.length; i++) {
          if (i == 0) {
            restQueryUrl = restQueryUrl + "&$filter=startswith(LastName, '" + letterFilters[i] + "')";
          }
          else {
            restQueryUrl = restQueryUrl + " or startswith(LastName, '" + letterFilters[i] + "')";
          }
        }
      }

      return $http({
        method: 'GET',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      })
    }

    service.getCustomer = function (id) {
      var restQueryUrl = baseUri + "Customers(" + id + ")/";
      return $http({
        method: 'GET',
        url: restQueryUrl,
        headers: { "Accept": "application/json" }
      })
    }

    service.deleteCustomer = function (id) {
      var restQueryUrl = baseUri + "Customers(" + id + ")/";
      return $http({
        method: 'DELETE',
        url: restQueryUrl,
        headers: {
          "Accept": "application/json",
        }
      });
    }

    service.addCustomer = function (FirstName, LastName, WorkPhone, HomePhone, Email) {
      var restQueryUrl = baseUri + "Customers/";

      var customerData = {
        LastName: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        Email: Email
      };

      var requestBody = JSON.stringify(customerData);

      return $http({
        method: 'POST',
        url: restQueryUrl,
        data: requestBody,
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        }
      });
    }

    service.updateCustomer = function (id, FirstName, LastName, WorkPhone, HomePhone, Email) {
      var restQueryUrl = baseUri + "Customers(" + id + ")";

      var customerData = {
        LastName: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        Email: Email
      };

      var requestBody = JSON.stringify(customerData);

      return $http({
        method: 'PATCH',
        url: restQueryUrl,
        contentType: "application/json",
        data: requestBody,
        headers: {
          "Accept": "application/json",
          "content-type": "application/json",
        }
      });
    }

    // return service object to angular framework
    return service;
  }

})();

