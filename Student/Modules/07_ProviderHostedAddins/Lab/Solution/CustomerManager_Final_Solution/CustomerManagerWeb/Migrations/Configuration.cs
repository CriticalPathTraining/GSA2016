namespace CustomerManagerWeb.Migrations {
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using CustomerManagerWeb.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<CustomerManagerWeb.Models.CustomersDB> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CustomerManagerWeb.Models.CustomersDB context) {
            context.Customers.Add(new Customer { FirstName = "Bob", LastName = "Forbes", Company = "W.C. Boggs & Co.", Email = "Bob.Forbes@W.C.Boggs&Co..com", WorkPhone = "1(505)333-1111", HomePhone = "1(505)222-4444" });
            context.Customers.Add(new Customer { FirstName = "Anita", LastName = "Fletcher", Company = "VersaLife Corporation", Email = "Anita.Fletcher@VersaLifeCorporation.com", WorkPhone = "1(520)888-1111", HomePhone = "1(520)777-0000" });
            context.Customers.Add(new Customer { FirstName = "Kris", LastName = "Booker", Company = "Springfield Nuclear Power Plant", Email = "Kris.Booker@SpringfieldNuclearPowerPlant.com", WorkPhone = "1(480)222-3333", HomePhone = "1(480)555-0000" });
            context.Customers.Add(new Customer { FirstName = "Tracy", LastName = "Christensen", Company = "Oceanic Airlines", Email = "Tracy.Christensen@OceanicAirlines.com", WorkPhone = "1(915)555-5555", HomePhone = "1(915)666-6666" });
            context.Customers.Add(new Customer { FirstName = "Reed", LastName = "Glover", Company = "Doublemeat Palace", Email = "Reed.Glover@DoublemeatPalace.com", WorkPhone = "1(512)777-7777", HomePhone = "1(512)444-0000" });
            context.Customers.Add(new Customer { FirstName = "Sandy", LastName = "Coleman", Company = "Initech", Email = "Sandy.Coleman@Initech.com", WorkPhone = "1(425)333-0000", HomePhone = "1(425)666-3333" });
            context.Customers.Add(new Customer { FirstName = "Michelle", LastName = "Daniel", Company = "Jupiter Mining Corporation", Email = "Michelle.Daniel@JupiterMiningCorporation.com", WorkPhone = "1(602)777-1111", HomePhone = "1(602)555-5555" });
            context.Customers.Add(new Customer { FirstName = "Mike", LastName = "Hampton", Company = "Medical Mechanica", Email = "Mike.Hampton@MedicalMechanica.com", WorkPhone = "1(210)777-1111", HomePhone = "1(210)888-4444" });
            context.Customers.Add(new Customer { FirstName = "Zack", LastName = "Miller", Company = "Groovy Smoothie", Email = "Zack.Miller@GroovySmoothie.com", WorkPhone = "1(512)888-4444", HomePhone = "1(512)888-5555" });
            context.Customers.Add(new Customer { FirstName = "Rosalyn", LastName = "Osborne", Company = "Vandelay Industries", Email = "Rosalyn.Osborne@VandelayIndustries.com", WorkPhone = "1(509)555-6666", HomePhone = "1(509)111-0000" });
            context.Customers.Add(new Customer { FirstName = "Orlando", LastName = "Cooper", Company = "ARCAM Corporation", Email = "Orlando.Cooper@ARCAMCorporation.com", WorkPhone = "1(806)222-3333", HomePhone = "1(806)555-1111" });
            context.Customers.Add(new Customer { FirstName = "Isaac", LastName = "Cooke", Company = "Springfield Nuclear Power Plant", Email = "Isaac.Cooke@SpringfieldNuclearPowerPlant.com", WorkPhone = "1(210)222-4444", HomePhone = "1(210)333-7777" });
        }

    }
}
