/// <reference path="jstree.js" />
/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />

var CPT = window.CPT || {};

CPT.SalesLeadService = function () {

  var baseUri = "https://localhost:44311/";


  var getSalesLeads = function () {

    var restUri = baseUri + "odata/SalesLeads/?" +
                            "$inlinecount=AllPages" +
                            "&$orderby=LastName,FirstName" +
                            "&$filter=startswith(Company,'A')" +
                                 " or startswith(Company,'B')" +
                                 " or startswith(Company,'C')";

    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  var getSalesLead = function (salesLeadId) {

    var restUri = baseUri + "api/SalesLeads/" + salesLeadId;

    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  return {
    getSalesLeads: getSalesLeads,
    getSalesLead: getSalesLead
  };

}();