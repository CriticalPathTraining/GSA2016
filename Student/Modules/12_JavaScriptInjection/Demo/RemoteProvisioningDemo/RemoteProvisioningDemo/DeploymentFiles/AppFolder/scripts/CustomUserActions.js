'use strict';


Type.registerNamespace("CPT");
var CPT = window.CPT || {};

CPT.CustomUserActions = function () {

  var CustomAction1 = function () { 
    SP.UI.Notify.addNotification("Hello from the JavaScript handler for Custom Action 1", false);
  };

  var CustomAction2 = function () {
    SP.UI.Notify.addNotification("Hello from the JavaScript handler for Custom Action 2", true);
  };

  return {
    CustomAction1: CustomAction1,
    CustomAction2: CustomAction2
  };

}();