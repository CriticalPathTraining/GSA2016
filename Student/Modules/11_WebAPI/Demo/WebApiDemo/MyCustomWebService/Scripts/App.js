/// <reference path="jstree.js" />
/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />
/// <reference path="CPT.AttendeeProfileService.js" />
/// <reference path="CPT.SalesLeadService.js" />
/// <reference path="CPT.CustomerService.js" />


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

  CPT.AttendeeProfileService.getAttendeeProfiles()
    .then(renderAttendeeProfilesTable);

}

function renderAttendeeProfilesTable(profiles) {

  var profilesTable = $("<table>", { "class": "small table table-bordered table-stripped" });

  profilesTable.append(
    $("<thead>")
      .append($("<tr>")
        .append($("<th>").text("Id"))
        .append($("<th>").text("Title"))
        .append($("<th>").text("Parent"))
        .append($("<th>").text("Description"))
        .append($("<th>").text("-"))
      )
    );

  for (var i = 0; i < profiles.length; i++) {

    var viewLink = $("<a>", {
      "href": "#",
      "onclick": "JavaScript: onViewAttendeeProfile(" + profiles[i].id + ");"
    }).text("View");

    profilesTable.append(
      $("<tr>")
          .append($("<td>").text(profiles[i].id))
          .append($("<td>").text(profiles[i].title))
          .append($("<td>").text(profiles[i].parent))
          .append($("<td>").text(profiles[i].description))
          .append($("<td>").append(viewLink))
     );
  }

  $("#content_box").append(profilesTable);
}

function onViewAttendeeProfile(profileId) {

  CPT.AttendeeProfileService.getAttendeeProfile(profileId)
    .then(displayAttendeeProfileDialog);
}

function displayAttendeeProfileDialog(profile) {

  var profilePhoto = $("<img>", {
    "src": profile.photoUrl,
    "alt": profile.title,
    "class": "pull-right",
    "id": "profile_photo"
  });

  var dialog = $("<div>", { "id":"dialog_body", "class": "container body-content" })
    .append(profilePhoto)
    .append($("<h1>", { "id": "profile_title" }).text(profile.title))
    .append($("<p>", { "id": "profile_description" }).text(profile.description));

  var strategiesExist = (profile.strategies != null) && (profile.strategies.length > 0);
  if (strategiesExist) {
    dialog.append($("<h4>").text("Strategies:"));
    var strategyCount = profile.strategies.length;
    var strategiesList = $("<ul>");
    for (var i = 0; i < strategyCount; i++) {
      strategiesList.append($("<li>").text(profile.strategies[i]));
    }
    dialog.append($("<div>").append(strategiesList));
  }

  dialog.dialog({
    title: "Attendee Profile Details",
    height: 480,
    width: 820,
    modal: true,
    buttons: {
      Done: function () {
        dialog.dialog("close");
      }
    }
  });
}

function onGetAttendeeProfileHiearchy() {

  $("#content_box").empty();

  CPT.AttendeeProfileService.getAttendeeProfileHierarchy()
    .then(renderAttendeeProfileHierarchy);
}

function renderAttendeeProfileHierarchy(hierarchyNodes) {

  // top view
  var topView = $("<div>", { "id": "topView", "class":"row" });

  // left-side view right with hierarchy tree
  var profileTree = $("<div>", { id: "profileTree", "class": "col-md-3" });
  profileTree.jstree({ 'core': { 'data': hierarchyNodes } });
  profileTree.on("select_node.jstree",
   function (evt, data) {
     CPT.AttendeeProfileService.getAttendeeProfile(data.node.original.id)
       .then(renderAttendeeProfileView);
   });

  // right-side view with single profile view
  var profileView = $("<div>", { id: "profileView", "class": "col-md-9" });

  topView.append(profileTree);
  topView.append(profileView);
  $("#content_box").append(topView);

  profileTree.jstree().select_node("#1");
  profileTree.focus();

}

function renderAttendeeProfileView(profile) {

  var profileView = $("#profileView").empty();

  var profilePhoto = $("<img>", {
    "src": profile.photoUrl,
    "alt": profile.title,
    "class": "pull-right",
    "id": "profile_photo"
  });

  profileView
    .append(profilePhoto)
    .append($("<h2>", { "id": "profile_title" }).text(profile.title))
    .append($("<p>", { "id": "profile_description" }).text(profile.description));

  var strategiesExist = (profile.strategies != null) && (profile.strategies.length > 0);
  if (strategiesExist) {
    profileView.append($("<h3>").text("Strategies:"));
    var strategyCount = profile.strategies.length;
    var strategiesList = $("<ul>");
    for (var i = 0; i < strategyCount; i++) {
      strategiesList.append($("<li>").text(profile.strategies[i]));
    }
    profileView.append($("<div>").append(strategiesList));
  }

}

function onGetSalesLeads() {

  $("#content_box")
   .empty()
   .append($("<h2>").text("Sales Leads"))

  CPT.SalesLeadService.getSalesLeads()
    .then(renderSalesLeadsTable);

}

function renderSalesLeadsTable(data) {

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

}

function onGetCustomers() {

  $("#content_box")
     .empty()
     .append($("<h2>").text("Customers"))
     .append($("<div>", { "id": "tab_Container", "class": "navbar navbar-default" }))
     .append($("<div>", { "id": "table_Container" }));


  CPT.CustomerService.getCustomers()
    .then(function (data) {

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
        .append($("<th>").text("Work Phone"))
        .append($("<th>").text("Home Phone"))
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

  $("#tab_Container").empty();

  var pageCount = Math.ceil(customerCount / 12);
  for (var page = 1; page <= pageCount; page++) {

    var button = $("<input>", { "type": "button", "value": page, "class": "btn btn-link" });

    button.click(function (event) {
      var pageNumber = event.target.value;
      navigateToPage(pageNumber);
    });

    $("#tab_Container").append(button);
  }

}

function navigateToPage(pageNumber) {
  CPT.CustomerService.getCustomersPage(pageNumber)
    .then(function (data) {

    var customers = data.value;
    renderCustomersTable(customers);

  });

}
