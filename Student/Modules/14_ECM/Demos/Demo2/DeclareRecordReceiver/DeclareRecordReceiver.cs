using System;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;
using Microsoft.SharePoint.Workflow;

namespace DeclareRecordProgramaticallyDemo.DeclareRecordReceiver
{
    /// <summary>
    /// List Item Events
    /// </summary>
    public class DeclareRecordReceiver : SPItemEventReceiver
    {
        /// <summary>
        /// An item is being added.
        /// </summary>
        public override void ItemAdded(SPItemEventProperties properties)
        {
            if (properties.ListItem.Name.ToLower().Contains("declare"))
            {
                this.EventFiringEnabled = false;
                Microsoft.Office.RecordsManagement.RecordsRepository.Records.DeclareItemAsRecord(properties.ListItem);
                this.EventFiringEnabled = true;
            }
            base.ItemAdded(properties);
        }

        /// <summary>
        /// An item is being updated.
        /// </summary>
        public override void ItemUpdated(SPItemEventProperties properties)
        {
            if (properties.ListItem.Name.ToLower().Contains("declare"))
            {
                this.EventFiringEnabled = false;
                Microsoft.Office.RecordsManagement.RecordsRepository.Records.DeclareItemAsRecord(properties.ListItem);
                this.EventFiringEnabled = true;
            }
            base.ItemAdded(properties);
        }


    }
}