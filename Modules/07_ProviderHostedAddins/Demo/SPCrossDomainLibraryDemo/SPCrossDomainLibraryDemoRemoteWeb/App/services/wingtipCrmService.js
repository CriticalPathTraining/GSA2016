/// <reference path="C:\DemosOffice365\SPCrossDomainLibraryDemo\SPCrossDomainLibraryDemoRemoteWeb\Scripts/SP.RequestExecutor.js" />

'use strict';

(function () {

  var app = angular.module('AngularCRM');

  app.factory("wingtipCrmService", createServiceObject);

  function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
      var singleParam = params[i].split("=");
      if (singleParam[0] == paramToRetrieve)
        return singleParam[1];
    }
  }

  function createServiceObject($http, $q) {

    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    appweburl = appweburl.replace("#", "");

    var executor = new SP.RequestExecutor(appweburl);

    // create service object
    var service = {};

    // get request digest for updates
    var requestDigest;
    executor.executeAsync({
      url: appweburl + "_api/contextinfo",
      method: "POST",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data, textStatus, xhr) {
        var odata = JSON.parse(data.body);
        requestDigest = odata.d.GetContextWebInformation.FormDigestValue;
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("Error getting Form Digest: " + JSON.stringify(xhr));
      }
    });

    service.getCustomers = function () {
      var deferred = $q.defer();
      var restQueryUrl = appweburl +
                         "_api/web/lists/getByTitle('Customers')/items/" +
                         "?$select=ID,Title,FirstName,WorkPhone,HomePhone,Email";

      executor.executeAsync({
        url: restQueryUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data, textStatus, xhr) {
          deferred.resolve(JSON.parse(data.body));
        },
        error: function (xhr, textStatus, errorThrown) {
          deferred.reject(JSON.stringify(xhr));
        }
      });
      return deferred.promise;
    }

    service.getCustomer = function (id) {
  
      var deferred = $q.defer();

      var restQueryUrl = appweburl +
                         "_api/web/lists/getByTitle('Customers')/items(" + id + ")/" +
                         "?$select=ID,Title,FirstName,WorkPhone,HomePhone,Email";

      executor.executeAsync({
        url: restQueryUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data, textStatus, xhr) {
          deferred.resolve(JSON.parse(data.body));
        },
        error: function (xhr, textStatus, errorThrown) {
          deferred.reject(JSON.stringify(xhr));
        }
      });
      return deferred.promise;
    }

    service.deleteCustomer = function (id) {

      var deferred = $q.defer();

      var restQueryUrl = appweburl + "_api/web/lists/getByTitle('Customers')/items(" + id + ")";

      executor.executeAsync({
        url: restQueryUrl,
        method: "POST",
        headers: {
          "X-HTTP-METHOD": "DELETE",
          "Accept": "application/json; odata=verbose",
          "X-RequestDigest": requestDigest,
          "If-Match": "*"
        },
        success: function (data, textStatus, xhr) {
          deferred.resolve();
        },
        error: function (xhr, textStatus, errorThrown) {
          deferred.reject(JSON.stringify(xhr));
        }
      });
      return deferred.promise;
    }

    service.addCustomer = function (FirstName, LastName, WorkPhone, HomePhone, Email) {

      var deferred = $q.defer();

      var restQueryUrl = appweburl + "_api/web/lists/getByTitle('Customers')/items";

      var customerData = {
        __metadata: { "type": "SP.Data.CustomersListItem" },
        Title: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        Email: Email
      };

      var requestBody = JSON.stringify(customerData);

      executor.executeAsync({
        url: restQueryUrl,
        method: "POST",
        headers: {
          "Accept": "application/json; odata=verbose",
          "Content-Type": "application/json; odata=verbose",
          "X-RequestDigest": requestDigest,
          "If-Match": "*"
        },
        body: requestBody,
        success: function (data, textStatus, xhr) {
          deferred.resolve(JSON.parse(data.body));
        },
        error: function (xhr, textStatus, errorThrown) {
          deferred.reject(JSON.stringify(xhr));
        }
      });

      return deferred.promise;

    }

    service.updateCustomer = function (id, FirstName, LastName, WorkPhone, HomePhone, Email, etag) {

      var deferred = $q.defer();

      var restQueryUrl = appweburl + "_api/web/lists/getByTitle('Customers')/items(" + id + ")";

      var customerData = {
        __metadata: { "type": "SP.Data.CustomersListItem" },
        Title: LastName,
        FirstName: FirstName,
        WorkPhone: WorkPhone,
        HomePhone: HomePhone,
        Email: Email
      };

      var requestBody = JSON.stringify(customerData);

      executor.executeAsync({
        url: restQueryUrl,
        method: "POST",
        headers: {
          "X-HTTP-METHOD": "PATCH",
          "Accept": "application/json; odata=verbose",
          "Content-Type": "application/json; odata=verbose",
          "X-RequestDigest": requestDigest,
          "If-Match": etag
        },
        body: requestBody,
        success: function (data, textStatus, xhr) {
          deferred.resolve();
        },
        error: function (xhr, textStatus, errorThrown) {
          deferred.reject(JSON.stringify(xhr));
        }
      });

      return deferred.promise;

    }

    // return service object to angular framework
    return service;
  }

})();

