'use strict';

$(function () {
  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/bessel.gif" }).appendTo("#content_box");

  Wingtip.Customers.DataAccess.getCustomers().then(onGetCustomersComplete, onError);
});

function onGetCustomersComplete(data) {

  $("#content_box").empty();

  var odataResults = data.d.results;

  // set rendering template
  var tableHeader = "<thead>" +
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


function onError(error) {
  $("#content_box").text("Error on jsrender.js")
}