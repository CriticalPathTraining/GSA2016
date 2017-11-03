/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />

module myApp {

  let app = angular.module("myApp");

  class HomeController {
    static $inject: Array<string> = [];
    welcomeMessage = "Welcome to the Wingtip Product Manager";
    topic1Title = "Add a new product";
    topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
    topic2Title = "See the Product Showcase";
    topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
    constructor() { }
  }

  app.controller('homeController', HomeController);

  class ProductsController {
    static $inject: Array<string> = [];
    constructor() { }
  }

  app.controller('productsController', ProductsController);

  class ProductShowcaseController {
    static $inject: Array<string> = [];
    constructor() { }
  }

  app.controller('productShowcaseController', ProductShowcaseController);
}
