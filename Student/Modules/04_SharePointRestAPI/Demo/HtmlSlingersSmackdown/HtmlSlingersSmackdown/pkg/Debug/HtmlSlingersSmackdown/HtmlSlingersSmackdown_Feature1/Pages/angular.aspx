<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!DOCTYPE html>

<html data-ng-app>

<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />

    <title>HTML Slinging Smackdown</title>

    <script src="../Scripts/jquery-2.1.0.js"></script>
    <script src="../Scripts/Wingtip.Customers.DataAccess.js"></script>
    <script src="../Scripts/angular.js"></script>
    <script src="../Scripts/slingers/angular.js"></script>
    <script src="../Scripts/angular-route.js"></script>
    <script src="../Scripts/angular-resource.js"></script>


    <link href="../Content/App.css" rel="stylesheet" />

</head>
<body>
    <form runat="server">

        <div id="page_width">

            <div id="top_row">
                <SharePoint:ReturnToParentLink
                    ID="BackToParentLink"
                    runat="server"
                    Icon="../Content/img/backarrow.png" />
            </div>

            <div id="banner">
                <div id="site_logo">&nbsp;</div>
                <div id="site_title">HTML Slinger Smackdown</div>
            </div>

            <div id="navbar">
                <a href="default.aspx">home</a>&nbsp;|&nbsp;
                <a href="caveman.aspx">caveman</a>&nbsp;|&nbsp;
                <a href="jquery.aspx">jquery</a>&nbsp;|&nbsp;
                <a href="jsrender.aspx">jsrender</a>&nbsp;|&nbsp;
                <a href="knockout.aspx">knockout</a>&nbsp;|&nbsp;
                <a href="angular.aspx">angular</a>&nbsp;|&nbsp;
                <a href="rainman.aspx">rainman</a>&nbsp;|&nbsp;
            </div>

            <div id="content_box" data-ng-controller="customersController">

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
                    <tbody id="resultsTable" data-ng-repeat="customer in customers">
                        <tr>
                            <td>{{ customer.FirstName }}</td>
                            <td>{{ customer.Title }}</td>
                            <td>{{ customer.Company }}</td>
                            <td>{{ customer.WorkPhone }}</td>
                            <td>{{ customer.HomePhone }}</td>
                            <td>{{ customer.Email }}</td>
                        </tr>
                    </tbody>
                </table>



            </div>

        </div>

    </form>
</body>
</html>


