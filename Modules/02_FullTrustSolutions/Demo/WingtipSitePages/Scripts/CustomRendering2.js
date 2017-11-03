(function () {
    var overrideCtx = {};
    overrideCtx.BaseViewID = 2;
    overrideCtx.ListTemplateType = 10000;
    overrideCtx.Templates = {};
    overrideCtx.Templates.Header = "<h2>My favorite classic books</h2>";
    overrideCtx.Templates.Item = customItem;

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();

function customItem(ctx) {

    var itemStyle = "display:inline-block;width:200px;height:120px;max-height:120px;margin:12px;" +
                    "border: 1px black solid;background-color:#ffe;padding-top:20px;" +
                    "color:black;text-align:center;font-size:12px;";

    var itemHTML = "<div style='" + itemStyle + "'>" +
                      "<strong>" + ctx.CurrentItem.Title + "</strong>" +
                      "<br/><br/>by<br/><br/>" +
                      "<em>" + ctx.CurrentItem.BookAuthor + "</em>" +
                   "</div>";

    return itemHTML;
}
