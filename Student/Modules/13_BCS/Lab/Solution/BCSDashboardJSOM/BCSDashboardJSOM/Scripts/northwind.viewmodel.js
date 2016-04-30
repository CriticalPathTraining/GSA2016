"use strict";

var Northwind = window.Northwind || {};

// Object for holding a category instance
Northwind.Category = function (id, name) {

    var categoryId = id,
        get_categoryId = function () { return categoryId; },
        set_categoryId = function (v) { categoryId = v; },
        categoryName = name,
        get_categoryName = function () { return categoryName; },
        set_categoryName = function (v) { categoryName = v; };

    return {
        get_categoryName: get_categoryName,
        set_categoryName: set_categoryName,
        get_categoryId: get_categoryId,
        set_categoryId: set_categoryId
    }

}

// Object for holding a category sales figure instance
Northwind.CategorySale = function (name, value) {

    var saleValue = value,
        get_saleValue = function () { return saleValue; },
        set_saleValue = function (v) { saleValue = v; },
        categoryName = name,
        get_categoryName = function () { return categoryName; },
        set_categoryName = function (v) { categoryName = v; };

    return {
        get_categoryName: get_categoryName,
        set_categoryName: set_categoryName,
        get_saleValue: get_saleValue,
        set_saleValue: set_saleValue
    }

}

// The view model for the list of available categories
Northwind.CategoryViewModel = function () {

    var categories = ko.observableArray(),

        //categories is an observable array
        get_categories = function () { return categories; },

        //loads the observable array from the external list
        load = function () {
            var query = new Northwind.Query();

            //Initialize with the ECT model metadata
            query.init("NorthwindModel",
                     "Categories",
                     "NorthwindTraders",
                     "ReadAllCategory");

            // Get the LobSystemInstances
            query.getLobSystemInstances().then(

                // Success getLobSystemInstances
                function () {

                    //Get the filters
                    query.getFilters(this.collection).then(

                    // Success getFilters
                    function () {

                        //Execute the finder
                        query.executeFinder(this.collection, null).then(

                             // Success executeFinder
                             function () {

                                 categories.removeAll();

                                 // Load available categories for the dashboard
                                 for (var i = 0; i < this.collection.get_count() ; i++) {
                                     var entityInstance = this.collection.get_item(i);
                                     var fields = entityInstance.get_fieldValues();
                                     categories.push(new Northwind.Category(
                                         fields.CategoryID,
                                         fields.CategoryName));
                                 }
                             },

                             // failure executeFinder
                             function (args) {
                                 alert("Error: " + args.get_message());
                             });
                    },

                    // failure getFilters
                    function (args) {
                        alert("Error: " + args.get_message());
                    });
                },

                // failure getLobSystemInstances
                function (args) {
                    alert("Error: " + args.get_message());
                });
        };

    return {
        load: load,
        get_categories: get_categories
    }

}();

// The view model for category sales figures
Northwind.CategorySalesViewModel = function () {

    // Category Sales are an observable array so that the
    // dashboard will update when the category selections are changed
    var categorySales = ko.observableArray(),

        get_categorySales = function () { return categorySales; },

        // Allows for removing a category when it is unchecked
        // This will update the observable array and the web page
        remove_categorySale = function (categoryName) {
            var categorySale = ko.utils.arrayFirst(categorySales(), function (currentCategorySale) {
                return currentCategorySale.get_categoryName() === categoryName;
            });
            if (categorySale) {
                categorySales.remove(categorySale);
            }
        },

        // Hold any previous queries so they do not have to be run again
        // This implements a simple caching mechanism for the list data
        deferreds = [],

        // Loads the sales figures for a given category
        load = function (categoryName) {

            var query = new Northwind.Query();
            query.init("NorthwindModel",
                                    "Category_Sales_for_1997",
                                    "NorthwindTraders",
                                    "ReadAllCategory_Sales_for_1997");

            //Get the LobSystemInstances
            query.getLobSystemInstances().then(

                // Success getLobSystemInstances
                function () {

                    //Get the filters
                    query.getFilters(this.collection).then(

                    // Success getFilters
                    function () {

                        // Execute the finder method
                        query.executeFinder(this.collection, categoryName).then(

                             // Success executeFinder
                             function () {

                                 for (var i = 0; i < this.collection.get_count() ; i++) {
                                     var entityInstance = this.collection.get_item(i);
                                     var fields = entityInstance.get_fieldValues();
                                     categorySales.push(new Northwind.CategorySale(
                                         fields.CategoryName,
                                         Northwind.Utilities.formatCurrency(fields.CategorySales)));
                                 }
                             },

                             //failure executeFinder
                             function (args) {
                                 alert("Error: " + args.get_message());
                             });
                    },

                    //failure getFilters
                    function (args) {
                        alert("Error: " + args.get_message());
                    });
                },

                //failure getLobSystemInstances
                function (args) {
                    alert("Error: " + args.get_message());
                });
        };

    return {
        load: load,
        get_categorySales: get_categorySales,
        remove_categorySale: remove_categorySale
    }

}();

//Just a utility for formating the sales figures
Northwind.Utilities = function () {

    var formatCurrency = function (amount) {
        var i = parseFloat(amount);
        if (isNaN(i)) { i = 0.00; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        var s = new String(i);
        if (s.indexOf('.') < 0) { s += '.00'; }
        if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + s;
        s = "$" + formatCommas(s);
        return s;
    },

    formatCommas = function (amount) {
        var delimiter = ",";
        amount = new String(amount);
        var a = amount.split('.', 2)
        var d = a[1];
        var i = parseInt(a[0]);
        if (isNaN(i)) { return ''; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while (n.length > 3) {
            var nn = n.substr(n.length - 3);
            a.unshift(nn);
            n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if (d.length < 1) { amount = n; }
        else { amount = n + '.' + d; }
        amount = minus + amount;
        return amount;
    };

    return {
        formatCurrency: formatCurrency
    }

}();