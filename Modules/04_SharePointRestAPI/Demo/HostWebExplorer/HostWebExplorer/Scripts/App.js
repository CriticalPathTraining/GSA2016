'use strict';

var CptSite;

$(PreInitializePage);

function PreInitializePage() {
  $("#tabs").tabs();
  displayQueryStringParameters();
  CptSite = CPT.SharePoint.Web.DataAccess;
  CptSite.getSiteProperties().then(onSitePropertiesReceived, onError);
}

function InitializePage() {
  CptSite.getContextInfo().then(onContextInfoReceived, onError);
  CptSite.getLists().then(onListsReceived, onError);
  CptSite.getLibraries().then(onLibrariesReceived, onError);
  CptSite.getFileHierarchy().then(onFileHierarchyReceived, onError);
  CptSite.getSiteUsers().then(onSiteUsersReceived, onError);
  CptSite.getSiteGroups().then(onSiteGroupsReceived, onError);
}

function displayQueryStringParameters() {
  var querystring = document.URL.split("?")[1];
  if (querystring) {

    var table = $("<table>", { "class": "table_inside_tab" });

    table.append($("<thead>")
                    .append($("<tr>")
                      .append($("<td>").text("Parameter"))
                      .append($("<td>").text("Value"))));

    var params = querystring.split("&");
    for (var index = 0; (index < params.length) ; index++) {

      var current = params[index].split("=");




      table.append($("<tr>")
                     .append($("<td>").text(current[0]))
                     .append($("<td>").text(decodeURIComponent(current[1]))));

    }

    $("#startPageContainer")
      .empty()
      .append(table)
  }
}

function onSitePropertiesReceived(data) {
  var siteProperties = data.d;

  var table = $("<table>", { "class": "table_inside_tab" });

  table.append($("<thead>")
                  .append($("<tr>")
                    .append($("<td>").text("Property"))
                    .append($("<td>").text("Value"))));


  table.append($("<tr>")
                 .append($("<td>").text("Id"))
                 .append($("<td>").text(siteProperties.Id)));

  table.append($("<tr>")
              .append($("<td>").text("Title"))
              .append($("<td>").text(siteProperties.Title)));

  if (siteProperties.Description) {
    table.append($("<tr>")
                  .append($("<td>").text("Description"))
                  .append($("<td>").text(siteProperties.Description)));
  }

  table.append($("<tr>")
                  .append($("<td>").text("Language"))
                  .append($("<td>").text(siteProperties.Language)));

  table.append($("<tr>")
                  .append($("<td>").text("Created"))
                  .append($("<td>").text(siteProperties.Created)));

  table.append($("<tr>")
                  .append($("<td>").text("LastItemModifiedDate"))
                  .append($("<td>").text(siteProperties.LastItemModifiedDate)));

  table.append($("<tr>")
                  .append($("<td>").text("Url"))
                  .append($("<td>").text(siteProperties.Url)));

  table.append($("<tr>")
                  .append($("<td>").text("ServerRelativeUrl"))
                  .append($("<td>").text(siteProperties.ServerRelativeUrl)));

  table.append($("<tr>")
                  .append($("<td>").text("WebTemplate"))
                  .append($("<td>").text(siteProperties.WebTemplate)));

  table.append($("<tr>")
                  .append($("<td>").text("Configuration"))
                  .append($("<td>").text(siteProperties.Configuration)));

  table.append($("<tr>")
                  .append($("<td>").text("MasterUrl"))
                  .append($("<td>").text(siteProperties.MasterUrl)));

  table.append($("<tr>")
                  .append($("<td>").text("CustomMasterUrl"))
                  .append($("<td>").text(siteProperties.CustomMasterUrl)));

  table.append($("<tr>")
                  .append($("<td>").text("EnableMinimalDownload"))
                  .append($("<td>").text(siteProperties.EnableMinimalDownload)));

  table.append($("<tr>")
                  .append($("<td>").text("TreeViewEnabled"))
                  .append($("<td>").text(siteProperties.TreeViewEnabled)));

  table.append($("<tr>")
                  .append($("<td>").text("QuickLaunchEnabled"))
                  .append($("<td>").text(siteProperties.QuickLaunchEnabled)));

  table.append($("<tr>")
                  .append($("<td>").text("RecycleBinEnabled"))
                  .append($("<td>").text(siteProperties.RecycleBinEnabled)));

  table.append($("<tr>")
                  .append($("<td>").text("SyndicationEnabled"))
                  .append($("<td>").text(siteProperties.SyndicationEnabled)));

  table.append($("<tr>")
                  .append($("<td>").text("AllowRssFeeds"))
                  .append($("<td>").text(siteProperties.AllowRssFeeds)));

  table.append($("<tr>")
                  .append($("<td>").text("UIVersion"))
                  .append($("<td>").text(siteProperties.UIVersion)));

  table.append($("<tr>")
                  .append($("<td>").text("UIVersionConfigurationEnabled"))
                  .append($("<td>").text(siteProperties.UIVersionConfigurationEnabled)));


  $("#sitePropertiesContainer")
    .empty()
    .append(table);

  InitializePage();

}

function onContextInfoReceived(data) {
  var contextInfo = data.d.GetContextWebInformation;

  var table = $("<table>", { "class": "table_inside_tab" });

  table.append($("<thead>")
                  .append($("<tr>")
                    .append($("<td>").text("Property"))
                    .append($("<td>").text("Value"))));

  table.append($("<tr>")
                 .append($("<td>").text("WebFullUrl"))
                 .append($("<td>").text(contextInfo.WebFullUrl)));

  table.append($("<tr>")
                 .append($("<td>").text("SiteFullUrl"))
                 .append($("<td>").text(contextInfo.SiteFullUrl)));

  table.append($("<tr>")
                 .append($("<td>").text("FormDigestValue"))
                 .append($("<td>").text(contextInfo.FormDigestValue)));

  table.append($("<tr>")
                 .append($("<td>").text("FormDigestTimeoutSeconds"))
                 .append($("<td>").text(contextInfo.FormDigestTimeoutSeconds)));

  table.append($("<tr>")
                 .append($("<td>").text("SupportedSchemaVersions"))
                 .append($("<td>").text(contextInfo.SupportedSchemaVersions.results)));


  $("#contextInfoContainer")
    .empty()
    .append(table);

}

function onListsReceived(data) {

  var lists = data.d.results;
  var listsAccordian = $("<div>");
  for (var index = 0; index < lists.length; index++) {

    listsAccordian.append($("<h3>").text(lists[index].Title));

    var tableContainer = $("<div>");
    var table = $("<table>", { "class": "table_inside_accordian" });

    table.append($("<tr>")
      .append($("<td>").text("Created"))
      .append($("<td>").text(lists[index].Created)));

    table.append($("<tr>")
            .append($("<td>").text("Id"))
            .append($("<td>").text(lists[index].Id)));

    table.append($("<tr>")
                .append($("<td>").text("Title"))
                .append($("<td>").text(lists[index].Title)));

    table.append($("<tr>")
        .append($("<td>").text("BaseTemplate"))
        .append($("<td>").text(lists[index].BaseTemplate)));

  
    table.append($("<tr>")
        .append($("<td>").text("EnableAttachments"))
        .append($("<td>").text(lists[index].EnableAttachments)));

    table.append($("<tr>")
        .append($("<td>").text("EnableVersioning"))
        .append($("<td>").text(lists[index].EnableVersioning)));

    table.append($("<tr>")
        .append($("<td>").text("ItemCount"))
        .append($("<td>").text(lists[index].ItemCount)));

    tableContainer.append(table);
    listsAccordian.append(tableContainer);
  }

  listsAccordian.accordion({ collapsible: true, active: false, autoHeight: true });

  $("#listsContainer")
    .empty()
    .append(listsAccordian);


};

function onLibrariesReceived(data) {
  var libraries = data.d.results;
  var librariesAccordian = $("<div>");
  for (var index = 0; index < libraries.length; index++) {

    librariesAccordian.append($("<h4>").text(libraries[index].Title));

    var tableContainer = $("<div>");
    
    var table = $("<table>", { "class": "table_inside_accordian" });


    table.append($("<tr>")
                .append($("<td>").text("Title"))
                .append($("<td>").text(libraries[index].Title)));

    table.append($("<tr>")
            .append($("<td>").text("Id"))
            .append($("<td>").text(libraries[index].Id)));

    table.append($("<tr>")
        .append($("<td>").text("BaseTemplate"))
        .append($("<td>").text(libraries[index].BaseTemplate)));

    table.append($("<tr>")
        .append($("<td>").text("BaseType"))
        .append($("<td>").text(libraries[index].BaseType)));

    table.append($("<tr>")
        .append($("<td>").text("Created"))
        .append($("<td>").text(libraries[index].Created)));

    if (libraries[index].DocumentTemplateUrl) {
      table.append($("<tr>")
          .append($("<td>").text("EnableAttachments"))
          .append($("<td>").text(libraries[index].EnableAttachments)));
    }

    table.append($("<tr>")
        .append($("<td>").text("EnableVersioning"))
        .append($("<td>").text(libraries[index].EnableVersioning)));


    table.append($("<tr>")
        .append($("<td>").text("ItemCount"))
        .append($("<td>").text(libraries[index].ItemCount)));

    tableContainer.append(table);
    librariesAccordian.append($("<div>").append(tableContainer));
  }

  librariesAccordian.accordion({ collapsible: true, active: false, autoHeight: false });

  $("#librariesContainer")
    .empty()
    .append(librariesAccordian);

}

function onFileHierarchyReceived(data) {
  var rootFolder = data.d;
  var serverRelativeUrl = rootFolder.ServerRelativeUrl;
  
  var fileHierarchyContainer = $("#fileHierarchyContainer");
  var fileHierarchyList = $("<ul>", { "class": "filetree" });

  var folders = rootFolder.Folders.results;
  if (folders) { folders.sort(SortByName); }
  for (var index = 0; index < folders.length; index++) {
    var folder = folders[index];
    var listItem = $("<li>", { "class": "closed" });
    listItem.append($("<span>", { "class": "folder" }).text(folder.Name));
    fileHierarchyList.append(listItem);
    var childFolders = folder.Folders.results;
    var childFiles = folder.Files.results;
    LoadChildFolders(listItem, childFolders, childFiles);
  }

  var files = rootFolder.Files.results;
  if (files) { files.sort(SortByName); }
  for (var index = 0; index < files.length; index++) {
    var listItem = $("<li>");
    listItem.append($("<span>", { "class": "file" }).text(files[index].Name));
    fileHierarchyList.append(listItem);
  }

  fileHierarchyList.treeview();
  fileHierarchyContainer.append(fileHierarchyList);

}

function LoadChildFolders(parentListItem, folders, files) {

  var foldersExist = ((typeof folders != 'undefined') && (typeof folders.length != 'undefined'));
  var filesExist = ((typeof files != 'undefined') && (typeof files.length != 'undefined'));

  if (foldersExist || filesExist) {

    var list = $("<ul>");

    if (foldersExist) {
      folders.sort(SortByName);
      for (var index = 0; index < folders.length; index++) {
        var folder = folders[index];
        var listItem = $("<li>", { "class": "closed" });
        listItem.append($("<span>", { "class": "folder" }).text(folder.Name));
        list.append(listItem);
        var childFolders = folder.Folders.results;
        var childFiles = folder.Files.results;
        LoadChildFolders(listItem, childFolders, childFiles);
      }
    }

    if (filesExist) {
      files.sort(SortByName);
      for (var index = 0; index < files.length; index++) {
        var file = files[index];
        var listItem = $("<li>", {"Title": file.Name });
        listItem.append($("<span>", { "class": "file" }).text(file.Name));
        list.append(listItem);
      }
    }

    parentListItem.append(list);
  }
}

function onSiteUsersReceived(data) {

  var siteUsers = data.d.results;
  siteUsers.sort(SortById);

  var panel = $("#siteUsers");
  panel.append($("<h2>").text("Site Users"));

  var table = $("<table>", { "class": "table_inside_tab" });
  table.append($("<thead>")
                  .append($("<tr>")
                    .append($("<td>").text("ID"))
                    .append($("<td>").text("Title"))
                    .append($("<td>").text("LoginName"))
                    .append($("<td>").text("PrincipalType"))
                    .append($("<td>").text("IsSiteAdmin"))));


  for (var index = 0; index < siteUsers.length; index++) {
    var siteUser = siteUsers[index];
    table.append($("<tr>")
                .append($("<td>").text(siteUser.Id))
                .append($("<td>").text(siteUser.Title))
                .append($("<td>").text(siteUser.LoginName))
                .append($("<td>").text(siteUser.PrincipalType))
                .append($("<td>").text(siteUser.IsSiteAdmin)));
  }
  panel.append(table);  
}

function onSiteGroupsReceived(data) {

  var siteGroups = data.d.results;
  siteGroups.sort(SortById);

  var panel = $("#siteGroups");
  panel.append($("<h2>").text("Site Groups"));
  
  var table = $("<table>", { "class": "table_inside_tab" });
  table.append($("<thead>")
                  .append($("<tr>")
                    .append($("<td>").text("ID"))
                    .append($("<td>").text("Title"))
                    .append($("<td>").text("Users"))));


  for (var index = 0; index < siteGroups.length; index++) {

    var siteGroup = siteGroups[index];

    var siteGroupUsers = siteGroup.Users.results;
    var siteGroupUserNames = "(empty)";

    var usersExist = ((typeof siteGroupUsers != 'undefined') && (typeof siteGroupUsers.length != 'undefined') && (siteGroupUsers.length > 0));
    if (usersExist) {
      siteGroupUserNames = "";
      for (var innerIndex = 0; innerIndex < siteGroupUsers.length; innerIndex++) {
        var siteGroupUser = siteGroupUsers[innerIndex];
        siteGroupUserNames += siteGroupUser.Title + ": ";
      }
    }

    table.append($("<tr>")
                .append($("<td>").text(siteGroup.Id))
                .append($("<td>").text(siteGroup.Title))
                .append($("<td>").text(siteGroupUserNames)));

  }
  panel.append(table);
}

function SortByName(a, b) {
  var aName = a.Name.toLowerCase();
  var bName = b.Name.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function SortById(a, b) {
  return ((a.Id < b.Id) ? -1 : ((a.Id > b.Id) ? 1 : 0));
}

function onError(error) {
  alert(JSON.stringify(error));
}
