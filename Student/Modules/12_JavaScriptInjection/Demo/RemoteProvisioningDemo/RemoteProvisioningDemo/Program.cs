using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.SharePoint.Client;
using System.Security;
using System.Net;
using RemoteProvisioningDemo.Models;

namespace RemoteProvisioningDemo {
  class Program {

    static ClientContext clientContext;
    static Site siteCollection;
    static Web site;
    static List CustomPagesLibrary;
    static string CustomPagesLibraryAbsoluteUrl;
    static string CustomPagesLibraryRelativeUrl;
    static Folder siteRootFolder;

    static string AppRootFolderName = "CPT";
    static Folder AppRootFolder;
    static string AppRootFolderRelativeUrl;
    static string AppRootFolderAbsoluteUrl;

    static NavigationNodeCollection TopNavNodes;
    static List listCustomers;

    static void InitializeClientContext(string targetsite) {

      // create new client context
      clientContext = new ClientContext(targetsite);
      
      // get user name and secure password
      string userName = ConfigurationManager.AppSettings["accessAccountName"];
      string pwd = ConfigurationManager.AppSettings["accessAccountPassword"];
      SecureString spwd = new SecureString();
      foreach (char c in pwd.ToCharArray()) {
        spwd.AppendChar(c);
      }
    
        // create credentials for SharePoint Online using Office 365 user account
      clientContext.Credentials = new SharePointOnlineCredentials(userName, spwd);

      // initlaize static variables for client context, web and site
      siteCollection = clientContext.Site;
      clientContext.Load(siteCollection);
      site = clientContext.Web;
      clientContext.Load(site);
      siteRootFolder = site.RootFolder;
      clientContext.Load(siteRootFolder);
      clientContext.Load(site.Lists);

      TopNavNodes = site.Navigation.TopNavigationBar;
      clientContext.Load(TopNavNodes);
      clientContext.ExecuteQuery();

    }

    static void Main() {

      InitializeClientContext("https://CptBiLabs.sharepoint.com");

      DeleteAllSiteUserActions();
      EnsureAppRootFolder();
      UploadAppFiles();
      SetAlternateCssAndSiteIcon();
      EnsureCustomPagesLibrary();
      UploadCustomPages();
      CreateCustomersList();
      CreateScriptLinks();
      CreateCustomSiteActions();
      ConfigureTopNav();
    }

    static void EnsureAppRootFolder() {

      var folders = site.RootFolder.Folders;
      site.Context.Load(folders);
      site.Context.ExecuteQuery();
      // delete scripts folder is it already exists
      if (Enumerable.Any(folders, folder => folder.Name == AppRootFolderName)) {
        site.RootFolder.Folders.GetByUrl(AppRootFolderName).DeleteObject();
        clientContext.ExecuteQuery();
      }

      // create scripts folder
      AppRootFolder = site.RootFolder.Folders.Add(AppRootFolderName);
      AppRootFolder.Folders.Add("content");
      AppRootFolder.Folders.Add("scripts");
      clientContext.Load(AppRootFolder);
      clientContext.ExecuteQuery();

      AppRootFolderRelativeUrl = "~site/" + AppRootFolderName + "/";
      AppRootFolderAbsoluteUrl = site.Url + "/" + AppRootFolderName + "/";

      Console.WriteLine("App Root Folder created at " + AppRootFolderRelativeUrl);
    }

    static void UploadToAppRootFolder(string path, byte[] content) {

      string filePath = AppRootFolderAbsoluteUrl + path;
      Console.WriteLine("Uploading to App Root Folder: " + path);
      FileCreationInformation fileInfo = new FileCreationInformation();
      fileInfo.Content = content;
      fileInfo.Overwrite = true;
      fileInfo.Url = filePath;
      File newFile = AppRootFolder.Files.Add(fileInfo);
      clientContext.ExecuteQuery();

    }

    static void UploadAppFiles() {

      UploadToAppRootFolder("content/styles.css", Properties.Resources.styles_css);
      UploadToAppRootFolder("content/AppIcon.png", Properties.Resources.AppIcon_png);
      UploadToAppRootFolder("content/bootstrap.css", Properties.Resources.bootstrap_css);

      UploadToAppRootFolder("scripts/jquery.js", Properties.Resources.jquery_js);
      UploadToAppRootFolder("scripts/bootstrap.js", Properties.Resources.bootstrap_js);
      UploadToAppRootFolder("scripts/angular.js", Properties.Resources.angular_js);
      UploadToAppRootFolder("scripts/angular-route.js", Properties.Resources.angular_route_js);
      UploadToAppRootFolder("scripts/MdsDemoPage.js", Properties.Resources.MdsDemoPage_js);
      UploadToAppRootFolder("MdsDemoPage.aspx", Properties.Resources.MdsDemoPage_aspx);
      UploadToAppRootFolder("scripts/CustomUserActions.js", Properties.Resources.CustomUserActions_js);
      UploadToAppRootFolder("scripts/CustomersListCSR.js", Properties.Resources.CustomersListCSR_js);

      Folder AngularAppFolder = AppRootFolder.Folders.Add("AngularApp");
      AngularAppFolder.Folders.Add("views");
      clientContext.ExecuteQuery();

      UploadToAppRootFolder("AngularApp.aspx", Properties.Resources.AngularApp_aspx);
      UploadToAppRootFolder("AngularAppExternal.aspx", Properties.Resources.AngularAppExternal_aspx);
      UploadToAppRootFolder("AngularApp/app.css", Properties.Resources.App_css);
      UploadToAppRootFolder("AngularApp/app.js", Properties.Resources.App_js);
      UploadToAppRootFolder("AngularApp/controllers.js", Properties.Resources.controllers_js);
      UploadToAppRootFolder("AngularApp/customersListService.js", Properties.Resources.customersListService_js);
      UploadToAppRootFolder("AngularApp/views/home.html", Properties.Resources.home_html);
      UploadToAppRootFolder("AngularApp/views/new.html", Properties.Resources.new_html);
      UploadToAppRootFolder("AngularApp/views/view.html", Properties.Resources.view_html);
      UploadToAppRootFolder("AngularApp/views/edit.html", Properties.Resources.edit_html);
    }

    static void DisplayAllSiteUserActions() {
      clientContext.Load(site.UserCustomActions);
      clientContext.ExecuteQuery();
      foreach (var action in site.UserCustomActions) {
        Console.WriteLine(action.Title + " - " + action.Location);
      }
    }

    static void DeleteAllSiteUserActions() {
      clientContext.Load(site.UserCustomActions, actions => actions.Include(action => action.Id));
      clientContext.ExecuteQuery();
      List<Guid> actionIds = new List<Guid>();
      foreach (var action in site.UserCustomActions) {
        actionIds.Add(action.Id);
      }
      foreach (Guid actionId in actionIds) {
        clientContext.Load(site.UserCustomActions);
        clientContext.ExecuteQuery();
        site.UserCustomActions.GetById(actionId).DeleteObject();
      }
      clientContext.ExecuteQuery();
    }

    static void SetAlternateCssAndSiteIcon() {
      site.AlternateCssUrl = AppRootFolderAbsoluteUrl + "content/styles.css?v=1.2";
      site.SiteLogoUrl = AppRootFolderAbsoluteUrl + "content/AppIcon.png";
      site.Update();
      clientContext.ExecuteQuery();
    }

    static void CreateScriptLinks() {

      // Register ScriptLink for jQuery
      UserCustomAction customAction1 = site.UserCustomActions.Add();
      customAction1.Title = "jQuery";
      customAction1.Location = "ScriptLink";
      customAction1.ScriptSrc = "~SiteCollection/CPT/scripts/jquery.js";
      customAction1.Sequence = 10;
      customAction1.Update();

      // Register ScriptLink for custom javascript file
      UserCustomAction customAction2 = site.UserCustomActions.Add();
      customAction2.Title = "CustomUserActions";
      customAction2.Location = "ScriptLink";
      customAction2.ScriptSrc = "~SiteCollection/CPT/scripts/CustomUserActions.js";
      customAction2.Sequence = 11;
      customAction2.Update();

      clientContext.ExecuteQuery();
    }

    static void CreateCustomSiteActions() {

      var siteActionsCommand1 = site.UserCustomActions.Add();
      siteActionsCommand1.Group = "SiteActions";
      siteActionsCommand1.Location = "Microsoft.SharePoint.StandardMenu";
      siteActionsCommand1.Sequence = 1000;
      siteActionsCommand1.Title = "Custom Action 1";
      siteActionsCommand1.Description = "Calling a custom JavaScript function";
      siteActionsCommand1.Url = "javascript:CPT.CustomUserActions.CustomAction1();";
      siteActionsCommand1.Update();

      var siteActionsCommand2 = site.UserCustomActions.Add();
      siteActionsCommand2.Group = "SiteActions";
      siteActionsCommand2.Location = "Microsoft.SharePoint.StandardMenu";
      siteActionsCommand2.Sequence = 1001;
      siteActionsCommand2.Title = "Custom Action 2";
      siteActionsCommand2.Description = "Calling a custom JavaScript function";
      siteActionsCommand2.Url = "javascript:CPT.CustomUserActions.CustomAction2();";
      siteActionsCommand2.Update();

      clientContext.ExecuteQuery();
    }

    static void CreateCustomSiteSettingsLinks() {

      var siteSettingsLinkGroup = site.UserCustomActions.Add();
      siteSettingsLinkGroup.Group = "SiteActions";
      siteSettingsLinkGroup.Location = "Microsoft.SharePoint.StandardMenu";
      siteSettingsLinkGroup.Sequence = 1000;
      siteSettingsLinkGroup.Title = "Custom Action 1";
      siteSettingsLinkGroup.Description = "Calling a custom JavaScript function";
      siteSettingsLinkGroup.Url = "javascript:CPT.CustomUserActions.CustomAction1();";
      siteSettingsLinkGroup.Update();

      var siteSettingsLink1 = site.UserCustomActions.Add();
      siteSettingsLink1.Group = "SiteActions";
      siteSettingsLink1.Location = "Microsoft.SharePoint.StandardMenu";
      siteSettingsLink1.Sequence = 1000;
      siteSettingsLink1.Title = "Custom Action 1";
      siteSettingsLink1.Description = "Calling a custom JavaScript function";
      siteSettingsLink1.Url = "javascript:CPT.CustomUserActions.CustomAction1();";
      siteSettingsLink1.Update();

      clientContext.ExecuteQuery();
    }

    static void EnsureCustomPagesLibrary() {

      string libraryTitle = "Custom Pages";
      string libraryUrl = "CustomPages";

      // delete document library if it already exists
      ExceptionHandlingScope scope = new ExceptionHandlingScope(clientContext);
      using (scope.StartScope()) {
        using (scope.StartTry()) {
          site.Lists.GetByTitle(libraryTitle).DeleteObject();
        }
        using (scope.StartCatch()) { }
      }

      ListCreationInformation lci = new ListCreationInformation();
      lci.Title = libraryTitle;
      lci.Url = libraryUrl;
      lci.TemplateType = (int)ListTemplateType.DocumentLibrary;
      CustomPagesLibrary = site.Lists.Add(lci);
      CustomPagesLibrary.OnQuickLaunch = true;
      CustomPagesLibrary.Update();
      CustomPagesLibrary.RootFolder.Folders.Add("content");
      CustomPagesLibrary.RootFolder.Folders.Add("scripts");
      clientContext.Load(CustomPagesLibrary);
      clientContext.ExecuteQuery();

      CustomPagesLibraryRelativeUrl = "~site/" + libraryUrl + "/";
      CustomPagesLibraryAbsoluteUrl = site.Url + "/" + libraryUrl + "/";

    }

    static void UploadToCustomPagesLibrary(string path, byte[] content) {

      string filePath = CustomPagesLibraryAbsoluteUrl + path;
      Console.WriteLine("Uploading to CustomPages folder: " + path);
      FileCreationInformation fileInfo = new FileCreationInformation();
      fileInfo.Content = content;
      fileInfo.Overwrite = true;
      fileInfo.Url = filePath;
      File newFile = CustomPagesLibrary.RootFolder.Files.Add(fileInfo);
      clientContext.ExecuteQuery();

    }

    static void UploadCustomPages() {
      UploadToCustomPagesLibrary("content/styles.css", Properties.Resources.styles_css);
      UploadToCustomPagesLibrary("scripts/SPRestAPI.js", Properties.Resources.SPRestAPI_js);
      UploadToCustomPagesLibrary("SPRestAPI.aspx", Properties.Resources.SPRestApi_aspx);
      UploadToCustomPagesLibrary("scripts/jsom.js", Properties.Resources.JSOM_js);
      UploadToCustomPagesLibrary("JSOM.aspx", Properties.Resources.JSOM_aspx);
    }

    static void CreateTopNavNode(string title, string path) {
      string nodeUrl = site.Url + path;
      NavigationNodeCreationInformation newNode = new NavigationNodeCreationInformation();
      newNode.IsExternal = false;
      newNode.Title = title;
      newNode.Url = nodeUrl;
      newNode.AsLastNode = true;
      TopNavNodes.Add(newNode);
      clientContext.ExecuteQuery();
    }

    static void DeleteAllTopNavNodes() {
      // delete all existing nodes
      for (int index = (TopNavNodes.Count - 1); index >= 0; index--) {
        ExceptionHandlingScope scope = new ExceptionHandlingScope(clientContext);
        using (scope.StartScope()) {
          using (scope.StartTry()) {
            TopNavNodes[index].DeleteObject();
          }
          using (scope.StartCatch()) {
          }
        }
        clientContext.ExecuteQuery();
      }
      clientContext.Load(TopNavNodes);
      clientContext.ExecuteQuery();

    }

    static void AddHomeTopNavNode() {
      NavigationNodeCreationInformation newNode = new NavigationNodeCreationInformation();
      newNode.IsExternal = false;
      newNode.Title = "Home";
      newNode.Url = site.Url;
      newNode.AsLastNode = true;
      TopNavNodes.Add(newNode);
      clientContext.ExecuteQuery();

    }

    static void CreateCustomersList() {

      string listTitle = "Customers";
      string listUrl = "Lists/Customers";

      // delete document library if it already exists
      ExceptionHandlingScope scope = new ExceptionHandlingScope(clientContext);
      using (scope.StartScope()) {
        using (scope.StartTry()) {
          site.Lists.GetByTitle(listTitle).DeleteObject();
        }
        using (scope.StartCatch()) { }
      }

      ListCreationInformation lci = new ListCreationInformation();
      lci.Title = listTitle;
      lci.Url = listUrl;
      lci.TemplateType = (int)ListTemplateType.Contacts;
      listCustomers = site.Lists.Add(lci);
      listCustomers.OnQuickLaunch = true;
      listCustomers.Update();

      // attach JSLink script to default view for client-side rendering
      listCustomers.DefaultView.JSLink = AppRootFolderRelativeUrl + "scripts/CustomersListCSR.js";
      listCustomers.DefaultView.Update();
      listCustomers.Update();
      clientContext.Load(listCustomers);
      clientContext.Load(listCustomers.Fields);
      clientContext.ExecuteQuery();

      string[] UnwantedFields = { "FullName", "JobTitle", "CellPhone", "WorkFax", "WorkCountry", "WebPage", "Comments" };
      foreach (string UnwantedField in UnwantedFields) {
        listCustomers.Fields.GetByInternalNameOrTitle(UnwantedField).DeleteObject();
      }
      clientContext.ExecuteQuery();

      // add some sample data to make things more interesting
      PopulateCustomersList();

    }

    static void PopulateCustomersList() {

      foreach (var customer in CustomersFactory.customers) {
        ListItem newItem = listCustomers.AddItem(new ListItemCreationInformation());
        newItem["FirstName"] = customer.FirstName;
        newItem["Title"] = customer.LastName;
        newItem["Company"] = customer.Company;
        newItem["WorkPhone"] = customer.WorkPhone;
        newItem["HomePhone"] = customer.HomePhone;
        newItem["Email"] = customer.Email;
        newItem.Update();
        clientContext.ExecuteQuery();

      }


    }

    static void DisplayContentTypes() {
      var cts = site.ContentTypes;
      clientContext.Load(cts);
      clientContext.ExecuteQuery();
      foreach (var ct in cts) {
        Console.WriteLine(ct.Name + " - " + ct.Id);
      }

    }

    static void ConfigureTopNav() {
      DeleteAllTopNavNodes();
      AddHomeTopNavNode();
      CreateTopNavNode("REST API", "/CustomPages/SPRestAPI.aspx");
      CreateTopNavNode("JSOM", "/CustomPages/JSOM.aspx");
      CreateTopNavNode("Embedded Angular App", "/CPT/AngularApp.aspx");
      CreateTopNavNode("External Angular App", "/CPT/AngularAppExternal.aspx");
      CreateTopNavNode("MDS Page", "/CPT/MdsDemoPage.aspx");
      CreateTopNavNode("Client-side Rendering", "/Lists/Customers");
    }


  }
}
