<%@ Page MasterPageFile="~masterurl/default.master" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
  <link href="styles.css" rel="stylesheet" type="text/css" /> 
</asp:Content>    

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
  Page 1 - Pages Lab
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
  Page 1 
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   
  <h3>Quote of the day</h3>

  <p id="quote">When I was growing up I always wanted to be somebody.
                Now I realize that I should have been more specific.</p>

  <p id="quote_author">Steve Wright</p>

</asp:Content>




