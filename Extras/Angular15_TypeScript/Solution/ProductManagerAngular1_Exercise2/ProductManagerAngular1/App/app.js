/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
var myApp;
(function (myApp) {
    var app = angular.module("myApp", ['ngRoute']);
    app.config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
            templateUrl: 'App/views/home.html',
            controller: "homeController",
            controllerAs: "vm"
        })
            .when("/products", {
            templateUrl: 'App/views/products.html',
            controller: "productsController",
            controllerAs: "vm"
        })
            .when("/products/showcase", {
            templateUrl: 'App/views/productsShowcase.html',
            controller: "productShowcaseController",
            controllerAs: "vm"
        })
            .otherwise({ redirectTo: "/" });
        console.log("Hello3");
    });
})(myApp || (myApp = {}));
//# sourceMappingURL=app.js.map