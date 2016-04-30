"use strict"

var Wingtip = window.Wingtip || {};

Wingtip.Customers = Wingtip.Customers || {};

Wingtip.Customers.DataAccess = function () {

  var getCustomers = function () {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items" +
                     "?$select=ID,FirstName,Title,Company,WorkPhone,HomePhone,Email" +
                     "&$orderby=Title,FirstName";

    return $.ajax({
      url: requestUri,
      type:"GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

  };

  var getCustomer = function (Id) {

    var requestUri = "../_api/web/lists/getByTitle('Customers')/items(" + Id + ")";

    return $.ajax({
      url: requestUri,
      type:"GET",
      contentType: "application/json;odata=verbose",
      headers: { "accept": "application/json;odata=verbose" },
    });

  }
  
  // public interface
  return {
    getCustomers: getCustomers
  };

}();
