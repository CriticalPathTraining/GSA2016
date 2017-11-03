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

    <title>CPT Host Web Explorer</title>

    <SharePoint:StartScript runat="server" />
    <SharePoint:CacheManifestLink runat="server" />
    <SharePoint:ScriptLink Language="javascript" Name="core.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="menu.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="callout.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="sharing.js" OnDemand="true" runat="server" Localizable="false" />
    <SharePoint:ScriptLink Language="javascript" Name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />

    <script src="../Scripts/jquery-2.1.0.js"></script>

    <script src="../Scripts/jquery-ui-1.10.4.js"></script>
    <link href="../Content/themes/humanity/jquery-ui.css" rel="stylesheet" />

    <script src="../Scripts/jquery-treeview.js"></script>
    <link href="../Content/jquery.treeview.css" rel="stylesheet" />

    <script src="../Scripts/CPT.SharePoint.Web.DataAccess.js"></script>

    <script src="../Scripts/App.js" type="text/javascript"></script>
    <link href="../Content/App.css" rel="Stylesheet" type="text/css" />


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
                <div id="site_title">CPT Host Web Explorer</div>
            </div>

            <div id="tabs">
                <ul>
                    <li><a href="#StartPage">Start Page</a></li>
                    <li><a href="#SiteInfo">Site Info</a></li>
                    <li><a href="#ContextInfo">Context Info</a></li>
                    <li><a href="#Lists">Lists</a></li>
                    <li><a href="#Libraries">Libraries</a></li>
                    <li><a href="#Security">Users and Groups</a></li>
                    <li><a href="#Files">All Files</a></li>
                </ul>

                <div id="StartPage">
                    <div id="startPageContainer"></div>
                </div>

                <div id="SiteInfo">
                    <div id="sitePropertiesContainer">
                    </div>
                </div>

                <div id="ContextInfo">
                    <div id="contextInfoContainer"></div>
                </div>

                <div id="Lists">
                    <div id="listsContainer"></div>
                </div>

                <div id="Libraries">
                    <div id="librariesContainer"></div>
                </div>

                <div id="Files">
                    <div id="fileHierarchyContainer"></div>
                </div>

                <div id="Security">
                    <div id="siteUsers"></div>
                    <div id="siteGroups"></div>
                </div>

            </div>

        </div>
    </form>

</body>
</html>
