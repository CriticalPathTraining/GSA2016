/// <reference path="breeze.min.js" />
/// <reference path="q.min.js" />
/// <reference path="knockout-2.3.0.js" />
/// <reference path="wingtip.customers.model.js" />

"use strict";

var Wingtip = window.Wingtip || {};
Wingtip.Crm = Wingtip.Crm || {};

Wingtip.Crm.ViewModel = function () {

    //TO DO: Update the service root
    var serviceRoot = "http://localhost:60982/"

    var customers = ko.observableArray();

    var getCustomers = function () { return customers };

    //create a cache of data
    var cache = null;;

    var refreshCache = function () {
        //TO DO: Edit refreshCache function
    };

    var loadCustomers = function () {
        //TO DO: Edit loadCustomers function
    };

    var onLoadCustomersComplete = function (data) {

        customers.destroyAll();

        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var customer = Wingtip.Crm.Model.create(
                                d.ID,
                                d.FirstName,
                                d.LastName,
                                d.Company,
                                d.EmailAddress,
                                d.WorkPhone,
                                d.HomePhone);
            customers.push(customer);
        }

    }

    var getCustomer = function (Id) {
        //TO DO: Edit getCustomer function
    }

    var addCustomer = function (FirstName, LastName, Company, EmailAddress, WorkPhone, HomePhone) {
        //TO DO: Edit addCustomer function
    };

    var updateCustomer = function (Id, FirstName, LastName, Company, EmailAddress, WorkPhone, HomePhone) {
        //TO DO: Edit updateCustomer function
    };

    var deleteCustomer = function (Id) {
        //TO DO: Edit deleteCustomer function
    };

    function onError(error) {
        alert("Error: " + JSON.stringify(error));
    }

    //public interface
    return {
        refreshCache: refreshCache,
        loadCustomers: loadCustomers,
        getCustomers: getCustomers,
        addCustomer: addCustomer,
        getCustomer: getCustomer,
        updateCustomer: updateCustomer,
        deleteCustomer: deleteCustomer
    };

}();