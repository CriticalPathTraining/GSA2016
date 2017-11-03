using System;
using System.Drawing;
using System.Web.UI.WebControls;

namespace WingtipWebParts {
  public interface IFontProvider {
    FontUnit FontSize { get; }
    Color FontColor { get; }
  }
}
