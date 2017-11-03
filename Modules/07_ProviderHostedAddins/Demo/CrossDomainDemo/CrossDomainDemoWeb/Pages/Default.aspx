<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CrossDomainDemoWeb.Pages.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10"/>
  <title>Cross Domain Library Demo</title>
  <link href="../Content/App.css" rel="stylesheet" />
  <script src="../Scripts/jquery-2.0.3.js"></script>
  <script src="../Scripts/SP.RequestExecutor.debug.js"></script>
  <script src="../Scripts/default.js"></script>

</head>
<body>
  <form id="form1" runat="server">

    <div id="page_width">

      <div id="nav_bar">
        <a id="linkHostWeb">Host Web</a>
      </div>

      <div id="top_banner">
        <div id="site_logo">&nbsp;</div>
        <div id="site_title">Cross Domain Scripting Library Demo</div>
      </div>


      <div id="toolbar">
        <input id="cmdMakeCDLCall" type="button" value="Make CDL Call" />
      </div>

      <div id="content_box">

        <div id="results">
          click the button to make a call against the app web with the Cross Domain Library
        </div>

      </div>

    </div>

  </form>
</body>
</html>
