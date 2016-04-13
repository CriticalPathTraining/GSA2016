<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
  <title></title>
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <script src="../Scripts/jquery-1.9.1.js"></script>
  <script src="../Scripts/DemoResizableAppPart.js"></script>
  <link href="../Content/App.css" rel="stylesheet" />
</head>
<body>
  <div id="appPartContainer">

    <div>
      <input id="cmdGetSmallCustomersList" value="Get Small List" type="button" />
      <input id="cmdGetLargeCustomersList" value="Get Large List" type="button" />
      <span>| Resize App Part</span><input name="resizeAppPart" id="resizeAppPart" type="checkbox" />
    </div>

    <h2>Customers Lists</h2>

    <div id="customers" />

  </div>

</body>
</html>
