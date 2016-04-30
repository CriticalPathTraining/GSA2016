using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.SharePoint.Client;

namespace OAuthAddinDemoWeb.Pages {
    public partial class AppOnly : System.Web.UI.Page {

        private string contextTokenString;
        private string uriHostWeb;
        private string accessTokenString;
        private string appOnlyAccessTokenString;

        protected void Page_Load(object sender, EventArgs e) {

            uriHostWeb = Cache["uriHostWeb"].ToString();
            appOnlyAccessTokenString = Cache["appOnlyAccessTokenString"].ToString();

            HtmlTableWriter table = new HtmlTableWriter();

            ClientContext clientContext =
              TokenHelper.GetClientContextWithAccessToken(uriHostWeb.ToString(), appOnlyAccessTokenString);
            clientContext.Load(clientContext.Web, site => site.Title);
            clientContext.Load(clientContext.Web.Lists, lists => lists.Where(list => !list.Hidden));
            clientContext.ExecuteQuery();

            table.AddRow("Site Title", clientContext.Web.Title);

            string ListOfLists = "<ul>";
            foreach (var list in clientContext.Web.Lists) {
                ListOfLists += "<li>" + list.Title + "</li>";
            }
            ListOfLists += "</ul>";
            table.AddRow("Lists", ListOfLists);

            PlaceholderMain.Controls.Add(new LiteralControl(table.ToString()));

        }
    }
}