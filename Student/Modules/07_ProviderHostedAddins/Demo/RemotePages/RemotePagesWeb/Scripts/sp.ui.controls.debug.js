if (typeof window.SP == "undefined") {
    window.SP = new Object();
    window.SP.__namespace = true;
}
if (typeof window.SP.UI == "undefined") {
    window.SP.UI = new Object();
    window.SP.UI.__namespace = true;
}
if (typeof window.SP.UI.Controls == "undefined") {
    window.SP.UI.Controls = new Object();
    window.SP.UI.Controls.__namespace = true;
}
if (window.Type && window.Type.registerNamespace)
    Type.registerNamespace('SP');
SP.ClientControlsHttpUtility = function SP_ClientControlsHttpUtility() {
};
SP.ClientControlsHttpUtility.$1K = function SP_ClientControlsHttpUtility$$1K($p0, $p1, $p2) {
    var $v_0 = '';
    var $v_1;
    var $v_2 = 0;
    var $v_3 = ' \"%<>\'&';
    var $v_4 = null;

    if ($p0 === $v_4 || typeof $p0 === 'undefined' || !$p0.length) {
        return '';
    }
    for ($v_2 = 0; $v_2 < $p0.length; $v_2++) {
        var $v_5 = $p0.charCodeAt($v_2);
        var $v_6 = $p0.charAt($v_2);

        if ($p1 && ($v_6 === '#' || $v_6 === '?')) {
            $v_0 += $p0.substr($v_2);
            break;
        }
        if ($v_5 <= 127) {
            if ($p2) {
                $v_0 += $v_6;
            }
            else {
                if ($v_5 >= 97 && $v_5 <= 122 || $v_5 >= 65 && $v_5 <= 90 || $v_5 >= 48 && $v_5 <= 57 || $v_5 >= 32 && $v_5 <= 95 && $v_3.indexOf($v_6) < 0) {
                    $v_0 += $v_6;
                }
                else if ($v_5 <= 15) {
                    $v_0 += '%0' + ($v_5.toString(16)).toUpperCase();
                }
                else if ($v_5 <= 127) {
                    $v_0 += '%' + ($v_5.toString(16)).toUpperCase();
                }
            }
        }
        else if ($v_5 <= 2047) {
            $v_1 = 192 | $v_5 >> 6;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | $v_5 & 63;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
        }
        else if (($v_5 & 64512) !== 55296) {
            $v_1 = 224 | $v_5 >> 12;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | ($v_5 & 4032) >> 6;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | $v_5 & 63;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
        }
        else if ($v_2 < $p0.length - 1) {
            $v_5 = ($v_5 & 1023) << 10;
            $v_2++;
            var $v_7 = $p0.charCodeAt($v_2);

            $v_5 |= $v_7 & 1023;
            $v_5 += 65536;
            $v_1 = 240 | $v_5 >> 18;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | ($v_5 & 258048) >> 12;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | ($v_5 & 4032) >> 6;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
            $v_1 = 128 | $v_5 & 63;
            $v_0 += '%' + ($v_1.toString(16)).toUpperCase();
        }
    }
    return $v_0;
};
if (window.Type && window.Type.registerNamespace)
    Type.registerNamespace('SP.UI.Controls');
SP.UI.Controls.SettingsLink = function SP_UI_Controls_SettingsLink() {
};
SP.UI.Controls.NavigationOptions = function SP_UI_Controls_NavigationOptions() {
};
SP.UI.Controls.ControlManager = function SP_UI_Controls_ControlManager() {
};
SP.UI.Controls.ControlManager.$18 = function SP_UI_Controls_ControlManager$$18($p0, $p1) {
    SP.UI.Controls.ControlManager.$V[$p0] = $p1;
};
SP.UI.Controls.ControlManager.$1W = function SP_UI_Controls_ControlManager$$1W($p0) {
    delete SP.UI.Controls.ControlManager.$V[$p0];
};
SP.UI.Controls.ControlManager.getControl = function SP_UI_Controls_ControlManager$getControl(placeHolderId) {
    if (SP.UI.Controls.ClientControlsUtility.$1(placeHolderId)) {
        return null;
    }
    return SP.UI.Controls.ControlManager.$V[placeHolderId];
};
SP.UI.Controls.Navigation = function SP_UI_Controls_Navigation(placeholderDOMElementId, options) {
    this.$b_0 = '\r\n            <div id=\'{0}' + SP.UI.Controls.Navigation.$G + '\' style=\'display:none; overflow:visible\' dir=\'{12}\'>\r\n                <div id=\'{0}' + SP.UI.Controls.Navigation.$W + '\' style=\'overflow:visible;\' class=\'ms-core-defaultFont\'>\r\n                    <div id=\'suiteBar\' class=\'ms-dialogHidden\' style=\'width:100%;display:table\'>\r\n                            <div id=\'suiteBarLeft\' style=\'padding-left:12px;\'>\r\n                                <div style=\'display:table-cell; padding-right:0px; vertical-align:middle\' ><a id=\'{0}' + SP.UI.Controls.Navigation.$1I + '\' href=\'{1}\' class=\'ms-core-suiteLink-a\' target=\'_top\' ><span id=\'{0}' + SP.UI.Controls.Navigation.$1G + '\' >{2}</span></a></div>\r\n                                <div tabindex=\'-1\' style=\'display:table-cell; padding-right:5px;padding-left:0px;vertical-align:middle\'>\r\n                                    <img id=\'{0}' + SP.UI.Controls.Navigation.$s + '\' src=\'{11}\' alt=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_ArrowImageAlt')) + '\'> \r\n                                </div>\r\n                                <div tabindex=\'0\' id=\'{0}' + SP.UI.Controls.Navigation.$f + '\' style=\'display:table-cell; padding-right:0px; vertical-align:middle\'></div>\r\n                                <div style=\'display:table-cell; padding-right:2px; vertical-align:middle\' ><a id=\'{0}' + SP.UI.Controls.Navigation.$g + '\' href=\'{9}\' class=\'ms-core-suiteLink-a\' target=\'_top\' ><span id=\'{0}' + SP.UI.Controls.Navigation.$h + '\' >{4}</span></a></div>\r\n                            </div>\r\n                            <div id=\'suiteBarRight\' style=\'padding-right:0px;\'>\r\n                                <div class=\'ms-core-deltaSuiteBarRight\'>\r\n                                    <div class=\'ms-displayInlineBlock ms-positionRelative\' style=\'height:30px\'>\r\n                                        <span class=\'ms-siteactions-root\'>\r\n                                            <span id=\'{0}' + SP.UI.Controls.Navigation.$r + '\' class=\'ms-siteactions-normal\'>\r\n                                                <a tabindex = \'0\' title=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_SettingsLinkToolTip')) + '\' class=\'ms-core-menu-root\' href=\'#\' onclick=\"SP.UI.Controls.Navigation.showSettingsLink(\'{5}\',\'{13}\')\" >\r\n                                                    <span class=\'ms-siteactions-imgspan\'>\r\n                                                        <img id=\'{0}' + SP.UI.Controls.Navigation.$1D + '\' src=\'{10}\' alt=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_SettingsLinkToolTip')) + '\' style=\'border:none;display:{6};\' title=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_SettingsLinkToolTip')) + '\' class=\'ms-core-menu-buttonIcon\' />\r\n                                                    </span>\r\n                                                    <span tabindex=\'0\' style=\'padding-top:4px;display:{7}\' class=\'ms-core-menu-root\'>' + SP.UI.Controls.ClientControlsUtility.$7(SP.UI.Controls.ChromeControlResources.getString('CC_SettingsLinkToolTip')) + '</span>\r\n                                                </a>\r\n                                                <div style=\'right:{13}; position: absolute; top:30px; display:none; overflow-y:visible; overflow-x:visible; word-break:normal\' id=\'{0}' + SP.UI.Controls.Navigation.$J + '\' class=\'ms-core-menu-box ms-core-defaultFont ms-shadow\' flipped=\'true\'>\r\n                                                    <ul id=\'{0}' + SP.UI.Controls.Navigation.$p + '\' class=\'ms-core-menu-list\' style=\'overflow-y:visible; overflow-x:visible;\'>\r\n                        ';
    this.$a_0 = '\r\n                                                    </ul>\r\n                                                </div>\r\n                                            </span>\r\n                                        </span>\r\n                                        <span id=\'ms-help\' >\r\n                                            <span class=\'s4-clust\' style=\'display: inline-block; position: relative;padding-left:5px;padding-right:7px;padding-top:7px;\' id=\'{0}' + SP.UI.Controls.Navigation.$l + '\'>\r\n                                                <div id=\'{0}' + SP.UI.Controls.Navigation.$1B + '\' >\r\n                                                <a id=\'{0}' + SP.UI.Controls.Navigation.$R + '\' href=\'{3}\' onClick=\'{8}\' class=\'ms-chromecontrol-help\' style=\"border:none;display:{6}; background-image:url(\'{10}\')\" title=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_HelpLinkToolTip')) + '\' >\r\n                                                    <span tabindex=\'0\' style=\'padding-top:4px;display:{7}\' class=\'ms-core-menu-root\'>' + SP.UI.Controls.ClientControlsUtility.$7(SP.UI.Controls.ChromeControlResources.getString('CC_HelpLinkToolTip')) + '</span>\r\n                                                </a>\r\n                                                </div>\r\n                                                </span>\r\n                                        </span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                    </div>\r\n                </div>\r\n                <div id=\'{0}' + SP.UI.Controls.Navigation.$i + '\' style=\'width: 100%; overflow: visible;display:table-cell;\'>\r\n                    <div class=\'ms-tableRow\'>\r\n                         <div id=\'{0}' + SP.UI.Controls.Navigation.$d + '\' style=\'padding-right:20px;  padding-left:20px;padding-top:20px; padding-bottom:27px; display:table-cell; vertical-align:middle\' >\r\n                         </div>\r\n                         <div tabindex=\'0\' style=\'padding-right:2px;display:table-cell; float:left;\'>\r\n                            <div id=\'{0}' + SP.UI.Controls.Navigation.$e + '\' class=\'ms-core-pageTitle\' style=\'display:block;padding-top:20px; padding-bottom:27px;\'>{4}</div>\r\n                         </div>\r\n                    </div>\r\n                </div>\r\n             </div>\r\n        ';
    this.$16_0 = '<img src=\'{0}\' alt=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_AppIconAlt')) + '\' style=\'height:24px; width:24px; display:block\'/>';
    this.$13_0 = '<img class=\'ms-siteicon-img\' src=\'{0}\' alt=\'' + SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ChromeControlResources.getString('CC_AppIconAlt')) + '\' />';
    this.$H_0 = '<li class=\'ms-core-menu-item\' style=\'display:{1}\'><a href=\'{0}\' class=\'ms-core-menu-link\' title=\'' + SP.UI.Controls.ClientControlsUtility.$7(SP.UI.Controls.ChromeControlResources.getString('CC_SendFeedback')) + '\'><div class=\'ms-core-menu-label\'><span class=\'ms-core-menu-title\'>' + SP.UI.Controls.ClientControlsUtility.$7(SP.UI.Controls.ChromeControlResources.getString('CC_SendFeedback')) + '</span></div></a></li>';
    if (SP.UI.Controls.ClientControlsUtility.$1(placeholderDOMElementId) || !SP.UI.Controls.ClientControlsUtility.$1R(placeholderDOMElementId)) {
        throw SP.UI.Controls.ClientControlsUtility.$1N('placeholderDOMElementId');
    }
    var $v_0 = document.getElementById(placeholderDOMElementId);

    if (SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
        throw SP.UI.Controls.ClientControlsUtility.$N(SP.UI.Controls.ChromeControlResources.getString('CC_PlaceHolderElementNotFound'), SP.UI.Controls.NavigationControlExceptions.placeHolderElementNotFound);
    }
    this.$Q_0 = placeholderDOMElementId;
    var $v_1 = decodeURIComponent(document.URL);
    var $v_2 = SP.UI.Controls.ClientControlsUtility.$1Q($v_1);

    this.$F_0 = options.siteTitle;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$F_0)) {
        this.$F_0 = $v_2[SP.UI.Controls.Navigation.$1F];
    }
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$F_0)) {
        this.$F_0 = SP.UI.Controls.ChromeControlResources.getString('CC_BackToSite');
    }
    this.$3_0 = options.siteUrl;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$3_0)) {
        this.$3_0 = $v_2[SP.UI.Controls.Navigation.$1H];
    }
    if (SP.UI.Controls.ClientControlsUtility.$1(this.$3_0)) {
        throw SP.UI.Controls.ClientControlsUtility.$N(SP.UI.Controls.ChromeControlResources.getString('CC_HostSiteUrlNotSet'), SP.UI.Controls.NavigationControlExceptions.hostSiteUrlNotSet);
    }
    else if (this.$3_0.charAt(this.$3_0.length - 1) !== '/') {
        this.$3_0 = this.$3_0 + '/';
    }
    if (!SP.UI.Controls.ClientControlsUtility.$0($v_2[SP.UI.Controls.Navigation.$j])) {
        this.$O_0 = $v_2[SP.UI.Controls.Navigation.$j];
    }
    else if (!SP.UI.Controls.ClientControlsUtility.$0(options.clientTag)) {
        this.$O_0 = options.clientTag;
    }
    else {
        var $v_8 = new Date();

        this.$O_0 = $v_8.getTime();
    }
    this.$E_0 = options.appWebUrl;
    if (SP.UI.Controls.ClientControlsUtility.$1(this.$E_0)) {
        this.$E_0 = $v_2[SP.UI.Controls.Navigation.$19];
    }
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$E_0)) {
        this.$E_0 = '';
    }
    this.$Z_0 = options.onCssLoaded;
    this.$12_0 = this.$x_0(this.$O_0, this.$E_0, this.$3_0) + '&resource=spcommon';
    var $v_3 = true;

    if (SP.UI.Controls.ClientControlsUtility.$1(this.$3_0)) {
        $v_3 = false;
    }
    var $v_4 = $v_3;

    this.$T_0 = options.assetId;
    var $v_5 = this.$3_0 + SP.UI.Controls.Navigation.getVersionedLayoutsUrl('storefront.aspx');

    if (!SP.UI.Controls.ClientControlsUtility.$1(this.$T_0)) {
        $v_5 = $v_5 + '#vw=AppDetailsView,app=[' + SP.UI.Controls.ClientControlsUtility.$1X(this.$T_0) + '],clg=0';
    }
    else {
        $v_4 = false;
    }
    $v_5 = SP.UI.Controls.ClientControlsUtility.$A($v_5);
    this.$H_0 = SP.UI.Controls.NavigationControlUtility._formatString(this.$H_0, $v_5, $v_4 ? 'block' : 'none');
    this.$4_0 = options.appStartPage;
    if (SP.UI.Controls.ClientControlsUtility.$1(this.$4_0)) {
        this.$4_0 = this.$E_0;
    }
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$4_0)) {
        this.$4_0 = '';
    }
    this.$I_0 = options.rightToLeft;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$I_0)) {
        this.$I_0 = false;
    }
    this.$C_0 = options.appTitle;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$C_0)) {
        this.$C_0 = '';
    }
    this.$B_0 = options.appIconUrl;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$B_0)) {
        this.$B_0 = '';
    }
    this.$D_0 = options.appTitleIconUrl;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$D_0)) {
        this.$D_0 = '';
    }
    this.$5_0 = options.appHelpPageUrl;
    this.$8_0 = options.appHelpPageOnClick;
    if (SP.UI.Controls.ClientControlsUtility.$1(this.$5_0)) {
        this.$5_0 = '#';
    }
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$8_0)) {
        this.$8_0 = '';
    }
    var $v_6 = true;

    if (this.$5_0 === '#' && this.$8_0 === '') {
        $v_6 = false;
    }
    this.$9_0 = options.settingsLinks;
    this.$P_0 = options.language;
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$P_0)) {
        this.$P_0 = $v_2[SP.UI.Controls.Navigation.$1C];
    }
    if (SP.UI.Controls.ClientControlsUtility.$0(this.$P_0)) {
        this.$P_0 = '';
    }
    var $v_7 = '';

    if (SP.UI.Controls.ClientControlsUtility.$0(this.$9_0)) {
        $v_7 = this.$b_0 + this.$H_0 + this.$a_0;
    }
    else {
        $v_7 = this.$b_0 + this.$H_0;
        $v_7 += this.$u_0();
        $v_7 += this.$a_0;
    }
    this.$U_0 = SP.UI.Controls.Navigation.$q;
    if ($v_6) {
        this.$U_0 = SP.UI.Controls.Navigation.$q;
    }
    else {
        this.$U_0 = SP.UI.Controls.Navigation.$1E;
    }
    this.$15_0 = SP.UI.Controls.NavigationControlUtility._formatString($v_7, SP.UI.Controls.Navigation.$2, SP.UI.Controls.ClientControlsUtility.$1(this.$3_0) ? '#' : SP.UI.Controls.ClientControlsUtility.$A(this.$3_0), SP.UI.Controls.ClientControlsUtility.$7(this.$F_0), SP.UI.Controls.ClientControlsUtility.$A(this.$5_0), SP.UI.Controls.ClientControlsUtility.$7(this.$C_0), SP.UI.Controls.Navigation.$2, $v_3 ? 'inline-block' : 'none', $v_3 ? 'none' : 'inline-block', SP.UI.Controls.ClientControlsUtility.$6(this.$8_0), SP.UI.Controls.ClientControlsUtility.$1(this.$4_0) ? '#' : SP.UI.Controls.ClientControlsUtility.$A(this.$4_0), SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ClientControlsUtility.$A(this.$12_0)), SP.UI.Controls.ClientControlsUtility.$6(SP.UI.Controls.ClientControlsUtility.$A(this.$w_0())), this.$I_0 ? 'rtl' : 'ltr', this.$U_0);
    $v_0.innerHTML = this.$15_0;
    this.$t_0();
    this.$1J_0();
    if (!SP.UI.Controls.ClientControlsUtility.$0(options.bottomHeaderVisible)) {
        this.setBottomHeaderVisible(options.bottomHeaderVisible);
    }
    if (!SP.UI.Controls.ClientControlsUtility.$0(options.topHeaderVisible)) {
        this.setTopHeaderVisible(options.topHeaderVisible);
    }
    this.set_appIconUrl(this.$B_0);
    this.set_appTitleIconUrl(this.$D_0);
    SP.UI.Controls.ControlManager.$18(this.$Q_0, this);
};
SP.UI.Controls.Navigation.$c = function SP_UI_Controls_Navigation$$c($p0, $p1) {
    $p0.$11_0 = true;
    if (!SP.UI.Controls.ClientControlsUtility.$1(SP.UI.Controls.Navigation.$2)) {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$G);

        $p0.$X_0($v_0, $p1);
    }
    if (!SP.UI.Controls.ClientControlsUtility.$0($p0.$Z_0)) {
        eval($p0.$Z_0);
    }
};
SP.UI.Controls.Navigation.showSettingsLink = function SP_UI_Controls_Navigation$showSettingsLink(placeHolderId, settingsMenuMargin) {
    if (!SP.UI.Controls.ClientControlsUtility.$1(placeHolderId)) {
        var $v_0 = document.getElementById(placeHolderId + SP.UI.Controls.Navigation.$W);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            if ($v_0.style.display === 'none') {
                return;
            }
            var $v_1 = document.getElementById(placeHolderId + SP.UI.Controls.Navigation.$J);

            if (!SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
                if (SP.UI.Controls.Navigation.$10($v_1)) {
                    SP.UI.Controls.Navigation.$y(placeHolderId);
                }
                else {
                    SP.UI.Controls.Navigation.$1U(placeHolderId, settingsMenuMargin);
                    $v_1.style.display = 'block';
                    SP.UI.Controls.Navigation.$1V(placeHolderId);
                }
            }
        }
    }
};
SP.UI.Controls.Navigation.$1U = function SP_UI_Controls_Navigation$$1U($p0, $p1) {
    var $v_0 = false;
    var $v_1 = document.getElementById($p0 + SP.UI.Controls.Navigation.$G);

    if (!SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
        var $v_3 = $v_1.getAttribute('dir');

        if (!SP.UI.Controls.ClientControlsUtility.$1($v_3) && $v_3 === 'rtl') {
            $v_0 = true;
        }
    }
    var $v_2 = document.getElementById($p0 + SP.UI.Controls.Navigation.$J);

    if (!SP.UI.Controls.ClientControlsUtility.$0($v_2)) {
        var $v_4 = $v_2.getAttribute('style');

        if (!SP.UI.Controls.ClientControlsUtility.$1($v_4)) {
            if ($v_0) {
                $v_4 = $v_4.replace(new RegExp(SP.UI.Controls.Navigation.$L, 'gi'), SP.UI.Controls.Navigation.$M);
            }
            else {
                $v_4 = $v_4.replace(new RegExp(SP.UI.Controls.Navigation.$M, 'gi'), SP.UI.Controls.Navigation.$L);
            }
            if (!($v_4.search(new RegExp(SP.UI.Controls.Navigation.$L, 'gi')) >= 0 || $v_4.search(new RegExp(SP.UI.Controls.Navigation.$M, 'gi')) >= 0)) {
                if ($v_0) {
                    $v_4 = $v_4 + ';' + SP.UI.Controls.Navigation.$M + $p1 + ';';
                }
                else {
                    $v_4 = $v_4 + ';' + SP.UI.Controls.Navigation.$L + $p1 + ';';
                }
            }
            $v_2.setAttribute('style', $v_4);
        }
        else {
            if ($v_0) {
                $v_2.setAttribute('style', SP.UI.Controls.Navigation.$M + $p1 + ';');
            }
            else {
                $v_2.setAttribute('style', SP.UI.Controls.Navigation.$L + $p1 + ';');
            }
        }
    }
};
SP.UI.Controls.Navigation.$10 = function SP_UI_Controls_Navigation$$10($p0) {
    var $v_0 = $p0.getElementsByTagName('li');

    if (SP.UI.Controls.ClientControlsUtility.$0($v_0) || !$v_0.length) {
        return true;
    }
    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        var $v_2 = $v_0[$v_1];

        if (SP.UI.Controls.ClientControlsUtility.$1($v_2.style.display) || $v_2.style.display !== 'none') {
            return false;
        }
    }
    return true;
};
SP.UI.Controls.Navigation.$1V = function SP_UI_Controls_Navigation$$1V($p0) {
    if (SP.UI.Controls.Navigation.$K > 0) {
        window.clearTimeout(SP.UI.Controls.Navigation.$K);
    }
    SP.UI.Controls.Navigation.$K = window.setTimeout(function() {
        if (SP.UI.Controls.Navigation.$K > 0) {
            window.clearTimeout(SP.UI.Controls.Navigation.$K);
        }
        SP.UI.Controls.Navigation.$y($p0);
    }, 6000);
};
SP.UI.Controls.Navigation.$y = function SP_UI_Controls_Navigation$$y($p0) {
    var $v_0 = document.getElementById($p0 + SP.UI.Controls.Navigation.$J);

    if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
        $v_0.style.display = 'none';
    }
};
SP.UI.Controls.Navigation.getVersionedLayoutsUrl = function SP_UI_Controls_Navigation$getVersionedLayoutsUrl(pageName) {
    return '_layouts/15/' + pageName;
};
SP.UI.Controls.Navigation.prototype = {
    $Y_0: 0,
    $12_0: null,
    $Q_0: null,
    $15_0: null,
    $17_0: null,
    $14_0: null,
    $11_0: false,
    $E_0: null,
    $P_0: null,
    $O_0: 0,
    $Z_0: null,
    $U_0: null,
    $T_0: null,
    get_assetId: function SP_UI_Controls_Navigation$get_assetId() {
        return this.$T_0;
    },
    $F_0: null,
    get_siteTitle: function SP_UI_Controls_Navigation$get_siteTitle() {
        return this.$F_0;
    },
    $3_0: null,
    get_siteUrl: function SP_UI_Controls_Navigation$get_siteUrl() {
        return this.$3_0;
    },
    $C_0: null,
    get_appTitle: function SP_UI_Controls_Navigation$get_appTitle() {
        return this.$C_0;
    },
    set_appTitle: function SP_UI_Controls_Navigation$set_appTitle(value) {
        this.$C_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$C_0)) {
            this.$C_0 = '';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$e);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            $v_0.innerHTML = SP.UI.Controls.ClientControlsUtility.$7(this.$C_0);
        }
        var $v_1 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$h);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
            $v_1.innerHTML = SP.UI.Controls.ClientControlsUtility.$7(this.$C_0);
        }
        return value;
    },
    $D_0: null,
    get_appTitleIconUrl: function SP_UI_Controls_Navigation$get_appTitleIconUrl() {
        return this.$D_0;
    },
    set_appTitleIconUrl: function SP_UI_Controls_Navigation$set_appTitleIconUrl(value) {
        this.$D_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$D_0)) {
            this.$D_0 = '';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$f);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            if (this.$D_0 === '') {
                $v_0.innerHTML = '';
                $v_0.style.display = 'none';
            }
            else {
                $v_0.innerHTML = SP.UI.Controls.NavigationControlUtility._formatString(this.$16_0, SP.UI.Controls.ClientControlsUtility.$A(this.$D_0));
                $v_0.style.display = 'table-cell';
            }
        }
        return value;
    },
    $I_0: false,
    get_rightToLeft: function SP_UI_Controls_Navigation$get_rightToLeft() {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$G);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            var $v_1 = $v_0.getAttribute('dir');

            if (!SP.UI.Controls.ClientControlsUtility.$1($v_1) && $v_1 === 'rtl') {
                return true;
            }
        }
        return false;
    },
    set_rightToLeft: function SP_UI_Controls_Navigation$set_rightToLeft(value) {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$G);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            if (value) {
                $v_0.setAttribute('dir', 'rtl');
            }
            else {
                $v_0.setAttribute('dir', 'ltr');
            }
            this.$I_0 = value;
            this.$1T_0();
        }
        return value;
    },
    $4_0: null,
    get_appStartPage: function SP_UI_Controls_Navigation$get_appStartPage() {
        return this.$4_0;
    },
    set_appStartPage: function SP_UI_Controls_Navigation$set_appStartPage(value) {
        this.$4_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$4_0)) {
            this.$4_0 = this.$E_0;
        }
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$4_0)) {
            this.$4_0 = '#';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$g);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            $v_0.setAttribute('href', SP.UI.Controls.ClientControlsUtility.$A(this.$4_0));
        }
        return value;
    },
    $B_0: null,
    get_appIconUrl: function SP_UI_Controls_Navigation$get_appIconUrl() {
        return this.$B_0;
    },
    set_appIconUrl: function SP_UI_Controls_Navigation$set_appIconUrl(value) {
        this.$B_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$B_0)) {
            this.$B_0 = '';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$d);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            if (this.$B_0 === '') {
                $v_0.innerHTML = '';
            }
            else {
                $v_0.innerHTML = SP.UI.Controls.NavigationControlUtility._formatString(this.$13_0, SP.UI.Controls.ClientControlsUtility.$A(this.$B_0));
            }
        }
        return value;
    },
    $5_0: null,
    get_appHelpPageUrl: function SP_UI_Controls_Navigation$get_appHelpPageUrl() {
        return this.$5_0;
    },
    set_appHelpPageUrl: function SP_UI_Controls_Navigation$set_appHelpPageUrl(value) {
        this.$5_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$1(this.$5_0)) {
            this.$5_0 = '#';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$R);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            $v_0.setAttribute('href', SP.UI.Controls.ClientControlsUtility.$A(this.$5_0));
            if (!SP.UI.Controls.ClientControlsUtility.$1(this.$5_0) && this.$5_0 !== '#') {
                $v_0.setAttribute('onClick', '');
            }
            this.$t_0();
        }
        return value;
    },
    $8_0: null,
    get_appHelpPageOnClick: function SP_UI_Controls_Navigation$get_appHelpPageOnClick() {
        return this.$8_0;
    },
    set_appHelpPageOnClick: function SP_UI_Controls_Navigation$set_appHelpPageOnClick(value) {
        this.$8_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$8_0)) {
            this.$8_0 = '';
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$R);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            if (!SP.UI.Controls.ClientControlsUtility.$1(this.$8_0)) {
                $v_0.setAttribute('href', '#');
                $v_0.setAttribute('onClick', SP.UI.Controls.ClientControlsUtility.$6(this.$8_0));
                this.$t_0();
            }
        }
        return value;
    },
    $9_0: null,
    get_settingsLinks: function SP_UI_Controls_Navigation$get_settingsLinks() {
        return this.$9_0;
    },
    set_settingsLinks: function SP_UI_Controls_Navigation$set_settingsLinks(value) {
        this.$9_0 = value;
        if (SP.UI.Controls.ClientControlsUtility.$0(this.$9_0)) {
            this.$9_0 = [];
        }
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$p);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            var $v_1 = this.$H_0;

            $v_1 += this.$u_0();
            $v_0.innerHTML = $v_1;
        }
        this.$1J_0();
        return value;
    },
    setVisible: function SP_UI_Controls_Navigation$setVisible(visible) {
        if (visible && !this.$11_0) {
            this.$1L_0(this.$O_0, visible);
        }
        else {
            if (!SP.UI.Controls.ClientControlsUtility.$1(SP.UI.Controls.Navigation.$2)) {
                var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$G);

                this.$X_0($v_0, visible);
            }
        }
    },
    $1L_0: function SP_UI_Controls_Navigation$$1L_0($p0, $p1) {
        var $v_0 = (document.getElementsByTagName('head'))[0];
        var $v_1 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$k);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
            try {
                $v_1.parentNode.removeChild($v_1);
            }
            catch ($$e_4) { }
        }
        $v_1 = document.createElement('link');
        $v_1.setAttribute('id', SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$k);
        $v_1.setAttribute('rel', 'stylesheet');
        $v_1.setAttribute('type', 'text/css');
        if (SP.UI.Controls.ClientControlsUtility.$0($p0)) {
            var $v_3 = new Date();

            $p0 = $v_3.getTime();
        }
        var $v_2 = this.$x_0($p0, this.$E_0, this.$3_0);

        $v_1.setAttribute('href', $v_2);
        if ($v_1.addEventListener) {
            var $$t_8 = this;

            $v_1.addEventListener('load', function() {
                SP.UI.Controls.Navigation.$c($$t_8, $p1);
            }, false);
        }
        else if ($v_1.attachEvent) {
            var $$t_9 = this;

            $v_1.attachEvent('onload', function() {
                SP.UI.Controls.Navigation.$c($$t_9, $p1);
            });
        }
        if ($v_0) {
            var $v_4 = $v_0.firstChild;

            if (null !== $v_4) {
                $v_0.insertBefore($v_1, $v_4);
            }
            else {
                $v_0.appendChild($v_1);
            }
        }
        if (SP.UI.Controls.ClientControlsUtility.isSafari()) {
            var $$t_A = this;

            this.$Y_0 = window.setTimeout(function() {
                SP.UI.Controls.Navigation.$c($$t_A, $p1);
                if ($$t_A.$Y_0 > 0) {
                    window.clearTimeout($$t_A.$Y_0);
                }
            }, SP.UI.Controls.Navigation.$1A);
        }
    },
    $1T_0: function SP_UI_Controls_Navigation$$1T_0() {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$s);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            $v_0.setAttribute('src', this.$w_0());
        }
    },
    $w_0: function SP_UI_Controls_Navigation$$w_0() {
        var $v_0 = this.$3_0 + SP.UI.Controls.Navigation.getVersionedLayoutsUrl('images/');

        if (this.$I_0) {
            $v_0 = $v_0 + 'titleseparatordarkrtl.png';
        }
        else {
            $v_0 = $v_0 + 'titleseparatordark.png';
        }
        return $v_0;
    },
    setTopHeaderVisible: function SP_UI_Controls_Navigation$setTopHeaderVisible(visible) {
        if (!SP.UI.Controls.ClientControlsUtility.$1(SP.UI.Controls.Navigation.$2)) {
            this.$17_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$W);
            this.$X_0(this.$17_0, visible);
        }
    },
    setBottomHeaderVisible: function SP_UI_Controls_Navigation$setBottomHeaderVisible(visible) {
        if (!SP.UI.Controls.ClientControlsUtility.$1(SP.UI.Controls.Navigation.$2)) {
            this.$14_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$i);
            this.$X_0(this.$14_0, visible);
        }
    },
    $X_0: function SP_UI_Controls_Navigation$$X_0($p0, $p1) {
        if (SP.UI.Controls.ClientControlsUtility.$0($p0)) {
            return;
        }
        if ($p1) {
            $p0.style.display = 'block';
        }
        else {
            $p0.style.display = 'none';
        }
    },
    remove: function SP_UI_Controls_Navigation$remove() {
        if (!SP.UI.Controls.ClientControlsUtility.$1(this.$Q_0)) {
            var $v_0 = document.getElementById(this.$Q_0);

            if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
                SP.UI.Controls.ControlManager.$1W(this.$Q_0);
                $v_0.innerHTML = '';
            }
        }
    },
    $u_0: function SP_UI_Controls_Navigation$$u_0() {
        if (!this.$9_0) {
            return '';
        }
        var $v_0 = '';

        for (var $v_1 = 0; $v_1 < this.$9_0.length; $v_1++) {
            var $v_2 = this.$9_0[$v_1];
            var $v_3 = SP.UI.Controls.ClientControlsUtility.$0($v_2.showSeparatorAfter) ? false : $v_2.showSeparatorAfter;

            if (!SP.UI.Controls.ClientControlsUtility.$0($v_2)) {
                if (!SP.UI.Controls.ClientControlsUtility.$1($v_2.linkUrl)) {
                    $v_0 += SP.UI.Controls.Navigation.$n + '<a href=\'' + SP.UI.Controls.ClientControlsUtility.$A($v_2.linkUrl) + '\' title=\'' + SP.UI.Controls.ClientControlsUtility.$7($v_2.displayName) + '\' class=\'ms-core-menu-link\' target=\'_top\'><div class=\'ms-core-menu-label\'><span class=\'ms-core-menu-title\'>' + SP.UI.Controls.ClientControlsUtility.$7($v_2.displayName) + '</span></div></a></li>';
                    if ($v_3 && $v_1 < this.$9_0.length - 1) {
                        $v_0 += SP.UI.Controls.Navigation.$o;
                    }
                }
                else if (!SP.UI.Controls.ClientControlsUtility.$1($v_2.onClick)) {
                    $v_0 += SP.UI.Controls.Navigation.$n + '<a href=\'#\' onClick=\'' + SP.UI.Controls.ClientControlsUtility.$6($v_2.onClick) + '\' title=\'' + SP.UI.Controls.ClientControlsUtility.$7($v_2.displayName) + '\' class=\'ms-core-menu-link\' target=\'_top\'><div class=\'ms-core-menu-label\'><span class=\'ms-core-menu-title\'>' + SP.UI.Controls.ClientControlsUtility.$7($v_2.displayName) + '</span></div></a></li>';
                    if ($v_3 && $v_1 < this.$9_0.length - 1) {
                        $v_0 += SP.UI.Controls.Navigation.$o;
                    }
                }
            }
        }
        return $v_0;
    },
    $t_0: function SP_UI_Controls_Navigation$$t_0() {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$R);
        var $v_1 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$l);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0) && !SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
            if (this.$5_0 === '#' && this.$8_0 === '') {
                $v_0.style.display = 'none';
                $v_1.style.display = 'none';
            }
            else {
                $v_0.style.display = 'inline-block';
                $v_1.style.display = 'inline-block';
            }
        }
    },
    $1J_0: function SP_UI_Controls_Navigation$$1J_0() {
        var $v_0 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$r);

        if (!SP.UI.Controls.ClientControlsUtility.$0($v_0)) {
            var $v_1 = document.getElementById(SP.UI.Controls.Navigation.$2 + SP.UI.Controls.Navigation.$J);

            if (!SP.UI.Controls.ClientControlsUtility.$0($v_1)) {
                if (SP.UI.Controls.Navigation.$10($v_1)) {
                    $v_0.style.display = 'none';
                }
                else {
                    $v_0.style.display = 'inline-block';
                }
            }
        }
    },
    $x_0: function SP_UI_Controls_Navigation$$x_0($p0, $p1, $p2) {
        if (SP.UI.Controls.ClientControlsUtility.$1($p1) && SP.UI.Controls.ClientControlsUtility.$1($p2)) {
            return '';
        }
        var $v_0 = SP.UI.Controls.ClientControlsUtility.$1($p1) ? $p2 : $p1;

        if ($v_0.charAt($v_0.length - 1) !== '/') {
            $v_0 += '/';
        }
        return $v_0 + SP.UI.Controls.Navigation.getVersionedLayoutsUrl('defaultcss.ashx') + '?ctag=' + $p0;
    }
};
SP.UI.Controls.NavigationControlExceptions = function SP_UI_Controls_NavigationControlExceptions() {
};
SP.UI.Controls.NavigationControlUtility = function SP_UI_Controls_NavigationControlUtility() {
};
SP.UI.Controls.NavigationControlUtility.onBodyLoaded = function SP_UI_Controls_NavigationControlUtility$onBodyLoaded() {
    if (SP.UI.Controls.NavigationControlUtility.$m) {
        return;
    }
    SP.UI.Controls.NavigationControlUtility.$m = true;
    var $v_0 = document.getElementsByTagName('div');

    for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        var $v_2 = $v_0[$v_1];
        var $v_3 = $v_2.getAttribute('data-ms-control');
        var $v_4 = $v_2.getAttribute('id');

        if (!SP.UI.Controls.ClientControlsUtility.$1($v_3) && !SP.UI.Controls.ClientControlsUtility.$1($v_4) && $v_3 === 'SP.UI.Controls.Navigation') {
            var $v_5 = $v_2.getAttribute('data-ms-options');

            if (!SP.UI.Controls.ClientControlsUtility.$1($v_5)) {
                var $v_6 = SP.UI.Controls.ClientControlsUtility.$1P($v_5);
                var $v_7 = $v_6;
                var $v_8 = new SP.UI.Controls.Navigation($v_4, $v_7);

                SP.UI.Controls.ControlManager.$18($v_4, $v_8);
                $v_8.setVisible(true);
                if (!SP.UI.Controls.ClientControlsUtility.$0($v_7)) {
                    if (!SP.UI.Controls.ClientControlsUtility.$0($v_7.bottomHeaderVisible)) {
                        $v_8.setBottomHeaderVisible($v_7.bottomHeaderVisible);
                    }
                    if (!SP.UI.Controls.ClientControlsUtility.$0($v_7.topHeaderVisible)) {
                        $v_8.setTopHeaderVisible($v_7.topHeaderVisible);
                    }
                }
            }
        }
    }
};
SP.UI.Controls.ClientControlsUtility = function SP_UI_Controls_ClientControlsUtility() {
};
SP.UI.Controls.ClientControlsUtility.$A = function SP_UI_Controls_ClientControlsUtility$$A($p0) {
    return SP.ClientControlsHttpUtility.$1K($p0, true, false);
};
SP.UI.Controls.ClientControlsUtility.$1X = function SP_UI_Controls_ClientControlsUtility$$1X($p0) {
    return SP.ClientControlsHttpUtility.$1K($p0, false, false);
};
SP.UI.Controls.ClientControlsUtility.$7 = function SP_UI_Controls_ClientControlsUtility$$7($p0) {
    $p0 = $p0.replace(new RegExp('&', 'g'), '&amp;');
    $p0 = $p0.replace(new RegExp('\"', 'g'), '&quot;');
    $p0 = $p0.replace(new RegExp('\'', 'g'), '&#39;');
    $p0 = $p0.replace(new RegExp('<', 'g'), '&lt;');
    $p0 = $p0.replace(new RegExp('>', 'g'), '&gt;');
    $p0 = $p0.replace(new RegExp(' ', 'g'), '&#160;');
    return $p0;
};
SP.UI.Controls.ClientControlsUtility.$6 = function SP_UI_Controls_ClientControlsUtility$$6($p0) {
    $p0 = $p0.replace(new RegExp('&', 'g'), '&amp;');
    $p0 = $p0.replace(new RegExp('<', 'g'), '&lt;');
    $p0 = $p0.replace(new RegExp('\"', 'g'), '&quot;');
    $p0 = $p0.replace(new RegExp('\'', 'g'), '&#39;');
    return $p0;
};
SP.UI.Controls.ClientControlsUtility.$1 = function SP_UI_Controls_ClientControlsUtility$$1($p0) {
    var $v_0 = null;

    return $p0 === $v_0 || typeof $p0 === 'undefined' || !$p0.length;
};
SP.UI.Controls.ClientControlsUtility.$0 = function SP_UI_Controls_ClientControlsUtility$$0($p0) {
    var $v_0 = null;

    return $p0 === $v_0 || typeof $p0 === 'undefined';
};
SP.UI.Controls.ClientControlsUtility.$1P = function SP_UI_Controls_ClientControlsUtility$$1P($p0) {
    var $v_0 = {};

    if (SP.UI.Controls.ClientControlsUtility.$1($p0)) {
        return $v_0;
    }
    var $v_1 = SP.UI.Controls.NavigationControlUtility._validateJson($p0);

    if ($v_1) {
        $v_0 = eval('(' + $p0 + ')');
    }
    else {
        throw SP.UI.Controls.ClientControlsUtility.$N(SP.UI.Controls.ChromeControlResources.getString('CC_InvalidJSON'), SP.UI.Controls.NavigationControlExceptions.invalidJSON);
    }
    return $v_0;
};
SP.UI.Controls.ClientControlsUtility.$1Q = function SP_UI_Controls_ClientControlsUtility$$1Q($p0) {
    var $v_0 = {};

    if (!SP.UI.Controls.ClientControlsUtility.$1($p0)) {
        var $v_1 = $p0.indexOf('?');

        if ($v_1 !== -1 && $v_1 + 1 < $p0.length) {
            var $v_2 = $p0.substr($v_1 + 1);
            var $v_3 = $v_2.split('&');

            for (var $$arr_5 = $v_3, $$len_6 = $$arr_5.length, $$idx_7 = 0; $$idx_7 < $$len_6; ++$$idx_7) {
                var $v_4 = $$arr_5[$$idx_7];

                if (!SP.UI.Controls.ClientControlsUtility.$1($v_4)) {
                    var $v_5 = $v_4.indexOf('=');

                    if ($v_5 === -1) {
                        $v_0[$v_4] = '';
                    }
                    else {
                        var $v_6 = $v_4.substr(0, $v_5);
                        var $v_7 = $v_4.substr($v_5 + 1);

                        $v_0[$v_6] = SP.UI.Controls.ClientControlsUtility.$0($v_7) ? '' : $v_7;
                    }
                }
            }
        }
    }
    return $v_0;
};
SP.UI.Controls.ClientControlsUtility.$1N = function SP_UI_Controls_ClientControlsUtility$$1N($p0) {
    var $v_0 = SP.UI.Controls.ClientControlsUtility.$1O(SP.UI.Controls.ChromeControlResources.getString('CC_InvalidArgument'), $p0);

    return SP.UI.Controls.ClientControlsUtility.$N($v_0, SP.UI.Controls.NavigationControlExceptions.invalidArgument);
};
SP.UI.Controls.ClientControlsUtility.$N = function SP_UI_Controls_ClientControlsUtility$$N($p0, $p1) {
    var $v_0 = new Error($p0);

    $v_0.message = $p0;
    $v_0.errorCode = $p1;
    return $v_0;
};
SP.UI.Controls.ClientControlsUtility.$1M = function SP_UI_Controls_ClientControlsUtility$$1M() {
    var $v_0 = SP.UI.Controls.ChromeControlResources.getString('CC_InvalidOperation');

    return SP.UI.Controls.ClientControlsUtility.$N($v_0, SP.UI.Controls.NavigationControlExceptions.invalidOperation);
};
SP.UI.Controls.ClientControlsUtility.$1O = function SP_UI_Controls_ClientControlsUtility$$1O($p0) {
    var $p1 = [];

    for (var $$pai_8 = 1; $$pai_8 < arguments.length; ++$$pai_8) {
        $p1[$$pai_8 - 1] = arguments[$$pai_8];
    }
    var $v_0 = '';
    var $v_1 = 0;

    while ($v_1 < $p0.length) {
        var $v_2 = SP.UI.Controls.ClientControlsUtility.$v($p0, $v_1, '{');

        if ($v_2 < 0) {
            $v_0 = $v_0 + $p0.substr($v_1);
            break;
        }
        else {
            var $v_3 = SP.UI.Controls.ClientControlsUtility.$v($p0, $v_2, '}');

            if ($v_3 > $v_2) {
                $v_0 = $v_0 + $p0.substr($v_1, $v_2 - $v_1);
                var $v_4 = $p0.substr($v_2 + 1, $v_3 - $v_2 - 1);
                var $v_5 = parseInt($v_4);

                $v_0 = $v_0 + $p1[$v_5];
                $v_1 = $v_3 + 1;
            }
            else {
                throw SP.UI.Controls.ClientControlsUtility.$1M();
            }
        }
    }
    return $v_0;
};
SP.UI.Controls.ClientControlsUtility.$v = function SP_UI_Controls_ClientControlsUtility$$v($p0, $p1, $p2) {
    var $v_0 = $p0.indexOf($p2, $p1);

    while ($v_0 >= 0 && $v_0 < $p0.length - 1 && $p0.charAt($v_0 + 1) === $p2) {
        $p1 = $v_0 + 2;
        $v_0 = $p0.indexOf($p2, $p1);
    }
    return $v_0;
};
SP.UI.Controls.ClientControlsUtility.$1R = function SP_UI_Controls_ClientControlsUtility$$1R($p0) {
    if (SP.UI.Controls.ClientControlsUtility.$1($p0)) {
        return false;
    }
    var $v_0 = $p0.match(SP.UI.Controls.ClientControlsUtility.$z);

    return !!$v_0 && $v_0.length === 1 && $v_0[0].length === $p0.length;
};
SP.UI.Controls.ClientControlsUtility.isSafari = function SP_UI_Controls_ClientControlsUtility$isSafari() {
    return (navigator.userAgent.toLowerCase()).indexOf('chrome') === -1 && (navigator.userAgent.toLowerCase()).indexOf('safari') !== -1;
};
SP.UI.Controls.ChromeControlResources = function SP_UI_Controls_ChromeControlResources() {
};
SP.UI.Controls.ChromeControlResources.getString = function SP_UI_Controls_ChromeControlResources$getString($p0) {
    var $v_0 = null;
    var $v_1 = (($p0.charAt(0)).toString()).toLowerCase() + $p0.substr(1);
    var $v_2 = ($p0.substr(0, 2)).toLowerCase() + $p0.substr(2);

    if (window.SP && window.SP.Res) {
        $v_0 = window.SP.Res[$v_1];
        if (SP.UI.Controls.ClientControlsUtility.$1($v_0)) {
            $v_0 = window.SP.Res[$v_2];
        }
    }
    if (SP.UI.Controls.ClientControlsUtility.$1($v_0) && window.SP && window.SP.RuntimeRes) {
        $v_0 = window.SP.RuntimeRes[$v_1];
    }
    if (SP.UI.Controls.ClientControlsUtility.$1($v_0)) {
        $v_0 = SP.UI.Controls.ChromeControlRes[$v_1];
    }
    if (SP.UI.Controls.ClientControlsUtility.$1($v_0)) {
        $v_0 = $p0;
    }
    return $v_0;
};
SP.UI.Controls.ChromeControlRes = function SP_UI_Controls_ChromeControlRes() {
};
if (SP.ClientControlsHttpUtility.registerClass)
    SP.ClientControlsHttpUtility.registerClass('SP.ClientControlsHttpUtility');
if (SP.UI.Controls.SettingsLink.registerClass)
    SP.UI.Controls.SettingsLink.registerClass('SP.UI.Controls.SettingsLink');
if (SP.UI.Controls.NavigationOptions.registerClass)
    SP.UI.Controls.NavigationOptions.registerClass('SP.UI.Controls.NavigationOptions');
if (SP.UI.Controls.ControlManager.registerClass)
    SP.UI.Controls.ControlManager.registerClass('SP.UI.Controls.ControlManager');
if (SP.UI.Controls.Navigation.registerClass)
    SP.UI.Controls.Navigation.registerClass('SP.UI.Controls.Navigation');
if (SP.UI.Controls.NavigationControlExceptions.registerClass)
    SP.UI.Controls.NavigationControlExceptions.registerClass('SP.UI.Controls.NavigationControlExceptions');
if (SP.UI.Controls.NavigationControlUtility.registerClass)
    SP.UI.Controls.NavigationControlUtility.registerClass('SP.UI.Controls.NavigationControlUtility');
if (SP.UI.Controls.ClientControlsUtility.registerClass)
    SP.UI.Controls.ClientControlsUtility.registerClass('SP.UI.Controls.ClientControlsUtility');
if (SP.UI.Controls.ChromeControlResources.registerClass)
    SP.UI.Controls.ChromeControlResources.registerClass('SP.UI.Controls.ChromeControlResources');
if (SP.UI.Controls.ChromeControlRes.registerClass)
    SP.UI.Controls.ChromeControlRes.registerClass('SP.UI.Controls.ChromeControlRes');
SP.UI.Controls.ControlManager.$V = {};
SP.UI.Controls.Navigation.$G = '_navigation';
SP.UI.Controls.Navigation.$2 = 'chromeControl';
SP.UI.Controls.Navigation.$W = '_topheader';
SP.UI.Controls.Navigation.$i = '_bottomheader';
SP.UI.Controls.Navigation.$J = '_topheader_settingslink_div';
SP.UI.Controls.Navigation.$p = '_topheader_settingslink_ul';
SP.UI.Controls.Navigation.$1D = '_topheader_settingsimg';
SP.UI.Controls.Navigation.$h = '_topheader_apptitle';
SP.UI.Controls.Navigation.$g = '_topheader_apptitlelink';
SP.UI.Controls.Navigation.$e = '_bottomheader_apptitle';
SP.UI.Controls.Navigation.$f = '_topheader_apptitleicon';
SP.UI.Controls.Navigation.$d = '_bottomheader_appicon';
SP.UI.Controls.Navigation.$R = '_topheader_helplink';
SP.UI.Controls.Navigation.$l = '_topheader_helplinkspan';
SP.UI.Controls.Navigation.$1B = '_topheader_help';
SP.UI.Controls.Navigation.$1S = '_topfeedback';
SP.UI.Controls.Navigation.$s = '_topheader_arrowimage';
SP.UI.Controls.Navigation.$1I = '_topheader_siteurl';
SP.UI.Controls.Navigation.$1G = '_topheader_sitetitle';
SP.UI.Controls.Navigation.$r = '_topheader_settingslink_span';
SP.UI.Controls.Navigation.$k = '_stylesheet';
SP.UI.Controls.Navigation.$1H = 'SPHostUrl';
SP.UI.Controls.Navigation.$1F = 'SPHostTitle';
SP.UI.Controls.Navigation.$19 = 'SPAppWebUrl';
SP.UI.Controls.Navigation.$1C = 'SPLanguage';
SP.UI.Controls.Navigation.$j = 'SPClientTag';
SP.UI.Controls.Navigation.$L = 'right:';
SP.UI.Controls.Navigation.$M = 'left:';
SP.UI.Controls.Navigation.$q = '2px';
SP.UI.Controls.Navigation.$1E = '2px';
SP.UI.Controls.Navigation.$1A = 2000;
SP.UI.Controls.Navigation.$o = '<li type=\'separator\' class=\'ms-core-menu-separator\' style=\'display:{1}\'><hr class=\'ms-core-menu-separatorHr\'></li>';
SP.UI.Controls.Navigation.$n = '<li class=\'ms-core-menu-item\'>';
SP.UI.Controls.Navigation.$K = 0;
SP.UI.Controls.NavigationControlExceptions.invalidArgument = -1001;
SP.UI.Controls.NavigationControlExceptions.invalidOperation = -1002;
SP.UI.Controls.NavigationControlExceptions.placeHolderElementNotFound = -1003;
SP.UI.Controls.NavigationControlExceptions.invalidJSON = -1004;
SP.UI.Controls.NavigationControlExceptions.hostSiteUrlNotSet = -1005;
SP.UI.Controls.NavigationControlExceptions.timeoutGettingThemeInfo = -1006;
SP.UI.Controls.NavigationControlExceptions.errorGettingThemeInfo = -1007;
SP.UI.Controls.NavigationControlExceptions.appWebUrlNotSet = -1008;
SP.UI.Controls.NavigationControlExceptions.requiredScriptNotLoaded = -1009;
SP.UI.Controls.NavigationControlUtility.$m = false;
SP.UI.Controls.ClientControlsUtility.$z = new RegExp('[A-Za-z][-A-Za-z0-9_:.]*');
SP.UI.Controls.ChromeControlRes.cC_AppWebUrlNotSet = 'Cannot get the app theme information because the app web url is not set.';
SP.UI.Controls.ChromeControlRes.cC_BackToSite = 'Back to Site';
SP.UI.Controls.ChromeControlRes.cC_SettingsLinkToolTip = 'Settings';
SP.UI.Controls.ChromeControlRes.cC_PlaceHolderElementNotFound = 'The chrome control\'s container element can\'t be found.';
SP.UI.Controls.ChromeControlRes.cC_Welcome = 'Welcome {0}';
SP.UI.Controls.ChromeControlRes.cC_RequiredScriptNotLoaded = 'Cannot get the app theme information because the required script sp.requestexecutor.js is not loaded.';
SP.UI.Controls.ChromeControlRes.cC_AppIconAlt = 'App Icon';
SP.UI.Controls.ChromeControlRes.cC_TimeoutGettingThemeInfo = 'Cannot get theme infomration for chrome control due to time out.';
SP.UI.Controls.ChromeControlRes.cC_SendFeedback = 'Send Feedback';
SP.UI.Controls.ChromeControlRes.cC_ArrowImageAlt = 'Cravat Icon';
SP.UI.Controls.ChromeControlRes.cC_HelpLinkToolTip = 'Help';
SP.UI.Controls.ChromeControlRes.cC_InvalidOperation = 'Invalid operation.';
SP.UI.Controls.ChromeControlRes.cC_ErrorGettingThemeInfo = 'Cannot get the app theme information for chrome control.';
SP.UI.Controls.ChromeControlRes.cC_HostSiteUrlNotSet = 'The app\'s host site url is not set.';
SP.UI.Controls.ChromeControlRes.cC_InvalidArgument = 'Invalid parameter {0}.';
SP.UI.Controls.ChromeControlRes.cC_InvalidJSON = 'Invalid JSON data.';
SP.UI.Controls.NavigationControlUtility._validateJson = function SP_UI_Contorls_NavigationControlUtility$validateJson(text) {
    return /^[\],:{}\s]*$/.test(((text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')).replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
};
SP.UI.Controls.NavigationControlUtility._formatString = function SP_UI_Contorls_NavigationControlUtility$formatString() {
    var s = arguments[0];

    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");

        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
SP.UI.Controls.NavigationControlUtility._scriptLiteralEncode = function SP_UI_Contorls_NavigationControlUtility$scriptLiteralEncode(str) {
    if (null == str || typeof str == 'undefined')
        return "";
    var strIn = new String(str);
    var strOut = [];
    var ix = 0;
    var max = strIn.length;

    for (ix = 0; ix < max; ix++) {
        var charCode = strIn.charCodeAt(ix);

        if (charCode > 0x0fff) {
            strOut.push("\\u" + (charCode.toString(16)).toUpperCase());
        }
        else if (charCode > 0x00ff) {
            strOut.push("\\u0" + (charCode.toString(16)).toUpperCase());
        }
        else if (charCode > 0x007f) {
            strOut.push("\\u00" + (charCode.toString(16)).toUpperCase());
        }
        else {
            var c = strIn.charAt(ix);

            switch (c) {
            case '\n':
                strOut.push("\\n");
                break;
            case '\r':
                strOut.push("\\r");
                break;
            case '\"':
                strOut.push("\\u0022");
                break;
            case '%':
                strOut.push("\\u0025");
                break;
            case '&':
                strOut.push("\\u0026");
                break;
            case '\'':
                strOut.push("\\u0027");
                break;
            case '(':
                strOut.push("\\u0028");
                break;
            case ')':
                strOut.push("\\u0029");
                break;
            case '+':
                strOut.push("\\u002b");
                break;
            case '/':
                strOut.push("\\u002f");
                break;
            case '<':
                strOut.push("\\u003c");
                break;
            case '>':
                strOut.push("\\u003e");
                break;
            case '\\':
                strOut.push("\\\\");
                break;
            default:
                strOut.push(c);
            }
            ;
        }
    }
    return strOut.join('');
};
if (window.document.readyState == "complete") {
    SP.UI.Controls.NavigationControlUtility.onBodyLoaded();
}
else {
    if (window.document.addEventListener) {
        window.addEventListener("load", function() {
            SP.UI.Controls.NavigationControlUtility.onBodyLoaded();
        });
    }
    else if (window.document.attachEvent) {
        window.attachEvent("onload", function() {
            SP.UI.Controls.NavigationControlUtility.onBodyLoaded();
        });
    }
}
if (typeof Sys != "undefined" && Sys && Sys.Application) {
    Sys.Application.notifyScriptLoaded();
}
if (typeof NotifyScriptLoadedAndExecuteWaitingJobs == "function") {
    NotifyScriptLoadedAndExecuteWaitingJobs("sp.ui.controls.js");
}
