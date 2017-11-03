using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.Taxonomy;

namespace TaxonomyManagedCSOM
{
    class Program
    {
        static void Main(string[] args)
        {
            ClientContext context = new ClientContext("http://ecm.wingtip.com");

            TaxonomySession session = TaxonomySession.GetTaxonomySession(context);
            context.Load(session, taxSession => taxSession.TermStores.Include(
                       taxStore => taxStore.Groups.Include(
                       taxGroup => taxGroup.TermSets.Include(tax => tax.Name)
                       )));
            context.ExecuteQuery();

            TermStore termStore = session.TermStores[0];
            TermGroup termGroup = termStore.Groups[0];
            TermSet termSet = termGroup.TermSets[0];

            //// get UNITED STATES term
            //var terms = termSet.Terms;
            //context.Load(terms);
            //context.ExecuteQuery();
            //Term unitedStatesTerm = terms[0];
            //context.Load(unitedStatesTerm);
            //context.ExecuteQuery();

            //// add region
            //Term newRegion = unitedStatesTerm.CreateTerm("Pacific", 1033, Guid.NewGuid());
            //newRegion.SetCustomProperty("PrimaryPOC", "Rob Walters");
            //newRegion.IsAvailableForTagging = false;

            //// add state
            //Term newState = newRegion.CreateTerm("Hawaii", 1033, Guid.NewGuid());

            // search for PACIFIC term
            var searchQuery = new LabelMatchInformation(context)
            {
                TermLabel = "Pacific",
                TrimUnavailable = false
            };
            var foundTerms = termSet.GetTerms(searchQuery);
            context.Load(foundTerms);
            context.ExecuteQuery();

            // update term
            foundTerms[0].Name = "Pacific Region";

            // save changes
            termStore.CommitAll();
            context.ExecuteQuery();

        }
    }
}
