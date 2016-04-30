<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-2.1.0.js"></script>
    <script type="text/javascript" src="../Scripts/northwind.query.js"></script>
    <script type="text/javascript" src="../Scripts/northwind.viewmodel.js"></script>
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="dashboard-Container">
        <div class="dashboard-Title">Northwind Traders Dashboard</div>
        <div class="dashboard-Left">
            <div class="dashboard-Header">Categories</div>
            <div>
                <ul id="categoryList" data-bind="foreach: get_categories()">
                    <li>
                        <input type="checkbox" />
                        <span data-bind="text: get_categoryName()"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dashboard-Right">
            <div class="dashboard-Header">Sales Figures</div>
            <div>
                <table id="salesTable">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody id="salesTableBody" data-bind="foreach: get_categorySales()">
                        <tr>
                            <td data-bind="text: get_categoryName()"></td>
                            <td data-bind="text: get_saleValue()"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>
</asp:Content>
