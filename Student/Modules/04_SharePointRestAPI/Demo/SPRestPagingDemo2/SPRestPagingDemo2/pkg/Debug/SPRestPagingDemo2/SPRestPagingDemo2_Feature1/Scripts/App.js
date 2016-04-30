"use strict"

/// <reference path="jquery-2.0.3.js" />
/// <reference path="jquery-ui-1.10.3.js" />
/// <reference path="jsrender.js" />
/// <reference path="Wingtip.Customers.DataAccess.js" />

$(function () {

  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/GEARS.gif" }).appendTo("#content_box");

  Wingtip.Customers.DataAccess.getNextCustomersPage().then(onGetCustomersComplete, onError);

  $("#cmdGetNextPage").click(function (event) {
    Wingtip.Customers.DataAccess.getNextCustomersPage().then(onGetCustomersComplete, onError);
  }); 

});


function onGetCustomersComplete(data) {

  $("#content_box").empty();

  var nextURI = data.d.__next;
  $("#next_uri").text(nextURI);

  var odataResults = data.d.results;

  // set rendering template
  var tableHeader = "<thead>" +
                      "<td>Id</td>" +
                      "<td>First Name</td>" +
                      "<td>Last Name</td>" +
                      "<td>Company</td>" +
                      "<td>Work Phone</td>" +
                      "<td>Home Phone</td>" +
                      "<td>Email</td>" +
                    "</thead>";

  var table = $("<table>", { ID: "customersTable" }).append($(tableHeader));

  // create rendering template for table row using jsRender syntax
  var rowTemplateString = "<tr>" +
                            "<td>{{>ID}}</td>" +
                            "<td>{{>FirstName}}</td>" +
                            "<td>{{>Title}}</td>" +
                            "<td>{{>Company}}</td>" +
                            "<td>{{>WorkPhone}}</td>" +
                            "<td>{{>HomePhone}}</td>" +
                            "<td>{{>Email}}</td>" +
                          "</tr>";

  // load row template and give it a name of "rowTemplate"
  $.templates({ "rowTemplate": rowTemplateString });

  var renderedTable = $.render.rowTemplate(odataResults);
  // render table rows using row template and OData data result
  table.append(renderedTable);

  // append table to div in DOM
  $("#content_box").append(table);


}

function onSuccess(data, request) {
  getCustomers();
}

function onError(error) {
  alert("Ouch");
  $("#content_box").empty();
  $("#content_box").text("Error: " + JSON.stringify(error));
}