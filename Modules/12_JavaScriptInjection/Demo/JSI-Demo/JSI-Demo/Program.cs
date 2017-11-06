using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System.Security;

namespace JSI_Demo {
  class Program {

    static string targetSiteUrl = "https://dev.wingtip.com";

    static ClientContext clientContext;
    static Site siteCollection;
    static Web site;
    static List CustomPagesLibrary;
    static string CustomPagesLibraryAbsoluteUrl;
    static string CustomPagesLibraryRelativeUrl;
    static Folder siteRootFolder;

    static NavigationNodeCollection TopNavNodes;
    static List listContacts;


    static void InitializeClientContext(string targetsite) {

      // create new client context
      clientContext = new ClientContext(targetsite);

      //// get user name and secure password
      //string userName = "myAccount@myDomain.onMicrosoft.com";
      //string pwd = "myEasyToCrackPasword";
      //SecureString spwd = new SecureString();
      //foreach (char c in pwd.ToCharArray()) {
      //  spwd.AppendChar(c);
      //}
      //// create credentials for SharePoint Online using Office 365 user account
      //clientContext.Credentials = new SharePointOnlineCredentials(userName, spwd);

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

      InitializeClientContext(targetSiteUrl);

      EnsureCustomPagesLibrary();
      UploadCustomPages();
      CreateContactsList();
      ConfigureTopNav();
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

      UploadToCustomPagesLibrary("Contacts.aspx", Properties.Resources.Contacts_aspx);
      UploadToCustomPagesLibrary("scripts/Contacts.js", Properties.Resources.Contacts_js);
      UploadToCustomPagesLibrary("scripts/jquery.js", Properties.Resources.jquery_js);
      UploadToCustomPagesLibrary("scripts/jquery-ui.js", Properties.Resources.jquery_ui_js);
      UploadToCustomPagesLibrary("content/jquery-ui.css", Properties.Resources.jquery_ui_css);
      UploadToCustomPagesLibrary("content/app.css", Properties.Resources.App_css);
      UploadToCustomPagesLibrary("content/delitem.gif", Properties.Resources.DELITEM_GIF);
      UploadToCustomPagesLibrary("content/edititem.gif", Properties.Resources.EDITITEM_GIF);
      UploadToCustomPagesLibrary("content/gears.gif", Properties.Resources.GEARS_GIF);
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

    static void CreateContactsList() {

      string listTitle = "Contacts";
      string listUrl = "Lists/Contacts";

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
      listContacts = site.Lists.Add(lci);
      listContacts.OnQuickLaunch = true;
      listContacts.Hidden = true;
      listContacts.Update();

      clientContext.ExecuteQuery();

      // add some sample data to make things more interesting
      PopulateContactsList();

    }


    static void PopulateContactsList() {




      foreach (var contact in Contact.getSamplesContacts()) {
        ListItem newItem = listContacts.AddItem(new ListItemCreationInformation());
        newItem["FirstName"] = contact.FirstName;
        newItem["Title"] = contact.LastName;
        newItem["Company"] = contact.Company;
        newItem["WorkPhone"] = contact.WorkPhone;
        newItem["HomePhone"] = contact.HomePhone;
        newItem["Email"] = contact.Email;
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
      CreateTopNavNode("Contacts", "/CustomPages/Contacts.aspx");
    }


  }


  class Contact {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Company { get; set; }
    public string WorkPhone { get; set; }
    public string HomePhone  { get; set; }
    public string Email{ get; set; }

    public static Contact[] getSamplesContacts() {
      Contact c1 = new Contact { FirstName = "Ted", LastName = "Pattison", Company = "CPT", WorkPhone = "(888)123-4567", HomePhone = "(777)765-4321", Email = "ted@tedpattison.net" };
      Contact c2 = new Contact { FirstName = "Fred", LastName = "Flintstone", Company = "CPT", WorkPhone = "(888)123-4567", HomePhone = "(777)765-4321", Email = "ted@tedpattison.net" };
      Contact c3 = new Contact { FirstName = "Barney", LastName = "Ruble", Company = "CPT", WorkPhone = "(888)123-4567", HomePhone = "(777)765-4321", Email = "ted@tedpattison.net" };
      Contact[] contacts = { c1, c2, c3 };
      return contacts;
    }

  }
  

}
