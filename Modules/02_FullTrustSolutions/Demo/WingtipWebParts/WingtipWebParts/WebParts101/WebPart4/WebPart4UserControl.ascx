<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WebPart4UserControl.ascx.cs" Inherits="WingtipWebParts.WebPart4.WebPart4UserControl" %>


<style type="text/css">
  table.MainForm td {padding: 4px; }
</style>

<table class="MainForm" >
  <tr>
    <td>First Name:</td>
    <td><asp:TextBox ID="txtFirstName" runat="server" /></td>
  </tr>
  <tr>
    <td>Last Name:</td>
    <td><asp:TextBox ID="txtLastName" runat="server" /></td>
  </tr>
  <tr>
    <td>Email:</td>
    <td><asp:TextBox ID="txtEmail" runat="server" /></td>
  </tr>
  <tr>
    <td colspan="2">
      <asp:Button ID="cmdAddSalesLead" runat="server" Text="Add Sales Lead" 
        onclick="cmdAddSalesLead_Click" />
    </td>
  </tr>
</table>