<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WingtipSearchAppWeb.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
  <meta charset="utf-8" />
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <meta http-equiv="Expires" content="0" />
  <title>Wingtip Search App</title>
  <link href="../Content/App.css" rel="stylesheet" />
</head>

<body>
  <form runat="server">
    <div id="page_width">

      <div id="nav_bar">
        <asp:HyperLink ID="linkHostWeb" runat="server">Host Web</asp:HyperLink>
      </div>

      <header id="page_header">
        <div id="site_logo">&nbsp</div>
        <h1 id="site_title">Wingtip Search App</h1>
      </header>

      <nav id="toolbar">
        <asp:Button ID="cmdSearchSites" runat="server" Text="Find Top-level Sites" OnClick="cmdSearchSites_Click"  />
        <asp:Button ID="cmdSearchLists" runat="server" Text="Find Lists" OnClick="cmdSearchLists_Click"   />      
        <asp:Button ID="cmdSearchTasks" runat="server" Text="Find Tasks" OnClick="cmdSearchTasks_Click" />      
        <asp:Button ID="cmdGeneralSearch" runat="server" Text="General Search" OnClick="cmdGeneralSearch_Click" />      
        <asp:TextBox ID="txtUserText" runat="server" Width="300px">ContentClass:STS_ListItem</asp:TextBox>
      </nav>

      <div id="content_box">

        <asp:GridView ID="SearchResultsView" runat="server" AutoGenerateColumns="false">
          <Columns>
            <asp:BoundField DataField="Title" HeaderText="Search Result Title" />
            <asp:HyperLinkField DataTextField="Path" DataNavigateUrlFields="Path" HeaderText="Search Result URL" />
          </Columns>
        </asp:GridView>

      </div>
    </div>
  </form>
</body>
</html>
