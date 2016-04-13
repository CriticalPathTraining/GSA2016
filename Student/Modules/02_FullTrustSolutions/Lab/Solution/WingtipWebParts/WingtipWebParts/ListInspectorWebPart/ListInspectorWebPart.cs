using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.ListInspectorWebPart {
  [ToolboxItemAttribute(false)]
  public class ListInspectorWebPart : WebPart {
    // Visual Studio might automatically update this path when you change the Visual Web Part project item.
    private const string _ascxPath = @"~/_CONTROLTEMPLATES/15/WingtipWebParts/ListInspectorWebPart/ListInspectorWebPartUserControl.ascx";

    protected override void CreateChildControls() {
      Control control = Page.LoadControl(_ascxPath);
      Controls.Add(control);
    }
  }
}
