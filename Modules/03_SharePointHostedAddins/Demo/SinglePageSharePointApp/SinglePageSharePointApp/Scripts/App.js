'use strict';

$(function () {
  $("#cmd01").click(onCmd01);
  $("#cmd02").click(onCmd02);
  $("#cmd03").click(onCmd03);
});

function onCmd01() {
  $("#content_box")
    .empty()
    .append($("<h2>").text("Command 1 Executed"))
    .append($("<p>").text("Ready"));
}

function onCmd02() {
  $("#content_box")
    .empty()
    .append($("<h2>").text("Command 2 Executed"))
    .append($("<p>").text("Set"));
}

function onCmd03() {
  $("#content_box")
    .empty()
    .append($("<h2>").text("Command 3 Executed"))
    .append($("<p>").text("Go"));
}