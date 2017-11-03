using System;
using System.Drawing;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using SP = Microsoft.SharePoint.WebPartPages;

namespace WingtipWebParts.FontConnectionProvider {
  
  public class FontConnectionProvider : WebPart, IFontProvider {

    public FontUnit FontSize {
      get { return new FontUnit(TextFontSize); }
    }

    public Color FontColor {
      get { return Color.FromName(TextFontColor); }
    }

    // expose a connection point
    [ConnectionProvider("Font Formatting", AllowsMultipleConnections = true)]
    public IFontProvider FontProviderConnectionPoint() {
      return this;
    }


    #region "Custom Properties"

    [Personalizable(PersonalizationScope.User),
    WebBrowsable(false)]
    public string UserGreeting { get; set; }

    [Personalizable(PersonalizationScope.User),
    WebBrowsable(false)]
    public int TextFontSize { get; set; }

    [Personalizable(PersonalizationScope.User),
     WebBrowsable(false)]
    public string TextFontColor { get; set; }  

    #endregion

    protected Label lbl;

    protected override void CreateChildControls() {
      lbl = new Label();
      lbl.Text = UserGreeting;

      if (TextFontSize > 0)
        lbl.Font.Size = new FontUnit(TextFontSize);

      if (!string.IsNullOrEmpty(TextFontColor))
        lbl.ForeColor = Color.FromName(TextFontColor);

      this.Controls.Add(lbl);
    }

    #region "Support for Web Part Verbs"

    public override WebPartVerbCollection Verbs {
      get {
        WebPartVerb verbIncreaseFontSize =
          new WebPartVerb(this.ID + "_verbIncreaseFontSize",
                          new WebPartEventHandler(OnIncreaseFontSize));
        verbIncreaseFontSize.Text = "Increase Font Size";
        verbIncreaseFontSize.ImageUrl = "_layouts/images/WingtipWebParts/IncreaseFontSize.gif";
        verbIncreaseFontSize.Enabled = TextFontSize < 32;

        WebPartVerb verbDecreaseFontSize =
          new WebPartVerb(this.ID + "verbDecreaseFontSize",
                          new WebPartEventHandler(OnDecreaseFontSize));
        verbDecreaseFontSize.Text = "Decrease Font Size";
        verbDecreaseFontSize.ImageUrl = "_layouts/images/WingtipWebParts/DecreaseFontSize.gif";
        verbDecreaseFontSize.Enabled = TextFontSize > 14;

        WebPartVerb verbMakeFontBlue =
          new WebPartVerb(this.ID + "_verbMakeFontBlue",
                          new WebPartEventHandler(OnMakeFontBlue));
        verbMakeFontBlue.Text = "Make Font Blue";
        verbMakeFontBlue.Checked = TextFontColor.Equals("Blue");
        verbMakeFontBlue.Enabled = !TextFontColor.Equals("Blue");

        WebPartVerb verbMakeFontGreen =
          new WebPartVerb(this.ID + "_verbMakeFontGreen",
                          new WebPartEventHandler(OnMakeFontGreen));
        verbMakeFontGreen.Text = "Make Font Green";
        verbMakeFontGreen.Checked = TextFontColor.Equals("Green");
        verbMakeFontGreen.Enabled = !TextFontColor.Equals("Green");

        WebPartVerb verbMakeFontRed =
          new WebPartVerb(this.ID + "_verbMakeFontRed",
                          new WebPartEventHandler(OnMakeFontRed));
        verbMakeFontRed.Text = "Make Font Red";
        verbMakeFontRed.Checked = TextFontColor.Equals("Red");
        verbMakeFontRed.Enabled = !TextFontColor.Equals("Red");

        WebPartVerb[] verbs =
          new WebPartVerb[] { 
            verbIncreaseFontSize,
            verbDecreaseFontSize,
            verbMakeFontBlue,
            verbMakeFontGreen,
            verbMakeFontRed
          };

        WebPartVerbCollection baseVerb = base.Verbs;

        return new WebPartVerbCollection(verbs);

      }
    }

    void OnIncreaseFontSize(object sender, WebPartEventArgs e) {
      // change font size in current web part
      switch (this.TextFontSize) {
        case 14:
          this.TextFontSize = 18;
          break;
        case 18:
          this.TextFontSize = 24;
          break;
        case 24:
          this.TextFontSize = 32;
          break;
      }

      // save changes back to content database
      SPWeb site = SPContext.Current.Web;
      SPFile page = site.GetFile(Context.Request.Url.AbsolutePath);
      SP.SPLimitedWebPartManager wpm = page.GetLimitedWebPartManager(PersonalizationScope.User);
      FontConnectionProvider webpart = wpm.WebParts[this.ID] as FontConnectionProvider;
      webpart.TextFontSize = this.TextFontSize;
      wpm.SaveChanges(webpart);
    }

    void OnDecreaseFontSize(object sender, WebPartEventArgs e) {
      // change font size in current web part      
      switch (this.TextFontSize) {
        case 32:
          this.TextFontSize = 24;
          break;
        case 24:
          this.TextFontSize = 18;
          break;
        case 18:
          this.TextFontSize = 14;
          break;
      }

      // save changes back to content database
      SPWeb site = SPContext.Current.Web;
      SPFile page = site.GetFile(Context.Request.Url.AbsolutePath);
      SP.SPLimitedWebPartManager wpm = page.GetLimitedWebPartManager(PersonalizationScope.User);
      FontConnectionProvider webpart = wpm.WebParts[this.ID] as FontConnectionProvider;
      webpart.TextFontSize = this.TextFontSize;
      wpm.SaveChanges(webpart);

    }

    void OnMakeFontBlue(object sender, WebPartEventArgs e) {
      this.TextFontColor = "Blue";
      SPWeb site = SPContext.Current.Web;
      SPFile page = site.GetFile(Context.Request.Url.AbsolutePath);
      SP.SPLimitedWebPartManager wpm = page.GetLimitedWebPartManager(PersonalizationScope.User);
      FontConnectionProvider webpart = wpm.WebParts[this.ID] as FontConnectionProvider;
      webpart.TextFontColor = "Blue";
      wpm.SaveChanges(webpart);
    }

    void OnMakeFontGreen(object sender, WebPartEventArgs e) {
      this.TextFontColor = "Green";
      SPWeb site = SPContext.Current.Web;
      SPFile page = site.GetFile(Context.Request.Url.AbsolutePath);
      SP.SPLimitedWebPartManager wpm = page.GetLimitedWebPartManager(PersonalizationScope.User);
      FontConnectionProvider webpart = wpm.WebParts[this.ID] as FontConnectionProvider;
      webpart.TextFontColor = "Green";
      wpm.SaveChanges(webpart);
    }

    void OnMakeFontRed(object sender, WebPartEventArgs e) {
      this.TextFontColor = "Red";
      SPWeb site = SPContext.Current.Web;
      SPFile page = site.GetFile(Context.Request.Url.AbsolutePath);
      SP.SPLimitedWebPartManager wpm = page.GetLimitedWebPartManager(PersonalizationScope.User);
      FontConnectionProvider webpart = wpm.WebParts[this.ID] as FontConnectionProvider;
      webpart.TextFontColor = "Red";
      wpm.SaveChanges(webpart);
    }

    #endregion



  }
}
