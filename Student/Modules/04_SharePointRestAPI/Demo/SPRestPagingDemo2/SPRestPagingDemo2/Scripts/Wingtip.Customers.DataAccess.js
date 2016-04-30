"use strict"

var Wingtip = window.Wingtip || {};

Wingtip.Customers = Wingtip.Customers || {};

Wingtip.Customers.DataAccess = function () {

  var nextRequestUrl;

  var getNextCustomersPage = function () {

    var requestUri = nextRequestUrl;


    if (typeof nextRequestUrl === "undefined") {
      // parse target URI for customer list in app web
      var requestUri = "../_api/web/lists/getByTitle('Customers')/items" +
                       "?$select=ID,FirstName,Title,Company,WorkPhone,HomePhone,Email" +
                       "&$orderby=Title, FirstName" +
                       "&$top=20";
    }
    
    
    var deferred = $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

    deferred.then(function (data) {
      nextRequestUrl = data.d.__next;
    });

    return deferred;

  };



  // public interface
  return {
    getNextCustomersPage: getNextCustomersPage
  };

}();
