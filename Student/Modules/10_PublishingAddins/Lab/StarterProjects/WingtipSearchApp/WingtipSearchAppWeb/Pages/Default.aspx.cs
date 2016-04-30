using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.Search;
using Microsoft.SharePoint.Client.Search.Query;

namespace WingtipSearchAppWeb {
  public partial class Default : System.Web.UI.Page {

    protected void Page_Load(object sender, EventArgs e) {
      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);
      linkHostWeb.NavigateUrl = spContext.SPHostUrl.AbsoluteUri;
    }

    protected void cmdSearchSites_Click(object sender, EventArgs e) {
      RunSearch("ContentClass:STS_SITE");
      txtUserText.Text = "ContentClass:STS_SITE";
    }

    protected void cmdSearchLists_Click(object sender, EventArgs e) {
      RunSearch("ContentClass:STS_LIST");
      txtUserText.Text = "ContentClass:STS_LIST";
    }
    
    protected void cmdSearchTasks_Click(object sender, EventArgs e) {
      RunSearch("ContentClass:STS_LISTITEM_TASK");
      txtUserText.Text = "ContentClass:STS_LISTITEM_TASK";
    }

    protected void cmdGeneralSearch_Click(object sender, EventArgs e) {
      RunSearch(txtUserText.Text);
    }

    private void RunSearch(string searchText) {
      SharePointContext spContext = SharePointContextProvider.Current.GetSharePointContext(Context);
      Uri hostWeb = spContext.SPHostUrl;

      using (var context = TokenHelper.GetS2SClientContextWithWindowsIdentity(hostWeb, Request.LogonUserIdentity)) {
        //Get current user
        User currentUser = context.Web.CurrentUser;
        context.Load(currentUser);
        context.ExecuteQuery();

        //Get current user's tasks
        KeywordQuery keywordQuery = new KeywordQuery(context);
        keywordQuery.QueryText = searchText;
        var searchExecutor = new SearchExecutor(context);
        ClientResult<ResultTableCollection> resultsCollection = searchExecutor.ExecuteQuery(keywordQuery);
        context.ExecuteQuery();


        //Bind them to the grid
        IEnumerable<IDictionary<string, object>> results = resultsCollection.Value[0].ResultRows;
        List<Task> tasks = new List<Task>();
        foreach (var result in results) {
          Task task = new Task();
          task.Title = result["Title"].ToString();
          task.Path = result["Path"].ToString();
          tasks.Add(task);
        }

        SearchResultsView.DataSource = tasks;
        SearchResultsView.DataBind();
      }

    }


  }
}