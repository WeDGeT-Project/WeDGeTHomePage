/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("attribute-base",function(c){c.State=function(){this.data={};};c.State.prototype={add:function(B,C,E){var D=this.data;D[C]=D[C]||{};D[C][B]=E;},addAll:function(B,D){var C;for(C in D){if(D.hasOwnProperty(C)){this.add(B,C,D[C]);}}},remove:function(B,C){var D=this.data;if(D[C]&&(B in D[C])){delete D[C][B];}},removeAll:function(B,D){var C=this.data;c.each(D||C,function(F,E){if(c.Lang.isString(E)){this.remove(B,E);}else{this.remove(B,F);}},this);},get:function(B,C){var D=this.data;return(D[C]&&B in D[C])?D[C][B]:undefined;},getAll:function(B){var D=this.data,C;c.each(D,function(F,E){if(B in D[E]){C=C||{};C[E]=F[B];}},this);return C;}};var k=c.Object,f=c.Lang,l=c.EventTarget,w=".",t="Change",n="getter",m="setter",o="readOnly",x="writeOnce",u="initOnly",A="validator",h="value",p="valueFn",e="broadcast",r="lazyAdd",j="_bypassProxy",z="added",b="initializing",i="initValue",v="published",s="defaultValue",a="lazy",q="isLazyAdd",g,y={};y[o]=1;y[x]=1;y[n]=1;y[e]=1;function d(C,B,D){var E=this;E._ATTR_E_FACADE={};l.call(E,{emitFacade:true});E._conf=E._state=new c.State();E._stateProxy=E._stateProxy||null;E._requireAddAttr=E._requireAddAttr||false;this._initAttrs(C,B,D);}d.INVALID_VALUE={};g=d.INVALID_VALUE;d._ATTR_CFG=[m,n,A,h,p,x,o,r,e,j];d.prototype={addAttr:function(C,B,E){var F=this,H=F._state,G,D;E=(r in B)?B[r]:E;if(E&&!F.attrAdded(C)){H.add(C,a,B||{});H.add(C,z,true);}else{if(!F.attrAdded(C)||H.get(C,q)){B=B||{};D=(h in B);if(D){G=B.value;delete B.value;}B.added=true;B.initializing=true;H.addAll(C,B);if(D){F.set(C,G);}H.remove(C,b);}}return F;},attrAdded:function(B){return !!this._state.get(B,z);},modifyAttr:function(C,B){var D=this,F,E;if(D.attrAdded(C)){if(D._isLazyAttr(C)){D._addLazyAttr(C);}E=D._state;for(F in B){if(y[F]&&B.hasOwnProperty(F)){E.add(C,F,B[F]);if(F===e){E.remove(C,v);}}}}},removeAttr:function(B){this._state.removeAll(B);},get:function(B){return this._getAttr(B);},_isLazyAttr:function(B){return this._state.get(B,a);},_addLazyAttr:function(C){var D=this._state,B=D.get(C,a);D.add(C,q,true);D.remove(C,a);this.addAttr(C,B);},set:function(B,D,C){return this._setAttr(B,D,C);},reset:function(B){var D=this,C;if(B){if(D._isLazyAttr(B)){D._addLazyAttr(B);}D.set(B,D._state.get(B,i));}else{C=D._state.data.added;c.each(C,function(E,F){D.reset(F);},D);}return D;},_set:function(B,D,C){return this._setAttr(B,D,C,true);},_getAttr:function(D){var E=this,I=D,F=E._state,G,B,H,C;if(D.indexOf(w)!==-1){G=D.split(w);D=G.shift();}if(E._tCfgs&&E._tCfgs[D]){C={};C[D]=E._tCfgs[D];delete E._tCfgs[D];E._addAttrs(C,E._tVals);}if(E._isLazyAttr(D)){E._addLazyAttr(D);}H=E._getStateVal(D);B=F.get(D,n);if(B&&!B.call){B=this[B];}H=(B)?B.call(E,H,I):H;H=(G)?k.getValue(H,G):H;return H;},_setAttr:function(D,G,B,E){var K=true,C=this._state,H=this._stateProxy,M=C.data,J,N,O,F,I,L;if(D.indexOf(w)!==-1){N=D;O=D.split(w);D=O.shift();}if(this._isLazyAttr(D)){this._addLazyAttr(D);}J=(!M.value||!(D in M.value));if(H&&D in H&&!this._state.get(D,j)){J=false;}if(this._requireAddAttr&&!this.attrAdded(D)){}else{I=C.get(D,x);L=C.get(D,b);if(!J&&!E){if(I){K=false;}if(C.get(D,o)){K=false;}}if(!L&&!E&&I===u){K=false;}if(K){if(!J){F=this.get(D);}if(O){G=k.setValue(c.clone(F),O,G);if(G===undefined){K=false;}}if(K){if(L){this._setAttrVal(D,N,F,G);}else{this._fireAttrChange(D,N,F,G,B);}}}}return this;},_fireAttrChange:function(H,G,E,D,B){var J=this,F=H+t,C=J._state,I;if(!C.get(H,v)){J.publish(F,{queuable:false,defaultTargetOnly:true,defaultFn:J._defAttrChangeFn,silent:true,broadcast:C.get(H,e)});C.add(H,v,true);}I=(B)?c.merge(B):J._ATTR_E_FACADE;I.attrName=H;I.subAttrName=G;I.prevVal=E;I.newVal=D;J.fire(F,I);},_defAttrChangeFn:function(B){if(!this._setAttrVal(B.attrName,B.subAttrName,B.prevVal,B.newVal)){B.stopImmediatePropagation();}else{B.newVal=this.get(B.attrName);}},_getStateVal:function(B){var C=this._stateProxy;return C&&(B in C)&&!this._state.get(B,j)?C[B]:this._state.get(B,h);},_setStateVal:function(B,D){var C=this._stateProxy;if(C&&(B in C)&&!this._state.get(B,j)){C[B]=D;}else{this._state.add(B,h,D);}},_setAttrVal:function(M,L,I,G){var O=this,J=true,D=O._state,E=D.get(M,A),H=D.get(M,m),K=D.get(M,b),N=this._getStateVal(M),C=L||M,F,B;if(E){if(!E.call){E=this[E];}if(E){B=E.call(O,G,C);if(!B&&K){G=D.get(M,s);B=true;}}}if(!E||B){if(H){if(!H.call){H=this[H];}if(H){F=H.call(O,G,C);if(F===g){J=false;}else{if(F!==undefined){G=F;}}}}if(J){if(!L&&(G===N)&&!f.isObject(G)){J=false;}else{if(D.get(M,i)===undefined){D.add(M,i,G);}O._setStateVal(M,G);}}}else{J=false;}return J;},setAttrs:function(B,C){return this._setAttrs(B,C);},_setAttrs:function(C,D){for(var B in C){if(C.hasOwnProperty(B)){this.set(B,C[B]);}}return this;},getAttrs:function(B){return this._getAttrs(B);},_getAttrs:function(E){var G=this,I={},F,C,B,H,D=(E===true);E=(E&&!D)?E:k.keys(G._state.data.added);for(F=0,C=E.length;F<C;F++){B=E[F];H=G.get(B);if(!D||G._getStateVal(B)!=G._state.get(B,i)){I[B]=G.get(B);}}return I;},addAttrs:function(B,C,D){var E=this;if(B){E._tCfgs=B;E._tVals=E._normAttrVals(C);E._addAttrs(B,E._tVals,D);E._tCfgs=E._tVals=null;}return E;},_addAttrs:function(C,D,E){var G=this,B,F,H;for(B in C){if(C.hasOwnProperty(B)){F=C[B];F.defaultValue=F.value;H=G._getAttrInitVal(B,F,G._tVals);if(H!==undefined){F.value=H;}if(G._tCfgs[B]){delete G._tCfgs[B];}G.addAttr(B,F,E);}}},_protectAttrs:function(C){if(C){C=c.merge(C);for(var B in C){if(C.hasOwnProperty(B)){C[B]=c.merge(C[B]);}}}return C;},_normAttrVals:function(B){return(B)?c.merge(B):null;},_getAttrInitVal:function(B,C,E){var F,D;if(!C[o]&&E&&E.hasOwnProperty(B)){F=E[B];}else{F=C[h];D=C[p];if(D){if(!D.call){D=this[D];}if(D){F=D.call(this);}}}return F;},_getAttrCfg:function(B){var D,C=this._state.data;if(C){D={};c.each(C,function(E,F){if(B){if(B in E){D[F]=E[B];}}else{c.each(E,function(H,G){D[G]=D[G]||{};D[G][F]=H;});}});}return D;},_initAttrs:function(C,B,E){C=C||this.constructor.ATTRS;var D=c.Base;if(C&&!(D&&c.instanceOf(this,D))){this.addAttrs(this._protectAttrs(C),B,E);}}};c.mix(d,l,false,null,1);c.Attribute=d;
},"3.4.1",{requires:["event-custom"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-base",function(d){var g=d.Object,h=d.Lang,o=".",q="destroy",b="init",r="initialized",m="destroyed",n="initializer",j="bubbleTargets",e="_bubbleTargets",a=Object.prototype.constructor,c="deep",p="shallow",k="destructor",f=d.Attribute,l=function(v,u,t){var w;for(w in u){if(t[w]){v[w]=u[w];}}return v;};function i(){d.stamp(this);f.call(this);var s=d.Plugin&&d.Plugin.Host;if(this._initPlugins&&s){s.call(this);}if(this._lazyAddAttrs!==false){this._lazyAddAttrs=true;}this.name=this.constructor.NAME;this._eventPrefix=this.constructor.EVENT_PREFIX||this.constructor.NAME;this.init.apply(this,arguments);}i._ATTR_CFG=f._ATTR_CFG.concat("cloneDefaultValue");i._ATTR_CFG_HASH=d.Array.hash(i._ATTR_CFG);i.NAME="base";i.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};i.prototype={init:function(s){this._yuievt.config.prefix=this._eventPrefix;this.publish(b,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defInitFn});this._preInitEventCfg(s);this.fire(b,{cfg:s});return this;},_preInitEventCfg:function(t){if(t){if(t.on){this.on(t.on);}if(t.after){this.after(t.after);}}var u,s,w,v=(t&&j in t);if(v||e in this){w=v?(t&&t.bubbleTargets):this._bubbleTargets;if(h.isArray(w)){for(u=0,s=w.length;u<s;u++){this.addTarget(w[u]);}}else{if(w){this.addTarget(w);}}}},destroy:function(){this.publish(q,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defDestroyFn});this.fire(q);this.detachAll();return this;},_defInitFn:function(s){this._initHierarchy(s.cfg);if(this._initPlugins){this._initPlugins(s.cfg);}this._set(r,true);},_defDestroyFn:function(s){if(this._destroyPlugins){this._destroyPlugins();}this._destroyHierarchy();this._set(m,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(w,t){var u=null,s,v=w.ATTRS;if(v){for(s in v){if(t[s]){u=u||{};u[s]=t[s];t[s]=null;}}}return u;},_initHierarchyData:function(){var u=this.constructor,t=[],s=[];while(u){t[t.length]=u;if(u.ATTRS){s[s.length]=u.ATTRS;}u=u.superclass?u.superclass.constructor:null;}this._classes=t;this._attrs=this._aggregateAttrs(s);},_aggregateAttrs:function(z){var v,A,u,s,B,t,y,x=i._ATTR_CFG_HASH,w={};if(z){for(t=z.length-1;t>=0;--t){A=z[t];for(v in A){if(A.hasOwnProperty(v)){u=l({},A[v],x);s=u.value;y=u.cloneDefaultValue;if(s){if((y===undefined&&(a===s.constructor||h.isArray(s)))||y===c||y===true){u.value=d.clone(s);}else{if(y===p){u.value=d.merge(s);}}}B=null;if(v.indexOf(o)!==-1){B=v.split(o);v=B.shift();}if(B&&w[v]&&w[v].value){g.setValue(w[v].value,B,s);}else{if(!B){if(!w[v]){w[v]=u;}else{l(w[v],u,x);}}}}}}}return w;},_initHierarchy:function(y){var u=this._lazyAddAttrs,z,A,C,w,t,B,x,v=this._getClasses(),s=this._getAttrCfgs();for(C=v.length-1;C>=0;C--){z=v[C];A=z.prototype;x=z._yuibuild&&z._yuibuild.exts;if(x){for(w=0,t=x.length;w<t;w++){x[w].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(z,s),y,u);if(A.hasOwnProperty(n)){A.initializer.apply(this,arguments);}if(x){for(w=0;w<t;w++){B=x[w].prototype;if(B.hasOwnProperty(n)){B.initializer.apply(this,arguments);}}}}},_destroyHierarchy:function(){var w,x,A,y,u,s,v,z,t=this._getClasses();for(A=0,y=t.length;A<y;A++){w=t[A];x=w.prototype;v=w._yuibuild&&w._yuibuild.exts;if(v){for(u=0,s=v.length;u<s;u++){z=v[u].prototype;if(z.hasOwnProperty(k)){z.destructor.apply(this,arguments);}}}if(x.hasOwnProperty(k)){x.destructor.apply(this,arguments);}}},toString:function(){return this.name+"["+d.stamp(this,true)+"]";}};d.mix(i,f,false,null,1);i.prototype.constructor=i;d.Base=i;},"3.4.1",{requires:["attribute-base"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-pluginhost",function(c){var a=c.Base,b=c.Plugin.Host;c.mix(a,b,false,null,1);a.plug=b.plug;a.unplug=b.unplug;},"3.4.1",{requires:["base-base","pluginhost"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("base-build",function(f){var c=f.Base,a=f.Lang,b="initializer",d="destructor",e;c._build=function(B,p,z,s,t,o){var u=c._build,x=u._ctor(p,o),q=u._cfg(p,o),h=u._mixCust,m=q.aggregates,g=q.custom,k=x._yuibuild.dynamic,w,v,A,j,n,y,r;if(k&&m){for(w=0,v=m.length;w<v;++w){A=m[w];if(p.hasOwnProperty(A)){x[A]=a.isArray(p[A])?[]:{};}}}for(w=0,v=z.length;w<v;w++){j=z[w];n=j.prototype;y=n[b];r=n[d];delete n[b];delete n[d];f.mix(x,j,true,null,1);h(x,j,m,g);if(y){n[b]=y;}if(r){n[d]=r;}x._yuibuild.exts.push(j);}if(s){f.mix(x.prototype,s,true);}if(t){f.mix(x,u._clean(t,m,g),true);h(x,t,m,g);}x.prototype.hasImpl=u._impl;if(k){x.NAME=B;x.prototype.constructor=x;}return x;};e=c._build;f.mix(e,{_mixCust:function(i,h,l,k){if(l){f.aggregate(i,h,true,l);}if(k){for(var g in k){if(k.hasOwnProperty(g)){k[g](g,i,h);}}}},_tmpl:function(g){function h(){h.superclass.constructor.apply(this,arguments);}f.extend(h,g);return h;},_impl:function(m){var p=this._getClasses(),o,h,g,n,q,k;for(o=0,h=p.length;o<h;o++){g=p[o];if(g._yuibuild){n=g._yuibuild.exts;q=n.length;for(k=0;k<q;k++){if(n[k]===m){return true;}}}}return false;},_ctor:function(g,h){var j=(h&&false===h.dynamic)?false:true,k=(j)?e._tmpl(g):g,i=k._yuibuild;if(!i){i=k._yuibuild={};}i.id=i.id||null;i.exts=i.exts||[];i.dynamic=j;return k;},_cfg:function(g,h){var i=[],l={},k,j=(h&&h.aggregates),n=(h&&h.custom),m=g;while(m&&m.prototype){k=m._buildCfg;if(k){if(k.aggregates){i=i.concat(k.aggregates);}if(k.custom){f.mix(l,k.custom,true);}}m=m.superclass?m.superclass.constructor:null;}if(j){i=i.concat(j);}if(n){f.mix(l,h.cfgBuild,true);}return{aggregates:i,custom:l};},_clean:function(o,n,j){var m,h,g,k=f.merge(o);for(m in j){if(k.hasOwnProperty(m)){delete k[m];}}for(h=0,g=n.length;h<g;h++){m=n[h];if(k.hasOwnProperty(m)){delete k[m];}}return k;}});c.build=function(i,g,j,h){return e(i,g,j,null,null,h);};c.create=function(g,j,i,h,k){return e(g,j,i,h,k);};c.mix=function(g,h){return e(null,g,h,null,null,{dynamic:false});};c._buildCfg={custom:{ATTRS:function(l,j,h){j.ATTRS=j.ATTRS||{};if(h.ATTRS){var i=h.ATTRS,k=j.ATTRS,g;for(g in i){if(i.hasOwnProperty(g)){k[g]=k[g]||{};f.mix(k[g],i[g],true);}}}}},aggregates:["_PLUG","_UNPLUG"]};},"3.4.1",{requires:["base-base"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-synthetic",function(b){var j=b.Env.evt.dom_map,d=b.Array,i=b.Lang,l=i.isObject,c=i.isString,e=i.isArray,g=b.Selector.query,k=function(){};function h(n,m){this.handle=n;this.emitFacade=m;}h.prototype.fire=function(s){var t=d(arguments,0,true),q=this.handle,o=q.evt,m=q.sub,p=m.context,u=m.filter,n=s||{},r;if(this.emitFacade){if(!s||!s.preventDefault){n=o._getFacade();if(l(s)&&!s.preventDefault){b.mix(n,s,true);t[0]=n;}else{t.unshift(n);}}n.type=o.type;n.details=t.slice();if(u){n.container=o.host;}}else{if(u&&l(s)&&s.currentTarget){t.shift();}}m.context=p||n.currentTarget||o.host;r=o.fire.apply(o,t);m.context=p;return r;};function f(o,n,m){this.handles=[];this.el=o;this.key=m;this.domkey=n;}f.prototype={constructor:f,type:"_synth",fn:k,capture:false,register:function(m){m.evt.registry=this;this.handles.push(m);},unregister:function(p){var o=this.handles,n=j[this.domkey],m;for(m=o.length-1;m>=0;--m){if(o[m].sub===p){o.splice(m,1);break;}}if(!o.length){delete n[this.key];if(!b.Object.size(n)){delete j[this.domkey];}}},detachAll:function(){var n=this.handles,m=n.length;while(--m>=0){n[m].detach();}}};function a(){this._init.apply(this,arguments);}b.mix(a,{Notifier:h,SynthRegistry:f,getRegistry:function(s,r,p){var q=s._node,o=b.stamp(q),n="event:"+o+r+"_synth",m=j[o];if(p){if(!m){m=j[o]={};}if(!m[n]){m[n]=new f(q,o,n);}}return(m&&m[n])||null;},_deleteSub:function(n){if(n&&n.fn){var m=this.eventDef,o=(n.filter)?"detachDelegate":"detach";this.subscribers={};this.subCount=0;m[o](n.node,n,this.notifier,n.filter);this.registry.unregister(n);delete n.fn;delete n.node;delete n.context;}},prototype:{constructor:a,_init:function(){var m=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in m)?m.emitFacade:true;m.emitFacade=false;},processArgs:k,on:k,detach:k,delegate:k,detachDelegate:k,_on:function(s,t){var u=[],o=s.slice(),p=this.processArgs(s,t),q=s[2],m=t?"delegate":"on",n,r;n=(c(q))?g(q):d(q||b.one(b.config.win));if(!n.length&&c(q)){r=b.on("available",function(){b.mix(r,b[m].apply(b,o),true);},q);return r;}b.Array.each(n,function(w){var x=s.slice(),v;w=b.one(w);if(w){if(t){v=x.splice(3,1)[0];}x.splice(0,4,x[1],x[3]);if(!this.preventDups||!this.getSubs(w,s,null,true)){u.push(this._subscribe(w,m,x,p,v));}}},this);return(u.length===1)?u[0]:new b.EventHandle(u);},_subscribe:function(q,o,t,r,p){var v=new b.CustomEvent(this.type,this.publishConfig),s=v.on.apply(v,t),u=new h(s,this.emitFacade),n=a.getRegistry(q,this.type,true),m=s.sub;m.node=q;m.filter=p;if(r){this.applyArgExtras(r,m);}b.mix(v,{eventDef:this,notifier:u,host:q,currentTarget:q,target:q,el:q._node,_delete:a._deleteSub},true);s.notifier=u;n.register(s);this[o](q,m,u,p);return s;},applyArgExtras:function(m,n){n._extra=m;},_detach:function(o){var t=o[2],r=(c(t))?g(t):d(t),s,q,m,p,n;o.splice(2,1);for(q=0,m=r.length;q<m;++q){s=b.one(r[q]);if(s){p=this.getSubs(s,o);if(p){for(n=p.length-1;n>=0;--n){p[n].detach();}}}}},getSubs:function(o,u,n,q){var m=a.getRegistry(o,this.type),v=[],t,p,s,r;if(m){t=m.handles;if(!n){n=this.subMatch;}for(p=0,s=t.length;p<s;++p){r=t[p];if(n.call(this,r.sub,u)){if(q){return r;}else{v.push(t[p]);}}}}return v.length&&v;},subMatch:function(n,m){return !m[1]||n.fn===m[1];}}},true);b.SyntheticEvent=a;b.Event.define=function(o,n,q){var p,r,m;if(o&&o.type){p=o;q=n;}else{if(n){p=b.merge({type:o},n);}}if(p){if(q||!b.Node.DOM_EVENTS[p.type]){r=function(){a.apply(this,arguments);};b.extend(r,a,p);m=new r();o=m.type;b.Node.DOM_EVENTS[o]=b.Env.evt.plugins[o]={eventDef:m,on:function(){return m._on(d(arguments));},delegate:function(){return m._on(d(arguments),true);},detach:function(){return m._detach(d(arguments));}};}}else{if(c(o)||e(o)){b.Array.each(d(o),function(s){b.Node.DOM_EVENTS[s]=1;});}}return m;};},"3.4.1",{requires:["node-base","event-custom-complex"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-mouseenter",function(f){var b=f.Env.evt.dom_wrappers,d=f.DOM.contains,c=f.Array,e=function(){},a={proxyType:"mouseover",relProperty:"fromElement",_notify:function(k,i,h){var g=this._node,j=k.relatedTarget||k[i];if(g!==j&&!d(g,j)){h.fire(new f.DOMEventFacade(k,g,b["event:"+f.stamp(g)+k.type]));}},on:function(k,i,j){var h=f.Node.getDOMNode(k),g=[this.proxyType,this._notify,h,null,this.relProperty,j];i.handle=f.Event._attach(g,{facade:false});},detach:function(h,g){g.handle.detach();},delegate:function(l,j,k,i){var h=f.Node.getDOMNode(l),g=[this.proxyType,e,h,null,k];j.handle=f.Event._attach(g,{facade:false});j.handle.sub.filter=i;j.handle.sub.relProperty=this.relProperty;j.handle.sub._notify=this._filterNotify;},_filterNotify:function(j,p,g){p=p.slice();if(this.args){p.push.apply(p,this.args);}var h=f.delegate._applyFilter(this.filter,p,g),q=p[0].relatedTarget||p[0][this.relProperty],o,k,m,n,l;if(h){h=c(h);for(k=0,m=h.length&&(!o||!o.stopped);k<m;++k){l=h[0];if(!d(l,q)){if(!o){o=new f.DOMEventFacade(p[0],l,g);o.container=f.one(g.el);}o.currentTarget=f.one(l);n=p[1].fire(o);if(n===false){break;}}}}return n;},detachDelegate:function(h,g){g.handle.detach();}};f.Event.define("mouseenter",a,true);f.Event.define("mouseleave",f.merge(a,{proxyType:"mouseout",relProperty:"toElement"}),true);},"3.4.1",{requires:["event-synthetic"]});/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-resize",function(e){var b=e.Env.evt.dom_wrappers,d=e.config.win,c="event:"+e.stamp(d)+"resizenative",a;e.Event.define("windowresize",{on:(e.UA.gecko&&e.UA.gecko<1.91)?function(h,f,g){f._handle=e.Event._attach(["resize",function(i){g.fire(new e.DOMEventFacade(i,d,b[c]));}],{facade:false});}:function(i,g,h){var f=e.config.windowResizeDelay||100;g._handle=e.Event._attach(["resize",function(j){if(g._timer){g._timer.cancel();}g._timer=e.later(f,e,function(){h.fire(new e.DOMEventFacade(j,d,b[c]));});}],{facade:false});},detach:function(g,f){if(f._timer){f._timer.cancel();}f._handle.detach();}});},"3.4.1",{requires:["event-synthetic"]});YUI.add('moodle-block_navigation-navigation', function(Y){

/**
 * A 'actionkey' Event to help with Y.delegate().
 * The event consists of the left arrow, right arrow, enter and space keys.
 * More keys can be mapped to action meanings.
 * actions: collapse , expand, toggle, enter.
 *
 * This event is delegated to branches in the navigation tree.
 * The on() method to subscribe allows specifying the desired trigger actions as JSON.
 *
 * Todo: This could be centralised, a similar Event is defined in blocks/dock.js
 */
Y.Event.define("actionkey", {
   // Webkit and IE repeat keydown when you hold down arrow keys.
    // Opera links keypress to page scroll; others keydown.
    // Firefox prevents page scroll via preventDefault() on either
    // keydown or keypress.
    _event: (Y.UA.webkit || Y.UA.ie) ? 'keydown' : 'keypress',

    _keys: {
        //arrows
        '37': 'collapse',
        '39': 'expand',
        //(@todo: lrt/rtl/M.core_dock.cfg.orientation decision to assign arrow to meanings)
        '32': 'toggle',
        '13': 'enter'
    },

    _keyHandler: function (e, notifier, args) {
        if (!args.actions) {
            var actObj = {collapse:true, expand:true, toggle:true, enter:true};
        } else {
            var actObj = args.actions;
        }
        if (this._keys[e.keyCode] && actObj[this._keys[e.keyCode]]) {
            e.action = this._keys[e.keyCode];
            notifier.fire(e);
        }
    },

    on: function (node, sub, notifier) {
        // subscribe to _event and ask keyHandler to handle with given args[0] (the desired actions).
        if (sub.args == null) {
            //no actions given
            sub._detacher = node.on(this._event, this._keyHandler,this, notifier, {actions:false});
        } else {
            sub._detacher = node.on(this._event, this._keyHandler,this, notifier, sub.args[0]);
        }
    },

    detach: function (node, sub, notifier) {
        //detach our _detacher handle of the subscription made in on()
        sub._detacher.detach();
    },

    delegate: function (node, sub, notifier, filter) {
        // subscribe to _event and ask keyHandler to handle with given args[0] (the desired actions).
        if (sub.args == null) {
            //no actions given
            sub._delegateDetacher = node.delegate(this._event, this._keyHandler,filter, this, notifier, {actions:false});
        } else {
            sub._delegateDetacher = node.delegate(this._event, this._keyHandler,filter, this, notifier, sub.args[0]);
        }
    },

    detachDelegate: function (node, sub, notifier) {
        sub._delegateDetacher.detach();
    }
});

var EXPANSIONLIMIT_EVERYTHING = 0,
    EXPANSIONLIMIT_COURSE     = 20,
    EXPANSIONLIMIT_SECTION    = 30,
    EXPANSIONLIMIT_ACTIVITY   = 40;


/**
 * Navigation tree class.
 *
 * This class establishes the tree initially, creating expandable branches as
 * required, and delegating the expand/collapse event.
 */
var TREE = function(config) {
    TREE.superclass.constructor.apply(this, arguments);
}
TREE.prototype = {
    /**
     * The tree's ID, normally its block instance id.
     */
    id : null,
    /**
     * Initialise the tree object when its first created.
     */
    initializer : function(config) {
        this.id = config.id;

        var node = Y.one('#inst'+config.id);

        // Can't find the block instance within the page
        if (node === null) {
            return;
        }

        // Delegate event to toggle expansion
        var self = this;
        Y.delegate('click', function(e){self.toggleExpansion(e);}, node.one('.block_tree'), '.tree_item.branch');
        Y.delegate('actionkey', function(e){self.toggleExpansion(e);}, node.one('.block_tree'), '.tree_item.branch');

        // Gather the expandable branches ready for initialisation.
        var expansions = [];
        if (config.expansions) {
            expansions = config.expansions;
        } else if (window['navtreeexpansions'+config.id]) {
            expansions = window['navtreeexpansions'+config.id];
        }
        // Establish each expandable branch as a tree branch.
        for (var i in expansions) {
            new BRANCH({
                tree:this,
                branchobj:expansions[i],
                overrides : {
                    expandable : true,
                    children : [],
                    haschildren : true
                }
            }).wire();
            M.block_navigation.expandablebranchcount++;
        }

        // Call the generic blocks init method to add all the generic stuff
        if (this.get('candock')) {
            this.initialise_block(Y, node);
        }
    },
    /**
     * This is a callback function responsible for expanding and collapsing the
     * branches of the tree. It is delegated to rather than multiple event handles.
     */
    toggleExpansion : function(e) {
        // First check if they managed to click on the li iteslf, then find the closest
        // LI ancestor and use that

        if (e.target.test('a') && (e.keyCode == 0 || e.keyCode == 13)) {
            // A link has been clicked (or keypress is 'enter') don't fire any more events just do the default.
            e.stopPropagation();
            return;
        }

        // Makes sure we can get to the LI containing the branch.
        var target = e.target;
        if (!target.test('li')) {
            target = target.ancestor('li')
        }
        if (!target) {
            return;
        }

        // Toggle expand/collapse providing its not a root level branch.
        if (!target.hasClass('depth_1')) {
            if (e.type == 'actionkey') {
                switch (e.action) {
                    case 'expand' :
                        target.removeClass('collapsed');
                        target.set('aria-expanded', true);
                        break;
                    case 'collapse' :
                        target.addClass('collapsed');
                        target.set('aria-expanded', false);
                        break;
                    default :
                        target.toggleClass('collapsed');
                        target.set('aria-expanded', !target.hasClass('collapsed'));
                }
                e.halt();
            } else {
                target.toggleClass('collapsed');
                target.set('aria-expanded', !target.hasClass('collapsed'));
            }
        }

        // If the accordian feature has been enabled collapse all siblings.
        if (this.get('accordian')) {
            target.siblings('li').each(function(){
                if (this.get('id') !== target.get('id') && !this.hasClass('collapsed')) {
                    this.addClass('collapsed');
                    this.set('aria-expanded', false);
                }
            });
        }

        // If this block can dock tell the dock to resize if required and check
        // the width on the dock panel in case it is presently in use.
        if (this.get('candock')) {
            M.core_dock.resize();
            var panel = M.core_dock.getPanel();
            if (panel.visible) {
                panel.correctWidth();
            }
        }
    }
}
// The tree extends the YUI base foundation.
Y.extend(TREE, Y.Base, TREE.prototype, {
    NAME : 'navigation-tree',
    ATTRS : {
        instance : {
            value : null
        },
        candock : {
            validator : Y.Lang.isBool,
            value : false
        },
        accordian : {
            validator : Y.Lang.isBool,
            value : false
        },
        expansionlimit : {
            value : 0,
            setter : function(val) {
                return parseInt(val);
            }
        }
    }
});
if (M.core_dock && M.core_dock.genericblock) {
    Y.augment(TREE, M.core_dock.genericblock);
}

/**
 * The tree branch class.
 * This class is used to manage a tree branch, in particular its ability to load
 * its contents by AJAX.
 */
var BRANCH = function(config) {
    BRANCH.superclass.constructor.apply(this, arguments);
}
BRANCH.prototype = {
    /**
     * The node for this branch (p)
     */
    node : null,
    /**
     * A reference to the ajax load event handlers when created.
     */
    event_ajaxload : null,
    event_ajaxload_actionkey : null,
    /**
     * Initialises the branch when it is first created.
     */
    initializer : function(config) {
        if (config.branchobj !== null) {
            // Construct from the provided xml
            for (var i in config.branchobj) {
                this.set(i, config.branchobj[i]);
            }
            var children = this.get('children');
            this.set('haschildren', (children.length > 0));
        }
        if (config.overrides !== null) {
            // Construct from the provided xml
            for (var i in config.overrides) {
                this.set(i, config.overrides[i]);
            }
        }
        // Get the node for this branch
        this.node = Y.one('#', this.get('id'));
        // Now check whether the branch is not expandable because of the expansionlimit
        var expansionlimit = this.get('tree').get('expansionlimit');
        var type = this.get('type');
        if (expansionlimit != EXPANSIONLIMIT_EVERYTHING &&  type >= expansionlimit && type <= EXPANSIONLIMIT_ACTIVITY) {
            this.set('expandable', false);
            this.set('haschildren', false);
        }
    },
    /**
     * Draws the branch within the tree.
     *
     * This function creates a DOM structure for the branch and then injects
     * it into the navigation tree at the correct point.
     */
    draw : function(element) {

        var isbranch = (this.get('expandable') || this.get('haschildren'));
        var branchli = Y.Node.create('<li></li>');
        var link = this.get('link');
        var branchp = Y.Node.create('<p class="tree_item"></p>').setAttribute('id', this.get('id'));
        if (!link) {
            //add tab focus if not link (so still one focus per menu node).
            // it was suggested to have 2 foci. one for the node and one for the link in MDL-27428.
            branchp.setAttribute('tabindex', '0');
        }
        if (isbranch) {
            branchli.addClass('collapsed').addClass('contains_branch');
            branchli.set('aria-expanded', false);
            branchp.addClass('branch');
        }

        // Prepare the icon, should be an object representing a pix_icon
        var branchicon = false;
        var icon = this.get('icon');
        if (icon && (!isbranch || this.get('type') == 40)) {
            branchicon = Y.Node.create('<img alt="" />');
            branchicon.setAttribute('src', M.util.image_url(icon.pix, icon.component));
            branchli.addClass('item_with_icon');
            if (icon.alt) {
                branchicon.setAttribute('alt', icon.alt);
            }
            if (icon.title) {
                branchicon.setAttribute('title', icon.title);
            }
            if (icon.classes) {
                for (var i in icon.classes) {
                    branchicon.addClass(icon.classes[i]);
                }
            }
        }

        if (!link) {
            if (branchicon) {
                branchp.appendChild(branchicon);
            }
            branchp.append(this.get('name'));
        } else {
            var branchlink = Y.Node.create('<a title="'+this.get('title')+'" href="'+link+'"></a>');
            if (branchicon) {
                branchlink.appendChild(branchicon);
            }
            branchlink.append(this.get('name'));
            if (this.get('hidden')) {
                branchlink.addClass('dimmed');
            }
            branchp.appendChild(branchlink);
        }

        branchli.appendChild(branchp);
        element.appendChild(branchli);
        this.node = branchp;
        return this;
    },
    /**
     * Attaches required events to the branch structure.
     */
    wire : function() {
        this.node = this.node || Y.one('#'+this.get('id'));
        if (!this.node) {
            return false;
        }
        if (this.get('expandable')) {
            this.event_ajaxload = this.node.on('ajaxload|click', this.ajaxLoad, this);
            this.event_ajaxload_actionkey = this.node.on('actionkey', this.ajaxLoad, this);
        }
        return this;
    },
    /**
     * Gets the UL element that children for this branch should be inserted into.
     */
    getChildrenUL : function() {
        var ul = this.node.next('ul');
        if (!ul) {
            ul = Y.Node.create('<ul></ul>');
            this.node.ancestor().append(ul);
        }
        return ul;
    },
    /**
     * Load the content of the branch via AJAX.
     *
     * This function calls ajaxProcessResponse with the result of the AJAX
     * request made here.
     */
    ajaxLoad : function(e) {
        if (e.type == 'actionkey' && e.action != 'enter') {
            e.halt();
        } else {
            e.stopPropagation();
        }
        if (e.type = 'actionkey' && e.action == 'enter' && e.target.test('A')) {
            this.event_ajaxload_actionkey.detach();
            this.event_ajaxload.detach();
            return true; // no ajaxLoad for enter
        }

        if (this.node.hasClass('loadingbranch')) {
            return true;
        }

        this.node.addClass('loadingbranch');

        var params = {
            elementid : this.get('id'),
            id : this.get('key'),
            type : this.get('type'),
            sesskey : M.cfg.sesskey,
            instance : this.get('tree').get('instance')
        };

        Y.io(M.cfg.wwwroot+'/lib/ajax/getnavbranch.php', {
            method:'POST',
            data:  build_querystring(params),
            on: {
                complete: this.ajaxProcessResponse
            },
            context:this
        });
        return true;
    },
    /**
     * Processes an AJAX request to load the content of this branch through
     * AJAX.
     */
    ajaxProcessResponse : function(tid, outcome) {
        this.node.removeClass('loadingbranch');
        this.event_ajaxload.detach();
        this.event_ajaxload_actionkey.detach();
        try {
            var object = Y.JSON.parse(outcome.responseText);
            if (object.children && object.children.length > 0) {
                var coursecount = 0;
                for (var i in object.children) {
                    if (typeof(object.children[i])=='object') {
                        if (object.children[i].type == 20) {
                            coursecount++;
                        }
                        this.addChild(object.children[i]);
                    }
                }
                if (this.get('type') == 10 && coursecount >= M.block_navigation.courselimit) {
                    this.addViewAllCoursesChild(this);
                }
                this.get('tree').toggleExpansion({target:this.node});
                return true;
            }
        } catch (ex) {
            // If we got here then there was an error parsing the result
        }
        // The branch is empty so class it accordingly
        this.node.replaceClass('branch', 'emptybranch');
        return true;
    },
    /**
     * Turns the branch object passed to the method into a proper branch object
     * and then adds it as a child of this branch.
     */
    addChild : function(branchobj) {
        // Make the new branch into an object
        var branch = new BRANCH({tree:this.get('tree'), branchobj:branchobj});
        if (branch.draw(this.getChildrenUL())) {
            branch.wire();
            var count = 0, i, children = branch.get('children');
            for (i in children) {
                // Add each branch to the tree
                if (children[i].type == 20) {
                    count++;
                }
                if (typeof(children[i])=='object') {
                    branch.addChild(children[i]);
                }
            }
            if (branch.get('type') == 10 && count >= M.block_navigation.courselimit) {
                this.addViewAllCoursesChild(branch);
            }
        }
        return true;
    },

    /**
     * Add a link to view all courses in a category
     */
    addViewAllCoursesChild: function(branch) {
        branch.addChild({
            name : M.str.moodle.viewallcourses,
            title : M.str.moodle.viewallcourses,
            link : M.cfg.wwwroot+'/course/category.php?id='+branch.get('key'),
            haschildren : false,
            icon : {'pix':"i/navigationitem",'component':'moodle'}
        });
    }
}
Y.extend(BRANCH, Y.Base, BRANCH.prototype, {
    NAME : 'navigation-branch',
    ATTRS : {
        tree : {
            validator : Y.Lang.isObject
        },
        name : {
            value : '',
            validator : Y.Lang.isString,
            setter : function(val) {
                return val.replace(/\n/g, '<br />');
            }
        },
        title : {
            value : '',
            validator : Y.Lang.isString
        },
        id : {
            value : '',
            validator : Y.Lang.isString,
            getter : function(val) {
                if (val == '') {
                    val = 'expandable_branch_'+M.block_navigation.expandablebranchcount;
                    M.block_navigation.expandablebranchcount++;
                }
                return val;
            }
        },
        key : {
            value : null
        },
        type : {
            value : null
        },
        link : {
            value : false
        },
        icon : {
            value : false,
            validator : Y.Lang.isObject
        },
        expandable : {
            value : false,
            validator : Y.Lang.isBool
        },
        hidden : {
            value : false,
            validator : Y.Lang.isBool
        },
        haschildren : {
            value : false,
            validator : Y.Lang.isBool
        },
        children : {
            value : [],
            validator : Y.Lang.isArray
        }
    }
});

/**
 * This namespace will contain all of the contents of the navigation blocks
 * global navigation and settings.
 * @namespace
 */
M.block_navigation = M.block_navigation || {
    /** The number of expandable branches in existence */
    expandablebranchcount:1,
    courselimit : 20,
    instance : null,
    /**
     * Add new instance of navigation tree to tree collection
     */
    init_add_tree:function(properties) {
        if (properties.courselimit) {
            this.courselimit = properties.courselimit;
        }
        if (M.core_dock) {
            M.core_dock.init(Y);
        }
        new TREE(properties);
    }
};

}, '@VERSION@', {requires:['base', 'core_dock', 'io-base', 'node', 'dom', 'event-custom', 'event-delegate', 'json-parse']});
