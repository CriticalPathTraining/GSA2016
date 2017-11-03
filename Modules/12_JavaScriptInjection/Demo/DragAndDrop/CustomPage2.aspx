<%@ Page MasterPageFile="~masterurl/default.master"
  Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>


<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

  <script src="https://code.jquery.com/jquery-2.1.4.js" ></script>

  <script>

    $(function () {
      $("#getSiteProperties").click(onGetSiteProperties);
      $("#getLists").click(onGetLists);
    });

    function onGetSiteProperties() {
      var urlRest = "../_api/web/?$select=Id,Title,Url";
      $.ajax({
        url: urlRest,
        method: "GET",
        headers: { "accept": "application/json;odata=verbose" }
      }).then(function (data) {
        $("#content_box")
          .empty()
          .append($("<ul>")
            .append($("<li>").text("ID: " + data.d.Id))
            .append($("<li>").text("Title: " + data.d.Title))
            .append($("<li>").text("Url: " + data.d.Url))
          );
      });
    }

    function onGetLists() {
      var urlRest = "../_api/web/lists/?$filter=(Hidden eq false)";
      $.ajax({
        url: urlRest,
        method: "GET",
        headers: { "accept": "application/json;odata=verbose" }
      }).then(function (data) {
        var lists = data.d.results;
        var listOfLists = $("<ul>");
        for (var listIndex = 0; listIndex < lists.length; listIndex++) {
          listOfLists.append( $("<li>").text(lists[listIndex].Title) );
        }
        $("#content_box").empty().append(listOfLists);
      });
    }


  </script>

</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
  Custom Page with Script
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  Custom Page with Script
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

  <div>
    <button id="getSiteProperties" type="button">Get Site Properties</button>
    <button id="getLists" type="button">Get Lists</button>
  </div>

  <div id="content_box" />

</asp:Content>
