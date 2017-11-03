<%@ Assembly Name="Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%  @Page MasterPageFile="~masterurl/default.master"    
          Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage" %>


<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <SharePoint:ScriptLink ID="Ajax" Name="MicrosoftAjax.js" runat="server" />
  <SharePoint:ScriptLink ID="jQuery" Name="~site/CPT/scripts/jquery.js" runat="server" />
  <SharePoint:ScriptLink ID="App" Name="~site/CPT/scripts/MdsDemoPage.js?v=1.0111" runat="server" />
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  MDS Demo Page
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  <div>
    <button id="getSiteProperties" type="button" >Get Site Properties</button>
    <button id="getLists" type="button" >Get Lists</button>
  </div> 
  <div id="content_box" />
</asp:Content>

