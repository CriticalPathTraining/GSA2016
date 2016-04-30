using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.SharePoint.Client;

namespace MyCSOMAppWeb {
  public partial class Default : System.Web.UI.Page {

    protected void Page_Load(object sender, EventArgs e) {

      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);
      this.HostWebLink.NavigateUrl = spContext.SPHostUrl.AbsoluteUri;
      this.HostWebLink.Text = "Back to Host Web";

    }

    protected void cmdGetSiteProperties_Click(object sender, EventArgs e) {

      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);

      using (var clientContext = spContext.CreateUserClientContextForSPHost()) {

        clientContext.Load(clientContext.Web, web => web.Title, web => web.Url, web => web.Id);
        clientContext.ExecuteQuery();

        placeholderMainContent.Text = "<div>Host web title: " + clientContext.Web.Title + "</div>" +
                                      "<div>Host web URL:   " + clientContext.Web.Url + "</div>" +
                                      "<div>Host web ID:    " + clientContext.Web.Id + "</div>";
      }


    }

    protected void cmdGetLists_Click(object sender, EventArgs e) {

      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);

      using (var clientContext = spContext.CreateUserClientContextForSPHost()) {
        clientContext.Load(clientContext.Web);
        ListCollection Lists = clientContext.Web.Lists;
        clientContext.Load(Lists, lists => lists.Where(list => !list.Hidden)
                                                .Include(list => list.Title,

        list => list.DefaultViewUrl));
        clientContext.ExecuteQuery();

        string html = "<h2>Lists in host web</h2>";
        html += "<ul>";
        foreach (var list in Lists) {
          html += "<li>" + list.Title + "</li>";
        }
        html += "</ul>";

        placeholderMainContent.Text = html;
      }


    }

    protected void cmdCreateCustomersList_Click(object sender, EventArgs e) {

      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);

      using (ClientContext clientContext = spContext.CreateUserClientContextForSPHost()) {

        clientContext.Load(clientContext.Web);
        clientContext.ExecuteQuery();
        string listTitle = "Customers";

        // delete list if it exists
        ExceptionHandlingScope scope = new ExceptionHandlingScope(clientContext);
        using (scope.StartScope()) {
          using (scope.StartTry()) {
            clientContext.Web.Lists.GetByTitle(listTitle).DeleteObject();
          }
          using (scope.StartCatch()) { }
        }

        // create and initialize ListCreationInformation object
        ListCreationInformation listInformation = new ListCreationInformation();
        listInformation.Title = listTitle;
        listInformation.Url = "Lists/Customers";
        listInformation.QuickLaunchOption = QuickLaunchOptions.On;
        listInformation.TemplateType = (int)ListTemplateType.Contacts;

        // Add ListCreationInformation to lists collection and return list object
        List list = clientContext.Web.Lists.Add(listInformation);

        // modify additional list properties and update
        list.OnQuickLaunch = true;
        list.EnableAttachments = false;
        list.Update();

        // send command to server to create list
        clientContext.ExecuteQuery();

        // add an item to the list
        ListItemCreationInformation lici1 = new ListItemCreationInformation();
        var item1 = list.AddItem(lici1);
        item1["Title"] = "Lennon";
        item1["FirstName"] = "John";
        item1.Update();

        // add a second item 
        ListItemCreationInformation lici2 = new ListItemCreationInformation();
        var item2 = list.AddItem(lici2);
        item2["Title"] = "McCartney";
        item2["FirstName"] = "Paul";
        item2.Update();

        // send add commands to server
        clientContext.ExecuteQuery();

        // add message to app’s start page        
        placeholderMainContent.Text = "New list created";
      }

    }
  }
}