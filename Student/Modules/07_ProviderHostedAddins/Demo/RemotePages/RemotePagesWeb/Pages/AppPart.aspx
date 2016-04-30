<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AppPart.aspx.cs" Inherits="RemotePagesWeb.Pages.AppPart" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript">
        // Set the style of the client web part page to be consistent with the host web.
        function setStyleSheet() {
            var hostUrl = ""
            if (document.URL.indexOf("?") != -1) {
                var params = document.URL.split("?")[1].split("&");
                for (var i = 0; i < params.length; i++) {
                    p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split("=")[1];
                        document.write("<link rel=\"stylesheet\" href=\"" + hostUrl + "/_layouts/15/defaultcss.ashx\" />");
                        break;
                    }
                }
            }
            if (hostUrl == "") {
                document.write("<link rel=\"stylesheet\" href=\"/_layouts/15/1033/styles/themable/corev15.css\" />");
            }
        }
        setStyleSheet();
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <b>Hello world, this is coming from the remote web!</b>
        </div>
    </form>
</body>
</html>
