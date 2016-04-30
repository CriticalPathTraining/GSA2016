"use strict";

var Northwind = window.Northwind || {};

Northwind.Query = function () {

    // jQuery Deferred objects can be returned from asynchronous operations
    // They will be filled with data when the operation completes
    // This approach makes much neater JavaScript code
    var deferredLobSystemInstances = $.Deferred(),
        deferredFilters = $.Deferred(),
        deferredFinderResults = $.Deferred(),
        entityNamespace,
        entityName,
        lobSystemInstanceName,
        methodInstanceName,
        ect,
        lob,
        lobi,

        // Set the details for the ect to work with.
        // These can be obtained from the ECT model.
        init = function (namespace, entity, system, method) {

            entityNamespace = namespace;
            entityName = entity;
            lobSystemInstanceName = system;
            methodInstanceName = method;

        },

        //get LobSystemInstances
        getLobSystemInstances = function () {
            //Code goes here
        },

        onLobSystemInstancesSuccess = function () {
            deferredLobSystemInstances.resolve();
        },

        onLobSystemInstancesError = function (sender, args) {
            deferredLobSystemInstances.reject(args);
        },

        //get the filters for the finder method
        getFilters = function (lobSystemInstances) {
            //Code goes here
        },

        onGetFiltersSuccess = function () {
            deferredFilters.resolve();
        },

        onGetFiltersError = function (sender, args) {
            deferredFilters.reject(args);
        },

        //Execute the Finder Method
        executeFinder = function (filters, filterValue) {
            //Code goes here
        },

        onExecuteFinderSuccess = function () {
            deferredFinderResults.resolve();
        },

        onExecuteFinderError = function (sender, args) {
            deferredFinderResults.reject(args);
        };

    return {
        init: init,
        getLobSystemInstances: getLobSystemInstances,
        getFilters: getFilters,
        executeFinder: executeFinder
    }


};