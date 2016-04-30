/// <reference path="wingtip.customers.viewmodel.js" />
/// <reference path="knockout-2.3.0.js" />

(function () {

    "use strict";

    jQuery(function () {
        $("#cmdAddNewCustomer").click(onAddCustomerRequest);
        $("#cmdAddNewCustomer").button();
        viewModel.refreshCache();
        ko.applyBindings(viewModel);
    });

}());

var viewModel = Wingtip.Crm.ViewModel;

function onAddCustomerRequest(event) {

    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtCompany").val("");
    $("#txtEmail").val("");
    $("#txtWorkPhone").val("");
    $("#txtHomePhone").val("");

    var customer_dialog = $("#customer_dialog");

    customer_dialog.dialog({
        autoOpen: true,
        title: "Add Customer",
        width: 320,
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
    var Id = $("#txtId").val();
    var FirstName = $("#txtFirstName").val();
    var LastName = $("#txtLastName").val();
    var Company = $("#txtCompany").val();
    var EmailAddress = $("#txtEmail").val();
    var WorkPhone = $("#txtWorkPhone").val();
    var HomePhone = $("#txtHomePhone").val();

    viewModel.addCustomer(FirstName, LastName, Company, EmailAddress, WorkPhone, HomePhone);
}

function onDeleteCustomer(customerId) {
    viewModel.deleteCustomer(customerId);
}

function onUpdateCustomerRequest(customerId) {
    viewModel.getCustomer(customerId).then(onUpdateCustomerDialog);
}

function onUpdateCustomerDialog(data) {

    // update customer dialog with current customer data
    $("#txtId").val(data.ID);
    $("#txtFirstName").val(data.FirstName);
    $("#txtLastName").val(data.LastName);
    $("#txtCompany").val(data.Company);
    $("#txtEmail").val(data.EmailAddress);
    $("#txtWorkPhone").val(data.WorkPhone);
    $("#txtHomePhone").val(data.HomePhone);

    var customer_dialog = $("#customer_dialog");

    customer_dialog.dialog({
        autoOpen: true,
        title: "Edit Customer",
        width: 320,
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

    var Id = $("#txtId").val();
    var FirstName = $("#txtFirstName").val();
    var LastName = $("#txtLastName").val();
    var Company = $("#txtCompany").val();
    var EmailAddress = $("#txtEmail").val();
    var WorkPhone = $("#txtWorkPhone").val();
    var HomePhone = $("#txtHomePhone").val();

    viewModel.updateCustomer(Id, FirstName, LastName, Company, EmailAddress, WorkPhone, HomePhone);

}

