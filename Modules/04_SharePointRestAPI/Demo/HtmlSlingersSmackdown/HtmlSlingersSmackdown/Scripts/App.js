'use strict';

$(function () {
  $("#contestant_list li a").click(onContestantClick)
});

function onContestantClick(event) {
  var image_path = "../Content/img/" + event.currentTarget.innerText + ".jpg";
  $("#contestant_image").attr("src", image_path);
}