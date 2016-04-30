'use strict';

(function () {

  var app = angular.module('WebServiceClient_Angular');

  app.controller('homeController', homeController );

  function homeController($scope, wingtipCrmService) {

    wingtipCrmService.getCustomersStartingWith("A,B,C,D").success(function (data) {
      $scope.customers = data.value;
      $scope.deleteCustomer = function (id) {
        wingtipCrmService.deleteCustomer(id).success(function (data) {
         $scope.$apply();
        });
      };
    });

    $scope.toolbarCommands = [
      { title: "A", filter: "A" },
      { title: "B", filter: "B" },
      { title: "C", filter: "C" },
      { title: "D - F", filter: "D,E,F" },
      { title: "G - J", filter: "G,H,I,J" },
      { title: "K - M", filter: "K,L,M" },
      { title: "N - P", filter: "N,O,P" },
      { title: "Q - S", filter: "Q,R,S" },
      { title: "T - V", filter: "T,U,V" },
      { title: "W", filter: "W" },
      { title: "X - Z", filter: "X,Y,Z" }
    ];

    $scope.filterCustomers = function (filter) {
      wingtipCrmService.getCustomersStartingWith(filter).success(function (data) {
        $scope.customers = data.value;
      });
    };


  }

})();