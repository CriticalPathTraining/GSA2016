"use strict"

var CPT = window.CPT || {};
CPT.SharePoint = CPT.SharePoint || {};
CPT.SharePoint.Web = CPT.SharePoint.Web || {};

CPT.SharePoint.Web.DataAccess = function () {

  var hostWebUrl = getQueryStringParameter("SPHostUrl");
  var appWebUrl = getQueryStringParameter("SPAppWebUrl");
  var hostWebServerRelativeUrl;

  var getSiteProperties = function () {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/" +
                     "?$select=Id,Title,Description,Language,Created,LastItemModifiedDate,Url,ServerRelativeUrl,WebTemplate,Configuration,MasterUrl,CustomMasterUrl,EnableMinimalDownload,TreeViewEnabled,QuickLaunchEnabled,RecycleBinEnabled,SyndicationEnabled,AllowRssFeeds,UIVersion,UIVersionConfigurationEnabled" +
                     "&@target='" + hostWebUrl + "'";

    var deferred = $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

    deferred.then(function (data) {
      hostWebServerRelativeUrl = data.d.ServerRelativeUrl
    });

    return deferred;

  };

  var getContextInfo = function () {

    // get contextinfo using a POST
    var requestUri = "../_api/contextinfo/";

    return $.ajax({
      url: requestUri,
      type: "POST",
      headers: { "accept": "application/json;odata=verbose" }
    });

  };

  var getLists = function () {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/lists/" +
                     "?$filter=(Hidden eq false) and (BaseType eq 0)&$select=Id,Title, BaseTemplate, BaseType, Created, EnableAttachments, EnableVersioning, ItemCount, EntityTypeName, ListItemEntityTypeFullName" +
                     "&@target='" + hostWebUrl + "'";

    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" }
    });

  };

  var getLibraries = function () {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/lists/" +
                     "?$filter=(Hidden eq false) and (BaseType eq 1)&$select=Id,Title, BaseTemplate, BaseType, Created, DocumentTemplateUrl, EnableAttachments, EnableFolderCreation, EnableVersioning, EnableMinorVersions, ForceCheckout, Hidden, ItemCount, EntityTypeName, ListItemEntityTypeFullName" + 
                     "&@target='" + hostWebUrl + "'";;

    // send call across network
    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

  };

  var getSiteUsers = function () {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/siteUsers/" +
                     "?@target='" + hostWebUrl + "'";

    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" }
    });

  };

  var getSiteGroups = function () {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/siteGroups/" + 
                     "?$expand=Users" +
                     "&@target='" + hostWebUrl + "'";;

    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

  };


  var getFileHierarchy = function () {


    if (!hostWebServerRelativeUrl) {
      alert("Error: hostWebServerRelativeUrl cannot be blank");
    }

    var requestUri = "../_api/SP.AppContextSite(@target)/web/GetFolderByServerRelativeUrl('" + hostWebServerRelativeUrl + "')/" +
                     "?$expand=Folders,Files,Folders/Files,Folders/Folders/Files" + 
                     "&@target='" + hostWebUrl + "'";
    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

  }

  var getFolders = function (siteRelativeUrl) {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/GetFolderByServerRelativeUrl('" + siteRelativeUrl + "')/folders/" +
                     "?$orderby=Name" + 
                     "&@target='" + hostWebUrl + "'";
    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" },
    });

  }

  var getFiles = function (siteRelativeUrl) {

    var requestUri = "../_api/SP.AppContextSite(@target)/web/GetFolderByServerRelativeUrl('" + siteRelativeUrl + "')/files/" +
                     "?$orderby=Name" +
                     "&@target='" + hostWebUrl + "'";

    return $.ajax({
      url: requestUri,
      type: "GET",
      headers: { "accept": "application/json;odata=verbose" }
    });

  }

  function getQueryStringParameter(paramName) {
    var querystring = document.URL.split("?")[1];
    if (querystring) {
      var params = querystring.split("&");
      for (var index = 0; (index < params.length) ; index++) {
        var current = params[index].split("=");
        if (paramName.toUpperCase() === current[0].toUpperCase()) {
          return decodeURIComponent(current[1]);
        }
      }
    }
  }

  // public interface
  return {
    getSiteProperties: getSiteProperties,
    getContextInfo: getContextInfo,
    getLists: getLists,
    getLibraries: getLibraries,
    getFileHierarchy: getFileHierarchy,
    getFolders: getFolders,
    getFiles: getFiles,
    getSiteUsers: getSiteUsers,
    getSiteGroups: getSiteGroups
  };

}();
