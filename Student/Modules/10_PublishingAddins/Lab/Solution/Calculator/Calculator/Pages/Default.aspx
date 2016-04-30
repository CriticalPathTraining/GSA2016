<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
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

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
 
  <div style="padding: 24px; height: 200px; background-color: yellow;">
    <input type="text" readonly="readonly" id="basicCalculator"/>
  </div>

</asp:Content>
