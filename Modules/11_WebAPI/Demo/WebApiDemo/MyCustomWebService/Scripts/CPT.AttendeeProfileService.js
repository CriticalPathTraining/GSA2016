/// <reference path="jstree.js" />
/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />

var CPT = window.CPT || {};

CPT.AttendeeProfileService = function () {

  var baseUri = "https://localhost:44311/";

  var getAttendeeProfiles = function () {

    var restUri = baseUri + "api/AttendeeProfiles/";

    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  var getAttendeeProfile = function (profileId) {

    var restUri = baseUri + "api/AttendeeProfiles/" + profileId;

    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  var getAttendeeProfileHierarchy = function () {


    var restUri = baseUri + "api/AttendeeProfileHiearchy/";

    return $.ajax({
      url: restUri,
      accept: "application/json",
      dataType: "json"
    });

  };

  return {
    getAttendeeProfiles: getAttendeeProfiles,
    getAttendeeProfile: getAttendeeProfile,
    getAttendeeProfileHierarchy: getAttendeeProfileHierarchy
  };

}();