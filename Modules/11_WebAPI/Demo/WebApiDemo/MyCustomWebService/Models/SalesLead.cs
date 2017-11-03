using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyCustomWebService.Models {

  public class SalesLead {
    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Company { get; set; }
    public string Email { get; set; }
  }

  public class SalesLeadFactory {

    static List<SalesLead> salesLeads = new List<SalesLead>() { 
        new SalesLead{Id=1 ,FirstName="Quincy", LastName="Nelson", Company="Benthic Petroleum", Email="Quincy.Nelson@BenthicPetroleum.com"},
        new SalesLead{Id=2 ,FirstName="Jude", LastName="Mason", Company="Cyberdyne Systems", Email="Jude.Mason@CyberdyneSystems.com"},
        new SalesLead{Id=3 ,FirstName="Sid", LastName="Stout", Company="Roxxon", Email="Sid.Stout@Roxxon.com"},
        new SalesLead{Id=4 ,FirstName="Gilberto", LastName="Gillespie", Company="Shinra Electric Power Company", Email="Gilberto.Gillespie@ShinraElectricPowerCompany.com"},
        new SalesLead{Id=5 ,FirstName="Diane", LastName="Strickland", Company="Izon", Email="Diane.Strickland@Izon.com"},
        new SalesLead{Id=6 ,FirstName="Jacqueline", LastName="Zimmerman", Company="Zorg Industries", Email="Jacqueline.Zimmerman@ZorgIndustries.com"},
        new SalesLead{Id=7 ,FirstName="Naomi", LastName="Schroeder", Company="ComTron", Email="Naomi.Schroeder@ComTron.com"},
        new SalesLead{Id=8 ,FirstName="Lynne", LastName="Stephens", Company="Trade Federation", Email="Lynne.Stephens@TradeFederation.com"},
        new SalesLead{Id=9 ,FirstName="Luther", LastName="Sullivan", Company="Metacortex", Email="Luther.Sullivan@Metacortex.com"},
        new SalesLead{Id=10 ,FirstName="Rose", LastName="Parsons", Company="Hanso Foundation", Email="Rose.Parsons@HansoFoundation.com"},
        new SalesLead{Id=11 ,FirstName="Bridgette", LastName="Meadows", Company="Brown Streak Railroad", Email="Bridgette.Meadows@BrownStreakRailroad.com"},
        new SalesLead{Id=12 ,FirstName="Merle", LastName="Black", Company="Volée Airlines", Email="Merle.Black@VoléeAirlines.com"},
        new SalesLead{Id=13 ,FirstName="Berta", LastName="Wilkinson", Company="Doublemeat Palace", Email="Berta.Wilkinson@DoublemeatPalace.com"},
        new SalesLead{Id=14 ,FirstName="Brandi", LastName="Bates", Company="Duff Beer", Email="Brandi.Bates@DuffBeer.com"},
        new SalesLead{Id=15 ,FirstName="Ana", LastName="Mathews", Company="WarioWare, Inc.", Email="Ana.Mathews@WarioWare,Inc..com"},
        new SalesLead{Id=16 ,FirstName="Chet", LastName="Lawson", Company="The Crab Shack", Email="Chet.Lawson@TheCrabShack.com"},
        new SalesLead{Id=17 ,FirstName="Danial", LastName="Stephenson", Company="Grand Trunk Semaphore Company", Email="Danial.Stephenson@GrandTrunkSemaphoreCompany.com"},
        new SalesLead{Id=18 ,FirstName="Adela", LastName="Gilbert", Company="Fabrikam", Email="Adela.Gilbert@Fabrikam.com"},
        new SalesLead{Id=19 ,FirstName="Gina", LastName="Clayton", Company="Sheinhardt Wig Company", Email="Gina.Clayton@SheinhardtWigCompany.com"},
        new SalesLead{Id=20 ,FirstName="Trisha", LastName="Gallagher", Company="Brown Streak Railroad", Email="Trisha.Gallagher@BrownStreakRailroad.com"},
        new SalesLead{Id=21 ,FirstName="Abby", LastName="Dominguez", Company="Izon", Email="Abby.Dominguez@Izon.com"},
        new SalesLead{Id=22 ,FirstName="Doreen", LastName="Bush", Company="Volée Airlines", Email="Doreen.Bush@VoléeAirlines.com"},
        new SalesLead{Id=23 ,FirstName="Gertrude", LastName="Johnson", Company="InGen", Email="Gertrude.Johnson@InGen.com"},
        new SalesLead{Id=24 ,FirstName="Lowell", LastName="Oneill", Company="Strickland Propane", Email="Lowell.Oneill@StricklandPropane.com"},
        new SalesLead{Id=25 ,FirstName="Sandra", LastName="Guy", Company="Ewing Oil", Email="Sandra.Guy@EwingOil.com"},

    };

    public static IQueryable<SalesLead> GetSalesLeads() {
      return salesLeads.AsQueryable<SalesLead>();
    }
  }
}