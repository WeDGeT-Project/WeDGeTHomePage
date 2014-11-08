/*!
 * joker javaScript Library v0.0.1
 * Copyright (c) 2011, 宁玉波 
 * 官方网站(Authors) http://css3.cc/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: 2011-04-30 11:16
 */

;( function( window, undefined ) {

	//快速查找location
	var location = window.location,

	//快速查找navigator
	navigator = window.navigator,

	//定义调试工具全局变量
	debug = null,

	//定义全局ie识别, lte ie8
	ie = !-[1,],
	
	$ = jQuery,

	//joker核心
	joker = function( selector, context, results, seed ) {
		//返回joker.fn.init实例
		return new joker.fn.init( selector, context );
	};

	joker.fn = joker.prototype = {
		//核心方法
		//定义Sizzle选择器引擎处理机制
		//定义jQuery选择器引擎处理机制
		//自定义简单的选择器引擎
		init: function( selector, context, results, seed ){

			//如果存在Sizzle.js,处理Sizzle引擎
			if( typeof Sizzle === 'function' ){

				//调用Sizzle
				var ret = Sizzle.call( this, selector, context, results, seed );

				//遍历结果，赋值给joker
				for( var i = 0; i < ret.length; i++ ){
					this[i] = ret[i];
				};
				this.length = ret.length;
				this.context = context;
				//舍弃自定义的选择器引擎,直接返回Sizzle引擎处理结果
				return this;

			//如果存在jQuery,处理jQuery,调用其选择器引擎
			} else if( typeof jQuery === 'function' ){

				//调用jQuery
				var ret = jQuery.call( this, selector, context );

				//遍历结果，赋值给joker
				for( var i = 0; i < ret.length; i++ ){
					this[i] = ret[i];
				};
				this.length = ret.length;
				this.context = context;
				//舍弃自定义的选择器引擎,直接返回jQuery引擎处理结果
				return this;
			};

			//如果不存在Sizzle.js和jQuery库
			//调用自定义选择器引擎进行处理
			//处理jQuery(''), jQuery( null ), jQuery( undefined )
			if ( !selector ) {
				return this;
			};

			//处理节点对象
			if ( selector.nodeType ) {

				//设置对象和上下文
				this[0] = this.context = selector;
				//设置长度
				this.length = 1;
				//返回当前实例
				return this;
			};

			//处理body
			if ( selector === 'body' && !context && document.body ) {

				//设置上下文为document
				this.context = document;
				//定义当前实例
				this[0] = document.body;
				this.selector = selector;
				this.length = 1;
				return this;
			};

			//处理字符串
			if ( typeof selector === 'string' ) {
				
				//处理selector
				var ret = joker.check( selector );

				//处理class
				if( ret[0] === 'class' ){

					//获取class
					var e = joker.getClass( ret[1], ret[2] );

					//遍历元素集合，赋值给joker
					for( var i = 0; i < e.length; i++ ){
						this[i] = e[i];
					};
					this.length = e.length;
					this.context = context;
					return this;
				};

				//处理id
				if( ret[0] === 'id' ){

					//获取id
					var e = joker.getId( ret[1] );

					//如果e为undefined，文档不存在此id
					if( typeof e == undefined ){
						this.length = 0;
						this.context = context;
					};
					//如果ie为object，文档存在此id
					if( typeof e == 'object' ){
						this[0] = e;
						this.length = 1;
						this.context = context;
					};

					return this;
				};

				//处理tag
				if( ret[0] === 'tag' ){

					//获取tag
					var e = joker.getTag( ret[1] );

					for( var i = 0; i < e.length; i++ ){
						this[i] = e[i];
					};
					this.length = e.length;
					this.context = context;
					return this;
				};

				//如果不符合以上任何条件，设置实例的length属性值为0，直接返回
				this.length = 0;
				this.context = context;
				return this;

			} else {

				//如果不是字符串，设置实例的length属性值为0，直接返回
				this.length = 0;
				this.context = context;
				return this;
			};

		}
 		///...section
	};

	//跨域访问，使用joker原型对象覆盖init原型对象
	joker.fn.init.prototype = joker.fn;

	//定义joker扩展对象
	joker.extend = joker.fn.extend = function( destination, defaults, options ){

		if ( defaults ) {

			//if defaults , 开始合并操作
			for ( var i in defaults ) {
			    destination[i] = defaults[i];
			};
			for ( var i in options ) {
			    destination[i] = options[i];
			};
			//返回最终合并结果
			return destination;		
						
		} else {

			//if not defaults , 开始复制操作
			for ( var i in destination ){
				this[ i ] = destination[ i ]
			};
			//返回最终实例
			return this;				
		};
	};

	//利用已定义的扩展对象扩展自身,扩展核心对象
	joker.extend({

		//待开发二级选择器引擎
		find: function(){
			
		},

		//处理id
		getId: function( id ){
			//如果id存在，返回该对象
			if( document.getElementById( id ) ){
				return document.getElementById( id );
			};
		},

		//处理tag
		getTag: function( tag, context ){

			context = context || document;
			//如果tag存在，返回该对象数组
			if( context.getElementsByTagName( tag ) ){
				return context.getElementsByTagName( tag );
			};
		},

		//处理class
		getClass: function( selector, tag ) {

			var ret = [],
				tmp = [],
				tag = tag || '*';
			
			//判断是否支持原生getElementsByClassName
			//如果支持，使用原生js进行处理
			if ( document.getElementsByClassName ) {
				//获取这个集合
				tmp = document.getElementsByClassName( selector );
				//处理tag
				if ( tag == '*' ) {

					// 如果tag不存在, 直接返回
					return tmp;

				//处理tag
				} else {

					//如果tag存在, 处理为大写
					tag = tag.toUpperCase();
					//遍历selector数组
					for( var i = 0; i < selector.length; i++ ){
						
						//如果符合条件, 推进className数组
						selector[i].tagName != tag || ret.push( selector[i] );
					};
					//返回处理结果
					return ret;
				};

			//如果浏览器不支持原生getElementsByClassName
			//调用自定义选择器引擎进行处理
			} else {

				//获取所有tag集合
				var res = joker.getTag( tag );

				//遍历tag集合
				for( var i = 0; i < res.length; i++ ){

					//符合条件，推进ret数组
					if( res[i].className == selector ){
						
						ret.push( res[i] );

					//如果对象包含多个类，进行深度处理
					} else if( res[i].className.indexOf( selector ) >= 0 ){
						
						//以空格分割多个className
						tmp = res[i].className.split( ' ' );

						//遍历tmp数组
						for( var j = 0; j < tmp.length; j++ ){
							
							//符合条件，推进ret数组
							tmp[j] != selector || ret.push( res[i] );
						};
					};
				};

			};

			//返回最终处理结果
			return ret;
		},

		//定义joker.fn.css()获取样式的方法
		getCss: function( key ){

			//初始化value为数组
			var value = [];

			//遍历对象
			joker.each( this, function( value ){

				//兼容性处理，将内容放入到数组中
				if( ie ){

					//ie下获取样式
					value.push( eval( 'this.currentStyle.' + key ) ); 
				} else {
					
					//非ie下获取样式
					value.push( eval( 'document.defaultView.getComputedStyle( this, null ).' + key ) ); 
				};

			}, value);

			//返回数组
			return value;
		},

		//定义循环
		each: function( object, callback, args ){
			//遍历对象集合
			for( var i = 0; i < object.length; i++ ){
				//调用回调函数
				callback.call( object[i], args );
			};
			//返回处理后对象
			return object;
		},

 		//处理selector，返回其类型
		check: function( selector ){

			//定义一个简单的字符串处理方法，返回其索引
			var test = function( string ){
				return selector.indexOf( string );
			},
			//定义返回数组
			ret = new Array();

			//处理selector为class类
			if( test( '.' ) >= 0 ){ //alert(1)
				ret[0] = 'class';
				ret[1] = selector.split( '.' )[1];
				ret[2] = selector.split( '.' )[0];
				return ret;
			};

			//处理selector为id
			if( test( '#' ) >= 0 ){
				ret[0] = 'id';
				ret[1] = selector.split( '#' )[1];
				return ret;
			};

			//处理selector为tag
			if( document.getElementsByTagName( selector ).length > 0 ){
				ret[0] = 'tag';
				ret[1] = selector;
				return ret;
			};

			//不符合条件则返回undefined
			ret[0] = undefined;
			return ret;
		}
		//...section
	});

	joker.fn.extend({

		html: function( val ){

			//如果参数存在，将参数设置为对象的文本内容
			//处理参数为''的情况
			if( val || val == '' ){

				//循环赋值操作
				joker.each( this, function( val ){
					this.innerHTML = val;
				}, val );

				return this;

			} else {

				//如果参数不存在初始化为数组
				var val = new Array();

				//遍历对象
				joker.each( this, function( val ){
					//将内容放入到数组中
					val.push( this.innerHTML );
				}, val);

				//返回数组
				return val;
			};
		},

		val: function( val ){

			//如果参数存在，将参数设置为对象的文本内容
			//处理参数为''的情况
			if( val ||  val == '' ){

				//循环赋值操作
				joker.each( this, function( val ){
					this.value = val;
				}, val );

				return this;

			} else {

				//如果参数不存在初始化为数组
				var val = new Array();

				//遍历对象
				joker.each( this, function( val ){
					//将内容放入到数组中
					val.push( this.value );
				}, val);

				//返回数组
				return val;
			};
		},

		css: function( key, value ){

			//如果key为json对象
			if( typeof key == 'object' ){
				//遍历json
				joker.each( this, function( json ){
					//遍历json值对
					for( var i in json ){
						//循环赋值操作
						this.style[i] = json[i];
					};
				}, key );

			};
			//如果key为字符串
			if( typeof key == 'string' ){

				if( !value ){
					//如果value不存在调用joker.getCss方法获取样式
					//call joker.getCss
					return joker.getCss.call( this, key );
					
				} else {
					
					//如果value存在，定义json对象
					var json = {
						key: key,
						value: value
					};
					//循环赋值操作
					joker.each( this, function( json ){
						this.style[json.key] = json.value;
					}, json );

				};
			};
			return this;
		},
		
		prepend: function( id, tag ){
			
			var tag = tag || 'div',
				dom = document.createElement( tag );
			
			dom.id = id.replace( '#', '' );
			
			joker.each( this,function( dom ){
				
				var first = this.firstChild;
				
				//e.log( first.id )
			
				this.insertBefore( dom, first );
				
			}, dom);

			//插入容器
			//this.insertBefore( dom, first );
		},

		//未完成版本，有待完善
		find: function( selector ){
			
			var ret = joker.getTag( selector, this );

			//joker.log(ret[0].tagName)
			for(var i=0; i<ret.length; i++){
				this[i]=ret[i];
			}

			this.length = ret.length;
			return this;
		}
		//...section
	});

	//扩展工具对象
	joker.extend({

		//定义调试工具输出方法，用于取代alert方法
		log: function( val, id ){

			//定义清除操作
			if( val == 'cls' ){
				return joker( '#jokerDebugLog' ).html('');
			};

			//判断是否存在自定义容器，如果未定义使用默认定义
			//自定义容器标识必须为id
			var id = joker.logid = id || '#jokerDebugLog',

			//获取容器个数
			len = joker( id ).length,

			//改造要输出的参数
			val = val + '<br />';

			//如果容器不存在
			if ( !len > 0 ){

				//创建容器
				var log = document.createElement( 'div' ),
				//获取body下第一个子节点
				first = document.body.firstChild;
				//给容器赋予id
				log.id = id.replace( '#', '' );

				//插入容器
				document.body.insertBefore( log, first );

				//获得容器joker对象
				var con = joker( id );
				//设定容器样式
				!id == '#jokerDebugLog' || con.css({ position:'fixed', top:'0', left:'0', margin:'10px', zIndex:10000 });
				//给容器赋值
				con.html( val );
				return this;

			} else {

				//如果容器已存在，获得容器joker对象
				var con = joker( id ),
				//获取当前容器内容
				text = con.html();
				//插入新内容并置顶
				con.html( val + text );
				return this;
			};
		},

		//网址参数处理方法
		cross: function( callback ){
			
			//获取全部参数
			var loca = [], argu = [];
			
			loca = window.location.href.split( '?' );
			//分割参数
			//e.log( loca[1] == undefined )//true
			//e.log( typeof loca[1] )//string
			if( loca[1] == undefined ){
				
				return;
			};
			
			loca[1] == undefined ? 
			argu : 
			loca[1].indexOf( '&' ) >= 0 ? 
			argu = loca[1].split( '&' ) : 
			argu[0] = loca[1];
			//loca[1] != undefined ? loca[1].indexOf( '&' ) >= 0 ? argu = loca[1].split( '&' ) : argu[0] = loca[1] : argu;
			//if( loca[1].indexOf( '&' ) >= 0 ){ argu = loca[1].split( '&' ) };
			
			callback.call( this, argu );
		},

		url: function( url, target ){
			
			//处理target
			!target ? 
			//未指定则当前窗口打开
			location.href = url:
			//符合条件则新窗口打开
			target == '_new' || target == '_blank' ? window.open( url ) : location.href = url ;
		},

		get: function( url, container ){

			var obj = container || '#ajaxContainer',
			
				ran = joker.random();
			
			jQuery( obj ).load( url + '?t=' + ran );
		},

		//get random
		random: function( num ){

			//获取随机数倍数
			var x = num || 100;
			return Math.round( Math.random() * x );

		},
		
		show: function( hand, content, driver, className ){
			
			if( !jQuery ){ return };
			
			var d1 = driver.driver1,
				d2 = driver.driver2,
				on = className || 'on';
			
			jQuery( hand ).on( d1, function(){
				
				jQuery( this ).addClass( on ).find( content ).show();
				
			}).on( d2, function(){
				
				jQuery( this ).removeClass( on ).find( content ).hide();
			});
			
		},
		
		//最大单位为天、最小单位为秒的倒计时算法
		//参数time格式为：2013/01/13 20:00:00
		lastTime: function( time, Time ){
			
			//get now time, and set a new time;
			var now = Time || new Date(), future = new Date( time );
			//you know this.
			var sp = new Array( 86400000, 3600000, 60000, 1000 );
			//get the time.
			var tmp = future.getTime() - now.getTime();
			//get day.
			var day = Math.floor( tmp / sp[0] ),
				//get hours
				_hou = tmp % sp[0],
				hour = Math.floor( _hou / sp[1] ),
				//get minutes
				_min = _hou % sp[1],
				minu = Math.floor( _min / sp[2] ),
				//get second
				_sec = _min % sp[2],
				seco = Math.floor( _sec / sp[3] );
				
			var newTime =  [ day, hour, minu, seco ];
			
			for( var i = 0; i < newTime.length; i++ ){
				
				newTime[i] < 0 ? newTime[i] = 0 : newTime[i];
				newTime[i] < 10 ? newTime[i] = '0' + newTime[i] : newTime[i];
			};
			
			return newTime;
						 
		},
		
		updateIco: function( object, posx, offset, height ){
	
			var obj = jQuery( object ),
			
				posx = posx + 'px' || 0;
				//get offset height
				h = -height || - obj.height(),
				//get size
				l = obj.length;
	
			for( var i = 0; i < l; i++ ){
				//return the posy
				var temp = i * h + offset + 'px';
				//reset background-position
				obj.eq( i ).css( 'backgroundPosition', posx + ' ' + temp );
			};
		},
		
		placeSupport: function(){
			
			return 'placeholder' in document.createElement( 'input' );
		},
		
		placeholder : function( signClass ){
				var arr = [],
					input = document.getElementsByTagName( 'input' );
					
				for( var i=0; i<input.length; i++ ){
					if( input[i].className.indexOf( signClass ) >= 0 &&
						input[i].getAttribute( 'placeholder' ) &&
						input[i].type != 'password' ){
							arr.push( input[i] );
						};
				};
				
				for( var i=0; i<arr.length; i++ ){
					arr[i].style.color = '#A9A9A9';
					arr[i].value = arr[i].getAttribute( 'placeholder' );
					arr[i].onfocus = function(){
						if( this.value == '' || this.value == this.getAttribute( 'placeholder' ) ){
							this.value = '';
							this.style.color = '#000';
						};
					};
					arr[i].onblur = function(){
					
						if( this.value == '' ){
							this.style.color = '#A9A9A9';
							this.value = this.getAttribute( 'placeholder' );
						};
					};
				};
			},
		
		insertSpace: function( arr ){
			
			//we need a new array.
			var ret = [];
			
			if( typeof arr === 'object' ){
			
				for( var i = 0; i < arr.length; i++ ){
					//join by space
					ret.push( arr[i].toString().split('').join(' ') );
				};
				
			} else {
				
				ret.push( arr.toString().split('').join(' ') );
			}
			
			return ret;
		},
		
		msg: function( msg, id ){
			
			var tag = document.createElement( 'div' );
			
			id?
			tag.id = id.replace( '#', '' ):
			tag.id = 'jokerUserMsgs';
			
			var con = joker( '#' + tag.id );
			
			con.length > 0 || document.body.appendChild( tag );
			
			con.html( msg );
		},
		
		tmp: function(){
			
			joker.log( '这是joker的临时方法扩展接口，你可以这样进行临时扩展：joker.tmp.someFn = function(){ some code do sth.. }' );
		},
		
		//动态版权时间
		nowYear: function( year ){
			
			var now=new Date(),
				year = year || 2012;
			
			now.getFullYear()?
			document.write( now.getFullYear() ):
			document.write( year );			
		},
		
		connect: function(){
			
			var arr = [];
			
			for( var i=0; i<arguments.length; i++ ){
				
				arr[i] = arguments[i];
			};
			
			return arr.join('');
		}
		
		
		
		//...

	});
	
	joker.ue = {
		
		number: function( str ){
			
			var arr = [];
			
			typeof str == 'string' ? str : str = String( str );
			
			arr = str.split('');

			arr[2] = joker.connect( arr[2], '-' );
			arr[6] = joker.connect( arr[6], '-' );
			
			str = arr.join('');
			//e.log(str);
			return str;
		}
	};




	//原生javascript自定义扩展
	Array.prototype.index = function( el ) {

		var i = 0;
		
		for ( var i = 0, len = this.length; i < len; i++ ) {

			if ( el == this[i]) {

				return i;
			}
		}
		
		return -1;
	};





	//定义别名
	window.joker = window.e = joker;
})( window );



