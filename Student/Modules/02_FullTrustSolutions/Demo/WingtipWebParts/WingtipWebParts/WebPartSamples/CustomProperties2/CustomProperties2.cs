using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.CustomProperties2 {


  public enum TextFontSizeEnum {
    Fourteen = 14,
    Eighteen = 18,
    TwentyFour = 24,
    ThirtyTwo = 32
  }

  public enum TextFontColorEnum {
    Purple,
    Green,
    Blue,
    Black
  }

  public class CustomProperties2 : WebPart {

    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(true),
      WebDisplayName("User Greeting"),
      WebDescription("Supplies text content for Web Part"),
      Category("Wingtip Web Parts")]
    public string UserGreeting { get; set; }


    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(true),
      WebDisplayName("Text Font Size"),
      WebDescription("Changes text font size"),
      Category("Wingtip Web Parts")]
    public TextFontSizeEnum TextFontSize { get; set; }

    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(true),
      WebDisplayName("Text Font Color"),
      WebDescription("Changes text font color"),
      Category("Wingtip Web Parts")]
    public TextFontColorEnum TextFontColor { get; set; }

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = UserGreeting;

      if (TextFontSize > 0)
        lbl.Font.Size = new FontUnit(Convert.ToInt32(TextFontSize));

      if (TextFontColor > 0)
        lbl.ForeColor = Color.FromName(TextFontColor.ToString());

      this.Controls.Add(lbl);
    }



  }
}
