$(document).ready(function () {

    window.Vocabulary = {
        element: '',
        groupName: '',
        termSetName: '',
        ctx: '',
        site: '',
        taxSession: '',
        termStores: '',
        termStore: '',
        termGroups: '',
        termGroup: '',
        termSets: '',
        termSet: '',
        terms: '',
        selectedTerm: '',
        childTerms: '',

        init: function (element, groupName, termSetName) {
            Vocabulary.element = element;
            Vocabulary.groupName = groupName;
            Vocabulary.termSetName = termSetName;

            ctx = new SP.ClientContext();
            site = ctx.get_site();
            ctx.load(site);
            ctx.executeQueryAsync(window.Vocabulary.siteSuccess, window.Vocabulary.error);
        },

        error: function (sender, args) {
            alert(args.get_message());
        },

        siteSuccess: function () {
            taxSession = new SP.Taxonomy.TaxonomySession(ctx, site, false);
            ctx.load(taxSession);
            ctx.executeQueryAsync(window.Vocabulary.sessionSuccess, window.Vocabulary.error);
        },

        sessionSuccess: function () {
            termStores = taxSession.get_termStores();
            ctx.load(termStores);
            ctx.executeQueryAsync(window.Vocabulary.storeSuccess, window.Vocabulary.error);
        },

        storeSuccess: function () {
            termStore = termStores.getItemAtIndex(0);
            termGroups = termStore.get_groups();
            ctx.load(termGroups);
            ctx.executeQueryAsync(window.Vocabulary.groupSuccess, window.Vocabulary.error);
        },

        groupSuccess: function () {

            for (var i = 0; i < termGroups.get_count() ; i++) {
                if(termGroups.getItemAtIndex(i).get_name() == Vocabulary.groupName)
                    termGroup = termGroups.getItemAtIndex(i);
            }
            
            termSets = termGroup.get_termSets();
            ctx.load(termSets);
            ctx.executeQueryAsync(window.Vocabulary.setSuccess, window.Vocabulary.error);
        },

        setSuccess: function () {

            for (var i = 0; i < termSets.get_count() ; i++) {
                if (termSets.getItemAtIndex(i).get_name() == Vocabulary.termSetName)
                    termSet = termSets.getItemAtIndex(i);
            }

            Vocabulary.element.html("<p>" + termSet.get_name() + "</p><ul id='termsListRoot'></ul>");
            terms = termSet.get_terms();
            ctx.load(terms);
            ctx.executeQueryAsync(window.Vocabulary.termSuccess, window.Vocabulary.error);
        },

        termSuccess: function () {

            for (var i = 0; i < terms.get_count() ; i++) {
                var name = terms.getItemAtIndex(i).get_name();
                var id = terms.getItemAtIndex(i).get_id();
                $("#termsListRoot").append("<li><a href=\"javascript:Vocabulary.addChildTerms('" + name + "');\">" + name + "</a></li><ul id='" + id + "'></ul>");
            }

        },

        addChildTerms: function (name) {
            selectedTerm = termSet.getAllTerms().getByName(name);
            ctx.load(selectedTerm);
            ctx.executeQueryAsync(window.Vocabulary.selectedTermSuccess, window.Vocabulary.error);
        },

        selectedTermSuccess: function () {
            childTerms = selectedTerm.get_terms();
            ctx.load(childTerms);
            ctx.executeQueryAsync(window.Vocabulary.childTermSuccess, window.Vocabulary.error);
        },

        childTermSuccess: function () {

            var parentId = selectedTerm.get_id();
         
            for (var i = 0; i < childTerms.get_count() ; i++) {
                var name = childTerms.getItemAtIndex(i).get_name();
                var id = childTerms.getItemAtIndex(i).get_id();
                $("#" + parentId).append("<li><a href=\"javascript:Vocabulary.addChildTerms('" + name + "');\">" + name + "</a></li><ul id='" + id + "'></ul>");
            }

        }
    }

});

function getVocabulary() {
    Vocabulary.init($('#rootDiv'), $('#groupName').val(), $('#termSetName').val());
}