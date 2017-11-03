/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />
var myApp;
(function (myApp) {
    var app = angular.module("myApp");
    var HomeController = (function () {
        function HomeController() {
            this.welcomeMessage = "Welcome to the Wingtip Product Manager";
            this.topic1Title = "Add a new product";
            this.topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
            this.topic2Title = "See the Product Showcase";
            this.topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
        }
        return HomeController;
    }());
    HomeController.$inject = [];
    app.controller('homeController', HomeController);
    var ProductsController = (function () {
        function ProductsController() {
        }
        return ProductsController;
    }());
    ProductsController.$inject = [];
    app.controller('productsController', ProductsController);
    var ProductShowcaseController = (function () {
        function ProductShowcaseController() {
        }
        return ProductShowcaseController;
    }());
    ProductShowcaseController.$inject = [];
    app.controller('productShowcaseController', ProductShowcaseController);
})(myApp || (myApp = {}));
//# sourceMappingURL=controllers.js.map