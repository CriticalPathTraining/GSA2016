/// <reference path="jquery-2.0.3.js" />

var hostweburl;
var appweburl;

$(document).ready(function () {
  hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
  appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
  $("#cmdMakeCDLCall").click(onMakeCDLCall);  
});

function onMakeCDLCall() {
  
  var executorUrl = appweburl + "/_api/SP.AppContextSite(@target)/" + 
                                "web/title?@target='" + hostweburl + "'";

  var executor = new SP.RequestExecutor(appweburl);
  executor.executeAsync(
      { url: executorUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: onSuccess,
        error: onError
      }
  );
}

function onSuccess(data) {
  var jsonObject = JSON.parse(data.body);
  $("#results").text("The title of the host web is " + jsonObject.d.Title);
}

function onError(data, errorCode, errorMessage) {
  $("#results").text("Could not complete cross-domain call: " + errorMessage);
}

function getQueryStringParameter(paramToRetrieve) {
  var params =  document.URL.split("?")[1].split("&");
  var strParams = "";
  for (var i = 0; i < params.length; i = i + 1) {
    var singleParam = params[i].split("=");
    if (singleParam[0] == paramToRetrieve)
      return singleParam[1];
  }
}
