using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace HelloCSOM {
    class Program {
        static void Main() {

            // get client context
            ClientContext clientContext = new ClientContext("https://intranet.wingtip.com");

            // create variables for CSOM objects
            Site siteCollection = clientContext.Site;
            Web site = clientContext.Web;
            ListCollection lists = site.Lists;

            // give CSOM instructions to populate objects
            clientContext.Load(siteCollection);
            clientContext.Load(site, s => s.Title);
            clientContext.Load(lists, siteLists => siteLists.Where(list => !list.Hidden));

            // make round-trip to SharePoint host to carry out instructions
            clientContext.ExecuteQuery();

            // CSOM object are now initialized
            Console.WriteLine("Site Collection Id:");
            Console.WriteLine(siteCollection.Id);
            Console.WriteLine();
            Console.WriteLine("Site Collection URL:");
            Console.WriteLine(siteCollection.Url);
            Console.WriteLine();
            Console.WriteLine("Title of Top-level Site:");
            Console.WriteLine(site.Title);
            Console.WriteLine();
            Console.WriteLine("Lists in this site");
            Console.WriteLine("------------------");
            foreach (var list in lists) {
                Console.WriteLine(" - " + list.Title);
            }
            Console.ReadLine();
        }
    }
}
