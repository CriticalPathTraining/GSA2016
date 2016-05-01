'use strict';

$(function () {
    $("#cmdClickMe").click(onClickMe);
});

function onClickMe() {

    $("#content_box")
        .text("Hello SharePoint Add-ins")
        .css({"font-size": "32px", "color": "blue" })
}