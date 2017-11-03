using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Navigation;

namespace SitePageLab.Features.MainSite {

    [Guid("82b1cb6e-9d5b-45db-814e-4e80efa0bdcc")]
    public class MainSiteEventReceiver : SPFeatureReceiver {

        public override void FeatureActivated(SPFeatureReceiverProperties properties) {

            SPSite siteCollection = properties.Feature.Parent as SPSite;
            if (siteCollection != null) {
                SPWeb site = siteCollection.RootWeb;
                // create menu items on top link bar for custom site pages
                SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;
                topNav.AddAsLast(new SPNavigationNode("Page 1", "MySitePages/Page1.aspx"));
                topNav.AddAsLast(new SPNavigationNode("Page 2", "MySitePages/Page2.aspx"));
                topNav.AddAsLast(new SPNavigationNode("Page 3", "MySitePages/Page3.aspx"));
            }

        }

        public override void FeatureDeactivating(SPFeatureReceiverProperties properties) {
            SPSite siteCollection = properties.Feature.Parent as SPSite;
            if (siteCollection != null) {
                SPWeb site = siteCollection.RootWeb;

                try {
                    // delete folder of site pages provisioned during activation
                    SPFolder sitePagesFolder = site.GetFolder("MySitePages");
                    sitePagesFolder.Delete();
                }
                catch { }

                SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;
                for (int i = topNav.Count - 1; i >= 0; i--) {
                    if (topNav[i].Url.Contains("MySitePages")) {
                        // delete node
                        topNav[i].Delete();
                    }
                }
            }
        }



    }
}
