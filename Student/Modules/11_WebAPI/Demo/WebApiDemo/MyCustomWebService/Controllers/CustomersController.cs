using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using WingtipCRM;
using WingtipCRM.Models;

namespace MyCustomWebService.Controllers {

  [EnableCors("*", "*", "*", SupportsCredentials = false)] 
  public class CustomersController : ODataController {
    private CrmDbContext db = new CrmDbContext();

    [EnableQuery]
    public IQueryable<Customer> GetCustomers() {
      return db.Customers;
    }

    [EnableQuery]
    public SingleResult<Customer> GetCustomer([FromODataUri] int key) {
      return SingleResult.Create(db.Customers.Where(customer => customer.Id == key));
    }

    public IHttpActionResult Put([FromODataUri] int key, Delta<Customer> patch) {
      Validate(patch.GetEntity());

      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      Customer customer = db.Customers.Find(key);
      if (customer == null) {
        return NotFound();
      }

      patch.Put(customer);

      try {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException) {
        if (!CustomerExists(key)) {
          return NotFound();
        }
        else {
          throw;
        }
      }

      return Updated(customer);
    }

    public IHttpActionResult Post(Customer customer) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      db.Customers.Add(customer);
      db.SaveChanges();

      return Created(customer);
    }

    [AcceptVerbs("PATCH", "MERGE")]
    public IHttpActionResult Patch([FromODataUri] int key, Delta<Customer> patch) {
      Validate(patch.GetEntity());

      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      Customer customer = db.Customers.Find(key);
      if (customer == null) {
        return NotFound();
      }

      patch.Patch(customer);

      try {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException) {
        if (!CustomerExists(key)) {
          return NotFound();
        }
        else {
          throw;
        }
      }

      return Updated(customer);
    }

    public IHttpActionResult Delete([FromODataUri] int key) {
      Customer customer = db.Customers.Find(key);
      if (customer == null) {
        return NotFound();
      }

      db.Customers.Remove(customer);
      db.SaveChanges();

      return StatusCode(HttpStatusCode.NoContent);
    }

    protected override void Dispose(bool disposing) {
      if (disposing) {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool CustomerExists(int key) {
      return db.Customers.Count(e => e.Id == key) > 0;
    }
  }
}
