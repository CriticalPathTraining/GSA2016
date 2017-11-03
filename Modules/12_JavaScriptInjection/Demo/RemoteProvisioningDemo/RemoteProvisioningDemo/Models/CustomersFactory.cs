using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RemoteProvisioningDemo.Models {


  public class Customer {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Company { get; set; }
    public string WorkPhone { get; set; }
    public string HomePhone { get; set; }
    public string Email { get; set; }
  }

  public class CustomersFactory {

    public static List<Customer> customers = new List<Customer>() {
      new Customer{FirstName="Quincy", LastName="Nelson", Company="Benthic Petroleum", WorkPhone="(212)333-7777", HomePhone="(203)555-1111", Email="Quincy.Nelson@BenthicPetroleum.com"},
      new Customer{FirstName="Jude", LastName="Mason", Company="Cyberdyne Systems", WorkPhone="(817)444-1111", HomePhone="(917)888-5555", Email="Jude.Mason@CyberdyneSystems.com"},
      new Customer{FirstName="Sid", LastName="Stout", Company="Roxxon", WorkPhone="(818)999-3333", HomePhone="(213)777-6666", Email="Sid.Stout@Roxxon.com"},
      new Customer{FirstName="Gilberto", LastName="Gillespie", Company="Shinra Electric Power Company", WorkPhone="(212)123-4567", HomePhone="(213)765-4321", Email="Gilberto.Gillespie@ShinraElectricPowerCompany.com"},
      new Customer{FirstName="Diane", LastName="Strickland", Company="Izon", WorkPhone="(813)2222-3333", HomePhone="(813)333-4444", Email="Diane.Strickland@Izon.com"},
      new Customer{FirstName="Jacqueline", LastName="Zimmerman", Company="Zorg Industries", WorkPhone="(512)432-4321", HomePhone="(512)234-1234", Email="Jacqueline.Zimmerman@ZorgIndustries.com"},
      new Customer{FirstName="Naomi", LastName="Schroeder", Company="ComTron", WorkPhone="(212)444-5555", HomePhone="(212)555-6666", Email="Naomi.Schroeder@ComTron.com"},
      new Customer{FirstName="Lynne", LastName="Stephens", Company="Trade Federation", WorkPhone="(508)333-1111", HomePhone="(508)777-9999", Email="Lynne.Stephens@TradeFederation.com"},
      new Customer{FirstName="Luther", LastName="Sullivan", Company="Metacortex", WorkPhone="(203)661-6253", HomePhone="(203)611-6253", Email="Luther.Sullivan@Metacortex.com"},
      new Customer{FirstName="Rose", LastName="Parsons", Company="Hanso Foundation", WorkPhone="(212)111-2222", HomePhone="(203)333-5555", Email="Rose.Parsons@HansoFoundation.com"},
    };
  }
}
