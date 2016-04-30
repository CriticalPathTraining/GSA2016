
// create global variable with standard JavaScript approach
var CptCanary = window.CptCanary || {};

CptCanary.greeting = "tweet, tweet";


// create global variable by registering namespace with ASP.NET AJAX
Type.registerNamespace("CPT");

CPT.MdsDemoPage = function () {
  console.log("executing main MdsDemoPage function");

  var initializeMDS = function () {
    console.log("executing initializeMDS function");
    if (CPT.MdsDemoPage.MdsEnabled == undefined) {
      // add handler for MDS page transitions
      asyncDeltaManager.add_endRequest(onMdsAfter);
      // set variable to inidicate event handler has been registered
      CPT.MdsDemoPage.MdsEnabled = true;
    }
  };

  var onMdsAfter = function (source, args) {
    console.log("onMdsAfter handler executing");
    var currentPage = source._currentUrl;
    console.log("current url: " + currentPage);
    var currentPageIsMdsDemoPage = (currentPage.indexOf("MdsDemoPage.aspx") > -1);
    if (currentPageIsMdsDemoPage) {
      registerEventHandlers();
    }  
  };

  var registerEventHandlers = function () {
    console.log("registerEventHandlers executing");

    // register event handlers
    $("#getSiteProperties").click(onGetSiteProperties);
    $("#getLists").click(onGetLists);

  }

  var onGetSiteProperties = function () {
    var urlRest = "../../../_api/web/?$select=Id,Title,Url";
    $.ajax({
      url: urlRest,
      method: "GET",
      headers: { "accept": "application/json;odata=verbose" }
    }).then(function (data) {
      $("#content_box")
        .empty()
        .append($("<ul>")
          .append($("<li>").text("ID: " + data.d.Id))
          .append($("<li>").text("Title: " + data.d.Title))
          .append($("<li>").text("Url: " + data.d.Url))
        );
    });
  }

  var onGetLists = function () {
    var urlRest = "../../../_api/web/lists/?$filter=(Hidden eq false)";
    $.ajax({
      url: urlRest,
      method: "GET",
      headers: { "accept": "application/json;odata=verbose" }
    }).then(function (data) {
      var lists = data.d.results;
      var listOfLists = $("<ul>");
      for (var listIndex = 0; listIndex < lists.length; listIndex++) {
        listOfLists.append($("<li>").text(lists[listIndex].Title));
      }
      $("#content_box").empty().append(listOfLists);
    });
  }

  // public interface
  return {
    initializeMDS: initializeMDS,
    registerEventHandlers: registerEventHandlers
  };

}();


if (typeof asyncDeltaManager !== 'undefined') {
  console.log("Initialize page in MDS mode");
  CPT.MdsDemoPage.initializeMDS();
}
else {
  console.log("Initialize page in standard (non-MDS) mode");
  $(CPT.MdsDemoPage.registerEventHandlers);
}

