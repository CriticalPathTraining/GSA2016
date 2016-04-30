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

  <title>SharePoint CRM - REST Demo</title>

  <SharePoint:StartScript ID="StartScript1" runat="server" />
  <SharePoint:CacheManifestLink ID="CacheManifestLink1" runat="server" />
  <SharePoint:ScriptLink ID="ScriptLink1" Language="javascript" Name="core.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink2" Language="javascript" Name="menu.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink3" Language="javascript" Name="callout.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink4" Language="javascript" Name="sharing.js" OnDemand="true" runat="server" Localizable="false" />
  <SharePoint:ScriptLink ID="ScriptLink5" Language="javascript" Name="suitelinks.js" OnDemand="true" runat="server" Localizable="false" />
  
  <script src="../Scripts/jquery-2.1.1.js"></script>
  <script src="../Scripts/jquery-ui-1.10.4.js"></script>
  <link href="../Content/themes/base/jquery-ui.css" rel="stylesheet" />

  <script src="../Scripts/jsrender.js"></script>
  <script src="../Scripts/Wingtip.Customers.DataAccess.js"></script>

  <script src="../Scripts/App.js"></script>
  <link href="../Content/App.css" rel="stylesheet" />

</head>

<body>

  <form id="Form1" runat="server">

    <div id="page_width">

    <div id="nav_bar">
      &nbsp;
    </div>

      <header id="page_header">
        <div id="site_logo">&nbsp</div>
        <h1 id="site_title">SharePoint REST/OData Lab Solution</h1>
      </header>

      <nav id="toolbar">
        <input type="button" id="cmdAddNewCustomer" value="Add New Customer" class="ui-button" />
      </nav>

      <div id="content_box"></div>

      <div id="customer_dialog" style="display: none;">
        <table>
          <tr>
            <td>First Name:</td>
            <td>
              <input id="firstName" /></td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <input id="lastName" /></td>
          </tr>
          <tr>
            <td>Company:</td>
            <td>
              <input id="company" /></td>
          </tr>
          <tr>
            <td>Work Phone:</td>
            <td>
              <input id="workPhone" /></td>
          </tr>
          <tr>
            <td>Home Phone:</td>
            <td>
              <input id="homePhone" /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input id="email" /></td>
          </tr>

        </table>

        <!-- hidden controls -->
        <div style="display: none">
          <input id="customer_id" />
          <input id="etag" />
        </div>

      </div>

    </div>
  </form>

</body>
</html>
