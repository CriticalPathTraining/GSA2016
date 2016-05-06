using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace UploadSearchDisplayTemplates {

  class Program {

    static ClientContext clientContext;
    static Site siteCollection;
    static Web site;
    static Folder siteRootFolder;
    static string siteRootUrl;


    static void Main(string[] args) {

      string SearchSiteUrl = "https://search.wingtip.com";
      InitializeClientContext(SearchSiteUrl);

      UploadToSearchTemplateFolder("Item_Product.html", Properties.Resources.Item_Product_html);

    }

    static void InitializeClientContext(string targetsite) {

      // create new client context
      clientContext = new ClientContext(targetsite);

      // initlaize static variables for client context, web and site
      siteCollection = clientContext.Site;
      clientContext.Load(siteCollection);
      site = clientContext.Web;
      clientContext.Load(site);
      siteRootFolder = site.RootFolder;
      clientContext.Load(siteRootFolder);
      clientContext.Load(site.Lists);
      clientContext.ExecuteQuery();
      siteRootUrl = site.Url;
      Console.WriteLine("Connected to site at " + siteRootUrl);
      Console.WriteLine();
    }

    static void UploadToSearchTemplateFolder(string path, byte[] content) {

      string filePath = siteRootUrl + "/_catalogs/masterpage/Display Templates/Search/" + path;

      Console.WriteLine("Uploading to Search Template Folder:");
      Console.WriteLine(" - " + path);
      Console.WriteLine();

      FileCreationInformation fileInfo = new FileCreationInformation();
      fileInfo.Content = content;
      fileInfo.Overwrite = true;
      fileInfo.Url = filePath;
      File newFile = siteRootFolder.Files.Add(fileInfo);
      clientContext.ExecuteQuery();

    }


  }

}
