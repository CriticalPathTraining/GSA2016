using System;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;
using Microsoft.SharePoint.Workflow;

namespace ClassicEvents.MoviesEventReceiver {

    public class MoviesEventReceiver : SPItemEventReceiver {

        public override void ItemAdding(SPItemEventProperties properties) {
            string title = properties.AfterProperties["Title"].ToString();
            if (title.Contains("&")) {
                properties.Status = SPEventReceiverStatus.CancelWithError;
                properties.ErrorMessage = "Don' use ampersand (&) in movie title";
            }
        }

        public override void ItemUpdating(SPItemEventProperties properties) {
            string title = properties.AfterProperties["Title"].ToString();
            if (title.Contains("&")) {
                properties.Status = SPEventReceiverStatus.CancelWithError;
                properties.ErrorMessage = "Don' use ampersand (&) in movie title";
            }
        }

        public override void ItemAdded(SPItemEventProperties properties) {
            string title = properties.ListItem["Title"].ToString();
            if (!title.ToUpper().Equals(title)) {
                EventFiringEnabled = false;
                properties.ListItem["Title"] = title.ToUpper();
                properties.ListItem.UpdateOverwriteVersion();
                EventFiringEnabled = true;
            }
        }

        public override void ItemUpdated(SPItemEventProperties properties) {
            string title = properties.ListItem["Title"].ToString();
            if (!title.ToUpper().Equals(title)) {
                EventFiringEnabled = false;
                properties.ListItem["Title"] = title.ToUpper();
                properties.ListItem.UpdateOverwriteVersion();
                EventFiringEnabled = true;
            }
        }
    }
}