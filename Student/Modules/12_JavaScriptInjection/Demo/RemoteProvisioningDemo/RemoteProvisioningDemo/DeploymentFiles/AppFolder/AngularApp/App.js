'use strict';

(function(){

  var crmApp = angular.module("CustomersAngularApp", ['ngRoute']);

  crmApp.config(['$routeProvider', initializeApp]);

  function initializeApp($routeProvider) {

    // config app's route map
    $routeProvider
      .when("/",
           { templateUrl: 'AngularApp/views/home.html', controller: "homeController" })
      .when("/view/:id",
           { templateUrl: 'AngularApp/views/view.html', controller: "viewController" })
      .when("/edit/:id",
           { templateUrl: 'AngularApp/views/edit.html', controller: "editController" })
      .when("/new",
           { templateUrl: 'AngularApp/views/new.html', controller: "newController" })
      .otherwise({ redirectTo: "/" });

  }

})();