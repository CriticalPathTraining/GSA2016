
$(function () {
  $("#getSiteProperties").click(onGetSiteProperties);
  $("#getLists").click(onGetLists);
});

function onGetSiteProperties() {
  var urlRest = "../_api/web/?$select=Id,Title,Url";
  $.ajax({
    url: urlRest,
    method: "GET",
    headers: { "accept": "application/json;odata=verbose" }
  }).then(function (data) {
    $("#content_box")
      .empty()
      .append($("<ul>")
        .append($("<li>").text("ID: " + data.d.Id))
        .append($("<li>").text("Title: " + data.d.Title))
        .append($("<li>").text("Url: " + data.d.Url))
      );
  });
}

function onGetLists() {
  var urlRest = "../_api/web/lists/?$filter=(Hidden eq false)";
  $.ajax({
    url: urlRest,
    method: "GET",
    headers: { "accept": "application/json;odata=verbose" }
  }).then(function (data) {
    var lists = data.d.results;
    var listOfLists = $("<ul>");
    for (var listIndex = 0; listIndex < lists.length; listIndex++) {
      listOfLists.append($("<li>").text(lists[listIndex].Title));
    }
    $("#content_box").empty().append(listOfLists);
  });
}