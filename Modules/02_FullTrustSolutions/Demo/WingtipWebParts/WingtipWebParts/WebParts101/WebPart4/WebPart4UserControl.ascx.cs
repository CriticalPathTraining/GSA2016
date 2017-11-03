using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace WingtipWebParts.WebPart4 {
  public partial class WebPart4UserControl : UserControl {

    protected void cmdAddSalesLead_Click(object sender, EventArgs e) {
      ClientScriptManager CSM = this.Page.ClientScript;
      string key = "WingtipScript";
      string script = @"
             ExecuteOrDelayUntilScriptLoaded(AddSaleslead, 'sp.js');             
             function AddSaleslead() {
               var message = 'Code to add sales lead left as exercise for the reader';
               SP.UI.Notify.addNotification(message);
             }";
      CSM.RegisterStartupScript(this.GetType(), key, script, true);
    }
  }
}
