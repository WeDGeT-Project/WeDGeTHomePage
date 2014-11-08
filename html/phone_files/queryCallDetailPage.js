var sorter;
var pageSize = 50; 
var Query_YH102010006={
       //跨域回调处理数据函数
		executeQuery:function(urlparam){
			var url=QUERYURL+"/callDetail/execute";
			radomT="?_="+(new Date()).getTime();
			jQuery.ajax({ url:url+urlparam+radomT, type:"POST", dataType:"html",
				beforeSend:function(){
					QueryMain.loadModal();
				},
				success:function(data){
					if(data.indexOf('rspCode')>0){
						eval(data);
					}else{
			    		QueryMain.closeModal();
						jQuery("#body").html(data);
		    			if(data.indexOf("callDetailHead") >=0){
		    				sort("callDetailHead","callDetailBody");
		    			}
					}
				}
			});
		},
		//跨域回调处理数据函数
		processData:function(data){
			Query_YH102010006.queryCallDetail(data);
		},
		chageMaxValue:function (pageMaxSize){
		   pageSize=pageMaxSize;
	       Query_YH102010006.executeQuery("/YH102010006/Query_YH102010006.processData/QueryYH102010006_Data/true/1/"+pageMaxSize);
	   },
		paging:function (currentPage){
		   jQuery("#currentPage1").html(currentPage);
	       jQuery("#currentPage2").html(currentPage); 
	       Query_YH102010006.executeQuery("/YH102010006/Query_YH102010006.processData/QueryYH102010006_Data/true/"+currentPage+"/"+pageSize);
	   },
	   goPage: function (operate,location){
  	    var pages = parseFloat(jQuery.trim(jQuery("#totalPage1").html()));
  	    var currentPage =  parseFloat(jQuery.trim(jQuery("#currentPage1").html()));
  	   	 if(operate == "after"){
  	   	    if(currentPage < pages){
  	   	    	currentPage = new Number(currentPage) + 1;
   	   	 		Query_YH102010006.paging(currentPage);
  	   	 	}else if(currentPage == pages){
  	           alert("已经是最后页！");return pages;
  	       }
  	   	 }
  	   	 if(operate == "before"){
  	   	    if(currentPage > 1){
  	   	        currentPage = new Number(currentPage) - 1;
   	   	 		Query_YH102010006.paging(currentPage);
  	   	 	}else if(currentPage == 1){
  	   	 		alert("已经是第一页！");return;
  	   	 	}
  	   	 }
  	   	 if(operate == "first"){
  	   	    if(currentPage == 1){
  	   	      alert("已经是第一页！");return;
  	   	    }else{
  	   	 	  currentPage = 1;
   	   	 	 Query_YH102010006.paging(currentPage);
   	   	 	}
  	   	 }
  	   	 if(operate == "last"){
  	   	    if(currentPage == pages){
  	   	      alert("已经是最后页！");
  	   	      return;
  	   	    }else{
  	   	 	  currentPage = pages;
   	   	 	  Query_YH102010006.paging(currentPage);
   	   	 	}
  	   	 }
  	   	 if(operate == "input"){
  	   	 		var inputNum;
  	   	        if(location == "top"){
  	   	          inputNum = jQuery("#inputNum1").val();
  	   	        }else if(location == "bottom"){
  	   	          inputNum = jQuery("#inputNum2").val();
  	   	        }else {
  	   	          alert("数据异常！");
  	   	        }
  	   	 		 
  	   	 		//页码为空的处理
  	   	 		if(inputNum == ""){
  	   	 			alert("请先输入要跳转的页码");
  	   	 			if(location == "top"){
	  	   	          jQuery("#inputNum1").select();
	   	   	 		  jQuery("#inputNum1").focus();
	  	   	        }else if(location == "bottom"){
	  	   	          jQuery("#inputNum2").select();
	   	   	 		  jQuery("#inputNum2").focus();
	  	   	        }else {
	  	   	          alert("数据异常！");
	  	   	        }
  	   	 			return;
  	   	 		}
  	   	 		if(inputNum == "0"){
  	   	 			alert("输入的页码非法，请重新输入");
  	   	 			if(location == "top"){
	  	   	          jQuery("#inputNum1").select();
	   	   	 		  jQuery("#inputNum1").focus();
	  	   	        }else if(location == "bottom"){
	  	   	          jQuery("#inputNum2").select();
	   	   	 		  jQuery("#inputNum2").focus();
	  	   	        }else {
	  	   	          alert("数据异常！");
	  	   	        }
  	   	 			return;
  	   	 		}
  	   	 		//输入的页码不全是数字的处理
  	   	 		if(isNaN(inputNum)){
  	   	 			alert("输入的页码非法，请重新输入");
  	   	 			if(location == "top"){
	  	   	          jQuery("#inputNum1").select();
	   	   	 		  jQuery("#inputNum1").focus();
	  	   	        }else if(location == "bottom"){
	  	   	          jQuery("#inputNum2").select();
	   	   	 		  jQuery("#inputNum2").focus();
	  	   	        }else {
	  	   	          alert("数据异常！");
	  	   	        }
  	   	 			return;
  	   	 		}
  	   	 		//输入的页码大于最大值的处理
  	   	    if(parseFloat(inputNum) <= parseFloat(pages)){
   	   	 		currentPage = inputNum;
	   	   	 	Query_YH102010006.paging(currentPage);
	   	   	 	jQuery("#inputNum1").val(inputNum);
   	        	jQuery("#inputNum2").val(inputNum);
   	   	 	}else{
   	   	 		alert("输入的页码数超出范围！请重新输入");
   	   	 		if(location == "top"){
  	   	          jQuery("#inputNum1").select();
   	   	 		  jQuery("#inputNum1").focus();
  	   	        }else if(location == "bottom"){
  	   	          jQuery("#inputNum2").select();
   	   	 		  jQuery("#inputNum2").focus();
  	   	        }else {
  	   	          alert("数据异常！");
  	   	        }
   	   	 		
   	   	 	}		   	   	 	
  	   	 }
  	   }
};
  jQuery(document).ready(function(){
    Query_YH102010006.executeQuery("/YH102010006/Query_YH102010006.processData/QueryYH102010006_Data/true/1/"+pageSize);
  });
