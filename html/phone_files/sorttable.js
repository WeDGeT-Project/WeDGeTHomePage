var TINY={};
function TjQuery(i){return document.getElementById(i)}
function T$jQuery(e,p){return p.getElementsByTagName(e)}
TINY.table=function(){
	function sorter(n){this.n=n}
	sorter.prototype.init=function(dd,e,f){
		var t=ge(e), i=0; this.e=e; this.l=t.r.length; t.a=[];
		t.h=T$jQuery('thead',TjQuery(dd))[0].rows[0]; t.w=t.h.cells.length;
		for(i;i<t.w;i++){
			var c=t.h.cells[i];
			if(c.className==''||'charsort timelongsort commsort'.indexOf(c.className)<0)c.className='commsort';
			if(c.className!='nosort'){c.onclick=new Function(this.n+'.wk(this.cellIndex,"'+c.className+'")');}
			c.className=this.head;
		}
		for(i=0;i<this.l;i++){t.a[i]={}}
		if(f!=null){t.h.cells[f].onclick()}
	};
	sorter.prototype.wk=function(y,ct){
		var t=ge(this.e), x=t.h.cells[y], i=0;
		for(i;i<this.l;i++){
		    var display = t.r[i].style.display;
			t.a[i].o=i; var v=t.r[i].cells[y]; t.r[i].style.display=display;
			while(v.hasChildNodes()){v=v.firstChild}
			t.a[i].v=v.nodeValue?v.nodeValue:''
		}
		for(i=0;i<t.w;i++){
			var c=t.h.cells[i]; 
			if(c.className!='nosort'){
			  c.className=this.head
			}
		}
		if(t.p==y){
		    t.a.reverse(); x.className=t.d?this.asc:this.desc; t.d=t.d?0:1
		}else{
		    t.p=y; t.a.sort(eval(ct));t.d=0; x.className=this.asc
	    }
		var n=document.createElement('tbody');
		for(i=0;i<this.l;i++){
			var r=t.r[t.a[i].o].cloneNode(true); n.appendChild(r);
		}
		t.replaceChild(n,t.b)
	};
	function ge(e){var t=TjQuery(e); t.b=T$jQuery('tbody',t)[0]; t.r=t.b.rows; return t};
	function charsort(f,c){
		var g,h; f=g=f.v.toLowerCase(), c=h=c.v.toLowerCase();
		return g>h?1:(g<h?-1:0);
	};
	function timelongsort(f,c){
		var g,h,ff,cc,fff,ccc,ffff,cccc;
		
	    f=g=f.v.toLowerCase(), c=h=c.v.toLowerCase();
	    
	    ffff = f.replace('小时','60');cccc = c.replace('小时','60');
		ff = ffff.replace('分','60');cc = cccc.replace('分','60');	
		fff = ff.replace('秒','');ccc = cc.replace('秒','');

		if(fff.match(/^-?[$]?[\d,.]+%?$/)){
			var i=parseFloat(fff), n=parseFloat(ccc);
			if(!isNaN(i)&&!isNaN(n)){g=i,h=n}
		}
		return g>h?1:(g<h?-1:0);
	};
	function commsort(f,c){
		var g,h; f=g=f.v.toLowerCase(), c=h=c.v.toLowerCase();
		f = jQuery.trim(f.replace(/(\$|\,)/g,'')); c = jQuery.trim(c.replace(/(\$|\,)/g,''));
		if(f.match(/^-?[$]?[\d,.]+%?$/)){
			var i=parseFloat(f), n=parseFloat(c);
			if(!isNaN(i)&&!isNaN(n)){g=i,h=n}
		}
		return g>h?1:(g<h?-1:0);
	};
	return{sorter:sorter}
}();