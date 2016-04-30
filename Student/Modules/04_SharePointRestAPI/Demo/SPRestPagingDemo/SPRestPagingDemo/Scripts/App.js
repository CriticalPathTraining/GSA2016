"use strict"

$(function () {
  getCustomers();
});

var pageSize = 12;

function getCustomers() {

  // clear results and add spinning gears icon
  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/GEARS.gif" }).appendTo("#content_box");

  // call view-model funct  ion which returns promise
  Wingtip.Customers.DataAccess.getCustomerListCount().then(onGetCustomersCountComplete, onError)
  Wingtip.Customers.DataAccess.getCustomers(0,pageSize).then(onGetCustomersComplete, onError);

}

function onGetCustomersCountComplete(data) {
  
  var itemCount = data.d.ItemCount;

  var pageCount = Math.ceil(itemCount / pageSize);
  
  for (var page = 1; page <= pageCount; page++) {

    var button = $("<input>").attr("type", "button").attr("value", page);

    button.click(function (event) {
      var pageToGet = event.target.value;
      var startingRow = ((pageToGet -1) * pageSize);
      var rowCount =  pageSize;
      Wingtip.Customers.DataAccess.getCustomers(startingRow, pageSize).then(onGetCustomersComplete, onError);
    });

    $("#page_tabs").append(button);
  }

  $("#status_message").text(itemCount + " items spread across " + pageCount + " pages");

}

function onGetCustomersComplete(data) {

  $("#content_box").empty();

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