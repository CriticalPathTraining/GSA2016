"use strict"

var Wingtip = window.Wingtip || {};

Wingtip.Customers = Wingtip.Customers || {};

Wingtip.Customers.DataAccess = function () {

  var requestDigest;

  var initialize = function () {

    var deferred = $.ajax({
      url: "../_api/contextinfo",
      type: "POST",
      headers: { "accept": "application/json;odata=verbose" }
    })

    deferred.then(function (data) {
      requestDigest = data.d.GetContextWebInformation.FormDigestValue      
    });

  }

  var getCustomers = function () {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items" +
                     "?$select=ID,FirstName,Title,Company,WorkPhone,HomePhone,Email" +
                     "&$orderby=Title,FirstName";

    // send call across network
    return $.ajax({
      url: requestUri,
      headers: { "accept": "application/json;odata=verbose" }
    });

    getRequestDigest();

  };

  var getCustomer = function (Id) {

    // begin work to call across network
    var requestUri = "../_api/web/lists/getByTitle('Customers')/items(" + Id + ")";


    return $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: { "accept": "application/json;odata=verbose" }
    });

  }

  var addCustomer = function (FirstName, LastName, Company, WorkPhone, HomePhone, Email) {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": requestDigest
    }

    var customerData = {
      __metadata: { "type": "SP.Data.CustomersListItem" },
      Title: LastName,
      FirstName: FirstName,
      Company: Company,
      WorkPhone: WorkPhone,
      HomePhone: HomePhone,
      Email: Email
    };

    var requestBody = JSON.stringify(customerData);

    return $.ajax({
      url: requestUri,
      type: "POST",
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      data: requestBody,
    });

  };

  var updateCustomer = function (Id, FirstName, LastName, Company, WorkPhone, HomePhone, Email, ETag) {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items(" + Id + ")";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-HTTP-Method": "MERGE",
      "X-RequestDigest": requestDigest,
      "If-Match": ETag
    }

    var customerData = {
      __metadata: { "type": "SP.Data.CustomersListItem" },
      Title: LastName,
      FirstName: FirstName,
      Company: Company,
      WorkPhone: WorkPhone,
      HomePhone: HomePhone,
      Email: Email
    };

    var requestBody = JSON.stringify(customerData);

    return $.ajax({
      url: requestUri,
      type: "POST",
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      data: requestBody,
    });

  };

  var deleteCustomer = function (Id) {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items(" + Id + ")";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": requestDigest,
      "If-Match": "*"
    }

    return $.ajax({
      url: requestUri,
      type: "DELETE",
      headers: requestHeaders,
    });

  };

  // public interface
  return {
    initialize: initialize,
    getCustomers: getCustomers,
    addCustomer: addCustomer,
    getCustomer: getCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
  };

}();