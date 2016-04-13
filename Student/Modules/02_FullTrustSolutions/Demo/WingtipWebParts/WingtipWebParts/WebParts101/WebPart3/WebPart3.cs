using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.WebPart3 {


public class WebPart3 : WebPart {

  protected TextBox txtFirstName;
  protected TextBox txtLasttName;
  protected TextBox txtEmail;
  protected Button cmdAddSalesLead;

  protected override void CreateChildControls() {
    txtFirstName = new TextBox();
    txtFirstName.MaxLength = 16;
    Controls.Add(txtFirstName);

    txtLasttName = new TextBox();
    txtLasttName.MaxLength = 16;
    Controls.Add(txtLasttName);

    txtEmail = new TextBox();
    txtEmail.MaxLength = 24;
    Controls.Add(txtEmail);

    cmdAddSalesLead = new Button();
    cmdAddSalesLead.Text = "Add Sales Lead";
    cmdAddSalesLead.Click += new EventHandler(cmdAddSalesLead_Click);
    Controls.Add(cmdAddSalesLead);
    
  }

  void cmdAddSalesLead_Click(object sender, EventArgs e) {
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

  protected override void RenderContents(HtmlTextWriter writer) {

    writer.AddAttribute(HtmlTextWriterAttribute.Type, "text/css");
    writer.RenderBeginTag(HtmlTextWriterTag.Style);
    writer.Write("table.MainForm td {padding: 4px; }");
    writer.RenderEndTag();

    writer.AddAttribute(HtmlTextWriterAttribute.Class, "MainForm");
    writer.RenderBeginTag(HtmlTextWriterTag.Table);
    writer.RenderBeginTag(HtmlTextWriterTag.Tr);
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    writer.Write("First Name:");
    writer.RenderEndTag(); // </td>
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    txtFirstName.RenderControl(writer);
    writer.RenderEndTag(); // </td>
    writer.RenderEndTag(); // </tr>

    writer.RenderBeginTag(HtmlTextWriterTag.Tr);
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    writer.Write("Last Name:");
    writer.RenderEndTag(); // </td>
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    txtLasttName.RenderControl(writer);
    writer.RenderEndTag(); // </td>
    writer.RenderEndTag(); // </tr>

    writer.RenderBeginTag(HtmlTextWriterTag.Tr);
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    writer.Write("Email:");
    writer.RenderEndTag(); // </td>
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    txtEmail.RenderControl(writer);
    writer.RenderEndTag(); // </td>
    writer.RenderEndTag(); // </tr>

    writer.RenderBeginTag(HtmlTextWriterTag.Tr);
    writer.AddAttribute(HtmlTextWriterAttribute.Colspan, "2");
    writer.RenderBeginTag(HtmlTextWriterTag.Td);
    cmdAddSalesLead.RenderControl(writer);
    writer.RenderEndTag(); // </td>     

    writer.RenderEndTag(); // </table>

  }

}
}
