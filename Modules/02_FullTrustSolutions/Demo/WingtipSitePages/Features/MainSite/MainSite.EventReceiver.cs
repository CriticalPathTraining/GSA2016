using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Navigation;

namespace WingtipSitePages.Features.MainSite {
    /// <summary>
    /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
    /// </summary>
    /// <remarks>
    /// The GUID attached to this class may be used during packaging and should not be modified.
    /// </remarks>

    [Guid("60a6bdc8-7db8-46f1-9aee-c1e16f94f7d3")]
    public class MainSiteEventReceiver : SPFeatureReceiver {
        // Uncomment the method below to handle the event raised after a feature has been activated.

        public override void FeatureActivated(SPFeatureReceiverProperties properties) {

            SPSite siteCollection = properties.Feature.Parent as SPSite;
            if (siteCollection != null) {
                SPWeb site = siteCollection.RootWeb;
                // create menu items on top link bar for custom site pages
                SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;
                topNav.AddAsLast(new SPNavigationNode("Page 1", "WingtipPages/Page1.aspx"));
                topNav.AddAsLast(new SPNavigationNode("Page 2", "WingtipPages/Page2.aspx"));
                topNav.AddAsLast(new SPNavigationNode("Page 3", "WingtipPages/Page3.aspx"));
            }
        }

        // Uncomment the method below to handle the event raised before a feature is deactivated.

        public override void FeatureDeactivating(SPFeatureReceiverProperties properties) {
            SPSite siteCollection = properties.Feature.Parent as SPSite;
            if (siteCollection != null) {
                SPWeb site = siteCollection.RootWeb;

                try {
                    // delete folder of site pages provisioned during activation
                    SPFolder sitePagesFolder = site.GetFolder("WingtipPages");
                    sitePagesFolder.Delete();
                } catch { }

                SPNavigationNodeCollection topNav = site.Navigation.TopNavigationBar;
                for (int i = topNav.Count - 1; i >= 0; i--) {
                    if (topNav[i].Url.Contains("WingtipPages")) {
                        // delete node
                        topNav[i].Delete();
                    }
                }
            }
        }

        // Uncomment the method below to handle the event raised after a feature has been installed.

        //public override void FeatureInstalled(SPFeatureReceiverProperties properties)
        //{
        //}


        // Uncomment the method below to handle the event raised before a feature is uninstalled.

        //public override void FeatureUninstalling(SPFeatureReceiverProperties properties)
        //{
        //}

        // Uncomment the method below to handle the event raised when a feature is upgrading.

        //public override void FeatureUpgrading(SPFeatureReceiverProperties properties, string upgradeActionName, System.Collections.Generic.IDictionary<string, string> parameters)
        //{
        //}
    }
}
