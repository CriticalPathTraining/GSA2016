/// <reference path="jquery-3.2.1.js" />

$(function () {

  $("#cmdAddNewContact").click(onAddContactRequest);

  Wingtip.Contacts.DataAccess.initialize();

  // retrieve contact items
  getContacts();

});


function getContacts() {

  // clear results and add spinning gears icon
  $("#content_box").empty();
  $("<img>", { "src": "Content/GEARS.gif" }).appendTo("#content_box");

  // call view-model function which returns promise
  var promise = Wingtip.Contacts.DataAccess.getContacts()

  // use promise to implement what happens when OData result is ready
  promise.then(onGetContactsComplete, onError);

}

function onGetContactsComplete(data) {

  $("#content_box").empty();

  var contacts = data.d.results;

  var table = $("<table>", { ID: "contactsTable" });


  table.append($("<thead>")
                   .append($("<td>").html("&nbsp;"))
                   .append($("<td>").html("&nbsp;"))
                   .append($("<td>").text("First Name"))
                   .append($("<td>").text("Last Name"))
                   .append($("<td>").text("Work Phone"))
                   .append($("<td>").text("Email")));


  for (var contact = 0; contact < contacts.length; contact++) {

    var linkEditUrl = "javascript: onUpdateContactRequest(" + contacts[contact].Id + ");";
    var linkEdit = $("<a>", { "href": linkEditUrl })
                      .append($("<img>", { "src": "Content/EDITITEM.gif", "alt": "Edit" }));

    var linkDeleteUrl = "javascript: onDeleteContact(" + contacts[contact].Id + ");";
    var linkDelete = $("<a>", { "href": linkDeleteUrl })
                      .append($("<img>", { "src": "Content/DELITEM.gif", "alt": "Delete" }));

    table.append($("<tr>")
                 .append($("<td>").append(linkEdit))
                 .append($("<td>").append(linkDelete))
                 .append($("<td>").text(contacts[contact].FirstName))
                 .append($("<td>").text(contacts[contact].Title))
                 .append($("<td>").text(contacts[contact].WorkPhone))
                 .append($("<td>").text(contacts[contact].Email)));

  }

  // append table to div in DOM
  $("#content_box").append(table);

}

function onAddContactRequest(event) {

  $("#firstName").val("");
  $("#lastName").val("");
  $("#company").val("");
  $("#workPhone").val("");
  $("#homePhone").val("");
  $("#email").val("");

  var contact_dialog = $("#contact_dialog");

  contact_dialog.dialog({
    autoOpen: true,
    title: "Add Contact",
    width: 640,
    buttons: {
      "Add": function () {
        onAddContact();
        $(this).dialog("close");
      },
      "Cancel": function () { $(this).dialog("close"); },
    }
  });

}

function onAddContact() {

  // get input data from add contact dialog
  var LastName = $("#lastName").val();
  var FirstName = $("#firstName").val();
  var Company = $("#company").val();
  var WorkPhone = $("#workPhone").val();
  var HomePhone = $("#homePhone").val();
  var Email = $("#email").val();

  // add new contact 
  var promise = Wingtip.Contacts.DataAccess.addContact(FirstName, LastName, Company, WorkPhone, HomePhone, Email);
  promise.then(onSuccess, onError);

}

function onDeleteContact(contactId) {
  var promise = Wingtip.Contacts.DataAccess.deleteContact(contactId);
  promise.then(onSuccess, onError);
}

function onUpdateContactRequest(contactId) {
  var promise = Wingtip.Contacts.DataAccess.getContact(contactId);
  promise.then(onUpdateContactDialog, onError);
}

function onUpdateContactDialog(data) {

  // update contact dialog with current contact data
  $("#firstName").val(data.d.FirstName);
  $("#lastName").val(data.d.Title);
  $("#company").val(data.d.Company);
  $("#workPhone").val(data.d.WorkPhone);
  $("#homePhone").val(data.d.HomePhone);
  $("#email").val(data.d.Email);

  // store item metadata values into hidden controls
  $("#contact_id").val(data.d.ID);
  $("#etag").val(data.d.__metadata.etag);


  var contact_dialog = $("#contact_dialog");

  contact_dialog.dialog({
    autoOpen: true,
    title: "Edit Contact",
    width: 640,
    buttons: {
      "Update": function () {
        onUpdateContact();
        $(this).dialog("close");
      },
      "Cancel": function () {
        $(this).dialog("close");
      },
    }
  });
}

function onUpdateContact() {

  // scrape input values from dialog
  var Id = $("#contact_id").val();
  var FirstName = $("#firstName").val();
  var LastName = $("#lastName").val();
  var Company = $("#company").val();
  var WorkPhone = $("#workPhone").val();
  var HomePhone = $("#homePhone").val();
  var Email = $("#email").val();
  var ETag = $("#etag").val();

  // update contact
  var promise = Wingtip.Contacts.DataAccess.updateContact(Id, FirstName, LastName, Company, WorkPhone, HomePhone, Email, ETag);
  promise.then(onSuccess, onError);
}

function onSuccess(data, request) {
  getContacts();
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




var Wingtip = window.Wingtip || {};
Wingtip.Contacts = Wingtip.Contacts || {};
Wingtip.Contacts.DataAccess = function () {

  var requestDigest;

  var initialize = function () {

    var deferred = $.ajax({
      url: "../_api/contextinfo",
      type: "POST",
      headers: { "accept": "application/json;odata=verbose" }
    })

    deferred.then(function (data) {
      requestDigest = data.d.GetContextWebInformation.FormDigestValue
    });

  }

  var getContacts = function () {

    var requestUri = "../_api/web/lists/getByTitle('Contacts')/items" +
                     "?$select=ID,FirstName,Title,Company,WorkPhone,HomePhone,Email" +
                     "&$orderby=Title,FirstName";

    // send call across network
    return $.ajax({
      url: requestUri,
      headers: { "accept": "application/json;odata=verbose" }
    });

  };

  var getContact = function (Id) {

    // begin work to call across network
    var requestUri = "../_api/web/lists/getByTitle('Contacts')/items(" + Id + ")";


    return $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: { "accept": "application/json;odata=verbose" }
    });

  }

  var addContact = function (FirstName, LastName, Company, WorkPhone, HomePhone, Email) {

    var requestUri = "../_api/web/lists/getByTitle('Contacts')/items";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": requestDigest
    }

    var contactData = {
      __metadata: { "type": "SP.Data.ContactsListItem" },
      Title: LastName,
      FirstName: FirstName,
      Company: Company,
      WorkPhone: WorkPhone,
      HomePhone: HomePhone,
      Email: Email
    };

    var requestBody = JSON.stringify(contactData);

    return $.ajax({
      url: requestUri,
      type: "POST",
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      data: requestBody,
    });

  };

  var updateContact = function (Id, FirstName, LastName, Company, WorkPhone, HomePhone, Email, ETag) {

    var requestUri = "../_api/web/lists/getByTitle('Contacts')/items(" + Id + ")";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-HTTP-Method": "MERGE",
      "X-RequestDigest": requestDigest,
      "If-Match": ETag
    }

    var contactData = {
      __metadata: { "type": "SP.Data.ContactsListItem" },
      Title: LastName,
      FirstName: FirstName,
      Company: Company,
      WorkPhone: WorkPhone,
      HomePhone: HomePhone,
      Email: Email
    };

    var requestBody = JSON.stringify(contactData);

    return $.ajax({
      url: requestUri,
      type: "POST",
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      data: requestBody,
    });

  };

  var deleteContact = function (Id) {

    var requestUri = "../_api/web/lists/getByTitle('Contacts')/items(" + Id + ")";

    var requestHeaders = {
      "accept": "application/json;odata=verbose",
      "X-RequestDigest": requestDigest,
      "If-Match": "*"
    }

    return $.ajax({
      url: requestUri,
      type: "DELETE",
      headers: requestHeaders,
    });

  };

  // public interface
  return {
    initialize: initialize,
    getContacts: getContacts,
    addContact: addContact,
    getContact: getContact,
    updateContact: updateContact,
    deleteContact: deleteContact
  };

}();



