var hostWebUrl;
var hostLayoutsUrl;

// Load the SharePoint resources.
$(document).ready(function () {
  hostWebUrl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
  hostLayoutsUrl = hostWebUrl + "/_layouts/15/";

  var options = {
    siteUrl: hostWebUrl,
    siteTitle: "Host Web",
    appHelpPageUrl: "help.aspx?SPHostUrl=" + hostWebUrl,
    appIconUrl: "/Content/AppIcon.png",
    appTitle: "OAuth Demo App",
    settingsLinks: [
      { linkUrl: "default.aspx?SPHostUrl=" + hostWebUrl, displayName: "Home" },
      { linkUrl: "CSOM.aspx?SPHostUrl=" + hostWebUrl, displayName: "CSOM Calls" },
      { linkUrl: "REST.aspx?SPHostUrl=" + hostWebUrl, displayName: "REST API Calls" },
      { linkUrl: "AppOnly.aspx?SPHostUrl=" + hostWebUrl, displayName: "App-only Calls" },

    ]
  };

  var nav = new SP.UI.Controls.Navigation("chrome_ctrl_container", options);
  nav.setVisible(true);

  var helpIconUrl = hostWebUrl + "/_layouts/15/1033/images/spintl.png";
  var helpLink = $("#chromeControl_topheader_helplink")
  helpLink.css({ "background-image": "url('" + helpIconUrl + "')" });
});

function getQueryStringParameter(paramToRetrieve) {
  var params = document.URL.split("?")[1].split("&");
  var strParams = "";
  for (var i = 0; i < params.length; i = i + 1) {
    var singleParam = params[i].split("=");
    if (singleParam[0] == paramToRetrieve)
      return singleParam[1];
  }
}
