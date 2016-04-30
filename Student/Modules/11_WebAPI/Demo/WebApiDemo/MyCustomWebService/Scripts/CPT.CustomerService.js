/// <reference path="jstree.js" />
/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />

var CPT = window.CPT || {};

CPT.CustomerService = function () {

  var baseUri = "https://localhost:44311/";

  var getCustomers = function () {
    var restUri = baseUri + "odata/Customers/?" +
                              "$inlinecount=AllPages" + 
                              "&$orderby=LastName,FirstName" +
                              "&$top=12";
    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  var getCustomersPage = function (page) {

    var startingRow = ((page - 1) * 12);


    var restUri = baseUri + "odata/Customers/?" +
                              "&$orderby=LastName,FirstName" +
                              "&$skip=" + startingRow + "&$top=12";
    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };


  return {
    getCustomers: getCustomers,
    getCustomersPage: getCustomersPage
  };

}();