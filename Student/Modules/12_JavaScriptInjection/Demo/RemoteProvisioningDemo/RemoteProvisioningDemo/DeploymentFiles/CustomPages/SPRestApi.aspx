<%@ assembly name="Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ page masterpagefile="~masterurl/default.master"
  inherits="Microsoft.SharePoint.WebPartPages.WebPartPage" %>

<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
  <link href="content/styles.css" rel="stylesheet" />
  <script src="https://code.jquery.com/jquery-2.1.4.js" ></script>
  <script src="scripts/SPRestApi.js?v=1.111234"></script> 
</asp:content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  SharePoint REST API
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server"> 
  <div>
    <button id="getSiteProperties" type="button" >Get Site Properties</button>
    <button id="getLists" type="button" >Get Lists</button>
  </div> 
  <div id="content_box" />
</asp:Content>
