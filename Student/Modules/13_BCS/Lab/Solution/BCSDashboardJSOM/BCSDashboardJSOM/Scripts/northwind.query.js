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
            var ctx = SP.ClientContext.get_current();

            //Get the ECT
            ect = ctx.get_web().getAppBdcCatalog().getEntity(entityNamespace, entityName);
            ctx.load(ect);

            //Get the LobSystem
            lob = ect.getLobSystem();
            ctx.load(lob);

            //Save the LobSystemInstances as a property of the Deferred object
            deferredLobSystemInstances.collection = lob.getLobSystemInstances();

            ctx.load(deferredLobSystemInstances.collection);
            ctx.executeQueryAsync(onLobSystemInstancesSuccess, onLobSystemInstancesError);

            return deferredLobSystemInstances.promise();
        },

        onLobSystemInstancesSuccess = function () {
            deferredLobSystemInstances.resolve();
        },

        onLobSystemInstancesError = function (sender, args) {
            deferredLobSystemInstances.reject(args);
        },

        //get the filters for the finder method
        getFilters = function (lobSystemInstances) {
            var ctx = SP.ClientContext.get_current();

            //Get the LobSystemInstance and save it
            for (var i = 0; i < lobSystemInstances.get_count() ; i++) {
                if (lobSystemInstances.get_item(i).get_name() === lobSystemInstanceName) {
                    lobi = lobSystemInstances.get_item(i);
                    break;
                }
            }

            // Save the filter collection as a new property of the Deferred object
            deferredFilters.collection = ect.getFilters(methodInstanceName);
            ctx.load(deferredFilters.collection);

            ctx.executeQueryAsync(onGetFiltersSuccess, onGetFiltersError);

            return deferredFilters.promise();
        },

        onGetFiltersSuccess = function () {
            deferredFilters.resolve();
        },

        onGetFiltersError = function (sender, args) {
            deferredFilters.reject(args);
        },

        //Execute the Finder Method
        executeFinder = function (filters, filterValue) {
            var ctx = SP.ClientContext.get_current();

            //set the filter, if provided
            if (filterValue) {
                filters.setFilterValue("CategoryNameFilter", 0, filterValue);
            }

            //Execute the finder method with the specified filters
            //Save the results of the operation as a new property on the Deferred object
            deferredFinderResults.collection = ect.findFiltered(filters, methodInstanceName, lobi);
            ctx.load(deferredFinderResults.collection);

            ctx.executeQueryAsync(onExecuteFinderSuccess, onExecuteFinderError);

            return deferredFinderResults.promise();
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