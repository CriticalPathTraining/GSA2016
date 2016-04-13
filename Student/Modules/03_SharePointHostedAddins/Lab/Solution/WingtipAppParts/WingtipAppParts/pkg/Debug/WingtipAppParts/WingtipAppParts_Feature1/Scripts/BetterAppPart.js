$(function () {

  $("#results").text("My dynamic content");

  $("body").css({
    "border": "2px solid #CCC",
    "padding": "8px"
  });

  $(":header").css({ "border-bottom": "1px solid black" });

  var BackgroundColor = Wingtip.Utilities.getQueryStringParameter("BackgroundColor");
  if (BackgroundColor === "true") {
    $("body").css({ "background-color": "Yellow" });
  }

  var HeaderColor = Wingtip.Utilities.getQueryStringParameter("HeaderColor");
  if (HeaderColor) {
    $(":header").css({ "color": HeaderColor });
    $(":header").css({ "border-bottom": "1px solid " + HeaderColor });
  }


});
