'use strict';

Type.registerNamespace("CPT");

(function $_global_CPT() {

  console.log('$_global_CPT called');

  CPT = function () {
    'use strict';

    var initializeMDS = function () {
      console.log("initializeMDS executing");

      if (typeof asyncDeltaManager !== 'undefined') {
        asyncDeltaManager.add_endRequest(function (source, args) {
          //fires when navigating away from an MDS page (once registered), AFTER the navigation actually happens
          console.log("asyncDeltaManager.add_endRequest executing");
        });
        console.log('MDS Events Registered');
      }

      console.log('CPT.init called');
      return 'MDS is enabled on this page!';
    };


    var sayHello = function () {
      alert("Hi from the say hello function");
    }

    var bindPageEvents = function () {
      console.log('CPT.init called');
      return 'MDS is enabled on this page!';
    };

    return {
      initializeMDS: initializeMDS,
      sayHello: sayHello,
      bindPageEvents: bindPageEvents
    };

  }();

}());

if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
  // its an MDS page refresh 
  console.log("_spPageContextInfo is defined - MDS page load")
  //CPT.initializeMDS();
} else {
  // normal page load 
  console.log("_spPageContextInfo not defined defined - MDS page transition")
}
