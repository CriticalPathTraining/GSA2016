<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"
    MasterPageFile="~site/Pages/CustomApp.master" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

    <script src="../Scripts/jquery-2.1.0.js"></script>
    <script src="../Scripts/knockout-3.0.0.js"></script>
    <script src="../Scripts/Wingtip.Customers.DataAccess.js"></script>

    <script src="../Scripts/slingers/knockout.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div id="content_box" >

        <table id="customersTable">
            <thead>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Company</td>
                    <td>Work Phone</td>
                    <td>Home Phone</td>
                    <td>Email</td>
                </tr>
            </thead>
            <tbody id="resultsTable" data-bind="foreach: customers()">
                <tr>
                    <td data-bind="text: FirstName"></td>
                    <td data-bind="text: Title"></td>
                    <td data-bind="text: Company"></td>
                    <td data-bind="text: WorkPhone"></td>
                    <td data-bind="text: HomePhone"></td>
                    <td data-bind="text: Email"></td>
                </tr>
            </tbody>
        </table>

    </div>

</asp:Content>


