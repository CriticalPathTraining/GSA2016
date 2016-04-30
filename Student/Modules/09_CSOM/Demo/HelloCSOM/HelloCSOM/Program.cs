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
      ClientContext clientContext = new ClientContext("http://intranet.wingtip.com");

      // create variables for CSOM objects
      Site siteCollection = clientContext.Site;
      Web site = clientContext.Web;
      ListCollection lists = site.Lists;

      // give CSOM instructions to populate objects
      clientContext.Load(siteCollection);
      clientContext.Load(site);
      clientContext.Load(lists);

      // make round-trip to SharePoint host to carry out instructions
      clientContext.ExecuteQuery();

      // CSOM object are now initialized
      Console.WriteLine(siteCollection.Id);
      Console.WriteLine(site.Title);
      Console.WriteLine(lists.Count);

      // retrieve another CSOM object
      List list = lists.GetByTitle("Documents");
      clientContext.Load(list);

      // make a second round-trip to SharePoint host
      clientContext.ExecuteQuery();
      
      Console.WriteLine(list.Title);

      Console.ReadLine();

    }
  }
}
