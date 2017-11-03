<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"
    MasterPageFile="~site/Pages/CustomApp.master" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script src="../Scripts/jquery-2.1.0.js"></script>
    <script src="../Scripts/app.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div id="content_box">

        <h2 id="welcome_title">Are you ready to rumble?</h2>

        <img id="contestant_image" src="../Content/img/Smackdown.jpg" alt="contestant" />

        <ul id="contestant_list" >
            <li><a href="#">Caveman</a></li>
            <li><a href="#">jQuery</a></li>
            <li><a href="#">jsRender</a></li>
            <li><a href="#">Knockout</a></li>
            <li><a href="#">Angular</a></li>
            <li><a href="#">Rainman</a></li>
        </ul>

    </div>

</asp:Content>
