"use strict"

var Wingtip = window.Wingtip || {};

Wingtip.Customers = Wingtip.Customers || {};

Wingtip.Customers.DataAccess = function () {

  var getCustomers = function () {
    // TODO: snippet01_Wingtip.Customers.DataAccess.getCustomers.txt
  };

  var requestDigest;

  var initialize = function () {
    // TODO: snippet03_Wingtip.Customers.DataAccess.initialize.txt
  }

  var addCustomer = function (FirstName, LastName, Company, WorkPhone, HomePhone, Email) {
    // TODO: snippet 04
  };

  var deleteCustomer = function (Id) {
    // TODO: snippet 06
  };

  var getCustomer = function (Id) {
    // TODO: snippet08
  }

  var updateCustomer = function (Id, FirstName, LastName, Company, WorkPhone, HomePhone, Email, ETag) {
    // TODO: snippet 10    
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