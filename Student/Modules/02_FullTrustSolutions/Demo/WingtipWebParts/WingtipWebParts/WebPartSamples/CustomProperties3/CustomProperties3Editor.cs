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
  class CustomProperties3Editor : EditorPart {

    protected TextBox txtUserGreeting;
    protected RadioButtonList lstFontSizes;
    protected RadioButtonList lstFontColors;


    protected override void CreateChildControls() {

      this.Title = "Custom Wingtip Properties";

      txtUserGreeting = new TextBox();
      txtUserGreeting.TextMode = TextBoxMode.MultiLine;
      txtUserGreeting.Width = new Unit("100%");
      txtUserGreeting.Rows = 2;

      lstFontSizes = new RadioButtonList();
      lstFontSizes.Font.Size = new FontUnit("7pt");
      lstFontSizes.Items.Add("14");
      lstFontSizes.Items.Add("18");
      lstFontSizes.Items.Add("24");
      lstFontSizes.Items.Add("32");

      lstFontColors = new RadioButtonList();
      lstFontColors.Font.Size = new FontUnit("7pt");
      lstFontColors.Items.Add("Black");
      lstFontColors.Items.Add("Green");
      lstFontColors.Items.Add("Blue");
      lstFontColors.Items.Add("Purple");

      Controls.Add(new LiteralControl("<div class='WingtipEditorDiv'>Type a user greeting:</div>"));
      Controls.Add(txtUserGreeting);
      Controls.Add(new LiteralControl("<div class='WingtipEditorDiv'>Select font point size:</div>"));
      Controls.Add(lstFontSizes);
      Controls.Add(new LiteralControl("<div class='WingtipEditorDiv'>Select font color:</div>"));
      Controls.Add(lstFontColors);
    }

    public override void SyncChanges() {
      EnsureChildControls();
      CustomProperties3 webpart = this.WebPartToEdit as CustomProperties3;
      // initialize textbox with UserGreeting property
      txtUserGreeting.Text = webpart.UserGreeting;
      // initialize RadioButtonList to select current font size
      ListItem FontItem = lstFontSizes.Items.FindByText(webpart.TextFontSize.ToString());
      FontItem.Selected = true;
      // initialize RadioButtonList to select current font color
      lstFontColors.Items.FindByText(webpart.TextFontColor).Selected = true;
    }

    public override bool ApplyChanges() {
      EnsureChildControls();
      CustomProperties3 webpart = this.WebPartToEdit as CustomProperties3;
      webpart.UserGreeting = txtUserGreeting.Text;
      webpart.TextFontSize = Convert.ToInt32(lstFontSizes.Text);
      webpart.TextFontColor = lstFontColors.Text;
      // return true to force Web Part Manager to persist changes
      return true;
    }

  }
}
