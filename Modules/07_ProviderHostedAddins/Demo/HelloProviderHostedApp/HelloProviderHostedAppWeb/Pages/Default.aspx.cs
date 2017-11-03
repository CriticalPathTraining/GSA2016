using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HelloProviderHostedAppWeb.Pages {
  public partial class Default : System.Web.UI.Page {

    protected void Page_Load(object sender, EventArgs e) {

      // delete all existing code added by Visual Studio - it requires authentication

      // Configure ASP.NET Hyperlink control with value from SPHostUrl querystring
      linkHostWeb.NavigateUrl = Request.QueryString["SPHostUrl"];

      // add some content to the page using server-side code
      PlaceHolderMain.Controls.Add( new LiteralControl("Hello from server-side C# code"));
 
    }
  }
}

