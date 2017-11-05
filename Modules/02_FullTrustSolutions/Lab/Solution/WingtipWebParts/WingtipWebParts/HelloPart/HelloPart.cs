using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.HelloPart {
  [ToolboxItemAttribute(false)]
  public class HelloPart : WebPart {
    protected override void CreateChildControls() {
      var label = new Label() { Text = "Hello Web Part" };
      this.Controls.Add(label);
    }
  }
}
