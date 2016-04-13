'use strict';

var Wingtip = window.Wingtip || {};

Wingtip.Utilities = function () {

  var getQueryStringParameter = function (param) {
    var querystring = document.URL.split("?")[1];
    if (querystring) {
      var params = querystring.split("&");
      for (var index = 0; (index < params.length) ; index++) {
        var current = params[index].split("=");
        if (param.toUpperCase() === current[0].toUpperCase()) {
          return decodeURIComponent(current[1]);
        }
      }
    }
  }


  return {
    getQueryStringParameter: getQueryStringParameter,
  };

}();