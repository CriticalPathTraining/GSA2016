using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Web.UI.WebControls.WebParts;

using Microsoft.SharePoint;
using Microsoft.SharePoint.Navigation;
using Microsoft.SharePoint.WebPartPages;

using WingtipWebParts.FontConnectionProvider;
using WingtipWebParts.FontConnectionConsumer;

namespace WingtipWebParts.Features.MainSite {
  [Guid("cc2f6e29-744c-41c2-8325-ae04f203e989")]
  public class MainSiteEventReceiver : SPFeatureReceiver {

    public override void FeatureActivated(SPFeatureReceiverProperties properties) {

      SPSite siteCollection = (SPSite)properties.Feature.Parent;
      SPWeb site = siteCollection.RootWeb;

      // create dropdown menu for custom site pages
      SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;

      SPNavigationNode DropDownMenu1 =
        topNav.AddAsLast(new SPNavigationNode("Web Parts 101", ""));

      DropDownMenu1.Children.AddAsLast(new SPNavigationNode("Web Part 1", "WebPartPages/WebPart1.aspx"));
      DropDownMenu1.Children.AddAsLast(new SPNavigationNode("Web Part 2", "WebPartPages/WebPart2.aspx"));
      DropDownMenu1.Children.AddAsLast(new SPNavigationNode("Web Part 3", "WebPartPages/WebPart3.aspx"));
      DropDownMenu1.Children.AddAsLast(new SPNavigationNode("Web Part 4", "WebPartPages/WebPart4.aspx"));
      DropDownMenu1.Children.AddAsLast(new SPNavigationNode("Web Part 5", "WebPartPages/WebPart5.aspx"));

      SPNavigationNode DropDownMenu2 =
        topNav.AddAsLast(new SPNavigationNode("Web Part Samples", ""));

      DropDownMenu2.Children.AddAsLast(new SPNavigationNode("Custom Properties", "WebPartPages/CustomProperties.aspx"));
      DropDownMenu2.Children.AddAsLast(new SPNavigationNode("Web Part Verbs", "WebPartPages/WebPartVerbs.aspx"));
      DropDownMenu2.Children.AddAsLast(new SPNavigationNode("Web Part Connections", "WebPartPages/WebPartConnections.aspx"));
      DropDownMenu2.Children.AddAsLast(new SPNavigationNode("Web Parts Preconnected", "WebPartPages/WebPartsPreconnected.aspx"));
      DropDownMenu2.Children.AddAsLast(new SPNavigationNode("Async Web Part Demo", "WebPartPages/AsyncDemoWebPart.aspx"));


      SPFile page = site.GetFile("WebPartPages/WebPartsPreconnected.aspx");
      SPLimitedWebPartManager mgr = page.GetLimitedWebPartManager(PersonalizationScope.Shared);

      FontConnectionProvider.FontConnectionProvider ProviderWebPart = new FontConnectionProvider.FontConnectionProvider();
      ProviderWebPart.Title = "Left Brain";
      ProviderWebPart.UserGreeting = "I look pretty";
      ProviderWebPart.TextFontSize = 18;
      ProviderWebPart.TextFontColor = "Green";
      mgr.AddWebPart(ProviderWebPart, "Left", 0);

      FontConnectionConsumer.FontConnectionConsumer ConsumerWebPart = new FontConnectionConsumer.FontConnectionConsumer();
      ConsumerWebPart.Title = "Right Brain";
      ConsumerWebPart.UserGreeting = "And so do I";
      mgr.AddWebPart(ConsumerWebPart, "Right", 0);

      mgr.SPConnectWebParts(
        ProviderWebPart,
        mgr.GetProviderConnectionPoints(ProviderWebPart).Default,
        ConsumerWebPart,
        mgr.GetConsumerConnectionPoints(ConsumerWebPart).Default
      );

    }

    public override void FeatureDeactivating(SPFeatureReceiverProperties properties) {

      SPSite siteCollection = (SPSite)properties.Feature.Parent;
      SPWeb site = siteCollection.RootWeb;

      SPFolder WebPartPagesFolder = site.GetFolder("WebPartPages");
      if (WebPartPagesFolder.Exists) {
        WebPartPagesFolder.Delete();
      }


      SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;
      for (int i = topNav.Count - 1; i >= 0; i--) {
        if ((topNav[i].Title == "Web Parts 101") ||
             (topNav[i].Title == "Web Part Samples")) {
          topNav[i].Delete();
        }
      }

      List<SPFile> FilesToDelete = new List<SPFile>();
      // figure out which Web Part template files need to be deleted
      SPList WebPartGallery = site.Lists["Web Part Gallery"];
      foreach (SPListItem WebPartTemplateFile in WebPartGallery.Items) {
        if (WebPartTemplateFile.File.Name.Contains("WingtipWebParts")) {
          FilesToDelete.Add(WebPartTemplateFile.File);
        }
      }

      // delete Web Part template files 
      foreach (SPFile file in FilesToDelete) {
        file.Delete();
      }

    }

  }
}
