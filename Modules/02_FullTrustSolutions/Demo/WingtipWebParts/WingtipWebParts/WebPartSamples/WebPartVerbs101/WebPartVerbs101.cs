using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.WebPartVerbs101 {
  
  public class WebPartVerbs101 : WebPart {

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = "Boring default value";
      lbl.ForeColor = Color.Blue;
      lbl.Font.Size = new FontUnit(14);
      this.Controls.Add(lbl);
    }

    public override WebPartVerbCollection Verbs {
      get {
        string ClientSideScript = @"
          ExecuteOrDelayUntilScriptLoaded(SayHello, 'sp.js');             
          function SayHello() {
            var message = 'Hello from a client-side Web Part verb';
            SP.UI.Notify.addNotification(message);
           }";
        WebPartVerb verb1 = 
          new WebPartVerb(this.ID + "_verb1", ClientSideScript);
        verb1.Text = "Client-side Verb";

        WebPartVerb verb2 = 
          new WebPartVerb(this.ID + "_verb2",
                          new WebPartEventHandler(OnVerbExecuted));
        verb2.Text = "Server-side verb";

        WebPartVerb verb3 = 
          new WebPartVerb(this.ID + "_verb3",
                          new WebPartEventHandler(OnVerbExecuted),
                          ClientSideScript);
        verb3.Text = "Combo verb";

        WebPartVerb[] verbs = new WebPartVerb[] { verb1, verb2, verb3 };
        return new WebPartVerbCollection(verbs);

      }
    }

    void OnVerbExecuted(object sender, WebPartEventArgs e) {
      EnsureChildControls();
      lbl.Text = "Server-side handler execited at " + 
                 DateTime.Now.ToLongTimeString();
      
      // simulate doing some work
      System.Threading.Thread.Sleep(2000);
    }
  }
}
