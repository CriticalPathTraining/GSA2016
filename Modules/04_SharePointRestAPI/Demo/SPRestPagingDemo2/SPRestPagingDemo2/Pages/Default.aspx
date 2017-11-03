<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!DOCTYPE html>

<html>

<head id="Head1" runat="server">

    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <meta http-equiv="Expires" content="0" />
    <meta name="WebPartPageExpansion" content="full" />

    <title>Paging Demo 2</title>

    <SharePoint:StartScript runat="server" />
    <SharePoint:CacheManifestLink runat="server" />
    <SharePoint:ScriptLink Language="javascript" Name="core.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="menu.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="callout.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="sharing.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />

    <script src="../Scripts/jquery-2.1.0.js"></script>
    <script src="../Scripts/jsrender.js"></script>
    <script src="../Scripts/Wingtip.Customers.DataAccess.js"></script>
    <script src="../Scripts/App.js"></script>

    <link href="../Content/App.css" rel="stylesheet" />
</head>

<body>

    <form runat="server">
        <WebPartPages:SPWebPartManager ID="SPWebPartManager1" runat="Server" />

        <asp:ScriptManager ID="ScriptManager" runat="server"
                           EnablePageMethods="false"
                           EnablePartialRendering="true"
                           EnableScriptGlobalization="false"
                           EnableScriptLocalization="true" />


        <div id="page_width">

            <div id="top_row">
                <SharePoint:ReturnToParentLink
                    ID="BackToParentLink"
                    runat="server"
                    Icon="../Content/img/backarrow.png" />
            </div>

            <div id="banner">
                <div id="site_logo">&nbsp;</div>
                <div id="site_title">SharePoint Paging Demo with with $skiptoken</div>
            </div>

            <div id="toolbar">
                <input type="button" id="cmdGetNextPage" value="Get Next Page" />            
            </div>

            <div id="content_box">

            </div>

            
            <div id="next_uri"></div>

        </div>
    </form>

</body>
</html>
