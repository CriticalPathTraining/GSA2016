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

namespace WingtipWebParts.WebPart5 {

  public class WebPart5 : WebPart {
    
protected override void RenderContents(HtmlTextWriter writer) {

  // get data from across network
  string urlRSS = "http://feeds.feedburner.com/AndrewConnell";
  WebRequest request = WebRequest.CreateDefault(new Uri(urlRSS));
  WebResponse response = request.GetResponse();
  Stream responseStream = response.GetResponseStream();
  XslCompiledTransform transform = new XslCompiledTransform();
  string xsltContent = Properties.Resources.RssFeedToHtml;
  XmlReader xslt = XmlReader.Create(new StringReader(xsltContent));
  transform.Load(xslt);
  XmlReader reader = new XmlTextReader(responseStream);
  XmlTextWriter results = new XmlTextWriter(writer.InnerWriter);
  transform.Transform(reader, results);
  reader.Close();


}
  }
}
