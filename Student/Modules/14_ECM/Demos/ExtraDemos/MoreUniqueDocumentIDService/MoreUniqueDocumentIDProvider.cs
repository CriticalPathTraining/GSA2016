using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.DocumentManagement;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Administration;

namespace MoreUniqueDocumentIDService
{
  public class MoreUniqueDocumentIDProvider : DocumentIdProvider
  {
    // format of the generated document ID
    // First part of each: [WebApp GUID].[SPSite GUID].[SPWeb GUID].[SPList GUID]-[SPListItem GUID]
    private const string DOCID_FORMAT = "{0}-{1}-{2}-{3}-{4}";

    /// <summary>
    /// Flag indicating SharePoint should use the provider's GetDocumentUrlsById before
    /// using SharePoint OOTB search.
    /// </summary>
    public override bool DoCustomSearchBeforeDefaultSearch
    {
      get { return false; }
    }

    /// <summary>
    /// Generates a new document ID based on the provided SPListItem.
    /// </summary>
    public override string GenerateDocumentId(SPListItem listItem)
    {
      string listItemID = listItem.ID.ToString();
      string listID = listItem.ParentList.ID.ToString().Substring(0, 4);
      string siteID = listItem.Web.ID.ToString().Substring(0, 4);
      string siteCollectionID = listItem.Web.Site.ID.ToString().Substring(0, 4);
      string webAppID = listItem.Web.Site.WebApplication.Id.ToString().Substring(0, 4);

      return string.Format(DOCID_FORMAT,
        webAppID,
        siteCollectionID,
        siteID,
        listID,
        listItemID);
    }

    /// <summary>
    /// Searches for a specific document ID.
    /// </summary>
    public override string[] GetDocumentUrlsById(SPSite hostingSiteCollection, string documentId)
    {
      List<string> possibleURLs = new List<string>();

      string[] brokenDownDocID = documentId.Split("-".ToCharArray()[0]);

      // find the Web application
      SPWebService webService = hostingSiteCollection.WebApplication.WebService;
      foreach (SPWebApplication webAppplication in webService.WebApplications)
      {
        if (webAppplication.Id.ToString().StartsWith(brokenDownDocID[0]))
        {

          // find the SPSite (if multiple, won't matter as it will go to next one...)
          foreach (SPSite siteCollection in webAppplication.Sites)
          {
            if (siteCollection.ID.ToString().StartsWith(brokenDownDocID[1]))
            {

              // find the SPWeb (if multiple, won't matter as it will go to next one...)
              foreach (SPWeb site in siteCollection.AllWebs)
              {
                if (site.ID.ToString().StartsWith(brokenDownDocID[2]))
                {

                  foreach (SPList list in site.Lists)
                  {
                    if (list.ID.ToString().StartsWith(brokenDownDocID[3]))
                    {
                      // find the item in the list
                      SPListItem targetItem = list.GetItemById(Int32.Parse(brokenDownDocID[4]));

                      if (targetItem != null)
                        possibleURLs.Add(String.Format("{0}//{1}", site.Url, targetItem.Url));
                    }
                  }

                }
              }
            }
          }

        }
      }

      return possibleURLs.ToArray();
    }

    /// <summary>
    /// Generates a sample document ID used in the search box.
    /// </summary>
    public override string GetSampleDocumentIdText(Microsoft.SharePoint.SPSite site)
    {
      return string.Format(DOCID_FORMAT,
        "55DA526F",
        "FD9D4836",
        "FD0910DC",
        "15B4AD8A",
        "ABDC1A45");
    }
  }
}
