using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.EventReceivers;

namespace RemoteEventsDemoWeb.Services {

  public class AnnouncementsEventReceiver : IRemoteEventService {

    // standard entry point for two-way events
    public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties) {
      
      // create SPRemoteEventResult object to use as return value
      SPRemoteEventResult result = new SPRemoteEventResult();

      // inspect the event type of the current event
      if ( (properties.EventType == SPRemoteEventType.ItemAdding) ||
           (properties.EventType == SPRemoteEventType.ItemUpdating) ){
       
        // get user input to perform validation
        string title = properties.ItemEventProperties.AfterProperties["Title"].ToString();
        string body = properties.ItemEventProperties.AfterProperties["Body"].ToString();

        // perform simple validation on user input
        if (title.Contains("Google") || title.Contains("Apple") || title.Contains("NetScape")) {          
          // cancel action due to validation error
          result.Status = SPRemoteEventServiceStatus.CancelWithError;
          result.ErrorMessage = "Title cannot contain inflammatory terms such as 'google', 'apple' or 'NetScape'";
        }

        // Process user input before it's added to the content database
        if (title != title.ToUpper()) {
          result.ChangedItemProperties.Add("Title", title.ToUpper());          
        }      
      }

      return result; // always return SPRemoteEventResult back to SharePoint host
    }

    
    public void ProcessOneWayEvent(SPRemoteEventProperties properties) {
      
      if ((properties.EventType == SPRemoteEventType.ItemAdded) ||
           (properties.EventType == SPRemoteEventType.ItemUpdated)) {
        
        // get column values of the new that has just been created
        string title = properties.ItemEventProperties.AfterProperties["Title"].ToString();
        string body = properties.ItemEventProperties.AfterProperties["Body"].ToString();

        // get information about the hosting list
        string list_title = properties.ItemEventProperties.ListTitle;
        Guid list_id = properties.ItemEventProperties.ListId;

        // get information about current user
        string user = properties.ItemEventProperties.UserDisplayName;

        // now do something with this info such as log it to an external database

      }          
    }

  }
}


