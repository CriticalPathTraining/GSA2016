(function () {
    // create and intialize object to override context
    var overrideCtx = {};
    overrideCtx.BaseViewID = 2;
    overrideCtx.ListTemplateType = 10000;
    // initialize template 
    overrideCtx.Templates = {};
    overrideCtx.Templates.Header = "<h2>My favorite classic books</h2>";
    overrideCtx.Templates.Item = customItem;
    // register with page template manager
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function customItem(ctx) {
    // create item style
    var itemStyle = "display:inline-block;width:200px;height:120px;border:black 1px solid;";

    // create and return HTML for each item
    return "<div style='" + itemStyle + "'>" +
               ctx.CurrentItem.Title + "<br/>by<br/>" + ctx.CurrentItem.BookAuthor +
           "</div>";
}
