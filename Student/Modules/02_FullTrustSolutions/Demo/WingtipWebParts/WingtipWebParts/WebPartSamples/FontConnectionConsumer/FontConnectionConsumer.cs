using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.FontConnectionConsumer {
  
  public class FontConnectionConsumer : WebPart {

    protected IFontProvider FontProvider;


    [ConnectionConsumer("Font Formatting", AllowsMultipleConnections=false)]
    public void FontProviderConnectionPoint(IFontProvider provider) {
      FontProvider = provider;
    }

    protected override void OnPreRender(EventArgs e) {
      if (FontProvider != null) {
        lbl.ForeColor = FontProvider.FontColor;
        lbl.Font.Size = FontProvider.FontSize;
      }
    }


    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(false) ]
    public string UserGreeting { get; set; }

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.EnableViewState = false;
      lbl.Text = UserGreeting;
      this.Controls.Add(lbl);
    }

  }
}
