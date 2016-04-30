using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Query;
using System.Web.Http.OData.Routing;
using MyCustomWebService.Models;
using Microsoft.Data.OData;
using System.Web.Http.Cors;

namespace MyCustomWebService.Controllers {
  
  [EnableQuery]
  [EnableCors("*", "*", "*", SupportsCredentials = false)] 
  public class SalesLeadsController : ODataController {
    
    private static ODataValidationSettings _validationSettings = new ODataValidationSettings();

    [EnableQuery(AllowedQueryOptions=AllowedQueryOptions.All)]
    public IHttpActionResult GetSalesLeads(ODataQueryOptions<SalesLead> queryOptions) {
      
      try { queryOptions.Validate(_validationSettings); }
      catch (ODataException ex) { return BadRequest(ex.Message); }

      var queryResults = queryOptions.ApplyTo(SalesLeadFactory.GetSalesLeads()).Cast<SalesLead>();

      return Ok<IQueryable<SalesLead>>(queryResults);
    }

    // GET: odata/SalesLeads(5)
    public IHttpActionResult GetSalesLead([FromODataUri] int key, ODataQueryOptions<SalesLead> queryOptions) {
      // validate the query.
      try {
        queryOptions.Validate(_validationSettings);
      }
      catch (ODataException ex) {
        return BadRequest(ex.Message);
      }

      // return Ok<SalesLead>(salesLead);
      return StatusCode(HttpStatusCode.NotImplemented);
    }

  }
}
