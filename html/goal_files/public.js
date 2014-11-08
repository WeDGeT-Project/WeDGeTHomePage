// JavaScript Document

function SwitchMenu(obj,ckid,bh){
	if(document.getElementById){
	var el = document.getElementById(obj);
	var ar = document.getElementById("masterdiv").getElementsByTagName("tr"); //DynamicDrive.com change
			for (var i=0; i<ar.length; i++){
				ar[i].className= "";
		}
					el.className= "over";
}
	}
	
function SeeSetBg(obj){
	obj.style.backgroundColor = '#C8D6FF';
}

function SeeReBg(obj){
	var objChildCheck = document.all ? obj.children[0].children[0] : obj.childNodes[1].childNodes[1];
	if(objChildCheck.checked){
		return false;
	}
	obj.style.backgroundColor = '';
}
