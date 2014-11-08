/* javascript Document
 * 样式说明： 周翔
 * 开发时间： 2011-6-23
 * 开发者：  周翔
 * 维护者： 周翔
 *
 * 样式版本： v1.0
 * 版本时间： 2011-6-23
 * 注意事项： 所有功能js写在这里
 */
 //(function(jQuery,e,undefined){
	 
//})(jQuery,joker);

 (function(jQuery,e,undefined){
	
	var jQuery = jQuery;
		
	//-------------------------init--------------------------
	//需要在ajax事件之后初始化的事件集成方法
	
	function sunNavTow(){
		
		
		jQuery( '#tabAjaxContent' ).delegate('a','click', function(){
						
			//alert( this.pathname );
			
			jQuery('#selfAjaxContainer').load(this.pathname+radomT);
			
			
		});
		
		
		//-------------------------placeholder--------------------------	
		//输入框水印方法，判断是否支持placeholder属性，不支持调用自定义方法，支持则采用系统自带方法
		/*function placeFn(){
			
			var placeInput = jQuery( 'input.placeholder' );
			
			!e.placeSupport() ? placeInput.place() : placeInput.val('');
		};
		placeFn();*/
		
		//placeholder
		e.placeholder('placeholder');
		
		
		//ajax div inner load
		
		
	}
	jQuery( '#menu_right_top' ).find('a').live('click', function(){
			if(this.target==''){
				jQuery.cookie("MI", "000000000000", {expires: -1, path: '/', domain: '10010.com', secure: true});
				jQuery('#main_content').load(this.name+"?"+_version_pub);
				
				jQuery(this).parent('li').addClass('on').siblings('li').removeClass('on');
			}
		});
		
	
	function sunNav(){
		
		
		//内部ajax切换
		/**
		jQuery( '#menu_right_top' ).delegate('a','click', function(){
			
			jQuery.cookie("MI", "0000", {expires: -1, path: '/', domain: '10010.com', secure: true});
			jQuery('#main_content').load(this.pathname+radomT,sunNavTow);
			
			jQuery(this).parent('li').addClass('on').siblings('li').removeClass('on');
			
			
		});
	**/
		
		//流量计算 sandflter
		!jQuery('.mymeal_allowance')[0]||(function(){
		
			var allowanceMain = jQuery( '.mymeal_allowance_main' );
			var allowanceRight = jQuery( '.mymeal_allowance_right' );
			var allowanceLeft = jQuery( '.mymeal_allowance_left' );
			var allowanceValue = jQuery( '.mymeal_allowance_value' );
	
			e.tmp.loads = function( obj, oleft, value ){
				
					for( var i = 0; i < 4; i++ ){
				
						var ran = e.random();
						
						ran > 98 ? ran = 98 : ran;
						obj.eq( i ).stop().animate({ width: ran + '%' }, 800 );
						oleft.eq( i ).stop().animate({ left: ran + '%' }, 800 );
						
						ran > 98 ? ran = 100 : ran;
						value.eq( i ).html( Math.round( ran ) );
												
					}
				
					
			};

			e.tmp.loads( allowanceMain, allowanceRight, allowanceValue );	
			
			
	
		})();
		
		
	
//首页banner图切换
		


	//登录后左侧导航鼠标移入样式
	!jQuery('.menu_user_service')[0] || (function(){
	
		jQuery('.menu_user_service').find('li').live('mouseover mouseout',function(e){
			
			jQuery(this).find('img').toggleClass('on');
			
			jQuery(this).find('span').toggleClass('on');
			
		});
	
	})();
		
		
		//首页新手学堂
		(function(){
			
			var li = jQuery('#windown-content').find('li');
			
			var speed = 500;
			
			jQuery('.fresh_r').live('click',function(){
					
				jQuery('#windown-content').find('li').animate({left:"+=831px"},speed);
				
			});
				
			jQuery('.fresh_l').live('click',function(){
					
				jQuery('#windown-content').find('li').animate({left:"-=831px"},speed);
				
			});
				
			jQuery('.fresh_end').live('click',function(){
			
				jQuery('html, body').animate({scrollTop: 0},speed,
					
					function(){
						
						jQuery('#userName').focus();
					
					});
				
			});
			
		})();
		
	
		//综合信息页面，右侧焦点图
		(function(){
			
			var btn = jQuery('#foucsButton').find('div'),
			
				li = jQuery('#rightFocus').find('li'),
				
				time = 2000, //切换时间
				
				si; //setInterval
			
			//开始播放
			function play(i){
				
				btn.eq(i).addClass('on').siblings().removeClass();
				
				li.eq(i).addClass('on').siblings().removeClass();
			
			};
			
			//连续播放
			function combo(){
				
				for(var i=0;i<li.length;i++){
					
					if( li.eq(i).hasClass('on') ){
						
						jQuery(this).removeClass('on');
						
						i++;
						
						i >= btn.length ? play(0) : play(i);
						
					};
					
				};
				
			};
			
			//调用定时器
			si = setInterval(combo,time);
			
			for(var index=0;index<li.length;index++){
				
				(function(i){
					
					btn.eq(i).mouseover(function(){
						
						clearInterval(si);
						
						play(i);
						
					});
					
					btn.eq(i).mouseout(function(){
						
						si = setInterval(combo,time);
						
					});
					
				})(index);
				
			};
			
		})();
	
		//综合信息页面，右侧图库
		!jQuery('#gallery') || (function(){
			
			var li = jQuery('#gallery').find('img');
			
			var n = li.length - 1 ;
			
			li.length == 1 ?
			
			jQuery('#btn_gallery').hide() :
			 
			jQuery('#btn_gallery').show();
			
			jQuery('#gallery').find('ul').css({width:li.length*236});
			
			jQuery('#gallery').find('div.left').click(function(){
					
					if(jQuery('#gallery').find('ul').css('margin-left') == '0px' ){
						
					} else {
						
						if(!jQuery('#gallery').find('ul').is(':animated')){
						
							jQuery('#gallery').find('ul').animate({marginLeft:'+=236px'});
						
						}
					}
				
			});
			
			jQuery('#gallery').find('div.right').click(function(){
				
					if(jQuery('#gallery').find('ul').css('margin-left') == -n*236 + 'px'){
						
					} else {
						
						if(!jQuery('#gallery').find('ul').is(':animated')){
							
							jQuery('#gallery').find('ul').animate({marginLeft:'-=236px'});
							
						}
					}
				
			});
			
		})();
				
	};
	///登陆后常用功能菜单处理
	jQuery('#helpcenterul').find('a').live('click', function(){
		//var url =jQuery("#helpcenterul").find("a").attr("id");
		///var index= jQuery(this).parents('li').index();
		var MI =jQuery(this).attr("id");
		///alert(MI);
		jQuery('#menu_user_service').find("ul").find("#"+MI).addClass('on').parent('li').siblings().children('a').removeClass('on');
		
		jQuery('#menu_user_service').find('ul:last').show().siblings('ul').hide();
		
		jQuery('#helpcenterul').hide();
		jQuery('#menu_right_top').html('');
		jQuery('#main_content').load(jQuery('#menu_user_service').find("ul").find("#"+MI).attr("href"));
		
	});
	jQuery('#menu_user_service').delegate('a','click', function(){
			jQuery('#menu_right_top').show();
		    if(this.name=='helpcenter'){
		    	jQuery('#menu_right_top').html('');
		    	jQuery('#main_content').load(this.pathname+"?"+_version_pub,sunNavTow);
				//jQuery(this).parent('li').addClass('on').siblings('li').removeClass('on');
				jQuery(this).parents('ul').siblings().find('a').removeClass('on');
				jQuery(this).addClass('on').parent('li').siblings().children('a').removeClass('on');
				return false;
		    }
		    if(this.name!=''){
			    jQuery('#menu_right_top').html('');
		    	jQuery('#main_content').html('');
		     	var menuId=this.id;
		     	var parObj=jQuery("#lastnode"+menuId);
	   			if(parObj!=undefined){
			    		var nodevalue=parObj.html();
		    	 		jQuery("#menu_right_top").html(nodevalue);
		    	 		jQuery("#menu_right_top").find("ul").show();
		    	 		var lastNode=jQuery("#menu_right_top").find("li[class='on']");
					     var content= lastNode.find('a').attr("name");
					    jQuery("#main_content").load(content+"?"+_version_pub);
						jQuery.cookie("MI","000000000000");
	   			}
	     }
		//jQuery('#bestAjaxContainer').load(this.pathname,sunNav);
		
		jQuery(this).parents('ul').siblings().find('a').removeClass('on');
		
		jQuery(this).addClass('on').parent('li').siblings().children('a').removeClass('on');
		//隐藏我要说两句功能
		//jQuery( '#isread-text-new' ).hide();
	});
	
	
	jQuery('#menu_often_info' ).delegate('a','click', function(){
			
			//alert( this.pathname );
			
			jQuery('#main_content').load(this.pathname+"?"+_version_pub,sunNavTow);
			
			jQuery(this).parent('li').addClass('on').siblings('li').removeClass('on');
			
			
		});
	
	
	sunNav();
	
	sunNavTow();

	
	
		
		
	//左侧导航收缩菜单
	!jQuery('#menu_user_service') || (function(){
		
		jQuery('#menu_user_service').delegate('h2','click', function(){
		
			jQuery(this).next('ul').is(":visible") ?
			
			jQuery(this).siblings('ul').slideUp() :
			
			jQuery(this).next('ul').slideDown().siblings('ul').slideUp();
			
		});
		
	})();
	
	//粉色背景通用选项卡
	!jQuery('.list_menu_main_selfService').live('click',function(){
	
		jQuery(this).addClass('on').siblings('div.list_menu_main_selfService').removeClass('on');
	
	});

	//基础服务，话费查询页面，“详情”链接按钮
	jQuery('.details').live('click',function(){
		
		var toggle = jQuery(this).parents('tr').next('tr');
		
		toggle.is( ":visible" ) ? toggle.hide() : toggle.show();
		
	});
	
	jQuery('.btn_close').live('click',function(){
		
		jQuery(this).parents('tr').hide();
		
	});
	
	jQuery('.btn_arrow_up').live('click',function(){
		
		jQuery(this).parents('tr').hide();
		
	});
	
	//首页js
	jQuery('#menu').find('dl').live('mouseover',function(){
			
		jQuery(this).find('dd').fadeIn(100);
			
	});
	
	jQuery('#menu').find('dl').live('mouseleave',function(){
			
		jQuery(this).find('dd').fadeOut(100);
			
	});
	
	
	
//套餐办理
	
	jQuery('.plan').find('li').live('click',function(){
		
		var list = jQuery('.plan').find('li');
		
		jQuery('.plan').find('li').removeClass('on');
		
		jQuery(this).addClass('on').siblings('li').not(this).removeClass('on');
		
		
		var num = parseInt(jQuery(this).text()),
		
			args = [20,36,46,66,96,126,156,186,226,286,386,586,886],
			
			webCard = [50,80,150,200,300];
			
		for(var i=0;i<args.length;i++){
			
			if( num == args[i] ){
				
				jQuery('.tcbl').eq(i).show().siblings('.tcbl').hide();
				
			}
			
		}
		
		for(var j=0;j<webCard.length;j++){
			
			if( num == webCard[j] ){
				
				jQuery('.tcbl').eq(j).show().siblings('.tcbl').hide();
				
				jQuery('.bzzf').hide();
				
			} else if ( num === NaN ) {
			
				jQuery('.tcbl').hide();
				
			}
			};
		
	});
	
	//套餐办理沃派36元补完
	jQuery('#wp').live('click',function(){
	
		jQuery('.tcbl').eq(1).show().siblings('.tcbl').hide();
		
	
	});
	
	jQuery('#bzzf').live('click',function(){
	
		jQuery('.tcbl').hide();
		
		jQuery('.bzzf').show();
	
	});
	
	
	
	//套餐办理关闭按钮
	jQuery('.show_pktip').live('click',function(){
		
		//jQuery(this).parents('div.btn_plan').next('div.pktip').show();
		
		var toggle = jQuery(this).parents('div.btn_plan'),
		
			visible = toggle.next('div.pktip');
			
		visible.is(':visible') ? visible.hide() : visible.show();
		
	});
	
	jQuery('.pktipcls').live('click',function(){
		
		jQuery(this).parents('div.pktip').hide();
		
	});
	
	// announcement index.html 翻页部分，页码按钮鼠标移入移出、点击效果
	jQuery('.page').find('a').live('click',function(){
	
		jQuery(this).addClass('orange').siblings().removeClass('orange');
	
	});
	
	jQuery('.page').find('a').live('mouseover mouseleave',function(){
	
		jQuery(this).toggleClass('color_orange');
	
	});
		
	
	//评分页面文本域
	jQuery("#lenText").live("keyup", function() { 
	
		var lenText = jQuery('#lenText'),
		
			shortLen = jQuery('#shortLen'),
			
			shortLenFont = jQuery('#shortLenFont'),
			
			frontFont = jQuery('#frontFont'),
			
			orgLen = 70,
			
			minLen = 10,
			
			newLen  = orgLen - lenText.val().length,
			
			chLen = Math.abs(newLen);
			
			
			
		if(lenText.val()){
			
	    	if(lenText.val().length > -1){
		 
		 		if(newLen > -1){
					
					shortLen.html(""+newLen);
					
					frontFont.html("您还可以输入");
			
		 		} else if (newLen > 70){
					
		 			shortLen.html(""+newLen);
					
					frontFont.html("您还可以输入");
			
		 		} else {
			
					shortLen.html("已超出字数限制"/*chLen*/);
					
					frontFont.html("");
			
		 		}/**/
		 
		 		//if(newLen <= minLen){
//					
//		   			//shortLenFont.css({color:'red'});
//		 		
//				} else {
//					
//		   			shortLenFont.css({color:'#666A72'});
//					
//		 		}
//				
//		 		if(newLen <= 0){
//					
//					//lenText.css({color:'red'});
//
//					jQuery( '.btn_middle' ).css({backgroundPosition:'0 -26px'}).attr( 'disabled',true );
//		 		
//				} else {
//					
//					lenText.css({color:'#666A72'});
//					
//					jQuery( '.btn_middle' ).css({backgroundPosition:'0 0'}).attr( 'disabled',false );
//		 		}
	  		}
			
		} /*else {
			
	  		shortLen.html(""+orgLen);
			
		} */
		
	});
	
	//评分按钮
	jQuery('#star').find('li').live('click',function(){
				  
		var index = jQuery(this).index()+1;
		
		jQuery('#star').find('span').text("您评价了"+index+"星");
		
		//index < 3 ? jQuery('.star_show').show() : jQuery('.star_show').hide();
		
		/*if( index < 3 ){
		
			jQuery('.star_show').show();
			
			if(jQuery('#lenText').val().length>70){
				
				jQuery( '.btn_middle' ).css({backgroundPosition:'0 0'}).attr( 'disabled',false );
				
			}else{
				
				jQuery( '.btn_middle' ).css({backgroundPosition:'0 -26px'}).attr( 'disabled',true );
				
				}
			
		
		} else {
		
			jQuery('.star_show').hide();
			
			jQuery( '.btn_middle' ).css({backgroundPosition:'0 0'}).attr( 'disabled',false );
			
			jQuery('#lenText').val("");
			
			jQuery('#frontFont').text("您还可以输入");
			
			jQuery('#shortLen').text("70");
		
		}*/
		
	});
		
	//首页 〉 自助服务 〉使用量查询 〉上网卡预 radio 样式
	jQuery('.cardBeforeDate').find('div').live('click',function(){
		
		jQuery(this).addClass('cbd').siblings('div').removeClass('cbd');
		
	});
	
	//右侧选项卡
	!jQuery('#rightSideCard') || (function(){
		
		jQuery('#rightSideCard').find('li').live('mouseover',function(){
			
			var index = jQuery('#rightSideCard').find('li').index(this);
			
			jQuery(this).addClass('on').siblings('li').removeClass('on');
			
			jQuery(this).parent('ul').siblings('div').eq(index).show().siblings('div').hide();
			
		});
		
	})();

	jQuery('#cardPayQuery').find('ul.clear').find('li').live('click',function(){
		jQuery(this).addClass('on').siblings('li').removeClass('on');
		
		var index = jQuery(this).index();
		
		jQuery('#cardPayQuery').find('div.information').eq(index).show().siblings('div.information').hide();
	
	});
	//loading载入过程动画
	jQuery( '#loading' ).ajaxStart(function(){
		
		jQuery(this).show();
		
	}).ajaxStop(function(){ 
	
		jQuery(this).delay( 300 ).hide(1);
		
	});
	
	

	
		
		
		
		
})(jQuery,joker);

