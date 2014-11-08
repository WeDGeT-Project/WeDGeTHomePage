
var isSaveLogByLocalSource = "true";
var xmlHttp_siteTotal;
function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		xmlHttp_siteTotal = new XMLHttpRequest();
	} else {
		if (window.ActiveXObject) {
			xmlHttp_siteTotal = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
}
function converPeculiarString(str) {
}
function getDomainName() {
	var s, siteUrl;
	s = document.location + "";
	return s.substring(7, s.indexOf("/", 7));
}
function prepareXML() {
	var sourceUrl = document.referrer;
	if (sourceUrl == null || sourceUrl == "") {
		if (document.parentWindow.document.referrer != null && document.parentWindow.document.referrer != "") {
			sourceUrl = document.parentWindow.document.referrer;
		} else {
			sourceUrl = "\u624b\u5de5\u8f93\u5165";
		}
	}
	var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<WebSite-Total>" + "<Request-Step>1</Request-Step>" + "<Request>" + "<Source-Url>" + sourceUrl + "</Source-Url>" + "<Visit-Url>" + document.URL + "</Visit-Url>" + "<Article-Title>" + document.title + "</Article-Title>" + "</Request>" + "</WebSite-Total>";
	return xml;
}
function sendRequestTotalXML() {
	var xml = prepareXML();
	var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
	xmldoc.async = false;
	xmldoc.loadXML(xml);
	var url = "http://" + getDomainName() + "/sitestat/WebsiteTotalService?timeStamp" + new Date().getTime();
	try {
		createXMLHttpRequest();
		xmlHttp_siteTotal.open("POST", url);
		xmlHttp_siteTotal.send(xml);
	}
	catch (e) {
	}
}
sendRequestTotalXML();

