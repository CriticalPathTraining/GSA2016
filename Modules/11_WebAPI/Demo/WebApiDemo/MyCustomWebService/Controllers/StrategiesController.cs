using MyCustomWebService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyCustomWebService.Controllers {

  [EnableCors("*", "*", "*", SupportsCredentials = false)]  
  public class StrategiesController : ApiController {

    [Route("api/AttendeeProfiles/{profileId}/Strategies")]
    public IEnumerable<string> Get(string profileId) {
      return AttendeeProfiles
        .GetProfiles()
        .Where(profile => profile.id == profileId)
        .First().strategies;
    }


  
  }

}
