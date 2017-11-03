using System;
using System.ComponentModel;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;


namespace WingtipWebParts.AsyncRssReader {

  public class AsyncRssReader : WebPart {


    [ Personalizable(PersonalizationScope.User),
      WebBrowsable(true),
      WebDisplayName("RSS Source URL:"),
      WebDescription("provides address for RSS feed"),
      Category("Wingtip Web Parts")]
    public string RssSourceUrl { get; set; }


    private WebRequest request;
    private Stream response;
    private bool requestTimedOut;

    protected override void OnPreRender(EventArgs e) {



      if (this.WebPartManager.DisplayMode.AllowPageDesign) {
         return;
      }

      if (string.IsNullOrEmpty(RssSourceUrl))
        RssSourceUrl = "http://feeds.feedburner.com/AndrewConnell";

      request = WebRequest.CreateDefault(new Uri(RssSourceUrl));

      PageAsyncTask task1 = new PageAsyncTask(Task1Begin, Task1End, Task1Timeout, null);
      this.Page.AsyncTimeout = new TimeSpan(0, 0, 12);
      this.Page.RegisterAsyncTask(task1);
    }

    IAsyncResult Task1Begin(object sender, EventArgs args, AsyncCallback callback, object state) {
      return request.BeginGetResponse(callback, state);
    }

    void Task1End(IAsyncResult result) {
      response = request.EndGetResponse(result).GetResponseStream();
    }

    void Task1Timeout(IAsyncResult result) {
      requestTimedOut = true;
    }

    protected override void RenderContents(HtmlTextWriter writer) {


      if (this.WebPartManager.DisplayMode.AllowPageDesign) {
         writer.Write("No RSS Reading while in design mode");        
      }
      else if (requestTimedOut || response == null) {
        writer.Write("Request timed out");        
      }
      else{
        XslCompiledTransform transform = new XslCompiledTransform();
        XmlReader xslt = XmlReader.Create(new StringReader(Properties.Resources.RssFeedToHtml));
        transform.Load(xslt);
        XmlReader reader = new XmlTextReader(response);
        XmlTextWriter results = new XmlTextWriter(writer.InnerWriter);
        transform.Transform(reader, results);
        reader.Close();
      }      
    }



  }
}
