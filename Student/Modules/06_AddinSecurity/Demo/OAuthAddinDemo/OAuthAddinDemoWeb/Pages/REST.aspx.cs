using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.SharePoint.Client;
using System.Net;
using System.Text;
using System.IO;
using System.Xml;
using System.Xml.Linq;

namespace OAuthAddinDemoWeb.Pages {

    public partial class REST : System.Web.UI.Page {


        private string contextTokenString;
        private string uriHostWeb;
        private string accessTokenString;
        private string appOnlyAccessTokenString;

        protected void Page_Load(object sender, EventArgs e) {

            uriHostWeb = Cache["uriHostWeb"].ToString();
            accessTokenString = Session["accessTokenString"].ToString();

            HtmlTableWriter table = new HtmlTableWriter();

            HttpWebRequest request1 =
              (HttpWebRequest)HttpWebRequest.Create(uriHostWeb.ToString() + "/_api/Web/title");
            request1.Headers.Add("Authorization", "Bearer " + accessTokenString);

            HttpWebResponse response1 = (HttpWebResponse)request1.GetResponse();
            StreamReader reader1 = new StreamReader(response1.GetResponseStream());
            XDocument doc1 = XDocument.Load(reader1);
            string SiteTitle = doc1.Root.Value;

            table.AddRow("Site Title", SiteTitle);


            HttpWebRequest request2 =
              (HttpWebRequest)HttpWebRequest.Create(uriHostWeb.ToString() + "/_api/Web/lists/?$filter=Hidden eq false");
            request2.Headers.Add("Authorization", "Bearer " + accessTokenString);

            HttpWebResponse response2 = (HttpWebResponse)request2.GetResponse();
            StreamReader reader2 = new StreamReader(response2.GetResponseStream());
            XDocument doc2 = XDocument.Load(reader2);
            XNamespace ns_dataservices = "http://schemas.microsoft.com/ado/2007/08/dataservices";

            string ListOfLists = "<ul>";
            foreach (XElement ListTitleNode in doc2.Descendants(ns_dataservices + "Title")) {
                ListOfLists += "<li>" + ListTitleNode.Value + "</li>";
            }
            ListOfLists += "</ul>";
            table.AddRow("Lists", ListOfLists);

            PlaceholderMain.Controls.Add(new LiteralControl(table.ToString()));
        }
    }
}