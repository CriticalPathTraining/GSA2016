/// <reference path="wingtip.customers.dataaccess.js" />

"use strict"

$(function () {

  $("#cmdAddNewCustomer").click(onAddCustomerRequest);
  $("#cmdAddNewCustomer").button();

  var urlHostWeb = getQueryStringParameter("SPHostUrl");
  var linkHostWeb =
    $("<a>")
    .attr("href", urlHostWeb)
    .css({ "color": "white", "text-decoration": "none" })
    .text("Back to Host Web");

  // append link into nav_bar div
  $("#nav_bar").append(linkHostWeb);

  Wingtip.Customers.DataAccess.initialize();

  // retrieve customer items
  getCustomers();

});


function getCustomers() {

  // clear results and add spinning gears icon
  $("#content_box").empty();
  $("<img>", { "src": "../Content/img/GEARS.gif" }).appendTo("#content_box");

  // call view-model function which returns promise
  var promise = Wingtip.Customers.DataAccess.getCustomers()

  // use promise to implement what happens when OData result is ready
  promise.then(onGetCustomersComplete, onError);

}

function onGetCustomersComplete(data) {

  $("#content_box").empty();

  var customers = data.d.results;

  var table = $("<table>", { ID: "customersTable" });


  table.append($("<thead>")
                   .append($("<td>").html("&nbsp;"))
                   .append($("<td>").html("&nbsp;"))
                   .append($("<td>").text("First Name"))
                   .append($("<td>").text("Last Name"))
                   .append($("<td>").text("Company"))
                   .append($("<td>").text("Work Phone"))
                   .append($("<td>").text("Home Phone"))
                   .append($("<td>").text("Email")));


  for (var customer = 1; customer < customers.length; customer++) {

    var linkEditUrl = "javascript: onUpdateCustomerRequest(" + customers[customer].Id + ");";
    var linkEdit = $("<a>", { "href": linkEditUrl })
                      .append($("<img>", { "src": "../Content/img/EDITITEM.gif", "alt": "Edit" }));

    var linkDeleteUrl = "javascript: onDeleteCustomer(" + customers[customer].Id + ");";
    var linkDelete = $("<a>", { "href": linkDeleteUrl })
                      .append($("<img>", { "src": "../Content/img/DELITEM.gif", "alt": "Delete" }));

    table.append($("<tr>")
                 .append($("<td>").append(linkEdit))
                 .append($("<td>").append(linkDelete))
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

function onAddCustomerRequest(event) {

  $("#firstName").val("");
  $("#lastName").val("");
  $("#company").val("");
  $("#workPhone").val("");
  $("#homePhone").val("");
  $("#email").val("");

  var customer_dialog = $("#customer_dialog");

  customer_dialog.dialog({
    autoOpen: true,
    title: "Add Customer",
    width: 640,
    buttons: {
      "Add": function () {
        onAddCustomer();
        $(this).dialog("close");
      },
      "Cancel": function () { $(this).dialog("close"); },
    }
  });

}

function onAddCustomer() {

  // get input data from add customer dialog
  var LastName = $("#lastName").val();
  var FirstName = $("#firstName").val();
  var Company = $("#company").val();
  var WorkPhone = $("#workPhone").val();
  var HomePhone = $("#homePhone").val();
  var Email = $("#email").val();

  // add new customer 
  var promise = Wingtip.Customers.DataAccess.addCustomer(FirstName, LastName, Company, WorkPhone, HomePhone, Email);
  promise.then(onSuccess, onError);

}

function onDeleteCustomer(customerId) {
  var promise = Wingtip.Customers.DataAccess.deleteCustomer(customerId);
  promise.then(onSuccess, onError);
}

function onUpdateCustomerRequest(customerId) {
  var promise = Wingtip.Customers.DataAccess.getCustomer(customerId);
  promise.then(onUpdateCustomerDialog, onError);
}

function onUpdateCustomerDialog(data) {

  // update customer dialog with current customer data
  $("#firstName").val(data.d.FirstName);
  $("#lastName").val(data.d.Title);
  $("#company").val(data.d.Company);
  $("#workPhone").val(data.d.WorkPhone);
  $("#homePhone").val(data.d.HomePhone);
  $("#email").val(data.d.Email);

  // store item metadata values into hidden controls
  $("#customer_id").val(data.d.ID);
  $("#etag").val(data.d.__metadata.etag);


  var customer_dialog = $("#customer_dialog");

  customer_dialog.dialog({
    autoOpen: true,
    title: "Edit Customer",
    width: 640,
    buttons: {
      "Update": function () {
        onUpdateCustomer();
        $(this).dialog("close");
      },
      "Cancel": function () {
        $(this).dialog("close");
      },
    }
  });
}

function onUpdateCustomer() {

  // scrape input values from dialog
  var Id = $("#customer_id").val();
  var FirstName = $("#firstName").val();
  var LastName = $("#lastName").val();
  var Company = $("#company").val();
  var WorkPhone = $("#workPhone").val();
  var HomePhone = $("#homePhone").val();
  var Email = $("#email").val();
  var ETag = $("#etag").val();

  // update customer
  var promise = Wingtip.Customers.DataAccess.updateCustomer(Id, FirstName, LastName, Company, WorkPhone, HomePhone, Email, ETag);
  promise.then(onSuccess, onError);
}

function onSuccess(data, request) {
  getCustomers();
}

function onError(error) {
  $("#content_box").empty();
  $("#content_box").text("Error: " + JSON.stringify(error));
}

var getQueryStringParameter = function (param) {
  var querystring = document.URL.split("?")[1];
  if (querystring) {
    var params = querystring.split("&");
    for (var index = 0; (index < params.length) ; index++) {
      var current = params[index].split("=");
      if (param.toUpperCase() === current[0].toUpperCase()) {
        return decodeURIComponent(current[1]);
      }
    }
  }
}