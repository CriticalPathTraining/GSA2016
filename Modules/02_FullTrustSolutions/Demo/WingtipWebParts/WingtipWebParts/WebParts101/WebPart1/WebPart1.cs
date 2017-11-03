using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

namespace WingtipWebParts.WebPart1 {

  public class WebPart1 : WebPart {

    protected override void RenderContents(HtmlTextWriter writer) {
      writer.AddStyleAttribute(HtmlTextWriterStyle.Color, "Blue");
      writer.AddStyleAttribute(HtmlTextWriterStyle.FontSize, "18px");
      writer.RenderBeginTag(HtmlTextWriterTag.Div);
      writer.Write("Hello World");
      writer.RenderEndTag(); // </div>
    }

  }
}