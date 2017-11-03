<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!DOCTYPE html>

<html>

<head id="Head1" runat="server">
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <meta http-equiv="Expires" content="0" />
  <title>Single Page App</title>
  <SharePoint:StartScript ID="StartScript1" runat="server" />
  <SharePoint:CacheManifestLink ID="CacheManifestLink1" runat="server" />

  <!-- *** uncomment these two control tags if you want to link to the standard SharePoint 2013 CSS styles  ***
    <SharePoint:CssLink ID="CssLink1" runat="server" Version="15" /> 
    <SharePoint:CssRegistration ID="CssRegistration1" Name="default" runat="server" />
  -->
  <SharePoint:ScriptLink ID="ScriptLink1" Language="javascript" Name="core.js" OnDemand="true" runat="server" Localizable="false" />

  <SharePoint:ScriptLink ID="ScriptLink2" Language="javascript" Name="menu.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink3" Language="javascript" Name="callout.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink4" Language="javascript" Name="sharing.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink5" Language="javascript" Name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />

  <script src="../Scripts/jquery-1.8.2.js"></script>
  <script src="../Scripts/App.js"></script>
  <link href="../Content/App.css" rel="stylesheet" />
</head>

<body>

  <form runat="server">
    <WebPartPages:SPWebPartManager ID="SPWebPartManager1" runat="Server" />
    
    <div id="page_width">

      <div id="top_row">
        <SharePoint:ReturnToParentLink
          ID="BackToParentLink"
          runat="server"
          Icon="../Content/img/backarrow.png" />
      </div>

      <div id="banner">
        <div id="site_logo">&nbsp;</div>
        <div id="site_title">Single Page App Demo</div>
      </div>

      <div id="toolbar">
        <input id="cmd01" type="button" value="Command 1" />
        <input id="cmd02" type="button" value="Command 2" />
        <input id="cmd03" type="button" value="Command 3" />
      </div>

      <div id="content_box">
        <!-- default view content -->
        <h2>Execute a command</h2>
      </div>

    </div>
  </form>

</body>
</html>
