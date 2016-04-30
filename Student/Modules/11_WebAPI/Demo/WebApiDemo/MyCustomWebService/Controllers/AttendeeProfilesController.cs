using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Hosting;

using MyCustomWebService.Models;
using System.Web.Http.Cors;
using System.Web;

namespace MyCustomWebService.Controllers {


  [EnableCors("*", "*", "*", SupportsCredentials = false)] 
  public class AttendeeProfilesController : ApiController {

    public IEnumerable<AttendeeProfile> Get() {
      return AttendeeProfiles.GetProfiles();
    }

    public AttendeeProfile Get(string id) {
      AttendeeProfile profile = AttendeeProfiles.GetProfiles()
                                                .Where(p => p.id == id)
                                                .First<AttendeeProfile>();

      var profilePhotoUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + "/Content/images/" + profile.title + ".jpg";
      profile.photoUrl = profilePhotoUrl;

      return profile;
    }
  }
}
