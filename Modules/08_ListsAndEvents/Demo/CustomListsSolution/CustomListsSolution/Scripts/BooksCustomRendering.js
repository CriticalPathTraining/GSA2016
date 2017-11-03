
(function () {

  var itemStyle = "display:inline-block;width:200px;height:120px;max-height:120px;margin:12px;" +
                    "border: 1px black solid;background-color:#ffe;padding-top:20px;" +
                    "color:black;text-align:center;font-size:12px;";

  var itemTemplate = function (itemContext) {
    return "<div style='" + itemStyle + "'>" +
             "<strong>" + itemContext.CurrentItem.Title + "</strong>" +
             "<br/><br/>by<br/><br/>" +
             "<em>" + itemContext.CurrentItem.BookAuthor + "</em>" +
           "</div>";
  }

  var displayTemplate = {
    BaseViewID: 2,
    ListTemplateType: 10001,
    Templates: {
      Header: "<h2>Classic Books from Literature</h2>",
      Item: itemTemplate
    }
  };

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(displayTemplate);

})();
