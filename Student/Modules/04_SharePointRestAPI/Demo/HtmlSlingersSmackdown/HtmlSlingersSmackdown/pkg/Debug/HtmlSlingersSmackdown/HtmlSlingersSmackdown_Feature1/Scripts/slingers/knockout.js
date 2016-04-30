'use strict';

$(function () {
  Wingtip.Customers.DataAccess.getCustomers().then(onGetCustomersComplete, onError);
});


function onGetCustomersComplete(data) {

  var customers = data.d.results;

  var veiwModelCustomers = {
    customers: ko.observableArray(customers)
  };

  ko.applyBindings(veiwModelCustomers);
}

function onError(error) {
  $("#content_box").text("Error on knockout.js")
}