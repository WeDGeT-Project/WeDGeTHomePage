
this.mall_cookie_utils||(this.mall_cookie_utils={},function(){mall_cookie_utils.getMallCookie=function(a){var b=document.cookie.split(";"),c="",d="",e="",f=!1,g="";for(g=0;g<b.length;g++){c=b[g].split("="),d=c[0].replace(/^\s+|\s+$/g,"");if(d==a)return f=!0,c.length>1&&(e=unescape(c[1].replace(/^\s+|\s+$/g,""))),e;c=null,d=""}if(!f)return null},mall_cookie_utils.isEmpty=function(a){return typeof a=="undefined"||a==="undefined|undefined"||a===null||a===""||a==="|"},mall_cookie_utils.getMallProvCode=function(){var a=mall_cookie_utils.getMallCookie("mallcity");return mall_cookie_utils.isEmpty(a)?"011":"0"+a.split("|")[0]},mall_cookie_utils.getMallCityCode=function(){var a=mall_cookie_utils.getMallCookie("mallcity");return mall_cookie_utils.isEmpty(a)?"110":a.split("|")[1]}}());

var provincecode = mall_cookie_utils.getMallProvCode();
var provincename="";
switch (provincecode) { 
case "010": provincename = "Nei Monggol"; break;	
case "011": provincename = "Beijing"; break;   		
case "013": provincename = "Tianjin"; break;   		
case "017": provincename = "Shandong"; break;   	
case "018": provincename = "Hebei"; break;   			
case "019": provincename = "Shanxi"; break;   		
case "030": provincename = "Anhui"; break;   			
case "031": provincename = "Shanghai"; break; 	 
case "034": provincename = "Jiangsu"; break;  	 
case "036": provincename = "Zhejiang"; break; 	 
case "038": provincename = "Fujian"; break;   		
case "050": provincename = "Hainan"; break;   		
case "051": provincename = "Guangdong"; break;  	
case "059": provincename = "Guangxi"; break;  		
case "070": provincename = "Qinghai"; break;  	 
case "071": provincename = "Hubei"; break;   			
case "074": provincename = "Hunan"; break;   			
case "075": provincename = "Jiangxi"; break; 			
case "076": provincename = "Henan"; break;   			
case "079": provincename = "Xizang"; break;  			
case "081": provincename = "Sichuan"; break;  		
case "083": provincename = "Chongqing"; break; 	 
case "084": provincename = "Shaanxi"; break;   		
case "085": provincename = "Guizhou"; break;   		
case "086": provincename = "Yunnan"; break;   		
case "087": provincename = "Gansu"; break;   			
case "088": provincename = "Ningxia"; break; 		 
case "089": provincename = "Xinjiang"; break;  	 
case "090": provincename = "Jilin"; break;   			
case "091": provincename = "Liaoning"; break;  	 
case "097": provincename = "Heilongjiang"; break;
case "098": provincename = "Headquarters"; break;
default:    provincename = "(not set)"; break;
} 

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27681312-1']);
  
  _gaq.push(['_addOrganic', 'soso', 'w']);
  _gaq.push(['_addOrganic', 'youdao', 'q']);
  _gaq.push(['_addOrganic', 'baidu', 'word']);
  _gaq.push(['_addOrganic', 'so', 'q']);
  _gaq.push(['_addOrganic', '360', 'q']);
  _gaq.push(['_addOrganic', 'sogou', 'query']);  
  
  _gaq.push(['_setDomainName', '10010.com']);
  _gaq.push(['_setVar', provincename]); 
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    //remarketing code
    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  
  
  
var gDomain="wt.10010.com";	// SDC Production Mode Domain
var gDcsId="dcss18i18x5k2zlt536xi3f7e_7j3n";
var gFpc="WT_FPC";
var gConvert=true;

var gDomainProv="wt.10010.com";
var gDcsIdProvMap = new Object();
gDcsIdProvMap["011"] = "dcscl4gb10000008e86gwgkjn_8n8y";
gDcsIdProvMap["013"] = "dcswoox7q0000008e86gwgkjn_7n5e";
gDcsIdProvMap["018"] = "dcsgkuqhj1000008e86gwgkjn_4n1h";
gDcsIdProvMap["019"] = "dcswcjlta1000047gc7fygkjn_8q1m";
gDcsIdProvMap["010"] = "dcs8ap5nl1000086ig8e0hkjn_6q2j";
gDcsIdProvMap["091"] = "dcs4787pj00000o2qwca8hkjn_4x8n";
gDcsIdProvMap["090"] = "dcss92nv800000s1s0e9ahkjn_9m1g";
gDcsIdProvMap["097"] = "dcs8muh1110000s1s0e9ahkjn_6m4c";
gDcsIdProvMap["031"] = "dcssh0bbu10000s1s0e9ahkjn_1m7g";
gDcsIdProvMap["034"] = "dcsspimux00000w0u4f8chkjn_6s7x";
gDcsIdProvMap["036"] = "dcsw0e9fv10000w0u4f8chkjn_7s4f";
gDcsIdProvMap["030"] = "dcsoejcds0000000w8g7ehkjn_2y8h";
gDcsIdProvMap["038"] = "dcsct24rm1000000w8g7ehkjn_7y9x";
gDcsIdProvMap["075"] = "dcsc9z3xl000008yzgi5ihkjn_9j2w";
gDcsIdProvMap["017"] = "dcs8egte5100008yzgi5ihkjn_9j1x";
gDcsIdProvMap["076"] = "dcscxtri6100008yzgi5ihkjn_8j4u";
gDcsIdProvMap["071"] = "dcsct24rm100008yzgi5ihkjn_7j9n";
gDcsIdProvMap["074"] = "dcsc9z3xl00000cx1lj4khkjn_6n8v";
gDcsIdProvMap["051"] = "dcskbmd8g10000cx1lj4khkjn_1n9e";
gDcsIdProvMap["059"] = "dcskridef00000gw3pk3mhkjn_1t6n";
gDcsIdProvMap["050"] = "dcssxwaht00000gw3pk3mhkjn_5t9v";
gDcsIdProvMap["083"] = "dcsct24rm10000gw3pk3mhkjn_2t4b";
gDcsIdProvMap["081"] = "dcs4787pj00000kv5tl2ohkjn_4z8u";
gDcsIdProvMap["085"] = "dcsslry2e10000kv5tl2ohkjn_8z5v";
gDcsIdProvMap["086"] = "dcss92nv800000ou7xm1qhkjn_7g8o";
gDcsIdProvMap["079"] = "dcs8muh1110000ou7xm1qhkjn_4g2k";
gDcsIdProvMap["084"] = "dcs4bju9t10000ou7xm1qhkjn_9g3x";
gDcsIdProvMap["087"] = "dcs8i7h6p00000st91o0shkjn_5j1w";
gDcsIdProvMap["070"] = "dcsgkuqhj10000st91o0shkjn_1j7h";
gDcsIdProvMap["088"] = "dcs8ql5tk00000wsb5pzthkjn_3g8g";
gDcsIdProvMap["089"] = "dcsouzbch10000wsb5pzthkjn_5g8h";

gDcsIdNoProv = "dcsoia05c000000sd9qyvhkjn_2m3j";

var gJsWtid;

function dcsSyncGetWtid() {
	document.write("<SCR"+"IPT TYPE='text/javascript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'><\/SCR"+"IPT>");
}
function dcsAsyncGetWtid() {
	gJsWtid=document.createElement("script");
	var jsWtidUrl="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js";
	window.setTimeout('gJsWtid.src="' + jsWtidUrl + '"',0);
	var headElem=document.getElementsByTagName("head")[0];
	headElem.appendChild(gJsWtid);
}

if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
//	dcsSyncGetWtid();
	dcsAsyncGetWtid();
}

var gService = false;
var gTimeZone = 8;
// Code section for Enable First-Party Cookie Tracking
function dcsCookie(){
	//10010 Mall Province Cookie
	WT.prov_code_cookie = mall_cookie_utils.getMallProvCode();

	if (typeof(dcsOther)=="function"){
		dcsOther();
	}
	else if (typeof(dcsPlugin)=="function"){
		dcsPlugin();
	}
	else if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
	}
}
function dcsGetCookie(name){
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		}
		return unescape(document.cookie.substring(start,end));
	}
	return null;
}
function dcsGetCrumb(name,crumb){
	var aCookie=dcsGetCookie(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsGetIdCrumb(name,crumb){
	var cookie=dcsGetCookie(name);
	var id=cookie.substring(0,cookie.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsFPC(offset){
	if (typeof(offset)=="undefined"){
		return;
	}
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var name=gFpc;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(offset*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vt_sid=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var cur=dCur.getTime().toString();
			for (var i=2;i<=(32-cur.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=cur;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	}
	else{
		var id=dcsGetIdCrumb(name,"id");
		var lv=parseInt(dcsGetCrumb(name,"lv"));
		var ss=parseInt(dcsGetCrumb(name,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vt_sid=WT.co_f+"."+(dSes.getTime()-adj);
	var expiry="; expires="+dExp.toGMTString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
	if (document.cookie.indexOf(name+"=")==-1){
		WT.co_f=WT.vt_sid=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		WT.vt_f=WT.vt_f_a="2";
	}
}

// Code section for Set the First-Party Cookie domain
var gFpcDom=".10010.com";

// Code section for Enable Event Tracking
function dcsParseSvl(sv){
	sv=sv.split(" ").join("");
	sv=sv.split("\t").join("");
	sv=sv.split("\n").join("");
	var pos=sv.toUpperCase().indexOf("WT.SVL=");
	if (pos!=-1){
		var start=pos+8;
		var end=sv.indexOf('"',start);
		if (end==-1){
			end=sv.indexOf("'",start);
			if (end==-1){
				end=sv.length;
			}
		}
		return sv.substring(start,end);
	}
	return "";
}
function dcsIsOnsite(host){
	var doms="@@ONSITEDOMAINS@@";
    var aDoms=doms.split(',');
    for (var i=0;i<aDoms.length;i++){
		if (host.indexOf(aDoms[i])!=-1){
		       return 1;
		}
    }
    return 0;
}
function dcsIsHttp(e){
	return (e.href&&e.protocol&&(e.protocol.indexOf("http")!=-1))?true:false;
}
function dcsTypeMatch(path, typelist){
	var type=path.substring(path.lastIndexOf(".")+1,path.length);
	var types=typelist.split(",");
	for (var i=0;i<types.length;i++){
		if (type==types[i]){
			return true;
		}
	}
	return false;
}
function dcsEvt(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
function dcsBind(event,func){
	if ((typeof(window[func])=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, window[func], true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, window[func]);
		}
	}
}
function dcsET(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	dcsBind(e,"dcsDownload");
	dcsBind(e,"dcsDynamic");
	dcsBind(e,"dcsFormButton");
	dcsBind(e,"dcsOffsite");
	dcsBind(e,"dcsAnchor");
	dcsBind("mousedown","dcsRightClick");
}
	
function dcsMultiTrack(){
	if (arguments.length%2==0){
		for (var i=0;i<arguments.length;i+=2){
			if (arguments[i].indexOf('WT.')==0){
				WT[arguments[i].substring(3)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCS.')==0){
				DCS[arguments[i].substring(4)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCSext.')==0){
				DCSext[arguments[i].substring(7)]=arguments[i+1];
			}
		}
		var dCurrent=new Date();
		DCS.dcsdat=dCurrent.getTime();
		dcsFunc("dcsCookie");
		WT.ti=gI18n?dcsEscape(dcsEncode(WT.ti),I18NRE):WT.ti;
		//dcsPrintVariables();		
		dcsTag();
	}
}

// Add event handlers here

function dcsAdv(){
	dcsFunc("dcsET");
	dcsFunc("dcsCookie");
	dcsFunc("dcsAdSearch");
	dcsFunc("dcsTP");
}
// END OF Advanced SmartSource Data Collector TAG

// START OF Basic SmartSource Data Collector TAG
// Copyright (c) 1996-2007 WebTrends Inc. All rights reserved.
// V8.0
// $DateTime: 2007/02/14 15:39:59 $
var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();
var gI18n=true;
if (window.RegExp){
	var RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	var I18NRE={"%25":/\%/g};
}

// Add customizations here

function dcsVar(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=gI18n?dcsEscape(dcsEncode(document.title),I18NRE):document.title;
	}
	WT.js="Yes";
	WT.jv=dcsJV();
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		WT.ct=document.body.connectionType||"unknown";
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	else{
		WT.ct="unknown";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		for(var i=10;i>0;i--){
			try{
				var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
				WT.fi="Yes";
				WT.fv=i+".0";
				break;
			}
			catch(e){
			}
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}
	if (gI18n){
		WT.em=(typeof(encodeURIComponent)=="function")?"uri":"esc";
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
	}
	WT.tv="8.0.2";
//	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=gI18n?dcsEscape(window.document.referrer, I18NRE):window.document.referrer;
		}
	}
}

function dcsA(N,V){
	return "&"+N+"="+dcsEscape(V, RE);
}

function dcsEscape(S, REL){
	if (typeof(REL)!="undefined"){
		var retStr = new String(S);
		for (var R in REL){
			retStr = retStr.replace(REL[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsEncode(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}

function dcsCreateImage(dcsSrc){
	if (document.images){
		gImages[gIndex]=new Image;
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}

function dcsMeta(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.indexOf("WT.")==0){
					var encode=false;
					if (gI18n){
						var params=["mc_id","oss","ti","pn_gr","pn_sc"];
						for (var j=0;j<params.length;j++){
							if (name.indexOf("WT."+params[j])==0){
								encode=true;
								break;
							}
						}
					}
					WT[name.substring(3)]=encode?dcsEscape(dcsEncode(content),I18NRE):content;
				}
				else if (name.indexOf("DCS.")==0){
					DCS[name.substring(4)]=(gI18n&&(name.indexOf("DCS.dcsref")==0))?dcsEscape(content,I18NRE):content;
				}
			}
			else if (gI18n&&(equiv=="Content-Type")){
				var pos=content.toLowerCase().indexOf("charset=");
				if (pos!=-1){
					WT.mle=content.substring(pos+8);
				}
			}
		}
	}
}

function dcsTag(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
if(DCS.dcsref&&DCS.dcsref.length>1024)
 {
     if(DCS.dcsref.indexOf('?')>0) DCS.dcsref = DCS.dcsref.substring(0,DCS.dcsref.indexOf('?'));
 }
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (var N in DCS){
		if (DCS[N]) {
			P+=dcsA(N,DCS[N]);
		}
	}
	var keys=["co_f","vt_sid","vt_f_tlv"];
	for (var i=0;i<keys.length;i++){
		var key=keys[i];
		if (WT[key]){
			P+=dcsA("WT."+key,WT[key]);
			delete WT[key];
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=dcsA(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function dcsPrintVariables()
{
	var tagVariables="\nDomain = "+gDomain;
	tagVariables+="\nDCSId = "+gDcsId;
	for (N in DCS){
		tagVariables+="\nDCS."+N+" = "+DCS[N];
	}
	for (N in WT){
		tagVariables+="\nWT."+N+" = "+WT[N];
	}
	for (N in DCSext){
		tagVariables+="\nDCSext."+N+" = "+DCSext[N];
	}
	window.alert(tagVariables);
}

function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var ff=(agt.indexOf("firefox")!=-1);
	var ff0=(agt.indexOf("firefox/0.")!=-1);
	var ff10=(agt.indexOf("firefox/1.0")!=-1);
	var ff15=(agt.indexOf("firefox/1.5")!=-1);
	var ff2up=(ff&&!ff0&&!ff10&!ff15);
	var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
	var nn4=(nn&&(major==4));
	var nn6up=(nn&&(major>=5));
	var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
	var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
	var ie5up=(ie&&!ie4);
	var op=(agt.indexOf("opera")!=-1);
	var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
	var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
	var op7up=(op&&!op5&&!op6);
	var jv="1.1";
	if (ff2up){
		jv="1.7";
	}
	else if (ff15){
		jv="1.6";
	}
	else if (ff0||ff10||nn6up||op7up){
		jv="1.5";
	}
	else if ((mac&&ie5up)||op6){
		jv="1.4";
	}
	else if (ie5up||nn4||op5){
		jv="1.3";
	}
	else if (ie4){
		jv="1.2";
	}
	return jv;
}

function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

dcsVar();
dcsMeta();
dcsFunc("dcsAdv");
dcsTag();

// for province
function dcsTagProv() {
	var gDomainTmp = gDomain;
	var dcsIdTmp = gDcsId;
	gDomain = gDomainProv;
	if ((typeof(WT.prov_code_cookie)!="undefined") && (WT.prov_code_cookie != "")) {
		if ((typeof(gDcsIdProvMap[WT.prov_code_cookie])!="undefined") && (gDcsIdProvMap[WT.prov_code_cookie] != "")) {
			var dcsIdProv = gDcsIdProvMap[WT.prov_code_cookie];
			gDcsId = dcsIdProv;
		} else {
			gDcsId = gDcsIdNoProv;
		}
	} else {
		gDcsId = gDcsIdNoProv;
	}
	dcsTag();
	gDcsId = dcsIdTmp;
	gDomain = gDomainTmp;
}

dcsFunc("dcsAdv");
dcsTagProv();

// END OF Basic SmartSource Data Collector TAG


//baidu JS
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?9208c8c641bfb0560ce7884c36938d9d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//end of baidu JS

