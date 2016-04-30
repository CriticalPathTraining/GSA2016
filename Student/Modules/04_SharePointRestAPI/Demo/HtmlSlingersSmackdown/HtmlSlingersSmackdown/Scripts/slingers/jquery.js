"use strict"

$(function () {

  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/bessel.gif" }).appendTo("#content_box");


  Wingtip.Customers.DataAccess.getCustomers().then(onGetCustomersComplete, onError);

});


function onGetCustomersComplete(data) {

  $("#content_box").empty();

  var customers = data.d.results;

  var table = $("<table>", { ID: "customersTable" });


  table.append($("<thead>")
                   .append($("<td>").text("First Name"))
                   .append($("<td>").text("Last Name"))
                   .append($("<td>").text("Company"))
                   .append($("<td>").text("Work Phone"))
                   .append($("<td>").text("Home Phone"))
                   .append($("<td>").text("Email")));

  
  for (var customer = 1; customer < customers.length; customer++) {
    table.append($("<tr>")
                 .append($("<td>").text(customers[customer].FirstName))
                 .append($("<td>").text(customers[customer].Title))
                 .append($("<td>").text(customers[customer].Company))
                 .append($("<td>").text(customers[customer].WorkPhone))
                 .append($("<td>").text(customers[customer].HomePhone))
                 .append($("<td>").text(customers[customer].Email)));

  }

  // append table to div in DOM
  $("#content_box").append(table);

}

function onError(error) {
  $("#content_box").text("Error on jquery.js")
}