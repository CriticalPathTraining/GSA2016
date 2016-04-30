using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using RemoteAppPagesWeb;

namespace RemotePagesWeb.Pages {
    public partial class CustomAction : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            HtmlTableWriter table1 = new HtmlTableWriter();

            foreach (var param in Request.QueryString.AllKeys) {
                table1.AddRow("Request.QueryString['" + param + "']", Request.QueryString[param].ToString());
            }

            pageContent.Controls.Add(new LiteralControl("<h3>Query String Parameters</h3>"));
            pageContent.Controls.Add(new LiteralControl(table1.ToString()));


            HtmlTableWriter table2 = new HtmlTableWriter();

            string urlSourcePage = Request.QueryString["Source"].ToString();
            string linkSourcePage = "<a href='" + urlSourcePage + "'>" + urlSourcePage + "</a>";
            table2.AddRow("[Source]", linkSourcePage);

            string urlList = Request.QueryString["SPHostUrl"].ToString() + Request.QueryString["ListURLDir"].ToString();
            string linkList = "<a href='" + urlList + "' target='_blank'>" + urlList + "</a>";
            table2.AddRow("[SPHostUrl] + [ListURLDir]", linkList);

            string urlItem = Request.QueryString["SPHostUrl"].ToString() + Request.QueryString["ItemURL"].ToString();
            string linkItem = "<a href='" + urlItem + "' target='_blank'>" + urlItem + "</a>";
            table2.AddRow("[SPHostUrl] + [ItemURL]", linkItem);

            pageContent.Controls.Add(new LiteralControl("<h3>Links back to host web</h3>"));
            pageContent.Controls.Add(new LiteralControl(table2.ToString()));

        }
    }
}