using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Taxonomy;

namespace TaxonomySSOM
{
    class Program
    {
        static void Main(string[] args)
        {
            SPSite siteCollection = new SPSite("http://ecm.wingtip.com");
            TaxonomySession taxSession = new TaxonomySession(siteCollection);
            TermStore termStore = taxSession.TermStores[0];
            Group termGroup = termStore.Groups.Single(tg => tg.Name == "Example Taxonomies");
            TermSet termSet = termGroup.TermSets.Single(ts => ts.Name == "Corporate Locations");

            //// add region
            //Term unitedStatesTerm = termSet.Terms[0];
            //Term newRegion = unitedStatesTerm.CreateTerm("Mountain Region", 1033);
            //newRegion.SetCustomProperty("PrimaryPOC", "Janice Galvin");
            //newRegion.IsAvailableForTagging = false;

            //// add state
            //Term newState = newRegion.CreateTerm("Colorado", 1033);

            // search for CENTRAL term
            var foundTerm = termSet.GetTerms("Central", 1033, false).First();

            foundTerm.Name = "Central Region";
            foundTerm.IsAvailableForTagging = false;

            // search for EAST term
            foundTerm = termSet.GetTerms("East", 1033, false).First();
            foundTerm.Name = "East Region";
            foundTerm.IsAvailableForTagging = false;

            // search for WEST term
            foundTerm = termSet.GetTerms("West", 1033, false).First();
            foundTerm.Name = "West Region";
            foundTerm.IsAvailableForTagging = false;

            // save changes
            termStore.CommitAll();

        }
    }
}
