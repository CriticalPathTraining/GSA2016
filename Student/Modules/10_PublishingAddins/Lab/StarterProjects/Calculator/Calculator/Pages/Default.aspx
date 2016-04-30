<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.calculator.min.js"></script>
    <style type="text/css">
        @import "../content/jquery.calculator.css";
    </style>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#basicCalculator').calculator({
                showOn: 'both', buttonImageOnly: true,
                buttonImage: '../content/calculator.png'
            });
        });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

  <div style="padding: 24px; height: 200px; background-color: green;">
    <input type="text" id="basicCalculator" />
  </div>

</asp:Content>
