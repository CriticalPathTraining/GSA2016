/// <reference path="jstree.js" />
/// <reference path="jquery-2.1.4.js" />

$(function () {
  $("#cmdGetAttendeeProfiles").click(onGetAttendeeProfiles);
  $("#cmdGetAttendeeProfileHiearchy").click(onGetAttendeeProfileHiearchy);
  $("#cmdGetSalesLeads").click(onGetSalesLeads);
  $("#cmdGetCustomers").click(onGetCustomers);

});


function onGetAttendeeProfiles() {
  
  $("#content_box")
    .empty()
    .append($("<h2>").text("Attendee Profiles"));

  
  var restUri = "https://localhost:44311/api/AttendeeProfiles/";

  $.ajax({
    url: restUri,
    accept: "application/json",
    dataType: "json"
  }).then(function (profiles) {

    var profilesTable = $("<table>", { "class": "small table table-bordered table-stripped" });

    profilesTable.append( 
      $("<thead>")
        .append( $("<tr>") 
          .append( $("<th>").text("Id") )
          .append( $("<th>").text("Title") )
          .append( $("<th>").text("Parent") )
          .append($("<th>").text("Description"))
        )
      );

    
    for (var i = 0; i < profiles.length; i++) {
      profilesTable.append(
        $("<tr>")
            .append($("<td>").text(profiles[i].id))
            .append($("<td>").text(profiles[i].title))
            .append($("<td>").text(profiles[i].parent))
            .append($("<td>").text(profiles[i].description))
        );
    }

    $("#content_box").append(profilesTable);
  });
  
}

function onGetAttendeeProfileHiearchy() {

  $("#content_box")
   .empty()
   .append($("<h2>").text("Attendee Profile Hiearchy"));


  var restUri = "https://localhost:44311/api/AttendeeProfileHiearchy/";

  $.ajax({
    url: restUri,
    accept: "application/json",
    dataType: "json"
  }).then(function (data) {

    //$.jstree.defaults.core.themes.variant = "large";

    var topView = $("<div>", { "class": "row", "background-color": "#CCC;" });

    var profileTree = $("<div>", { id: "profileTree", "class": "col-md-2" });

    profileTree.jstree({ 'core': { 'data': data } });

    $("#profile_tree").on("select_node.jstree",
     function (evt, data) {
       $("#profile_title").text(data.node.original.text);
       $("#profile_description").text(data.node.original.description);
     });

    $("#profile_tree").jstree("select_node", '#1');
    $("#profile_tree").focus();

    var profileView = $("<div>", { id: "profileView", "class": "col-md-10" });

    profileView.append( $("<h2>").text("Attendee Profile") );

    topView.append(profileTree);
    topView.append(profileView);

    $("#content_box").append(topView);

  });
}

function onGetSalesLeads() {

  $("#content_box")
   .empty()
   .append($("<h2>").text("Sales Leads"))


  var restUri = "https://localhost:44311/odata/SalesLeads/?$oderby=LastName,FirstName";

  $.ajax({
    url: restUri,
    accept: "application/json",
    dataType: "json"
  }).then(function (data) {

    var salesLeads = data.value;

    var salesLeadsTable = $("<table>", { "class": "small table table-bordered table-stripped" });

    salesLeadsTable.append(
      $("<thead>")
        .append($("<tr>")
          .append($("<th>").text("Id"))
          .append($("<th>").text("FirstName"))
          .append($("<th>").text("LastName"))
          .append($("<th>").text("Company"))
          .append($("<th>").text("Email"))
        )
      );


    for (var i = 0; i < salesLeads.length; i++) {
      salesLeadsTable.append(
        $("<tr>")
            .append($("<td>").text(salesLeads[i].Id))
            .append($("<td>").text(salesLeads[i].FirstName))
            .append($("<td>").text(salesLeads[i].LastName))
            .append($("<td>").text(salesLeads[i].Company))
            .append($("<td>").text(salesLeads[i].Email))
        );
    }

    $("#content_box").append(salesLeadsTable);
  });

}

function onGetCustomers() {

  $("#content_box")
   .empty()
   .append($("<h2>").text("Customers"))
   .append($("<div>", { "id": "tab_Container","class":"navbar navbar-default" }))
   .append($("<div>", { "id": "table_Container" }));

  var restUri = "https://localhost:44311/odata/Customers/?$inlinecount=AllPages&$orderby=LastName,FirstName&$top=12";

  $.ajax({
    url: restUri,
    accept: "application/json",
    dataType: "json"
  }).then(function (data) {

    var customers = data.value;
    renderCustomersTable(customers);

    var customerCount = parseInt(data["odata.count"]);
    createPageButtons(customerCount);

  });

}

function renderCustomersTable(customers) {


  var customersTable = $("<table>", { "class": "small table table-bordered table-stripped" });
  customersTable.append(
    $("<thead>")
      .append($("<tr>")
        .append($("<th>").text("Last Name"))
        .append($("<th>").text("First Name"))
        .append($("<th>").text("Company"))
        .append($("<th>").text("Email"))
        .append($("<th>").text("WorkPhone"))
        .append($("<th>").text("HomePhone"))
      )
    );

  for (var i = 0; i < customers.length; i++) {
    customersTable.append(
      $("<tr>")
          .append($("<td>").text(customers[i].LastName))
          .append($("<td>").text(customers[i].FirstName))
          .append($("<td>").text(customers[i].Company))
          .append($("<td>").text(customers[i].Email))
          .append($("<td>").text(customers[i].WorkPhone))
          .append($("<td>").text(customers[i].HomePhone))
      );
  }

  $("#table_Container")
    .empty()
    .append(customersTable);

}

function createPageButtons(customerCount) {



  $("#tab_Container").empty()


  var pageCount = Math.ceil(customerCount / 12);  
  for (var page = 1; page <= pageCount; page++) {

    var button = $("<input>", { "type": "button", "value": page, "class": "btn btn-link" });

    button.click(function (event) {
      var pageToGet = event.target.value;
      navigateToPage(pageToGet);
    });
    
    $("#tab_Container").append(button);
  }

}

function navigateToPage(pageToGet) {
  var startingRow = ((pageToGet - 1) * 12);

  var restUri = "https://localhost:44311/odata/Customers/?$inlinecount=AllPages&$orderby=LastName,FirstName";
  restUri = restUri + "&$skip=" + startingRow + "&$top=12";
  $.ajax({
    url: restUri,
    accept: "application/json",
    dataType: "json"
  }).then(function (data) {

    var customers = data.value;
    renderCustomersTable(customers);

  });

}
