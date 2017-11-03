<%  @Page MasterPageFile="~masterurl/default.master"    
          Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>


<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

  <script src="https://code.jquery.com/jquery-2.1.4.js" ></script>
  
  <script>

    // delay script execution until SOD file has downloaded
    ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

    function initializePage() {

      // create variables to track CSOM objects
      var context = SP.ClientContext.get_current();
      var user = context.get_web().get_currentUser();
      var groups = context.get_web().get_currentUser().get_groups();

      // use jQuery Document Ready event to call to CSOM and load user information
      $(function () {
        context.load(user);
        context.load(groups);
        context.executeQueryAsync(onDisplayUserInformation, onError);
      });

      function createTableRow(name, value) {
        return $("<tr>").append( $("<td>").text(name) )
                        .append( $("<td>").text(value) );
      }

      function onDisplayUserInformation() {

        // Display user title
        var htmlTable = $("<table>", {});
        htmlTable.append(createTableRow("ID:", user.get_id()));
        htmlTable.append(createTableRow("Title:", user.get_title()));
        htmlTable.append(createTableRow("Email: ", user.get_email()));
        htmlTable.append(createTableRow("Login Name", user.get_loginName()));
        htmlTable.append(createTableRow("Is Site Admin:", user.get_isSiteAdmin()));

        $("#content_box").empty().append(htmlTable);
      }

      function onError(err, err_args) {
        alert('Failed to get user name. Error:' + err_args.get_message());
      }
    }
  </script>

  
  <style type="text/css">
    #content_box table { border-collapse: collapse; }
    #content_box table tr td { border: 1px solid black; padding: 4px; font-size: 1.25em; }
  </style>

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  
  <div id="content_box" >getting user info...</div>

</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
  Current User Info
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  Current User Info
</asp:Content>
