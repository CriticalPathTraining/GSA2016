using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;

namespace WingtipWebParts.ListInspectorWebPart {

  public partial class ListInspectorWebPartUserControl : UserControl {

    protected Guid SelectedListId = Guid.Empty;
    protected bool UpdateListProperties = false;

    protected void lstLists_SelectedIndexChanged(object sender, EventArgs e) {
      SelectedListId = new Guid(lstLists.SelectedValue);
      UpdateListProperties = true;
    }

    protected override void OnPreRender(EventArgs e) {

      if ((lstLists.SelectedIndex > -1) & (!UpdateListProperties)) {
        SelectedListId = new Guid(lstLists.SelectedValue);
      }

      lstLists.Items.Clear();
      SPWeb site = SPContext.Current.Web;
      foreach (SPList list in site.Lists) {
        ListItem listItem = new ListItem(list.Title, list.ID.ToString());
        lstLists.Items.Add(listItem);
      }

      // when the page reloads, default the selected item to the current list
      if (SelectedListId != Guid.Empty) {
        lstLists.Items.FindByValue(SelectedListId.ToString()).Selected = true;
      }

      if (UpdateListProperties) {
        SPList list = SPContext.Current.Web.Lists[SelectedListId];
        lblListTitle.Text = list.Title;
        lblListID.Text = list.ID.ToString().ToUpper();
        lblListIsDocumentLibrary.Text = (list is SPDocumentLibrary).ToString();
        lblListIsHidden.Text = list.Hidden.ToString();
        lblListItemCount.Text = list.ItemCount.ToString();
        lnkListUrl.Text = list.DefaultViewUrl;
        lnkListUrl.NavigateUrl = list.DefaultViewUrl;
      }

    }

  }  
}
