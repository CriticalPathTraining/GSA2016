using System.Web.Mvc;
using CustomerManagerWeb.Models;

namespace CustomerManagerWeb.Filters {

    public class SharePointSessionManagerFilterAttribute : ActionFilterAttribute {

        public override void OnActionExecuting(ActionExecutingContext filterContext) {
            SharePointSessionManager.InitializeRequest(filterContext.Controller);
        }

    }
}
