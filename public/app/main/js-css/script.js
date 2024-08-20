var imgs = new Array,
		imgUrl = "app/main/images/";
imgs[0] = new Image,
imgs[0].src = imgUrl + "loading-bar-red.gif",
imgs[1] = new Image,
imgs[1].src = imgUrl + "background.jpg",
imgs[2] = new Image,
imgs[2].src = imgUrl + "Ciputra.png",
imgs[3] = new Image,
imgs[3].src = imgUrl + "icons/start.png",
imgs[4] = new Image,
imgs[4].src = imgUrl + "icons/application.png",
imgs[5] = new Image,
imgs[5].src = imgUrl + "icons/turnoff.png",
imgs[6] = new Image,
imgs[6].src = imgUrl + "icons/hourglass.png",
imgs[7] = new Image,
imgs[7].src = imgUrl + "icons/list-information.png",
imgs[8] = new Image,
imgs[8].src = imgUrl + "icons/help.png",
imgs[9] = new Image,
imgs[9].src = imgUrl + "icons/help-book.png",
imgs[10] = new Image,
imgs[10].src = imgUrl + "icons/char-dot-blue.png",
imgs[11] = new Image,
imgs[11].src = imgUrl + "icons/char-dot-orange.png",
imgs[12] = new Image,
imgs[12].src = imgUrl + "icons/window.png",
imgs[13] = new Image,
imgs[13].src = imgUrl + "icons/user.png",
imgs[14] = new Image,
imgs[14].src = imgUrl + "icons/key.png";
var excludecharcode = [0, 8, 9, 13],
		acceptedchar = {
			default:
					"[^'\"]",
			alpha: "[A-Za-z]",
			num: "[0-9]",
			alphanum: "[A-Za-z0-9]",
			email: "[A-Za-z0-9@_.-]"
		},
		validpattern = {
			email: "^([a-zA-Z0-9]{3,})(((.|-|_)[a-zA-Z0-9]{2,})+)?@([a-z]{3,})(-[a-z0-9]{3,})?(.[a-z]{2,})+$"
		};
function checkCookie() {
	var e = !1;
	return $.cookie("check", "success", {
		path: "/"
	}),
			null != $.cookie("check") && (e = !0),
			$.removeCookie("check", {
				path: "/"
			}),
			e
}
function loader(e) {
	var n = void 0 !== e ? '<span style="margin-left:7px;font-size:0.9em;">' + e + "</span>" : "";
	return '<img src="' + imgs[0].src + '" border="0" align="absmiddle" />' + n
}
function setInput() {
	$(":text, :password, textarea").keypress(function (t) {
		var i = $(this).attr("accepted");
		if (void 0 !== i)
			return $.each(acceptedchar, function (e, n) {
				if (e == i.toLowerCase())
					return i = n,
							!1
			}),
					$.isNumeric(t.which) && $.each(excludecharcode, function (e, n) {
				if (t.which == n)
					return i = "",
							!1
			}),
					new RegExp(i).test(String.fromCharCode(t.which))
	})
}
function setForm() {
	$("form").attr({
		autocomplete: "off",
		spellcheck: "false"
	}).submit(function () {
		return !1
	}),
			setInput()
}
function isValid(e, t) {
	return $.each(validpattern, function (e, n) {
		if (e == t.toLowerCase())
			return t = n,
					!1
	}),
			new RegExp(t).test(e)
}
function jqsendReq(d) {
	if (void 0 === d || 0 == $.isPlainObject(d) || 1 == $.isEmptyObject(d))
		return !1;
	if (void 0 === d.url || "" == $.trim(d.url) || void 0 === d.container || "" == $.trim(d.container))
		return !1;
	var f = 6e4,
			param = "";
	return void 0 !== d.method && "" != $.trim(d.method) || (d.method = "GET"),
			void 0 !== d.timeout && 1 == $.isNumeric(d.timeout) && (f = d.timeout),
			void 0 !== d.data && "" != $.trim(d.data) && (param = void 0 !== $(d.data)[0] && "FORM" == $(d.data)[0].tagName ? $(d.data).serialize() : d.data),
			$.ajax({
				url: d.url,
				type: d.method,
				timeout: f,
				data: param,
				beforeSend: function (a) {
					if (0 == checkCookie())
						return a.abort(),
								$("#front-content").html($("#cookie-info").html()),
								defaultView(),
								!1;
					void 0 !== d.loadermsg && "" != d.loadermsg && (void 0 !== d.loadermsgcontainer && "" != d.loadermsgcontainer ? $(d.loadermsgcontainer).html(d.loadermsg) : $(d.container).html(d.loadermsg)),
							void 0 !== d.startfunc && "" != d.startfunc && ($.isFunction(d.startfunc) ? d.startfunc() : eval(d.startfunc))
				},
				complete: function (a) {
					void 0 !== d.completefunc && "" != d.completefunc && ($.isFunction(d.completefunc) ? d.completefunc() : eval(d.completefunc))
				},
				success: function (a) {
					$(d.container).html(a),
							void 0 !== d.loadermsgcontainer && "" != d.loadermsgcontainer && $(d.loadermsgcontainer).html(""),
							void 0 !== d.successfunc && "" != d.successfunc && ($.isFunction(d.successfunc) ? d.successfunc() : eval(d.successfunc))
				},
				error: function (e, a, b, c) {
					e.status && (a = null, void 0 !== d.failurefunc && "" != d.failurefunc ? $.isFunction(d.failurefunc) ? d.failurefunc() : eval(d.failurefunc) : $(d.container).html('<div style="color:#ff0000;font:normal 12px courier;">Error: ' + e.status + " " + b + "<div>"))
				}
			})
}
var __AUTH_ = {
	name: "Noto Gunawan",
	email: ["noto.gunawan@yahoo.com", "noto.gh@gmail.com"]
};
function launchFullscreen(e) {
	e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
}
function exitFullscreen() {
	document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
}
String.prototype.splitUCase = function () {
	return this.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1)
};
var MD5 = function (e) {
	function c(e, n) {
		var t = 2147483648 & e,
				i = 2147483648 & n,
				a = 1073741824 & e,
				r = 1073741824 & n,
				o = (1073741823 & e) + (1073741823 & n);
		return a & r ? 2147483648 ^ o ^ t ^ i : a | r ? 1073741824 & o ? 3221225472 ^ o ^ t ^ i : 1073741824 ^ o ^ t ^ i : o ^ t ^ i
	}
	function d(e, n) {
		return e << n | e >>> 32 - n
	}
	function n(e, n, t, i, a, r, o) {
		var s;
		return e = c(e, c(c((s = n) & t | ~s & i, a), o)),
				c(d(e, r), n)
	}
	function t(e, n, t, i, a, r, o) {
		var s;
		return e = c(e, c(c(n & (s = i) | t & ~s, a), o)),
				c(d(e, r), n)
	}
	function i(e, n, t, i, a, r, o) {
		return e = c(e, c(c(n ^ t ^ i, a), o)),
				c(d(e, r), n)
	}
	function a(e, n, t, i, a, r, o) {
		return e = c(e, c(c(t ^ (n | ~i), a), o)),
				c(d(e, r), n)
	}
	function r(e) {
		for (var n = "", t = "", i = 0; i <= 3; i++)
			n += (t = "0" + (e >>> 8 * i & 255).toString(16)).substr(t.length - 2, 2);
		return n
	}
	for (var o, s, u, l, m = Array(), m = function (e) {
		for (var n, t = e.length, i = t + 8, a = 16 * (1 + (i - i % 64) / 64), r = Array(a - 1), o = 0, s = 0; s < t; )
			o = s % 4 * 8,
					r[n = (s - s % 4) / 4] = r[n] | e.charCodeAt(s) << o,
					s++;
		return o = s % 4 * 8,
				r[n = (s - s % 4) / 4] = r[n] | 128 << o,
				r[a - 2] = t << 3,
				r[a - 1] = t >>> 29,
				r
	}(e = function (e) {
		e = e.replace(/\r\n/g, "\n");
		for (var n = "", t = 0; t < e.length; t++) {
			var i = e.charCodeAt(t);
			i < 128 ? n += String.fromCharCode(i) : (127 < i && i < 2048 ? n += String.fromCharCode(i >> 6 | 192) : (n += String.fromCharCode(i >> 12 | 224), n += String.fromCharCode(i >> 6 & 63 | 128)), n += String.fromCharCode(63 & i | 128))
		}
		return n
	}(e)), g = 1732584193, f = 4023233417, p = 2562383102, h = 271733878, v = 0; v < m.length; v += 16)
		g = n(o = g, s = f, u = p, l = h, m[v + 0], 7, 3614090360),
				h = n(h, g, f, p, m[v + 1], 12, 3905402710),
				p = n(p, h, g, f, m[v + 2], 17, 606105819),
				f = n(f, p, h, g, m[v + 3], 22, 3250441966),
				g = n(g, f, p, h, m[v + 4], 7, 4118548399),
				h = n(h, g, f, p, m[v + 5], 12, 1200080426),
				p = n(p, h, g, f, m[v + 6], 17, 2821735955),
				f = n(f, p, h, g, m[v + 7], 22, 4249261313),
				g = n(g, f, p, h, m[v + 8], 7, 1770035416),
				h = n(h, g, f, p, m[v + 9], 12, 2336552879),
				p = n(p, h, g, f, m[v + 10], 17, 4294925233),
				f = n(f, p, h, g, m[v + 11], 22, 2304563134),
				g = n(g, f, p, h, m[v + 12], 7, 1804603682),
				h = n(h, g, f, p, m[v + 13], 12, 4254626195),
				p = n(p, h, g, f, m[v + 14], 17, 2792965006),
				g = t(g, f = n(f, p, h, g, m[v + 15], 22, 1236535329), p, h, m[v + 1], 5, 4129170786),
				h = t(h, g, f, p, m[v + 6], 9, 3225465664),
				p = t(p, h, g, f, m[v + 11], 14, 643717713),
				f = t(f, p, h, g, m[v + 0], 20, 3921069994),
				g = t(g, f, p, h, m[v + 5], 5, 3593408605),
				h = t(h, g, f, p, m[v + 10], 9, 38016083),
				p = t(p, h, g, f, m[v + 15], 14, 3634488961),
				f = t(f, p, h, g, m[v + 4], 20, 3889429448),
				g = t(g, f, p, h, m[v + 9], 5, 568446438),
				h = t(h, g, f, p, m[v + 14], 9, 3275163606),
				p = t(p, h, g, f, m[v + 3], 14, 4107603335),
				f = t(f, p, h, g, m[v + 8], 20, 1163531501),
				g = t(g, f, p, h, m[v + 13], 5, 2850285829),
				h = t(h, g, f, p, m[v + 2], 9, 4243563512),
				p = t(p, h, g, f, m[v + 7], 14, 1735328473),
				g = i(g, f = t(f, p, h, g, m[v + 12], 20, 2368359562), p, h, m[v + 5], 4, 4294588738),
				h = i(h, g, f, p, m[v + 8], 11, 2272392833),
				p = i(p, h, g, f, m[v + 11], 16, 1839030562),
				f = i(f, p, h, g, m[v + 14], 23, 4259657740),
				g = i(g, f, p, h, m[v + 1], 4, 2763975236),
				h = i(h, g, f, p, m[v + 4], 11, 1272893353),
				p = i(p, h, g, f, m[v + 7], 16, 4139469664),
				f = i(f, p, h, g, m[v + 10], 23, 3200236656),
				g = i(g, f, p, h, m[v + 13], 4, 681279174),
				h = i(h, g, f, p, m[v + 0], 11, 3936430074),
				p = i(p, h, g, f, m[v + 3], 16, 3572445317),
				f = i(f, p, h, g, m[v + 6], 23, 76029189),
				g = i(g, f, p, h, m[v + 9], 4, 3654602809),
				h = i(h, g, f, p, m[v + 12], 11, 3873151461),
				p = i(p, h, g, f, m[v + 15], 16, 530742520),
				g = a(g, f = i(f, p, h, g, m[v + 2], 23, 3299628645), p, h, m[v + 0], 6, 4096336452),
				h = a(h, g, f, p, m[v + 7], 10, 1126891415),
				p = a(p, h, g, f, m[v + 14], 15, 2878612391),
				f = a(f, p, h, g, m[v + 5], 21, 4237533241),
				g = a(g, f, p, h, m[v + 12], 6, 1700485571),
				h = a(h, g, f, p, m[v + 3], 10, 2399980690),
				p = a(p, h, g, f, m[v + 10], 15, 4293915773),
				f = a(f, p, h, g, m[v + 1], 21, 2240044497),
				g = a(g, f, p, h, m[v + 8], 6, 1873313359),
				h = a(h, g, f, p, m[v + 15], 10, 4264355552),
				p = a(p, h, g, f, m[v + 6], 15, 2734768916),
				f = a(f, p, h, g, m[v + 13], 21, 1309151649),
				g = a(g, f, p, h, m[v + 4], 6, 4149444226),
				h = a(h, g, f, p, m[v + 11], 10, 3174756917),
				p = a(p, h, g, f, m[v + 2], 15, 718787259),
				f = a(f, p, h, g, m[v + 9], 21, 3951481745),
				g = c(g, o),
				f = c(f, s),
				p = c(p, u),
				h = c(h, l);
	return (r(g) + r(f) + r(p) + r(h)).toLowerCase()
};
jQuery.cachedScript = function (e, n) {
	return n = $.extend(n || {},
			{
				dataType: "script",
				cache: !0,
				url: e
			}),
			jQuery.ajax(n)
},
		document.oncontextmenu = function (e) {
			return !1
		};
var request = !1,
		normalleave = 1,
		btab_sessid, appBaseUrl = $("meta[name=baseUrl]").attr("content");
function loadBasePage(e) {
	if (!$.isPlainObject(e) || $.isEmptyObject(e) || !e.actionName)
		return !1;
	e.actionName = e.actionName.toLowerCase();
	var n = "Loading Page, please wait ...",
			t = "";
	switch (e.actionName) {
		case "initializer":
			break;
		case "login":
			n = "Loading Login Page, please wait ...",
					t = "setForm();";
			break;
		case "loginprocess":
			n = "Logging you in, please wait ...";
			break;
		case "main":
			n = "Loading Main Page, please wait ...";
			break;
		case "logoutprocess":
			n = "Logging you out, please wait ...";
			break;
		case "forgetpassword":
			t = "setForm();";
			break;
		case "forcelogout":
			t = "setForm();";
			break;
		case "password":
			break;
		default:
			return !1
	}
	0 != request && request.abort(),
			e.method && "POST" == e.method || (e.method = "GET"),
			e.successfunc || (e.successfunc = t),
			request = jqsendReq({
				method: e.method,
				url: "main/index/" + e.actionName,
				container: "#front-content",
				loadermsg: e.hasOwnProperty("loadermsg") ? e.loadermsg : loader(n),
				data: e.data,
				startfunc: e.startfunc,
				completefunc: e.completefunc,
				successfunc: e.successfunc,
				failurefunc: e.failurefunc
			})
}
function defaultView() {
	$("#wrapper-front").show(),
			$("#content").hide().html("")
}
function loggedRoutine() {
	normalleave = 0,
			$.removeCookie("btab_sessid", {
				path: "/"
			}),
			$(window).bind("beforeunload", function () {
		if (!normalleave)
			return $.cookie("btab_sessid", btab_sessid, {
				path: "/"
			}),
					setTimeout(function () {
						setTimeout(function () {
							$.removeCookie("btab_sessid", {
								path: "/"
							})
						},
								500)
					},
							1),
					"Your session will not be preserved if you leave !"
	}),
			loadBasePage({
				actionName: "main",
				successfunc: function () {
					$("<link/>", {
						rel: "stylesheet",
						type: "text/css",
						href: "resources/extjs/resources/css/ext-all.css"
					}).appendTo("head"),
							$("<link/>", {
								rel: "stylesheet",
								type: "text/css",
								href: "app/main/js-css/style-main.css?v=121"
							}).appendTo("head"),
							$('<div id="main-info"><div id="running-text"><marquee id="apps-text-running" onMouseOver="this.stop()" onMouseOut="this.start()"></marquee></div><div id="apps-holder"><div id="apps-title"></div><div id="apps-ver"></div></div><div id="group-holder"><div id="project-pt"></div><div id="group"></div></div><div id="ver-info"></div><div id="copyright-info"></div></div>').appendTo("body"),
							jqsendReq({
								method: "GET",
								url: "main/index/tos",
								container: "#tos",
								startfunc: "$('<div style=\"display:none;width:1px;height:1px;top:50000px;left:50000px;position:absolute;z-index:-99;\" id=\"tos\"></div>').appendTo('body');"
							}),
							Ext.onReady(function () {
								$("#wrapper-front").fadeOut(500, function () {
									$("#content").fadeIn(250, function () {
										MyApps = new Apps
									})
								})
							})
				}
			})
}
function unLoggedRoutine() {
	$.removeCookie("btab_sessid", {
		path: "/"
	}),
			$.removeCookie("uid", {
				path: "/"
			}),
			$.removeCookie("utime", {
				path: "/"
			}),
			$("link[href*='ext-all.css']").remove(),
			$("link[href*='style-main.css']").remove(),
			loadBasePage({
				actionName: "login"
			})
}
void 0 !== appBaseUrl && document.URL != appBaseUrl && top.window.location.replace(appBaseUrl),
		$(document).ready(function () {
	loadBasePage({
		actionName: "initializer"
	})
});