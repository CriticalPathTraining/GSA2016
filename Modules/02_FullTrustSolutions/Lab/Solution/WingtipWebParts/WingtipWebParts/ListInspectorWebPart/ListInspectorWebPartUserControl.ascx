<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ListInspectorWebPartUserControl.ascx.cs" Inherits="WingtipWebParts.ListInspectorWebPart.ListInspectorWebPartUserControl" %>

<asp:UpdatePanel ID="UpdatePanel1" runat="server">

  <ContentTemplate>
    <table style="width: 100%; border-style: solid; border-color: #CCCCCC; border-width: 1px;">
      <tr>
        <td style="width: 180px; vertical-align: top;">
          <asp:ListBox ID="lstLists" runat="server" Width="100%" Rows="10" AutoPostBack="true"
            OnSelectedIndexChanged="lstLists_SelectedIndexChanged"></asp:ListBox>
        </td>
        <td style="width: auto; vertical-align: top;">
          <table style="width: 100%;">
            <tr>
              <td style="width: 132px;">Title
              </td>
              <td style="width: auto;">
                <asp:Label ID="lblListTitle" runat="server"></asp:Label>
              </td>
            </tr>
            <tr>
              <td>ID:
              </td>
              <td>
                <asp:Label ID="lblListID" runat="server"></asp:Label>
              </td>
            </tr>
            <tr>
              <td>Document Library:
              </td>
              <td>
                <asp:Label ID="lblListIsDocumentLibrary" runat="server"></asp:Label>
              </td>
            </tr>
            <tr>
              <td>Hidden:
              </td>
              <td>
                <asp:Label ID="lblListIsHidden" runat="server"></asp:Label>
              </td>
            </tr>
            <tr>
              <td>Item Count:
              </td>
              <td style="margin-left: 40px">
                <asp:Label ID="lblListItemCount" runat="server"></asp:Label>
              </td>
            </tr>
            <tr>
              <td>URL:
              </td>
              <td style="margin-left: 40px">
                <asp:HyperLink ID="lnkListUrl" runat="server" Target="_blank" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </ContentTemplate>

</asp:UpdatePanel>