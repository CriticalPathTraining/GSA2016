using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.Office.DocumentManagement;

namespace MoreUniqueDocumentIDService.Features.MoreUniqueDocumentIDService
{
  /// <summary>
  /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
  /// </summary>
  /// <remarks>
  /// The GUID attached to this class may be used during packaging and should not be modified.
  /// </remarks>

  [Guid("f2130339-5075-4b63-a3af-71b425fc90ae")]
  public class MoreUniqueDocumentIDServiceEventReceiver : SPFeatureReceiver
  {
    public override void FeatureActivated(SPFeatureReceiverProperties properties)
    {
      SPSite siteCollection = properties.Feature.Parent as SPSite;
      MoreUniqueDocumentIDProvider docIDProvider = new MoreUniqueDocumentIDProvider();

      DocumentId.SetProvider(siteCollection, docIDProvider);
    }

    public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
    {
      SPSite siteCollection = properties.Feature.Parent as SPSite;

      // set the provider back to the the original provider
      DocumentId.SetDefaultProvider(siteCollection);
    }
  }
}