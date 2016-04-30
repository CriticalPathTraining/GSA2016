<%@ Page MasterPageFile="~/Pages/RemoteWeb.Master" Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="OAuthAddinDemoWeb.Default" %>


<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="PlaceholderAdditionalPageHead">
  <script src="../Scripts/default.aspx.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PlaceholderMain" runat="server">

  <div id="tabs">
    <ul>
      <li><a href="#tabIncomingData">Incoming Data</a></li>
      <li><a href="#tabContextToken">Context Token</a></li>
      <li><a href="#tabAccessToken">Access Token</a></li>
      <li><a href="#tabAppOnlyAccessToken">App-only Access Token</a></li>
    </ul>
    <div id="tabIncomingData">
      <asp:PlaceHolder ID="placeholderIncomingData" runat="server"></asp:PlaceHolder>
    </div>
    <div id="tabContextToken">
      <asp:PlaceHolder ID="placeholderContextToken" runat="server"></asp:PlaceHolder>
    </div>

    <div id="tabAccessToken">
      <asp:PlaceHolder ID="placeholderAccessToken" runat="server"></asp:PlaceHolder>
    </div>
    <div id="tabAppOnlyAccessToken">
       <asp:PlaceHolder ID="placeholderAppOnlyAccessToken" runat="server"></asp:PlaceHolder>
    </div>
  
  </div>

</asp:Content>
