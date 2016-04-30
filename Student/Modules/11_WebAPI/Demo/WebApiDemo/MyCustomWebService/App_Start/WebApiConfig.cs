using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using MyCustomWebService.Models;

using WingtipCRM.Models;

namespace MyCustomWebService {
  public static class WebApiConfig {
    public static void Register(HttpConfiguration config) {


      // enabled CORS support in Web API 2
      config.EnableCors();




      // enable OData controllers
      ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
      builder.EntitySet<SalesLead>("SalesLeads");
      builder.EntitySet<Customer>("Customers");
      config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

 
      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
