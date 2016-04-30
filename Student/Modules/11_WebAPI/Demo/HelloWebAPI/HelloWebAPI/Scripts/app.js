$(function () {

  $("#cmdGetCustomers").click(onGetCustomers);
  $("#cmdGetCustomer").click(onGetCustomer);
  $("#cmdPostCustomer").click(onPostCustomer);

});

function onGetCustomers() {

  var targetUrl = "api/Customers/";

  $.ajax({
    url: targetUrl
  }).then(function (data) {

    var customerList = $("<ul>");

    var customers = data;
    for(var i = 0; i < customers.length; i++){
      var customer = customers[i];
      var customerName = customer.FirstName + " " + customer.LastName;
      customerList.append($("<li>").text(customerName));
    }


    $("#content_box")
      .empty()
      .append(customerList);

  }, onError);

}


function onGetCustomer() {

  var targetUrl = "api/Customers/2";

  $.ajax({
    url: targetUrl
  }).then(function (data) {

    var customer = data;
    var customerName = customer.FirstName + " " + customer.LastName;
    $("#content_box").text(customerName);

  }, onError);

}


function onPostCustomer() {

  var targetUrl = "api/Customers/";

  var newCustomer = {
    FirstName: "Bob",
    LastName: "Hope"
  };

  var postData = JSON.stringify(newCustomer);

  $.ajax({
    url: targetUrl,
    type: "POST",
    contentType: "application/json",
    data: postData
  }).then(function (data) {
    $("#content_box").text(JSON.stringify(data));

  }, onError);

}

function onError(error) {
  var errorMessage = "error " + error.status + " - " + error.responseText;
  alert(errorMessage);
}