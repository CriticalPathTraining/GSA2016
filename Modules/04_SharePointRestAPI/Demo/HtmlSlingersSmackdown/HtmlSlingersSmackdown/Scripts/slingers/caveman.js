'use strict';

var xmlhttp;

window.onload = function () {
  xmlhttp = new XMLHttpRequest();
  
  var requestUri = "../_api/web/lists/getByTitle('Customers')/items" +
                      "?$select=ID,FirstName,Title,Company,WorkPhone,HomePhone,Email" +
                      "&$orderby=Title,FirstName";
  
  xmlhttp.open("GET", requestUri, false);
  xmlhttp.setRequestHeader("accept", "application/json;odata=verbose");
  xmlhttp.onreadystatechange = onGetCustomersComplete;
  xmlhttp.send();
}

function onGetCustomersComplete() {

  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    var customers = JSON.parse(xmlhttp.responseText).d.results;

    // create HTML table using the Good Ole Boy style
    var table = document.createElement("table");
    table.setAttribute("id", "customersTable")

    // create headers
    var headers = document.createElement("thead")
    var header1 = document.createElement("td");
    header1.appendChild(document.createTextNode("First Name"))
    headers.appendChild(header1)
    var header2 = document.createElement("td");
    header2.appendChild(document.createTextNode("Last Name"))
    headers.appendChild(header2);
    var header3 = document.createElement("td");
    header3.appendChild(document.createTextNode("Company"))
    headers.appendChild(header3);
    var header4 = document.createElement("td");
    header4.appendChild(document.createTextNode("Work Phone"))
    headers.appendChild(header4);
    var header5 = document.createElement("td");
    header5.appendChild(document.createTextNode("Home Phone"))
    headers.appendChild(header5);
    var header6 = document.createElement("td");
    header6.appendChild(document.createTextNode("Email"))
    headers.appendChild(header6);
    table.appendChild(headers);

    // add table rows

    for (var customer = 1; customer < customers.length; customer++) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      cell1.appendChild(document.createTextNode(customers[customer].FirstName));
      row.appendChild(cell1);
      var cell2 = document.createElement("td");
      cell2.appendChild(document.createTextNode(customers[customer].Title));
      row.appendChild(cell2);
      var cell3 = document.createElement("td");
      cell3.appendChild(document.createTextNode(customers[customer].Company));
      row.appendChild(cell3);
      var cell4 = document.createElement("td");
      cell4.appendChild(document.createTextNode(customers[customer].WorkPhone));
      row.appendChild(cell4);
      var cell5 = document.createElement("td");
      cell5.appendChild(document.createTextNode(customers[customer].HomePhone));
      row.appendChild(cell5);
      var cell6 = document.createElement("td");
      cell6.appendChild(document.createTextNode(customers[customer].Email));
      row.appendChild(cell6);
      table.appendChild(row);
    }

    document.getElementById("content_box").appendChild(table);
  }
}
