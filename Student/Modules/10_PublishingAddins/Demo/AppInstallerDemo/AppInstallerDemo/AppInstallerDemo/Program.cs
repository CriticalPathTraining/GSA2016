using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace AppInstallerDemo {
    class Program {

        private static string siteUrl = "https://dev.wingtip.com/";
        private static Guid AddinProductId = new Guid("2ab41d1e-c8a8-400a-ad6e-7c15fee6a69a");
        private static ClientContext clientContext;
        private static Web site;

        static void Main() {

            EnsureClientContext();
            InstallV1();
            //UpgradeToV2();
            //Uninstall();
        }

        static void EnsureClientContext() {
            // get client context
            clientContext = new ClientContext(siteUrl);
            site = clientContext.Web;
            clientContext.Load(site);
            clientContext.ExecuteQuery();
        }

        static void InstallV1() {
            System.IO.MemoryStream addin1 = new System.IO.MemoryStream(Properties.Resources.CalculatorV1);
            site.LoadAndInstallApp(addin1);
            clientContext.ExecuteQuery();
            Console.WriteLine("Add-in has been installed...");
        }

        static void UpgradeToV2() {
            var apps = site.GetAppInstancesByProductId(AddinProductId);
            clientContext.Load(apps);
            clientContext.ExecuteQuery();
            var app = apps.First();
            System.IO.MemoryStream addin2 = new System.IO.MemoryStream(Properties.Resources.CalculatorV2);
            app.Upgrade(addin2);
            clientContext.ExecuteQuery();
            Console.WriteLine("Add-in upgrade from v1.0 to v2.0");
        }

        static void Uninstall() {
            var apps = site.GetAppInstancesByProductId(AddinProductId);
            clientContext.Load(apps);
            clientContext.ExecuteQuery();
            var app = apps.First();
            app.Uninstall();
            clientContext.ExecuteQuery();
            Console.WriteLine("Add-in uninstalled");
        }
    }
}
