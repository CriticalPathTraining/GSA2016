using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.SharePoint.Client;
using Microsoft.IdentityModel.S2S.Tokens;
using System.Net;
using System.Text;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using Microsoft.IdentityModel.S2S.Protocols.OAuth2;

namespace OAuthAddinDemoWeb {
    public partial class Default : System.Web.UI.Page {


        Uri uriHostWeb;
        string contextTokenString;
        SharePointContextToken contextToken;

        string targetPrincipalName;
        string realm;

        OAuth2AccessTokenResponse accessToken;
        string accessTokenString;

        OAuth2AccessTokenResponse appOnlyAccessToken;
        string appOnlyAccessTokenString;


        protected void Page_Load(object sender, EventArgs e) {

            uriHostWeb = new Uri(Request.QueryString["SPHostUrl"]);

            contextTokenString = TokenHelper.GetContextTokenFromRequest(Request);

            if (contextTokenString != null) {
                contextToken = TokenHelper.ReadAndValidateContextToken(contextTokenString, Request.Url.Authority);

                targetPrincipalName = contextToken.TargetPrincipalName;
                realm = contextToken.Realm;
                accessToken = TokenHelper.GetAccessToken(contextToken, uriHostWeb.Authority);
                accessTokenString = TokenHelper.GetAccessToken(contextToken, uriHostWeb.Authority).AccessToken;
                appOnlyAccessToken = TokenHelper.GetAppOnlyAccessToken(contextToken.TargetPrincipalName, uriHostWeb.Authority, contextToken.Realm);
                appOnlyAccessTokenString = appOnlyAccessToken.AccessToken;

                // cache state that can be shared across user
                Cache["uriHostWeb"] = uriHostWeb;
                Cache["appOnlyAccessTokenString"] = appOnlyAccessTokenString;

                // cache state that must be tracked on per-user basis        
                Session["contextTokenString"] = contextTokenString;
                Session["accessTokenString"] = accessTokenString;

            }

            #region "Incoming Data"

            HtmlTableWriter table1 = new HtmlTableWriter();

            table1.AddRow("Request URL", this.Request.Path);

            foreach (var param in Request.Form.AllKeys) {
                table1.AddRow("Request.Form['" + param + "']", Request.Form[param].ToString());
            }

            foreach (var param in Request.QueryString.AllKeys) {
                table1.AddRow("Request.QueryString['" + param + "']", Request.QueryString[param].ToString());
            }

            placeholderIncomingData.Controls.Add(new LiteralControl(table1.ToString()));

            #endregion

            #region "Context Token"

            HtmlTableWriter table2 = new HtmlTableWriter();
            table2.AddRow("Context Token (RAW)", contextTokenString);

            if (contextToken != null) {
                table2.AddRow("Content Token (JSON)", contextToken.ToString());
                table2.AddRow("Cache Key", contextToken.CacheKey);
                table2.AddRow("Realm", contextToken.Realm);
                table2.AddRow("Security Token Service Uri", contextToken.SecurityTokenServiceUri);
                table2.AddRow("Target Principal Name", contextToken.TargetPrincipalName);

                table2.AddRow("Valid From", contextToken.ValidFrom.ToString());
                table2.AddRow("Valid To", contextToken.ValidTo.ToString());
                table2.AddRow("Refresh Token", contextToken.RefreshToken);

                placeholderContextToken.Controls.Add(new LiteralControl(table2.ToString()));
            }

            #endregion

            #region "Access Token"
            if (contextToken != null) {

                HtmlTableWriter table3 = new HtmlTableWriter();
                // create OAuth access token
                table3.AddRow("Access Token", accessTokenString);
                table3.AddRow("Access Token (JSON)", accessToken.ToString());
                table3.AddRow("Resource", accessToken.Message["resource"]);
                table3.AddRow("NotBefore", accessToken.NotBefore.ToString());
                table3.AddRow("ExpiresOn", accessToken.ExpiresOn.ToString());
                table3.AddRow("ExpiresIn", TimeSpan.FromSeconds(Convert.ToInt32(accessToken.ExpiresIn)).TotalHours.ToString("0.0") + " hours");

                foreach (var msg in accessToken.Message) {
                    //table3.AddRow("Message - " + msg.Key, msg.Value);
                }

                placeholderAccessToken.Controls.Add(new LiteralControl(table3.ToString()));
            }
            #endregion

            #region "App-only Access Token"
            if (contextToken != null) {
                appOnlyAccessToken = TokenHelper.GetAppOnlyAccessToken(contextToken.TargetPrincipalName, uriHostWeb.Authority, contextToken.Realm);
                appOnlyAccessTokenString = appOnlyAccessToken.AccessToken;

                HtmlTableWriter table4 = new HtmlTableWriter();
                // create OAuth access token
                table4.AddRow("App-only Access Token", appOnlyAccessTokenString);
                table4.AddRow("App-only Access Token (JSON)", appOnlyAccessToken.ToString());
                table4.AddRow("Resource", appOnlyAccessToken.Message["resource"]);
                table4.AddRow("NotBefore", appOnlyAccessToken.NotBefore.ToString());
                table4.AddRow("ExpiresOn", appOnlyAccessToken.ExpiresOn.ToString());
                table4.AddRow("ExpiresIn", TimeSpan.FromSeconds(Convert.ToInt32(appOnlyAccessToken.ExpiresIn)).TotalHours.ToString("0.0") + " hours");

                foreach (var msg in appOnlyAccessToken.Message) {
                    table4.AddRow("Message - " + msg.Key, msg.Value);
                }

                placeholderAppOnlyAccessToken.Controls.Add(new LiteralControl(table4.ToString()));
            }

            #endregion

        }

        private void Listings() {

            // get content token string from request context
            string hostWeb = Request.QueryString["SPHostUrl"];
            string contextTokenString = TokenHelper.GetContextTokenFromRequest(Request);

            if (contextTokenString != null) {

                // get context token as strongly-typed object
                SharePointContextToken contextToken =
                  TokenHelper.ReadAndValidateContextToken(contextTokenString, hostWeb);

                // get access token as an strongly-typed object
                OAuth2AccessTokenResponse accessToken =
                  TokenHelper.GetAccessToken(contextToken, hostWeb);

                // get access token as string
                string accessTokenString = accessToken.AccessToken;

                // get app-only access token as strongly-typed object
                string targetPrincipalName = contextToken.TargetPrincipalName;
                string tenancy = contextToken.Realm;
                OAuth2AccessTokenResponse appOnlyAccessToken =
                  TokenHelper.GetAppOnlyAccessToken(targetPrincipalName, hostWeb, tenancy);

                // get app-only access token as string
                string appOnlyAccessTokenString = appOnlyAccessToken.AccessToken;

            }

        }


    }
}