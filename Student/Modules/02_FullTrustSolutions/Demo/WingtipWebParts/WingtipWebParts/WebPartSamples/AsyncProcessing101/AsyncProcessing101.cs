using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace WingtipWebParts.AsyncProcessing101 {
  public class AsyncProcessing101 : WebPart {

    protected string localBuffer;
    protected string outputMessage;

     protected override void OnPreRender(EventArgs e) {
      PageAsyncTask task1 = new PageAsyncTask(Task1Begin, Task1End, Task1Timeout, null);
      this.Page.RegisterAsyncTask(task1);
    }

    IAsyncResult Task1Begin(object sender, EventArgs args, AsyncCallback callback, object state) {
      Action func1 = new Action(GetDataFromNetwork);
      return func1.BeginInvoke(callback, state);    
    }

    void GetDataFromNetwork(){
      // simulate calling across network
      System.Threading.Thread.Sleep(3000);
      localBuffer = "Testing 1, 2, 3...";
    }

    void Task1End(IAsyncResult result) {
      outputMessage = "Data from accross network:" + localBuffer;
    }

    void Task1Timeout(IAsyncResult result) {
      outputMessage = "Oooooppps, there was a timeout";
    }

    protected override void RenderContents(HtmlTextWriter writer) {
      writer.RenderBeginTag(HtmlTextWriterTag.Div);
      writer.Write(outputMessage);
      writer.RenderEndTag();
    }

  }
}
