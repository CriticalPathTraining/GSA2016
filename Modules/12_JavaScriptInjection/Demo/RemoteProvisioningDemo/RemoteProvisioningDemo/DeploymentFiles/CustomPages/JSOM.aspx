<%@ assembly name="Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ page masterpagefile="~masterurl/default.master"
  inherits="Microsoft.SharePoint.WebPartPages.WebPartPage" %>

<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
  <script src="https://code.jquery.com/jquery-2.1.4.js" ></script>
  <script src="scripts/jsom.js?v=1.1"></script> 
</asp:content>

<asp:content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
  JavaScript Object Model (JSOM)
</asp:content>


<asp:content contentplaceholderid="PlaceHolderMain" runat="server">
  
  <div id="content_box" >getting user info...</div>

</asp:content>

