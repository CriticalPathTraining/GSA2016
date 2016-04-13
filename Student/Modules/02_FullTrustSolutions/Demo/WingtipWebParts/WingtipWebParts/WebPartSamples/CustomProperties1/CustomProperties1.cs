using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.CustomProperties1 {

  public class CustomProperties1 : WebPart {

    [Personalizable(PersonalizationScope.User),
      WebBrowsable(true),
      WebDisplayName("User Greeting"),
      WebDescription("Supplies text content for Web Part"),
      Category("Wingtip Web Parts")]
    public string UserGreeting { get; set; }


    [Personalizable(PersonalizationScope.User),
     WebBrowsable(true),
     WebDisplayName("Text Font Size"),
     WebDescription("Changes text font size"),
     Category("Wingtip Web Parts")]
    public int TextFontSize { get; set; }

    [Personalizable(PersonalizationScope.User),
     WebBrowsable(true),
     WebDisplayName("Text Font Color"),
     WebDescription("Changes text font color"),
     Category("Wingtip Web Parts")]
    public string TextFontColor { get; set; }

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = UserGreeting;
      // set label font size
      if (TextFontSize > 0)
        lbl.Font.Size = new FontUnit(TextFontSize);
      // set label font color
      if (!string.IsNullOrEmpty(TextFontColor))
        lbl.ForeColor = Color.FromName(TextFontColor);
      // add label to Controls collection
      this.Controls.Add(lbl);
    }

  }
}
