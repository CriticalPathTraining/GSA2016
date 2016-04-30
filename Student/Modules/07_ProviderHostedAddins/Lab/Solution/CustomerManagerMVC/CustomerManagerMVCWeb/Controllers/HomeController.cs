using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerManagerMVCWeb.Controllers {
  public class HomeController : Controller {
    [SharePointContextFilter]
    public ActionResult Index() {
      // create named properties in ViewBag 
      ViewBag.welcomeMessage = "Hello from the ASP.NET MVC Framework";

      // return default view for this action
      return View();
    }

    public ActionResult About() {
      ViewBag.Message = "Your application description page.";
      return View();
    }

    public ActionResult Contact() {
      ViewBag.Message = "Your contact page.";
      return View();
    }
  }
}
