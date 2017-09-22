<%@ Page MasterPageFile="~masterurl/default.master" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
  <link href="content/jquery-ui.css" rel="stylesheet" />
  <link href="content/App.css" rel="stylesheet" />
  <script src="scripts/jquery.js"></script>
  <script src="scripts/jquery-ui.js"></script>
  <script src="scripts/Contacts.js"></script>

</asp:Content>    

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
  Contacts List
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
  Contacts List
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   
  <div id="page_width">

      <nav id="toolbar">
        <input type="button" id="cmdAddNewContact" value="Add XYZ Contact" class="ui-button" />
      </nav>

      <div id="content_box"></div>

      <div id="contact_dialog" style="display: none;">
        <table>
          <tr>
            <td>First Name:</td>
            <td>
              <input id="firstName" />
            </td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>
              <input id="lastName" />
            </td>
          </tr>
          <tr>
            <td>Company:</td>
            <td>
              <input id="company" />
            </td>
          </tr>
          <tr>
            <td>Work Phone:</td>
            <td>
              <input id="workPhone" />
            </td>
          </tr>
          <tr>
            <td>Home Phone:</td>
            <td>
              <input id="homePhone" />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input id="email" />
            </td>
          </tr>

        </table>

        <!-- hidden controls -->
        <div style="display: none">
          <input id="contact_id" />
          <input id="etag" />
        </div>

      </div>

    </div>



</asp:Content>




