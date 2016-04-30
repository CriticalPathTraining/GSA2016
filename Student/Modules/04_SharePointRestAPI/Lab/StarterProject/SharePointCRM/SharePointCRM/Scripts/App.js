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
  // TODO: snippet 02
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


  for (var customer = 0; customer < customers.length; customer++) {

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
  // TODO: snippet 05
  alert("The onAddCustomer function is not yet implemented");
}

function onDeleteCustomer(customerId) {
  // TODO: snippet 07
  alert("The onDeleteCustomer function is not yet implemented");
}

function onUpdateCustomerRequest(customerId) {
  // TODO: snippet 09
  alert("The onUpdateCustomerRequest function is not yet implemented");
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
  // TODO: snippet 11 
  alert("The onUpdateCustomer function is not yet implemented");
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