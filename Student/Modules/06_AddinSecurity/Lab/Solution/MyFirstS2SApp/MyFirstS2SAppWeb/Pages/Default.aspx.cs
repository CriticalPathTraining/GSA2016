using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

// added by student
using System.Net;
using System.Xml.Linq;

namespace MyFirstS2SAppWeb {
  public partial class Default : System.Web.UI.Page {

    protected void Page_Load(object sender, EventArgs e) {      
      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);
      this.HostWebLink.NavigateUrl = spContext.SPHostUrl.AbsoluteUri;
      this.HostWebLink.Text = "Back to Host Web";
    }

    protected void cmdGetTitleCSOM_Click(object sender, EventArgs e) {
      SharePointContext spContext =
      SharePointContextProvider.Current.GetSharePointContext(Context);

      using (var clientContext = spContext.CreateUserClientContextForSPHost()) {
        clientContext.Load(clientContext.Web);
        clientContext.ExecuteQuery();
        placeholderMainContent.Text = "Host web title (CSOM): " + clientContext.Web.Title;
      }

    }

    protected void cmdGetTitleREST_Click(object sender, EventArgs e) {

      SharePointContext spContext =
        SharePointContextProvider.Current.GetSharePointContext(Context);

      string restUri = spContext.SPHostUrl + "_api/web/title";

      HttpWebRequest request = WebRequest.Create(restUri) as HttpWebRequest;
      request.Accept = "application/atom+xml";

      string spAccessToken = spContext.UserAccessTokenForSPHost;
      request.Headers["Authorization"] = "Bearer " + spAccessToken;

      HttpWebResponse response = request.GetResponse() as HttpWebResponse;
      XDocument responseBody = XDocument.Load(response.GetResponseStream());

      XNamespace nsDataService = "http://schemas.microsoft.com/ado/2007/08/dataservices";
      string hostWebTitle = responseBody.Descendants(nsDataService + "Title").First().Value;

      placeholderMainContent.Text = "Host web title (REST): " + hostWebTitle;

    }

  }
}