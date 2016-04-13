using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.WebPart2 {

  public class WebPart2 : WebPart {

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = "Hello Child Controls";
      lbl.Font.Size = new FontUnit(18);
      lbl.ForeColor = Color.Blue;
      this.Controls.Add(lbl);
    }

  }
}
