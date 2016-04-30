"use strict";

var Northwind = window.Northwind || {};

$(document).ready(function () {

    //Event handler
    $("input").live("click", function (e) {
        if ($(this).attr("type") === "checkbox") {
            if ($(this).attr("checked") === "checked") {
                Northwind.CategorySalesViewModel.load($(this).siblings().first().text());
            }
            else {
                Northwind.CategorySalesViewModel.remove_categorySale($(this).siblings().first().text());
            }
        }
    });

    //View Model bindings
    Northwind.CategoryViewModel.load();
    ko.applyBindings(Northwind.CategoryViewModel, $get("categoryList"))
    ko.applyBindings(Northwind.CategorySalesViewModel, $get("salesTableBody"))
});