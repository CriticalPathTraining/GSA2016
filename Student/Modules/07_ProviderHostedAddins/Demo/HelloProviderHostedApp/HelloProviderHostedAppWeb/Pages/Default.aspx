
<%@ Page Language="C#" AutoEventWireup="true" 
         CodeBehind="Default.aspx.cs" Inherits="HelloProviderHostedAppWeb.Pages.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10"/>
  <title>My Start Page</title>
</head>

<body>
    <form id="form1" runat="server">
    <div style="padding:12px;">
      
      <!-- add HyperLink control to link back to host web-->
      <div><asp:HyperLink ID="linkHostWeb" runat="server">Back to host web</asp:HyperLink></div>
      
      <!-- add some HTML content to page -->
      <h2>My Start Page in the Remote Web</h2>

      <!-- -->
      <asp:PlaceHolder ID="PlaceHolderMain" runat="server"></asp:PlaceHolder>

    </div>
    </form>
</body>
</html>

