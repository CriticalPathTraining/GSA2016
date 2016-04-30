<%@ assembly name="Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ page masterpagefile="~masterurl/default.master"
  inherits="Microsoft.SharePoint.WebPartPages.WebPartPage" %>


<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">

  <SharePoint:ScriptLink ID="Ajax" Name="MicrosoftAjax.js" runat="server" />
  <SharePoint:ScriptLink ID="jQuery" Name="~site/CPT/scripts/jquery.js" runat="server" />

  <SharePoint:ScriptLink ID="angular" Name="~site/CPT/scripts/angular.js" runat="server" />
  <SharePoint:ScriptLink ID="angularRoute" Name="~site/CPT/scripts/angular-route.js" runat="server" />


  <script src="AngularApp/app.js"></script>
  <script src="AngularApp/customerslistservice.js"></script>
  <script src="AngularApp/controllers.js"></script>

  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

  <link href="AngularApp/app.css" rel="stylesheet" />

</asp:content>

<asp:content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
  Demo Angular App
</asp:content>

<asp:content contentplaceholderid="PlaceHolderMain" runat="server">

  <div id="angularAppContainer" ng-app="CustomersAngularApp" >
    <div id="content-box" ng-view ></div>
  </div>

</asp:content>
