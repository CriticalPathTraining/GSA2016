using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HelloWebAPI.Controllers {

  public class Customer {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
  }

  public class CustomersController : ApiController {

    private IEnumerable<Customer> customers = 
      new List<Customer>{
        new Customer{ Id=1, FirstName="Ted", LastName="Pattison"},
        new Customer{ Id=2, FirstName="Fred", LastName="Fintstone"},
        new Customer{ Id=3, FirstName="Jeb", LastName="Bush"},
        new Customer{ Id=4, FirstName="Deb", LastName="Pricated"}
      };

    public IEnumerable<Customer> GetCustomers() {
      return customers;
    }

    public Customer GetCustomer(int id) {
      var customer = customers.Where(c => (c.Id == id)).FirstOrDefault();
      if (customer != null) {
        return customer;
      }
      else {
        var responseMessage = new HttpResponseMessage(HttpStatusCode.NotFound) {
          Content = new StringContent(string.Format("No customer with ID = {0}", id)),
          ReasonPhrase = "Customer ID Not Found"
        };
        throw new HttpResponseException(responseMessage);
      }
      
    }

    public string PostCustomer([FromBody] Customer customer) {
      string customerName = customer.FirstName + " " + customer.LastName;
      return "Added customer: " + customerName;
    }
  }
}
