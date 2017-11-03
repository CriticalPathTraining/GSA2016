<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MyFirstS2SAppWeb.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <title>My First S2S App Solution</title>
  <link href="../Content/App.css" rel="stylesheet" />
</head>

<body>
  <form id="form1" runat="server">

    <div id="page_width">

      <div id="nav_bar">
        <asp:HyperLink ID="HostWebLink" runat="server" />
      </div>

      <header id="page_header">
        <div id="site_logo">&nbsp</div>
        <h1 id="site_title">My First S2S App Solution</h1>
      </header>

      <nav id="toolbar">
        <asp:Button ID="cmdGetTitleCSOM" runat="server" Text="Get Title using CSOM" OnClick="cmdGetTitleCSOM_Click" />
        <asp:Button ID="cmdGetTitleREST" runat="server" Text="Get Title using REST" OnClick="cmdGetTitleREST_Click" />
      </nav>

      <div id="content_box">
        <asp:Literal ID="placeholderMainContent" runat="server" ></asp:Literal>
      </div>


    </div>
  </form>
</body>
</html>
