using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.CustomProperties3 {
 
  public class CustomProperties3 : WebPart {

    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(false) ]
    public string UserGreeting { get; set; }

    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(false) ]
    public int TextFontSize { get; set; }

    [Personalizable(PersonalizationScope.User),
     WebBrowsable(false) ]
    public string TextFontColor { get; set; }

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = UserGreeting;

      if (TextFontSize > 0)
        lbl.Font.Size = new FontUnit(TextFontSize);

      if (!string.IsNullOrEmpty(TextFontColor))
        lbl.ForeColor = Color.FromName(TextFontColor);

      this.Controls.Add(lbl);
    }

public override EditorPartCollection CreateEditorParts() {
  EditorPart editor = new CustomProperties3Editor();
  editor.ID = this.ID + "_editor";
  EditorPart[] parts = { editor };
  return new EditorPartCollection(parts);
}
  }
}
