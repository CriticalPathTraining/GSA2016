using System.Web;
using System.Web.Mvc;
using CustomerManagerWeb.Filters;
namespace CustomerManagerWeb {
    public class FilterConfig {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters) {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new SharePointSessionManagerFilterAttribute());
        }
    }
}
