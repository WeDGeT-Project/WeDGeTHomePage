_version_pub="_="+(new Date()).getTime();
jQuery.noConflict(); 
var html;
var QUERYURL="/ehallService/static";
var NAVSERIVCE="";
var ADMSSERIVCE="http://ad.10010.com/uniAdms_2.0";
var NOTICESERIVCE="http://m1.ad.10010.com/noticeMag";
var MENUURL=NAVSERIVCE+'/navhtml/';
var radomT="?_="+(new Date()).getTime();
var wt2BaseCommon={};
var QueryMain = {
	    printBody:function(){
	       window.print();
        },
	    loadModal:function(){ 
		    jQuery("<div id='msgDiv' align='center'  style='width:0px;heigth:0px;text-align:center;line-heigth:center;z-index:9999999;_z-index:9999999;margin-left:-110px;_margin-left:-40px;position:absolute;left:35%;top:40%;font:12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif'><img src='http://m1.img.10010.com/images/loading.gif' align='absmiddle'></div>").modal({
                escClose:true,  
                close:true,
                zIndex:"9999999"
            });
        },
	    closeModal:function(){
		    jQuery.modal.close(); 
        },
		loadData: function(argUrl,paramdata){
			var menuid=jQuery("#menu_right_top").find("li[class='on']").children("a").attr("id");
			radomT="?_="+(new Date()).getTime();
			var url=argUrl+paramdata+radomT;
			if(menuid!=undefined){
				url+="&menuid="+menuid;
			}
			jQuery.ajax({ url:url, type:"POST", async:true, dataType:"script",
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				beforeSend:function(){
					QueryMain.loadModal();
				}
			});
			//20秒后自动隐藏loading图片
			setTimeout("QueryMain.closeModal()",25000);
		},
		loadDataHead: function(argUrl,paramdata){
			var menuid=jQuery("#menu_right_top").find("li[class='on']").children("a").attr("id");
			radomT="?_="+(new Date()).getTime();
			var url=argUrl+paramdata+radomT;
			if(menuid!=undefined){
				url+="&menuid="+menuid;
			}
			jQuery.ajax({ url:url, type:"POST", async:true, dataType:"script",
				beforeSend:function(){},
				complete:function(){},
				success:function(){}
			});
			//20秒后自动隐藏loading图片
			setTimeout("QueryMain.closeModal()",25000);
		},
		//加载温馨提示
		loadbiz:function(data){
			var cookiemj = QueryMain.getCookie("MJ");
                //if(data.rspPublicArgs.bizInfo != null && data.rspPublicArgs.bizInfo.length != 0){
                        //var jsname = data.rspPublicArgs.bizInfo[0];
                        //var reminderPath="/reminder/";
                        //var url=reminderPath+jsname.split("_")[0]+"/"+jsname.substring(jsname.length-4,jsname.length)+"/"+jsname+".html";
                        //var jsname = data.rspPublicArgs.bizInfo[0];
						if(cookiemj == null||cookiemj==""){
							var m = "022";
						}else{
							var m=cookiemj.split("/")[4].split("_")[0].replace(/\"+/g,"").replace(/\%22+/g,"");
						}
                        var channel = "111000002";
                        var reminderPath="/reminder2";
                        if(jQuery("#menu_right_top").find("li[class='on']").children("a").attr("id")  == null){
    						var menuid =jQuery("#byw").find("li").attr("id") ;
                        }else{
	                         var menuid=jQuery("#menu_right_top").find("li[class='on']").children("a").attr("id");
                        }
                        var url=reminderPath+"/"+channel+"/"+cookiemj.split("/")[2]+"/"+menuid+"/"+m+"/1.html"+radomT;
                        jQuery("#bizInfo").load(url,function(response,status){
                        if("success" == status){
                               if(jQuery("#bizInfo").html()!=""){
                                        jQuery("#bizInfoDiv").show();
                                }
                        }
                     });
                //}
                return;
        },
		loadCountException:function(data){
			var msgUrl = '/load/anomaly/inquires/accountinged.html';
			jQuery.ajax({
				  url: msgUrl,
				  type: "GET",
				  dataType: "html",
				  async:false,
				  success: function(msg){
					msg = msg.replace("MESSAGECONTENT",data.rspPublicArgs.rspDesc);
					jQuery("#main_content").html(msg).show();
					jQuery("#zhucontent").hide();
					QueryMain.closeModal();
				  }
			   }
			)
		},		
		loadException:function(exceptionType,exceptionContent,divId,smsexceptionid,smsexceptionidcode){
			var msgUrl;
			 switch (exceptionType) {
			 //账期异常
			 case '1':
				 msgUrl = '/load/anomaly/inquires/accounting.html';
				 break;
			//维护期异常
			 case '2':
				 msgUrl = '/load/anomaly/inquires/maintenance.html';
				 break;
			 //接口异常，短信方式
			 case '3':
				 msgUrl = '/load/anomaly/inquires/interfaceShort.html';
				 break;	
			//接口异常
			 case '4':
				 msgUrl = '/load/anomaly/inquires/interfaceElse.html';
				 break;
			//无数据异常
			 case '5':
				 msgUrl = "/load/anomaly/inquires/zeroData.html";
				 break;
			//不符合办理条件
			 case '6':
				 msgUrl = "/load/anomaly/business/noConditions.html";
				 break;	 
			}
			msgUrl = '/load/anomaly/inquires/accountinged.html';
			if(msgUrl!=null&&"undefined"!=msgUrl){
				jQuery.ajax({
				      url: msgUrl,
				      type: "GET",
				      dataType: "html",
				      async:false,
				      success: function(msg){
				      	//msg = msg.replace("SMSEXCEPTIONID",smsexceptionid);
						if(exceptionContent!=null&&exceptionContent!="null"&&exceptionContent!="undefined"&&exceptionContent!=""){
					      	msg = msg.replace("MESSAGECONTENT",exceptionContent);
						}else{
						   //设置默认的异常
							msg = msg.replace("MESSAGECONTENT","很抱歉，暂时无法为您提供服务，请稍后再试。");
						}
				      	
				      	if(msg.indexOf("MESSAGECONTENT") >=0 ){
							msg = msg.replace("MESSAGECONTENT","很抱歉，暂时无法为您提供服务，请稍后再试。");
						}
				      	
				      	//msg = msg.replace("SMSEXCEPTIONIDCODE",smsexceptionidcode);
				        jQuery("#"+divId).html(msg).show();
						jQuery("#zhucontent").hide();
			            QueryMain.closeModal();
				      }
				   }
				)
			}
		},
		//处理数据，加载jstemplate模板
		processTemplateData: function(show,templateId,data){
            jQuery(show).setTemplateElement(templateId).processTemplate(data); 
            QueryMain.closeModal();
		},
		processTemplateDataHead: function(show,templateId,data){
            jQuery(show).setTemplateElement(templateId).processTemplate(data); 
		},
		//截取json数据
		sliceData: function(data,start,end){
			if(data!=null&&data.length>0){
				if(data.length<=end){
					end=data.length;
				}
				if(start<0){ 
					start=0;
				}
				return data.slice(start, end); 
			}else{
				return data;
			}
		},
		//处理分页显示
		processPageTag:function(totalSize,currentPage,pageSize){
			var totalPage=(totalSize%pageSize==0?totalSize/pageSize:Math.round(totalSize/pageSize));
			if(currentPage>totalPage){currentPage=totalPage;}
			var last=currentPage-1;
			var next=currentPage+1;	
			if(last<1){last=1;}
			if(next>totalPage){next=totalPage;}
			var start = pageSize*(currentPage-1);
			var end = currentPage*pageSize;
			var pageInfo={'totalSize':totalSize,'totalPage':totalPage,'currentPage':currentPage,'pageSize':pageSize,'last':last,'next':next,'start':start,'end':end};
			return pageInfo;
		},
		//处理数据，分页显示数据
		processPageQuery:function(show,templateId,data,currentPage,pageSize){
			var start = pageSize*(currentPage-1);
			var end = currentPage*pageSize;
			var subjson=QueryMain.sliceData(data,start,end);
			QueryMain.processTemplateData(show,templateId,subjson);
		},
		goPage:function(show,templateId,totalSize,pageinput,pageSize){
			var gopage=jQuery(pageinput).val();
			QueryMain.processPageTag(show,templateId,totalSize,gopage,pageSize);
		},
		exceptionBack:function(data){
		//alert(data.rspPublicArgs.rspCode+"---------"+data.rspPublicArgs.rspDesc);
			if(data.rspPublicArgs.rspCode=='08'){
				window.location.href=data.rspPublicArgs.rspDesc;
			}else{
				//jQuery("#ajaxContainer").html(data.rspPublicArgs.rspDesc);
				//ShowAlert('提示框',data.rspPublicArgs.excepDesc,200,100);
			}
		},
		getHTML:function(id){
	        html=jQuery("#"+id).html();
	        return html;
	    },
	    //获取cookie
        getCookie:function(objName){//获取指定名称的cookie的值
			var arrStr = document.cookie.split(";");
			var o="";
			for(var i = 0;i < arrStr.length;i++){
				var temp = arrStr[i].split("=");
				if(jQuery.trim(temp[0]) == jQuery.trim(objName)) {
				  o=unescape(jQuery.trim(temp[1]));
				  break;
				}
			}
			return o;
		},
		getMenu:function(id){
			 var m=QueryMain.getCookie("MJ");
		     var url=MENUURL;
	         if(m==""){
				jQuery.getScript(QUERYURL+"/login/s",function(){
                        if(window.MJ){
                               m=window.MJ;
                               m=m.replace(/\"+/g,"").replace(/\%22+/g,"");
                                if(id!=''&&id!=undefined){
						        	url+=m+"-"+id+".html?r="+radomT;
						        }else{
						            url+=m+".html?r="+radomT;
						        }
						        QueryMain.loadMenu(url);
                        }
                });
			}else{
				m=m.replace(/\"+/g,"").replace(/\%22+/g,"");
		        if(id!=''&&id!=undefined){
		        	url+=m+"-"+id+".html";
		        }else{
		            url+=m+".html";
		        }
				 QueryMain.loadMenu(url);
			}
		},
		loadMenu:function(url){
					jQuery.ajax({ url:url, type:"GET", async:false,dataType:"html",success:function(navContent){
							var menuroot=jQuery("#menu_user_service");
							menuroot.html(navContent);
			    			menuroot.find("ul").hide();
					    	var mi=jQuery.cookie("MI");
					    	if(mi!=null&&mi!=''){
					    		if(mi=='000000000000'){
							    	menuroot.find("ul:first").show();
					    		}else{
					    			var parObj=menuroot.find("#"+mi);
					    			if(parObj.attr("id")!=undefined){
					    				if(parObj.attr("name")=="helpcenter"){
					    					var MI =parObj.attr("id");///jQuery(this).attr("class");
									
											jQuery('#menu_user_service').find("ul").find("#"+MI).addClass('on').parent('li').siblings().children('a').removeClass('on');
											
											jQuery('#menu_user_service').find('ul:last').show().siblings('ul').hide();
											
											jQuery('#helpcenterul').hide();
											jQuery('#menu_right_top').html('');
											jQuery('#main_content').load(jQuery('#menu_user_service').find("ul").find("#"+MI).attr("href"));
					    				}else{
						    				var lastNav=menuroot.find("#"+mi.substring(0,8));
					    					lastNav.parent().parent('ul').show().siblings('ul').hide();
	   										lastNav.parent('li').addClass("on");
	   										lastNav.addClass("on");
										    var nodevalue=menuroot.find("#lastnode"+mi.substring(0,8)).html();
							    	 		jQuery("#menu_right_top").html(nodevalue);
							    	 		jQuery("#menu_right_top").find("ul").show();
							    	 		var lastNode=jQuery("#menu_right_top").find("#"+mi);
							    	 		lastNode.parent().addClass("on").siblings().removeClass('on');
										     var content= lastNode.attr("name");
										    jQuery("#main_content").load(content+"?"+_version_pub);
											jQuery.cookie("MI","000000000000");
											//alert("menu is  on ...........");
										}
					    			}else{
					    				menuroot.find("ul:first").show();
					    				//alert("22没有相应菜单...........");
					    				jQuery.cookie("MI","000000000000");
					    				//wt2BaseCommon.showTips("尊敬的客户，您好！此功能目前仅针对部分用户开放，欢迎您使用其他自助服务功能。");
					    			}
					    		}
					    	}else{
					    		//alert('mi is undefined....');
					    		jQuery.cookie("MI","000000000000");
							    menuroot.find("ul:first").show();
					    	}
				  		}}); 
		
		},
		CF:function(id){
			jQuery.ajax({ url:QUERYURL+"/login/l?menuid="+id, type:"GET", async:false, dataType:"script"});
		},
		goBack:function(){
		     var url=jQuery("#menu_right_top").find('li[class="on"]').find("a").attr("name");
			 jQuery("#main_content").load(url);
		},
		menuLogin:function(id){
			jQuery("#menu").find("a").removeClass("on");
			jQuery("#"+id).addClass("on");
			jQuery.ajax({ url:QUERYURL+"/login/l", type:"POST", async:false,dataType:"script",success:function(d){
							if(window.loginON=='true'){
								var id = jQuery("#menu").find("a[class='on']").attr("id");
								radomT="?_="+(new Date()).getTime();
								if("undefined"!=id&&id!=null&&id!=undefined){
								 	r=QUERYURL+"/login/r"+radomT+"&menuid="+id;
								}else{
									 r=QUERYURL+"/login/r"+radomT;
								}
								var loca=window.location.href;
								var l=loca.split("/");
								window.location.href=loca.substring(0,loca.indexOf(l[2])+l[2].length)+r;
							}else{
								alert("您还未登录，请先登录！");
							}
				  		}}); 
				},
	  //实名制提示
	   realNamePrompt:function(text){
	   		jQuery("#boxcss").attr('href','http://js.img.10010.com/css/add.css');
	   		var rnText = jQuery("#realNameProm").load('/load/business/realname/realNamePrompt.html');
	   		if(text!="" && text=="id15"){
	   			jQuery("#rmzPromptId").html("尊敬的用户，您目前登记的身份证号为15位，需到本地营业厅办理升位后才能办理业务。</br></br>");
	   		}
			jQuery(".boxcss").attr('href','');
	  },		
	   //分享方法
	   share:function(type,content) {
		 var link = '';
		 var pics = new Array();
		 switch (type) {
		 //新浪
		 case 'sina':
			 link = 'http://v.t.sina.com.cn/share/share.php?&url={url}&title={title}';
			 break;
			 //qq微博
		 case 'qqt':
			 link = 'http://v.t.qq.com/share/share.php?title={title}&url={url}&pic={pic:|}';
			 break;
			 //人人网
		 case 'renren':
			 link = 'http://share.renren.com/share/buttonshare.do?link={url}&title={title}';
			 break;	
			 //qq空间
		 case 'qzone':
			 link = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}';
			 break;
			 //腾讯朋友
		 case 'pengyou':
			 link = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={url}&title={title}";
			 break;
			 //msn
		 case 'msn':
			 link = "http://profile.live.com/P.mvc#!/badge?url={url}&title={title}&pic={pic:|}";
			 break;
			 //猫扑
		 case 'mop':
			 //link = "http://tt.mop.com/share/shareV.jsp?pageUrl={url}&title={title}";
			 link = "http://tk.mop.com/api/post.htm?url={url}&title={title}";
			 break;
		 }
	    
		 //$('img').each(function(i, n) {
		 //	 pics.push(n.src);
		 //});
		 if(content){
		    if(content.length > 200){
		       content = content.substring(0,200);
		    }
		    link = link.replace('{title}',encodeURIComponent(content));
		 }else{
		    link = link.replace('{title}',encodeURIComponent('中国联通网上营业厅  --  朋友们，新版网上营业厅，页面更漂亮，功能更全面，服务更贴心，快去体验一下吧。'));
		 }
		 link = link.replace('{url}','http://www.10010.com');
		 link = link.replace('{pic:|}','http://res.mall.10010.com/mall/front/images/logo.png?resVer=20120817000102');
		 window.open(link);
      },
      
      failedMenu:function(){
      	// alert(conteented+":你没有该菜单权限！！！========"+conteented);
      	 window.location.href="index.html";
      }
};
var CoverLayerID = 'CoverLayer';
wt2BaseCommon.showTips = function(msg) {
	jQuery('html, body').animate({scrollTop: 0},0);
	jQuery('#frontPopDiv').show();
	jQuery('.closeT').bind('click',0,OverScreen);
	jQuery('.textCenter').text(msg);
	OverScreen(1);
}
function OverScreen(tag){
	if(jQuery('#'+CoverLayerID).length>0){
	  with(jQuery('#'+CoverLayerID)){
		  if(tag==1){
			  LayoutAttr(jQuery('#'+CoverLayerID));
		  }else{
		  	  jQuery('#frontPopDiv').hide();
		  	  jQuery('.closeT').removeAttr('click');
			  css('display','none');
		  }
	  }
	}else if(tag==1){
		var CoverLayer = jQuery('<div></div>');
		CoverLayer.appendTo('body');
		with(CoverLayer){
			attr('id',CoverLayerID);
			LayoutAttr(CoverLayer);
		}
	}
}

function LayoutAttr(obj){
	with(obj){
		css('position','absolute');
		css('min-width','100%');
		css('background-color','#CCC');
		css('z-index','99988');
		css('width',window.screen.width-30);
		css('left','0px');
		css('top','0px');
		css('display','block');
		css('opacity',0.8);
		css('height',jQuery(document).height());
	}
}
_self_service_loginout = function() {window.location.href=window.location.href;}

window.parent.wt2BaseCommon.secureAuth = function(secure_token,secure_tool,user_number) {
	jQuery.ajax({
		url:QUERYURL+"/queryMonth/execute1/"+secure_token+"/"+secure_tool+"/"+user_number,
		type:"POST", 
		dataType:"JSON",
		success:function(data){
			if(data){
				var cookie_usermail = jQuery.cookie('usermiliauth');
				if(null==cookie_usermail||""==cookie_usermail){
					cookie_usermail=usermiliauth;
				}else{
					cookie_usermail+=usermiliauth;
				}
				jQuery.cookie('usermiliauth', cookie_usermail, {domain: '.10010.com'});
				usermiliauth="";
				OverScreenPass(0);
			}else{
				alert('尊敬的用户您好:系统忙请稍后再试');
			}
		}
	});
}
window.parent.wt2BaseCommon.closeMiliAuth = function() {
	//jQuery.cookie('usermiliauth', 'usermiliauth', {domain: '.10010.com'});
	OverScreenPass(0);
}

function checkmapExtraParam(detailBill,fun,v,s,t){
	var check_bol = false;
	jQuery.ajax({
		url:QUERYURL+"/queryMonth/checkmapExtraParam/"+detailBill,
		type:"POST", 
		async:false,
		dataType:"JSON",
		success:function(data){
			if(data.morder){
		    	var cookie_usermail = jQuery.cookie('usermiliauth');
		    	if(null==cookie_usermail||""==cookie_usermail){
		    		var secureIframe="http://uac.10010.com/secure/securecenter/ylsc"+data.morderCode+"yzche/securelayer?redirect_url=http://iservice.10010.com";
				    jQuery("#secureIframe").attr("src",secureIframe);
		    		showpassover();
			     	usermiliauth=data.miliauth+"$";
		    	}else{
		    		var usermil = cookie_usermail.split("$");
			    	for (var i=0;i<usermil.length;i++) {
			    		if(usermil[i]==data.miliauth){
			    			fun(v,s,t);
			    			check_bol = true;
			    		}
					}
			    	if(!check_bol){
			    		var secureIframe="http://uac.10010.com/secure/securecenter/ylsc"+data.morderCode+"yzche/securelayer?redirect_url=http://iservice.10010.com";
					    jQuery("#secureIframe").attr("src",secureIframe);
			    		showpassover();
				     	usermiliauth=data.miliauth+"$";
			    	}
		    	}
		     }else{
		     	usermiliauth="";
		     	fun(v,s,t);
		     	check_bol = true;
		     }
		}
	});
	return check_bol;
}
function showpassover(){
		/*if((jQuery.cookie('usermiliauthMorder')==null||jQuery.cookie('usermiliauthMorder')=="")&&(jQuery.cookie('usermiliauth')==""||jQuery.cookie('usermiliauth')==null)){
			jQuery('#password_layer_id').show();
			OverScreenPass(1);
			return false;
		}
		return true;*/
		window.document.domain='10010.com';
		jQuery('#password_layer_id').show();
		OverScreenPass(1);
		return false;
}
function OverScreenPass(tag){
	if(jQuery('#'+CoverLayerID).length>0){
	  with(jQuery('#'+CoverLayerID)){
		  if(tag==1){
			  LayoutAttr(jQuery('#'+CoverLayerID));
		  }else{
		  	  jQuery('#password_layer_id').hide();
		  	  jQuery('.closeT').removeAttr('click');
			  css('display','none');
		  }
	  }
	}else if(tag==1){
		var CoverLayer = jQuery('<div></div>');
		CoverLayer.appendTo('body');
		with(CoverLayer){
			attr('id',CoverLayerID);
			LayoutAttr(CoverLayer);
		}
	}
}

/*
 * 促销活动编码
 * 我的账户-WT_NT_003
 * 历史账单-WT_NT_004
 * 当月话费-WT_NT_005
 * 缴费记录-WT_NT_006
 * 通话详单-WT_NT_007
 * 短信详单-WT_NT_008
 */
function message_cx(message_body,message_id,menu_id){
		var radomR="&_="+(new Date()).getTime();
		var mallcity = jQuery.trim(jQuery.cookie("mallcity"));
	 	var provinceCode = "0"+mallcity.split("|")[0];
	 	var cx = NOTICESERIVCE+'/ad/simpleAdvertise.ad?sysid=WT&id='+menu_id+'&placeDivId='+message_id+'&areaid='+provinceCode+radomR;
	 	jQuery.getScript(cx,function(){
			if(jQuery('#'+message_id).html()!=null&&jQuery('#'+message_id).html()!=undefined&&jQuery('#'+message_id).html()!=''&&''!=jQuery.trim(jQuery('#'+message_id).html())){
				jQuery('#'+message_body).show();
			}
	 	});
		
 }