using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using Microsoft.IdentityModel.S2S.Protocols.OAuth2;
using Newtonsoft.Json;
using CustomerManagerWeb;

namespace CustomerManagerWeb.Models {

    public class SharePointSessionState {
        public string RemoteWebUrl { get; set; }
        public string HostWebUrl { get; set; }
        public string HostWebDomain { get; set; }
        public string HostWebTitle { get; set; }
        public string CurrentUserAccountName { get; set; }
        public string CurrentUserDisplayName { get; set; }
        public string CurrentUserEmail { get; set; }
    }

    public class SharePointUserResult {
        public string Title { get; set; }
        public string Email { get; set; }
        public string IsSiteAdmin { get; set; }
    }

    public class SharePointSessionManager {

        static HttpRequest request = HttpContext.Current.Request;
        static HttpSessionState session = HttpContext.Current.Session;
        static SharePointSessionState sessionState = new SharePointSessionState();

        private static string ExecuteGetRequest(string restUri, string accessToken) {
            // setup request
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            // execute request
            HttpResponseMessage response = client.GetAsync(restUri).Result;
            // handle response
            if (response.IsSuccessStatusCode) {
                return response.Content.ReadAsStringAsync().Result;
            }
            else {
                // ERROR during HTTP GET operation
                return string.Empty;
            }
        }

        private static void AuthenticateUser() {

            sessionState.RemoteWebUrl = request.Url.Authority;
            sessionState.HostWebUrl = request["SPHostUrl"];
            sessionState.HostWebDomain = (new Uri(sessionState.HostWebUrl)).Authority;
            sessionState.HostWebTitle = request.Form["SPSiteTitle"];

            // get windows authenticated user name
            sessionState.CurrentUserAccountName = HttpContext.Current.User.Identity.Name;

            // get access token to make RESt call
            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext.Current);
            string accessToken = spContext.UserAccessTokenForSPHost;

            // call SharePoint REST API to get information about current user
            string restUri = sessionState.HostWebUrl + "/_api/web/currentUser/";
            string jsonCurrentUser = ExecuteGetRequest(restUri, accessToken);

            // convert json result to strongly-typed C# object
            SharePointUserResult userResult = JsonConvert.DeserializeObject<SharePointUserResult>(jsonCurrentUser);
            sessionState.CurrentUserDisplayName = userResult.Title;
            sessionState.CurrentUserEmail = userResult.Email;

            // write session state out to ASP.NET session object
            session["SharePointSessionState"] = sessionState;

            // update UserIsAuthenticated session variable
            session["UserIsAuthenticated"] = "true";
        }

        private static bool UserIsAuthentiated() {
            return (session["UserIsAuthenticated"] != null) &&
                   (session["UserIsAuthenticated"].Equals("true"));
        }

        public static void InitializeRequest(ControllerBase controller) {

            if (!UserIsAuthentiated()) {
                AuthenticateUser();
            }
            else {
                // if user is authenticated, copy session state from previous request
                sessionState = (SharePointSessionState)session["SharePointSessionState"];
            }

            // add session state to ViewBag to make it accessible in views
            controller.ViewBag.HostWebUrl = sessionState.HostWebUrl;
            controller.ViewBag.HostWebTitle = sessionState.HostWebTitle;
            controller.ViewBag.CurrentUserDisplayName = sessionState.CurrentUserDisplayName;
        }

        public static SharePointSessionState GetSharePointSessionState() {
            return sessionState;
        }

    }
}