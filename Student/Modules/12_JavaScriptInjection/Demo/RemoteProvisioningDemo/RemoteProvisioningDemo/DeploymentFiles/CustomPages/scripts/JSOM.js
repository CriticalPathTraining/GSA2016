// delay script execution until SOD file has downloaded
ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage() {

  // create variables to track CSOM objects
  var context = SP.ClientContext.get_current();
  var user = context.get_web().get_currentUser();
  var groups = context.get_web().get_currentUser().get_groups();

  // use jQuery Document Ready event to call to CSOM and load user information
  $(function () {
    context.load(user);
    context.load(groups);
    context.executeQueryAsync(onDisplayUserInformation, onError);
  });

  function createTableRow(name, value) {
    return $("<tr>").append($("<td>").text(name))
                    .append($("<td>").text(value));
  }

  function onDisplayUserInformation() {

    // Display user title
    var htmlTable = $("<table>", { class:"formated" });
    htmlTable.append(createTableRow("ID:", user.get_id()));
    htmlTable.append(createTableRow("Title:", user.get_title()));
    htmlTable.append(createTableRow("Email: ", user.get_email()));
    htmlTable.append(createTableRow("Login Name", user.get_loginName()));
    htmlTable.append(createTableRow("Is Site Admin:", user.get_isSiteAdmin()));

    $("#content_box").empty().append(htmlTable);
  }

  function onError(err, err_args) {
    alert('Failed to get user name. Error:' + err_args.get_message());
  }

}
