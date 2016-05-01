using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace CustomerManagerWeb.Models {

    public class CustomersDB : DbContext {
        public CustomersDB()
            : base("name=CustomersDB") {
        }
        public virtual DbSet<Customer> Customers { get; set; }
    }

    public class Customer {
        [Key]
        public int Id { get; set; }
        [DisplayName("First Name")]
        public string FirstName { get; set; }
        [DisplayName("Last Name")]
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        [DisplayName("Work Phone")]
        public string WorkPhone { get; set; }
        [DisplayName("Home Phone")]
        public string HomePhone { get; set; }
    }
}
