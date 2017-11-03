  'use strict';

$(function () {

  $("#cmdGetSmallCustomersList").click(onGetSmallCustomersList);
  $("#cmdGetLargeCustomersList").click(onGetLargeCustomersList);

});

function onGetSmallCustomersList() {

  var customers = [
    { "lastName": "Nelson", "firstName": "Quincy", "phone": "1(340)608-7748" },
    { "lastName": "Mason", "firstName": "Jude", "phone": "1(203)408-0466" },
    { "lastName": "Stout", "firstName": "Sid", "phone": "1(518)258-6571" }
  ];

  renderCustomersTable(customers);
}

function onGetLargeCustomersList() {

  var customers = [
    { "lastName": "Nelson", "firstName": "Quincy", "phone": "1(340)608-7748" },
    { "lastName": "Mason", "firstName": "Jude", "phone": "1(203)408-0466" },
    { "lastName": "Stout", "firstName": "Sid", "phone": "1(518)258-6571" },
    { "lastName": "Gillespie", "firstName": "Gilberto", "phone": "1(270)510-1720" },
    { "lastName": "Strickland", "firstName": "Diane", "phone": "1(407)413-4851" },
    { "lastName": "Zimmerman", "firstName": "Jacqueline", "phone": "1(844)234-0550" },
    { "lastName": "Schroeder", "firstName": "Naomi", "phone": "1(204)355-6648" },
    { "lastName": "Stephens", "firstName": "Lynne", "phone": "1(407)787-7308" },
    { "lastName": "Sullivan", "firstName": "Luther", "phone": "1(323)755-3404" },
    { "lastName": "Parsons", "firstName": "Rose", "phone": "1(802)357-5583" },
    { "lastName": "Meadows", "firstName": "Bridgette", "phone": "1(250)468-4824" },
    { "lastName": "Black", "firstName": "Merle", "phone": "1(248)240-1267" }
  ];

  renderCustomersTable(customers);

}

function renderCustomersTable(customers) {

  $("#customers").empty();

  // create HTML table
  var table = $("<table>", { ID: "customersTable" });

  // create table header
  var thead = $("<thead>");
  thead.append($("<tr>")
                .append($("<td>").text("First Name"))
                .append($("<td>").text("Last Name"))
                .append($("<td>").text("Phone")));
  table.append(thead);

  // create table body
  var tbody = $("<tbody>");
  for (var customer = 0; customer < customers.length; customer++) {
    tbody.append($("<tr>")
                 .append($("<td>").text(customers[customer].firstName))
                 .append($("<td>").text(customers[customer].lastName))
                 .append($("<td>").text(customers[customer].phone)));

  }
  table.append(tbody);

  // append table to customers div in app part page
  $("#customers").append(table);

  // resize app part if required
  var resize = $('input:checkbox[name=resizeAppPart]').prop("checked");
  if (resize) {
    resizeAppPart();
  }
}

function resizeAppPart() {

  var pageWidth = $("#appPartContainer").width() + 20;
  var pageHeight = $("#appPartContainer").height() + 20;

  var SPHostUrl = getQueryStringParameter("SPHostUrl");
  var senderId = getQueryStringParameter("SenderId");
  var message = "<message senderId=" + senderId + ">" +
                  "resize(" + pageWidth + ", " + pageHeight + ")" +
                "</message>";

  parent.postMessage(message, SPHostUrl);


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