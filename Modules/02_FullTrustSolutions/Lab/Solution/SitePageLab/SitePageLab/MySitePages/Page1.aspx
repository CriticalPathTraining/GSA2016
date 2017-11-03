<%@ Page MasterPageFile="~masterurl/default.master" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <!-- add link to css file -->
    <link href="styles.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Page 1 - Site Page Lab
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page 1 
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <h3>Quote of the day</h3>

    <p id="quote">
        When I was growing up I always wanted to be somebody.
                Now I realize that I should have been more specific.
    </p>

    <p id="quote_author">Steve Wright</p>

</asp:Content>




