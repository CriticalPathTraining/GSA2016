<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="false" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="sp.taxonomy.js" runat="server" OnDemand="false" LoadAfterUI="true" Localizable="false" />
    <link rel="Stylesheet" type="text/css" href="../Styles/App.css" />
    <script type="text/javascript" src="../Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <table>
        <tr>
            <td>Group Name</td>
            <td><input id="groupName" type="text" value="Geography" style="width: 200px;" /></td>
        </tr>
        <tr>
            <td>Term Set Name</td>
            <td><input id="termSetName" type="text" value="United States" style="width: 200px;" /></td>
        </tr>
    </table>
    <div><input type="button" value="Connect" onclick="getVocabulary();" /></div>
    <div id="rootDiv"></div>
</asp:Content>
