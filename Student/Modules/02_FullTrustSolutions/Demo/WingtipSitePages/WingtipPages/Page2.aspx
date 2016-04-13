<%@ Assembly Name="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Page MasterPageFile="~masterurl/default.master"
    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage" %>

<%@ Register TagPrefix="WebPartPages"
    Namespace="Microsoft.SharePoint.WebPartPages"
    Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>


<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone ID="Main" Title="Main Web Part Zone"
        FrameType="TitleBarOnly" runat="server">
        <ZoneTemplate>
            <WebPartPages:XsltListViewWebPart
                runat="server"
                ID="CustomersWebPart"
                Title="Customers"
                ListUrl="Lists/Customers"
                ChromeType="None"
                InplaceSearchEnabled="false">
            </WebPartPages:XsltListViewWebPart>
        </ZoneTemplate>
    </WebPartPages:WebPartZone>

</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Page 2 - Pages Lab
</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page 2
</asp:Content>
