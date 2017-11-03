// CSR-override for MDS enabled site
RegisterModuleInit( _spPageContextInfo.siteServerRelativeUrl + "CPT/scripts/CustomersListCSR.js", RegisterTemplate);

//CSR-override for MDS disabled site (because we need to call the entry point function in this case whereas it is not needed for anonymous functions)
RegisterTemplate();

function RegisterTemplate() {

  var overrideCtx = {};
  //overrideCtx.BaseViewID = 1;
  overrideCtx.ListTemplateType = 105;
  overrideCtx.OnPreRender = onPreRender;
  overrideCtx.OnPostRender = onPostRender;
  overrideCtx.Templates = {};
  overrideCtx.Templates.Header = customHeader;
  overrideCtx.Templates.Item = customItem;

  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
}

function customHeader(ctx) {

  return "<div class='csrHeaderDiv'>" +
           "<a href='" + ctx.newFormUrl + "' >(+) Add New Customer</a>" +
         "</div>";
}

function customItem(ctx) {

  var itemHTML = "<div class='csr1CustomerBlock' >" +
                    "<div class='csr1CustomerBlockHeader' >" +
                      ctx.CurrentItem.FirstName + " " + ctx.CurrentItem.Title +
                    "</div>" +
                    "<div class='csr1CustomerBlockBody' >" +
                      "Company: " + ctx.CurrentItem.Company +
                      "<br/>" +
                      "Work Phone: " + ctx.CurrentItem.WorkPhone +
                      "<br/>" +
                      "Home Phone: " + ctx.CurrentItem.HomePhone +
                      "<br/>" +
                      "Email: " + ctx.CurrentItem.Email +
                   "</div>" +
                 "</div>";

  return itemHTML;
}

function onPreRender(ctx) {
  console.log("Executing onPreRender");
}

function onPostRender(ctx) {
  console.log("Executing onPostRender");
}