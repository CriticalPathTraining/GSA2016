"use strict"

$(function () {
  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/bessel.gif" }).appendTo("#content_box");
  Wingtip.Customers.DataAccess.getCustomers().then(onGetCustomersComplete, onError);
});


function onGetCustomersComplete(data) {
  $("#content_box").empty();
  var customers = data.d.results;

  var Columns = [
    { Name: "FirstName", DisplayName: "First Name" },
    { Name: "Title", DisplayName: "LastName" },
    { Name: "Company", DisplayName: "Company" },
    { Name: "WorkPhone", DisplayName: "Work Phone" },
    { Name: "HomePhone", DisplayName: "Home Phone" },
    { Name: "Email", DisplayName: "Email" }
  ];

  var customersTable = "<table id='customersTable' >";

  customersTable += "<thead>";
  for (var currentColumnHeader = 0; currentColumnHeader < Columns.length; currentColumnHeader++) {
    customersTable += "<td>" + Columns[currentColumnHeader].DisplayName + "</td>";
  };
  customersTable += "</thead>";

  customersTable += "<tbody>";
  for (var currentCustomer = 1; currentCustomer < customers.length; currentCustomer++) {
    customersTable += "<tr>";
    for (var currentColumn = 0; currentColumn < Columns.length; currentColumn++) {
      customersTable += "<td>" + customers[currentCustomer][Columns[currentColumn].Name] + "</td>"
    }
    customersTable += "<tr>";
  }
  customersTable += "</tbody>";

  customersTable += "</table>";
  $("#content_box").html(customersTable);
}

function onError(error) {
  $("#content_box").text("Error on jquery.js")
}