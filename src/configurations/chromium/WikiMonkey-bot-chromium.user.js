// ==UserScript==
// @id wiki-monkey-bot-chromium
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.17.5-wikipedia
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (Wikipedia version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/chromium/WikiMonkey-bot-chromium.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/chromium/WikiMonkey-bot-chromium.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.17.5/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.17.5/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// ==/UserScript==

/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});

/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

if (!GM_info) {
    var GM_info = {
        script: {
            version: "1.17.5-wikipedia",
        },
    };

    var GM_emulation = true;
};

if (!GM_xmlhttpRequest) {
    var GM_xmlhttpRequest = function (params) {
        /* This function emulates GM_xmlhttpRequest only partially
         * Notably cross-origin requests are not supported
         *
         * params = {
         *     method: ,
         *     url: ,
         *     data: ,
         *     headers: ,
         *     user: ,
         *     password: ,
         *     onload: ,
         *     onerror: ,
         *     onreadystatechange: ,
         *
         *     // Not yet implemented
         *     //binary: ,
         *     //mozBackgroundRequest: ,
         *     //overrideMimeType: ,
         *     //ignoreCache: ,
         *     //ignoreRedirect: ,
         *     //ignoreTempRedirect: ,
         *     //ignorePermanentRedirect: ,
         *     //failOnRedirect: ,
         *     //redirectionLimit: ,
         * }
         */
        if (!params.method) params.method = "GET";
        if (!params.data) params.data = null;
        if (!params.headers) params.headers = {};
        if (!params.user) params.user = null;
        if (!params.password) params.password = null;
        if (!params.onload) params.onload = function (req) {};
        if (!params.onerror) params.onerror = function (req) {};
        if (!params.onreadystatechange) params.onreadystatechange = function (req) {};
        params.async = true;

        var req = new XMLHttpRequest();

        req.open(params.method, params.url, params.async, params.user, params.password);

        for (var header in params.headers) {
            req.setRequestHeader(header, params.headers[header]);
        }

        req.onreadystatechange = function () {
            var response = {
                responseText: req.responseText,
                readyState: req.readyState,
                responseHeaders: req.getAllResponseHeaders(),
                status: req.status,
                statusText: req.statusText,
                // Not yet implemented
                //finalUrl: ,
            };

            try {
                response.responseJSON = JSON.parse(req.responseText);
            }
            catch (err) {
                response.responseJSON = undefined;
            }

            params.onreadystatechange(response);

            if (req.readyState == 4) {
                if (req.status == 200) {
                    params.onload(response);
                }
                else {
                    params.onerror(response);
                }
            }
        };

        req.send(params.data);

        return {
            abort: function () {
                req.abort();
            },
        }
    };
}

if (!Alib) var Alib = {};

Alib.Async = new function () {
    this.executeAsync = function (functions, id) {
        id++;
        if (functions[id]) {
            var fid = functions[id];
            var callContinue = function () {
                Alib.Async.executeAsync(functions, id);
            };
            fid[0](fid[1], callContinue);
        }
    };

    this.recurseTreeAsync = function (params) {
        /*
         * params = {
         *     node: ,
         *     parentIndex: ,
         *     siblingIndex: ,
         *     ancestors: ,
         *     children: ,
         *     callChildren: ,
         *     callNode: ,
         *     callEnd: ,
         *     callArgs: ,
         *     stage: ,
         *     nodesList:
         * }
         *
         * nodesList: [
         *     {
         *         node: ,
         *         parentIndex: ,
         *         siblingIndex: ,
         *         ancestors: [...],
         *         children: [...]
         *     },
         *     {...}
         * ]
         *
         * Example:
         *
         * recurseTreeAsync({
         *     node: ,
         *     callChildren: ,
         *     callNode: ,
         *     callEnd: ,
         *     callArgs:
         * });
         *
         * callChildren(params) {
         *     params.children = ;
         *     recurseTreeAsync(params);
         * }
         *
         * callNode(params) {
         *     recurseTreeAsync(params);
         * }
         *
         * callEnd(params) {}
         */
        if (params.stage === undefined) {
            params.parentIndex = null;
            params.siblingIndex = 0;
            params.ancestors = [];
            params.children = [];
            params.nodesList = [];
            params.stage = 1;
            this.recurseTreeAsync(params);
        }
        else {
            switch (params.stage) {
                case 1:
                    params.stage = 2;
                    // Prevent infinite loops
                    if (params.ancestors.indexOf(params.node) == -1) {
                        params.callChildren(params);
                        break;
                    }
                    else {
                        params.children = "loop";
                        // Do not break here!!!
                    }
                case 2:
                    params.nodesList.push({
                        node: params.node,
                        parentIndex: params.parentIndex,
                        siblingIndex: params.siblingIndex,
                        ancestors: params.ancestors.slice(0),
                        children: params.children.slice(0),
                    });
                    params.stage = 3;
                    params.callNode(params);
                    break;
                case 3:
                    if (params.children.length && params.children != "loop") {
                        // Go to the first child
                        params.ancestors.push(params.node);
                        params.node = params.children[0];
                        params.parentIndex = params.nodesList.length - 1;
                        params.siblingIndex = 0;
                        params.children = [];
                        params.stage = 1;
                        this.recurseTreeAsync(params);
                    }
                    else if (params.parentIndex != null) {
                        // Go to the next sibling
                        var parent = params.nodesList[params.parentIndex];
                        params.siblingIndex++;
                        params.node = parent.children[params.siblingIndex];
                        params.children = [];
                        if (params.node) {
                            params.stage = 1;
                        }
                        else {
                            // There are no more siblings
                            params.node = parent.node;
                            params.parentIndex = parent.parentIndex;
                            params.siblingIndex = parent.siblingIndex;
                            params.ancestors = parent.ancestors.slice(0);
                            params.stage = 3;
                        }
                        this.recurseTreeAsync(params);
                    }
                    else {
                        // End of recursion
                        params.callEnd(params);
                    }
                    break;
            }
        }
    };
};

if (!Alib) var Alib = {};

Alib.Compatibility = new function () {
    this.normalizeCarriageReturns = function (source) {
        // Opera and IE use \r\n instead of \n
        return source.replace(/\r\n/g, '\n');
    };
};

if (!Alib) var Alib = {};

Alib.CSS = new function () {
    this.addStyleElement = function (css) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        document.head.appendChild(style);
    };
};

if (!Alib) var Alib = {};

Alib.DOM = new function () {
    this.getPreviousElementSibling = function (node) {
        while (node.previousSibling.nodeType != 1) {
            node = node.previousSibling;
        }
        return node.previousSibling;
    }

    this.getNextElementSibling = function (node) {
        while (node.nextSibling.nodeType != 1) {
            node = node.nextSibling;
        }
        return node.nextSibling;
    }

    this.getFirstElementChild = function (node) {
        return (node.firstChild.nodeType == 1) ? node.firstChild : this.getNextElementSibling(node.firstChild);
    }

    this.getLastElementChild = function (node) {
        return (node.lastChild.nodeType == 1) ? node.lastChild : this.getPreviousElementSibling(node.lastChild);
    }

    this.getChildElements = function (node) {
        var list = element.childNodes;
        var children = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].nodeType == 1) {
                children.push(list[i]);
            }
        }
        return children;
    }

    this.getChildrenByTagName = function (element, tag) {
        var list = element.childNodes;
        var children = [];
        for (var i = 0; i < list.length; i++) {
            var localName = list[i].localName;
            if (localName && localName.toLowerCase() == tag.toLowerCase()) {
                children.push(list[i]);
            }
        }
        return children;
    }

    this.isDescendantOf = function (descendant, ancestor, identity) {
        var response = false;
        if (identity && descendant.isSameNode(ancestor)) {
            response = true;
        }
        else {
            while (descendant != document.body) {
                if (descendant.parentNode.isSameNode(ancestor)) {
                    response = true;
                    break;
                }
                descendant = descendant.parentNode;
            }
        }
        return response;
    }

    this.getSiblingPositionByTagName = function (element) {
        var i = 0;
        var siblings = this.getChildrenByTagName(element.parentNode, element.localName);
        while (!siblings[i].isSameNode(element)) {
            i++;
        }
        return (i < siblings.length) ? i : -1;
    }

    this.getLongTextNode = function (element) {
        // Firefox and other browsers split long text into multiple text nodes
        var text = "";
        var nodes = element.childNodes;
        var child;
        for (var c = 0; c < nodes.length; c++) {
            child = nodes[c];
            if (child.nodeType == 3) {
                text += child.nodeValue;
            }
        }
        return text;
    };
};

if (!Alib) var Alib = {};

Alib.HTTP = new function () {
    this.getUrlLocation = function (url) {
        link = document.createElement('a');
        link.href = url;
        return link;
    };

    this.getURIParameters = function (uri) {
        if (uri) {
            var qstring = this.getUrlLocation(uri).search;
        }
        else {
            var qstring = location.search;
        }

        var qarray = qstring.substr(1).split('&');
        var qdict = new Object();
        var s = new Array();

        for (var par in qarray) {
            s = qarray[par].split('=');
            qdict[s[0]] = s[1];
        }

        return qdict;
    };

    this.getURIParameter = function (uri, name) {
        return this.getURIParameters(uri)[name];
    };

    this.sendGetAsyncRequest = function (url, call) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                call(req);
            }
        };
        req.open("GET", url, true);
        req.send();
    };

    this.sendGetSyncRequest = function (url) {
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        return req;
    };

    this.sendPostAsyncRequest = function (url, call, query, header, headervalue) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                call(req);
            }
        };
        req.open("POST", url, true);
        if (header && headervalue) {
            req.setRequestHeader(header, headervalue);
        }
        req.send(query);
    };

    this.sendPostSyncRequest = function (url, query, header, headervalue) {
        var req = new XMLHttpRequest();
        req.open("POST", url, false);
        if (header && headervalue) {
            req.setRequestHeader(header, headervalue);
        }
        req.send(query);
        return req;
    };
};

if (!Alib) var Alib = {};

Alib.Obj = new function () {
    this.getKeys = function (object) {
        var keys = [];
        for (var i in object) {
            keys.push(i);
        }
        return keys;
    };

    this.getValues = function (object) {
        var values = [];
        for (var i in object) {
            values.push(object[i]);
        }
        return values;
    };

    this.getFirstItem = function (object) {
        for (var i in object) {
            return object[i];
        }
    };
};

if (!Alib) var Alib = {};

Alib.RegEx = new function () {
    this.escapePattern = function (string) {
        /*
         * Escaping any other characters is not necessary, references:
         * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
         * - http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
         * - http://stackoverflow.com/questions/2593637/how-to-escape-regular-expression-in-javascript
         * - http://stackoverflow.com/questions/494035/how-do-you-pass-a-variable-to-a-regular-expression-javascript
         * - http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
         * - http://stackoverflow.com/questions/399078/what-special-characters-must-be-escaped-in-regular-expressions
         *
         * Note for Wiki Monkey: do *not* escape '\s' here so that it will be
         * safe to use prepareRegexpWhitespace in WM.Parser
         */
        return string.replace(/[-[\]{}()^$*+?.|\\]/g, "\\$&");
    };

    this.matchAll = function (source, regExp) {
        var result = [];
        while (true) {
            var match = regExp.exec(source);
            if (match) {
                var L = match[0].length;
                result.push({"match": match,
                             "index": regExp.lastIndex - L,
                             "length": L});
            }
            else {
                break;
            }
        }
        return result;
    };

    this.matchAllConditional = function (source, regExp, test) {
        var result = [];
        while (true) {
            var match = regExp.exec(source);
            if (match && test(match)) {
                var L = match[0].length;
                result.push({"match": match,
                             "index": regExp.lastIndex - L,
                             "length": L});
            }
            else {
                break;
            }
        }
        return result;
    };
};

if (!Alib) var Alib = {};

Alib.Str = new function () {
    this.insert = function (string, newString, id) {
        if (!id) id = 0;
        return string.substring(0, id) + newString + string.substr(id);
    };

    this.overwriteFor = function (string, newString, id, length) {
        if (!id) id = 0;
        if (!length || length < 0) length = 0;
        return string.substring(0, id) + newString + string.substr(id +
                                                                    length);
    };

    this.overwriteAt = function (string, newString, id) {
        return this.overwriteFor(string, newString, id, newString.length);
    };

    this.overwriteBetween = function (string, newString, id1, id2) {
        if (!id1) id1 = 0;
        if (!id2) id2 = id1;
        if (id1 > id2) {
            var tempid = id2;
            id2 = id1;
            id1 = tempid;
        }
        return string.substring(0, id1) + newString + string.substr(id2);
    };

    this.removeFor = function (string, id, length) {
        return this.overwriteFor(string, "", id, length);
    };

    this.removeBetween = function (string, id1, id2) {
        return this.overwriteBetween(string, "", id1, id2);
    };

    this.padLeft = function (string, filler, length) {
        while (string.length < length) {
            string = filler + string;
        }
        return string;
    };

    this.padRight = function (string, filler, length) {
        while (string.length < length) {
            string += filler;
        }
        return string;
    };

    this.findSimpleEnclosures = function (string, openTag, openLength,
                                                    closeTag, closeLength) {
        // openTag and closeTag can be strings or regular expressions
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[0, 2], ]
        // Results are guaranteed to be in order of appearance in the original
        //   text
        var results = [];
        var searchIndex = 0;
        var oIndexRel = string.search(openTag);

        while (true) {
            if (oIndexRel > -1) {
                var oIndex = searchIndex + oIndexRel;
                var cIndexRel = string.substr(oIndex + openLength).search(
                                                                    closeTag);

                if (cIndexRel > -1) {
                    var cIndex = oIndex + openLength + cIndexRel;
                    results.push([oIndex, cIndex]);
                    searchIndex = cIndex + closeLength;

                    if (searchIndex < string.length) {
                        oIndexRel = string.substr(searchIndex).search(openTag);
                        continue;
                    }
                    else {
                        break;
                    }
                }
                else {
                    // A tag is left open (no closing tag is found)
                    // Let each implementation decide what to do in this case
                    //   (either consider the tag working until the end of text
                    //   or not)
                    results.push([oIndex, false]);
                    break;
                }
            }
            else {
                break;
            }
        }

        return results;
    };

    this.findNestedEnclosures = function (string, openTag, closeTag,
                                                                    maskChar) {
        // openTag and closeTag must be strings, *not* regular expressions,
        //   unlike this.findSimpleEnclosures
        // maskChar must be a *1*-character string and must *not* be part of
        //   neither openTag nor closeTag
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[1, 2], [0, 3]]
        var openLength = openTag.length;
        var closeLength = closeTag.length;
        var results = [];
        var searchIndex = 0;
        var cIndexRel = string.indexOf(closeTag);
        var maskedString = string;

        while (true) {
            if (cIndexRel > -1) {
                var cIndex = searchIndex + cIndexRel;
                var oIndexRel = maskedString.substring(searchIndex, cIndex
                                                        ).lastIndexOf(openTag);

                if (oIndexRel > -1) {
                    var oIndex = searchIndex + oIndexRel;
                    results.push([oIndex, cIndex]);

                    var maskedString1 = maskedString.substring(0, oIndex);
                    var maskLength = cIndex - oIndex + closeLength;
                    var maskedString2 = this.padRight("", maskChar,
                                                                maskLength);
                    var maskedString3 = maskedString.substring(cIndex +
                                                                closeLength);
                    maskedString = maskedString1 + maskedString2 +
                                                                maskedString3;

                    // Do *not* increment searchIndex in this case, in fact in
                    //   we don't know yet whether there are more openTags
                    //   before the one found
                }
                else {
                    searchIndex = cIndex + closeLength;
                }

                cIndexRel = maskedString.substring(searchIndex).indexOf(
                                                                    closeTag);
                continue;
            }
            else {
                break;
            }
        }

        return [results, maskedString];
    };

    this.findInnermostEnclosures = function (string, openTag, closeTag) {
        // openTag and closeTag must be strings, *not* regular expressions,
        //   unlike this.findSimpleEnclosures
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[1, 2], ]
        var openLength = openTag.length;
        var closeLength = closeTag.length;
        var results = [];
        var searchIndex = 0;

        while (true) {
            var cIndexRel = string.substring(searchIndex).indexOf(closeTag);

            if (cIndexRel > -1) {
                var cIndex = searchIndex + cIndexRel;
                var oIndexRel = string.substring(searchIndex, cIndex
                                                        ).lastIndexOf(openTag);

                if (oIndexRel > -1) {
                    var oIndex = searchIndex + oIndexRel;
                    results.push([oIndex, cIndex]);
                }

                searchIndex = cIndex + closeLength;
                continue;
            }
            else {
                break;
            }
        }

        return results;
    };
};

var WM = new function () {
    "use strict";

    this.Plugins = {};

    this.main = function (defaultConfig) {
        WM.Cfg._load(defaultConfig);
        WM.UI._makeUI();
    };
};

WM.Bot = new function () {
    "use strict";

    this._makeUI = function (functions, lists) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyBot';

        Alib.CSS.addStyleElement("#WikiMonkeyBot-PluginSelect {width:100%; " +
                                                    "margin-bottom:1em;} " +
                    "#WikiMonkeyBot-ListSelect {margin-bottom:1em;} " +
                    "#WikiMonkeyBotFilter {height:6em; margin-bottom:1em; " +
                                                        "resize:vertical;} " +
                    "#WikiMonkeyBotStart, #WikiMonkeyBotStop " +
                                "{margin-right:0.33em; margin-bottom:1em; " +
                                "font-weight:bold;} " +
                    "a.WikiMonkeyBotSelected {background-color:#faa; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessing {background-color:#ff8; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotChanged {background-color:#afa; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotUnchanged {background-color:#aaf; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotBypassed {background-color:orangered; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotFailed {background-color:red; " +
                                                    "padding:0.2em 0.4em;}");

        var fdiv = makeFunctionUI(functions);

        if (fdiv) {
            divContainer.appendChild(fdiv);
            divContainer.appendChild(makeConfUI(lists));
            return divContainer;
        }
        else {
            return false;
        }
    };

    var makeFunctionUI = function (functions) {
        var fieldset = document.createElement('fieldset');

        var legend = document.createElement('legend');
        legend.innerHTML = 'Plugin';

        var selectFunctions = document.createElement('select');
        selectFunctions.id = 'WikiMonkeyBot-PluginSelect';

        var option;
        var ffunctions = [];

        for (var f in functions) {
            var pluginConf = functions[f];
            var pluginName = pluginConf[0];
            var pluginInst = pluginConf[1];

            // This protects from configurations that define plugins
            // that are actually not installed
            // A try-catch doesn't work...
            if (!WM.Plugins[pluginName]) {
                continue;
            }

            // This allows to disable an entry by giving it any second
            // parameter that evaluates to false
            if (!pluginInst || !pluginInst.length) {
                continue;
            }

            ffunctions.push(pluginConf);
            option = document.createElement('option');
            option.innerHTML = pluginInst[pluginInst.length - 1];
            selectFunctions.appendChild(option);
        }

        if (ffunctions.length) {
            selectFunctions.addEventListener("change", (function (ffunctions) {
                return function () {
                    var select = document.getElementById(
                                                'WikiMonkeyBot-PluginSelect');
                    var id = select.selectedIndex;
                    var UI = document.getElementById('WikiMonkeyBotFunction');
                    var pluginConf = ffunctions[id];
                    // [1] Note that this must also be executed immediately,
                    //   see [2]
                    var makeUI = WM.Plugins[pluginConf[0]].makeBotUI;
                    if (makeUI instanceof Function) {
                        UI.replaceChild(makeUI(pluginConf[2]), UI.firstChild);
                    }
                    else {
                        // Don't removeChild, otherwise if another plugin with
                        // interface is selected, replaceChild won't work
                        UI.replaceChild(document.createElement('div'),
                                                                UI.firstChild);
                    }
                    WM.Bot.configuration.plugin = pluginConf[0];
                    WM.Bot.configuration.function_ = function (title,
                                                    callContinue, chainArgs) {
                        WM.Plugins[pluginConf[0]].mainAuto(pluginConf[2],
                                            title, callContinue, chainArgs);
                    };
                }
            })(ffunctions), false);

            var divFunction = document.createElement('div');
            divFunction.id = "WikiMonkeyBotFunction";

            var pluginConf = ffunctions[0];

            // [2] Note that this is also executed onchange, see [1]
            var makeUI = WM.Plugins[pluginConf[0]].makeBotUI;
            if (makeUI instanceof Function) {
                divFunction.appendChild(makeUI(pluginConf[2]));
            }
            else {
                divFunction.appendChild(document.createElement('div'));
            }
            // Don't use "this.configuration"
            WM.Bot.configuration.plugin = pluginConf[0];
            WM.Bot.configuration.function_ = function (title, callContinue,
                                                                chainArgs) {
                WM.Plugins[pluginConf[0]].mainAuto(pluginConf[2], title,
                                                    callContinue, chainArgs);
            };

            fieldset.appendChild(legend);
            fieldset.appendChild(selectFunctions);
            fieldset.appendChild(divFunction);

            return fieldset;
        }
        else {
            return false;
        }
    };

    this.configuration = {plugin: null,
                       function_: function () {},
                       filters: [],
                       list: {current: null,
                              previous: null},
                       visited: []};

    var makeListSelector = function (lists) {
        var selectLists = document.createElement('select');
        selectLists.id = 'WikiMonkeyBot-ListSelect';

        var option;

        for (var l in lists) {
            if (lists[l][0]) {
                option = document.createElement('option');
                option.innerHTML = lists[l][2];
                selectLists.appendChild(option);

                if (!WM.Bot.configuration.list.current) {
                    // [1] Note that this is also executed onchange, see [2]
                    // Don't use "this.configuration"
                    WM.Bot.configuration.list.current = lists[l];
                }
            }
        }

        selectLists.addEventListener("change", (function (lss) {
            return function () {
                var select = document.getElementById(
                                                'WikiMonkeyBot-ListSelect');
                var id = select.selectedIndex;
                WM.Bot.configuration.list.previous =
                                            WM.Bot.configuration.list.current;
                // [2] Note that this must also be executed immediately,
                //   see [1]
                WM.Bot.configuration.list.current = lss[id];
            }
        })(lists), false);

        return selectLists;
    };

    var makeConfUI = function (lists) {
        var bot = document.createElement('div');

        var fieldset = document.createElement('fieldset');

        var legend = document.createElement('legend');
        legend.innerHTML = 'Filter';

        var listSelect = makeListSelector(lists);

        var filter = document.createElement('textarea');
        filter.id = 'WikiMonkeyBotFilter';

        var preview = document.createElement('input');
        preview.id = 'WikiMonkeyBotPreview';
        preview.type = 'button';
        preview.value = 'Preview';

        var duplicates = document.createElement('input');
        duplicates.type = 'checkbox';
        duplicates.id = 'WikiMonkeyBotDuplicates';

        var inverse = document.createElement('input');
        inverse.type = 'checkbox';
        inverse.id = 'WikiMonkeyBotInverse';

        var elems = [filter, duplicates, inverse];

        for (var e in elems) {
            elems[e].addEventListener("change", function () {
                WM.Bot._disableStartBot(
                                'Filters have changed, preview the selection');
            }, false);
        }

        var duplicatestag = document.createElement('span');
        duplicatestag.innerHTML = 'Duplicates';

        var inversetag = document.createElement('span');
        inversetag.innerHTML = 'Inverse';

        preview.addEventListener("click", WM.Bot._previewFilter, false);

        fieldset.appendChild(legend);
        if (listSelect.length > 1) {
            fieldset.appendChild(listSelect);
        }
        fieldset.appendChild(filter);
        fieldset.appendChild(preview);
        fieldset.appendChild(duplicates);
        fieldset.appendChild(duplicatestag);
        fieldset.appendChild(inverse);
        fieldset.appendChild(inversetag);

        var start = document.createElement('input');
        start.type = 'button';
        start.value = 'Start bot';
        start.id = 'WikiMonkeyBotStart';

        start.addEventListener("click", WM.Bot._startAutomatic, false);

        start.disabled = true;

        var startMsg = document.createElement('span');
        startMsg.innerHTML = 'Set and preview the filter first';
        startMsg.id = 'WikiMonkeyBotStartMsg';

        var forceStart = document.createElement('span');
        forceStart.id = 'WikiMonkeyBotForceStart';

        var forceStartCB = document.createElement('input');
        forceStartCB.type = 'checkbox';
        forceStartCB.disabled = true;

        var forceStartLabel = document.createElement('span');
        forceStartLabel.innerHTML = 'Force start, stopping any other ' +
                                                    'currently running bots';

        forceStart.style.display = "none";
        forceStart.appendChild(forceStartCB);
        forceStart.appendChild(forceStartLabel);

        bot.appendChild(fieldset);
        bot.appendChild(start);
        bot.appendChild(startMsg);
        bot.appendChild(forceStart);

        return bot;
    };

    this._enableStartBot = function () {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = '';
        document.getElementById('WikiMonkeyBotStart').disabled = false;
    };

    this._disableStartBot = function (message) {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message;
        document.getElementById('WikiMonkeyBotStart').disabled = true;
    };

    this._enableStopBot = function (stopId) {
        var stop = document.createElement('input');
        stop.type = 'button';
        stop.value = 'Stop bot';
        stop.id = 'WikiMonkeyBotStop';

        stop.addEventListener("click", (function (id) {
            return function () {
                clearTimeout(id);
                // run _disableStopBot() here, not in _endAutomatic()
                WM.Bot._disableStopBot();
                WM.Bot._endAutomatic(true);
                WM.Log.logInfo('Bot stopped manually');
            }
        })(stopId), false);

        var start = document.getElementById('WikiMonkeyBotStart');
        start.parentNode.insertBefore(stop, start);
        start.style.display = 'none';
    };

    this._disableStopBot = function () {
        var stop = document.getElementById('WikiMonkeyBotStop');
        stop.parentNode.removeChild(stop);
        document.getElementById('WikiMonkeyBotStart').style.display = 'inline';
    };

    this._disableControls = function () {
        this._setEnableControls(true);
    };

    this._reEnableControls = function () {
        this._setEnableControls(false);
    };

    this._setEnableControls = function (flag) {
        var fsets = document.getElementById('WikiMonkeyBot'
                                            ).getElementsByTagName('fieldset');
        for (var f = 0; f < fsets.length; f++) {
            // HTML5-compliant
            fsets[f].disabled = flag;
        }
    };

    this._enableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].disabled = false;
        force.style.display = 'inline';
    };

    this._disableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].checked = false;
        force.getElementsByTagName('input')[0].disabled = true;
        force.style.display = 'none';
    };

    this._canForceStart = function () {
        return document.getElementById('WikiMonkeyBotForceStart'
                                    ).getElementsByTagName('input')[0].checked;
    };

    var makeFilters = function () {
        WM.Bot.configuration.filters = [];
        var filters = document.getElementById('WikiMonkeyBotFilter'
                                                        ).value.split('\n');

        for (var f in filters) {
            var filter = filters[f];

            // filter could be an empty string
            if (filter) {
                var firstSlash = filter.indexOf('/');
                var lastSlash = filter.lastIndexOf('/');
                var pattern = filter.substring(firstSlash + 1, lastSlash);
                var modifiers = filter.substring(lastSlash + 1);
                var negative = filter.charAt(0) == '!';
                var regexp;

                try {
                    regexp = new RegExp(pattern, modifiers);
                }
                catch (exc) {
                    WM.Log.logError('Invalid regexp: ' + exc);
                    return false;
                }

                WM.Bot.configuration.filters.push([regexp, negative]);
                // Do not return nor break, so that if among the filters
                //   there's an invalid regexp the function returns false
            }
        }

        return true;
    };

    var canProcessPage = function (link) {
        // Exclude red links (they can be found in some special pages)
        if (link.className.split(" ").indexOf("new") < 0) {
            // Don't use link.title because for example in Category pages all
            //   subpages would include "Category:", thus always matching
            //   filters like "/a/", "/t/" etc.
            var title = link.innerHTML;
            var duplicates = document.getElementById('WikiMonkeyBotDuplicates'
                                                                    ).checked;

            if (duplicates || WM.Bot.configuration.visited.indexOf(
                                                                title) < 0) {
                WM.Bot.configuration.visited.push(title);
                var filters = WM.Bot.configuration.filters;
                var inverse = document.getElementById('WikiMonkeyBotInverse'
                                                                    ).checked;

                if (filters.length > 0) {
                    for (var f in filters) {
                        var regexp = filters[f][0];
                        var negative = filters[f][1];
                        var test = regexp.test(title);

                        if (test != negative) {
                            return (inverse) ? false : true;
                        }
                    }

                    // No (test != negative) condition has been met in the loop
                    return (inverse) ? true : false;
                }
                else {
                    return (inverse) ? false : true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    var changeWikiMonkeyLinkClassName = function (className, newClass) {
        var classes = className.split(" ");
        var newClasses = [];

        for (var c = 0; c < classes.length; c++) {
            if (classes[c].indexOf("WikiMonkey") < 0) {
                newClasses.push(classes[c]);
            }
        }

        // Don't push in an else block inside the loop, so that if there was
        // no WikiMonkey class set, it will be added
        newClasses.push(newClass);

        return newClasses.join(" ");
    };

    var restoreOriginalLinkClassName = function (className) {
        var classes = className.split(" ");
        var origClasses = [];

        for (var c = 0; c < classes.length; c++) {
            if (classes[c].indexOf("WikiMonkey") < 0) {
                origClasses.push(classes[c]);
            }
        }

        return origClasses.join(" ");
    };

    this._previewFilter = function () {
        WM.Log.logInfo('Updating filter preview, please wait ...');
        WM.Bot._disableStartBot('Updating filter preview ...');

        var items, linkId, link;

        if (WM.Bot.configuration.list.previous) {
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                items = WM.Bot.configuration.list.previous[0
                                                ].getElementsByTagName('td');
            }
            else {
                items = WM.Bot.configuration.list.previous[0
                                                ].getElementsByTagName('li');
            }
            linkId = WM.Bot.configuration.list.previous[1];

            for (var i = 0; i < items.length; i++) {
                link = items[i].getElementsByTagName('a')[linkId];

                // The list item could refer to an invalid title, represented
                // by e.g. <span class="mw-invalidtitle">Invalid title with
                // namespace "Category" and text ""</span>
                if (link) {
                    link.className = restoreOriginalLinkClassName(
                                                            link.className);
                }
            }
        }

        WM.Bot.configuration.visited = [];

        linkId = WM.Bot.configuration.list.current[1];
        var enable = false;
        var N = 0;

        if (makeFilters()) {
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                items =
                    WM.Bot.configuration.list.current[0].getElementsByTagName(
                                                                        'td');
            }
            else {
                items =
                    WM.Bot.configuration.list.current[0].getElementsByTagName(
                                                                        'li');
            }

            for (var i = 0; i < items.length; i++) {
                link = items[i].getElementsByTagName('a')[linkId];

                // Also test 'link' itself, because the list item could refer
                // to an invalid title, represented by e.g.
                // <span class="mw-invalidtitle">Invalid title with namespace
                // "Category" and text ""</span>
                if (link) {
                    if (canProcessPage(link)) {
                        link.className = changeWikiMonkeyLinkClassName(
                                    link.className, 'WikiMonkeyBotSelected');
                        enable = true;
                        N++;
                    }
                    else {
                        link.className = restoreOriginalLinkClassName(
                                                            link.className);
                    }
                }
            }
        }

        WM.Log.logInfo('Preview updated (' + N + ' pages selected)');

        if (enable) {
            WM.Bot._enableStartBot();
        }
        else {
            WM.Bot._disableStartBot(
                            'No pages selected, reset and preview the filter');
        }
    };

    // localStorage can only store strings
    this.botToken = "0";

    this._setBotToken = function () {
        var date = new Date();
        var token = date.getTime() + "";
        this.botToken = token;
        localStorage.setItem('WikiMonkeyBotToken', token);
    };

    this._resetBotToken = function (reset) {
        this.botToken = "0";
        if (reset) {
            localStorage.setItem('WikiMonkeyBotToken', "0");
        }
    };

    this._getBotToken = function () {
        return this.botToken;
    };

    this._checkOtherBotsRunning = function () {
        var value = localStorage.getItem('WikiMonkeyBotToken');

        // value may be null if it's never been stored in localStorage
        return value && value != "0" && value != this._getBotToken();
    };

    this._startAutomatic = function () {
        if (WM.Bot._checkOtherBotsRunning() && !WM.Bot._canForceStart()) {
            WM.Log.logError('It\'s not possible to start the bot (without ' +
                        'forcing it) for one of the following reasons:<br>' +
                        '* another bot instance is currently running<br>' +
                        '* a previously running bot has stopped due to a ' +
                                                'page processing error<br>' +
                        '* a previously running bot has stopped due to a ' +
                                                    'Javascript error<br>' +
                        '* a previously running bot has been interrupted by ' +
                                                    'a browser page refresh');
            WM.Bot._enableForceStart();
        }
        else if (makeFilters()) {
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                var itemsDOM = WM.Bot.configuration.list.current[0
                                                ].getElementsByTagName('td');
            }
            else {
                var itemsDOM = WM.Bot.configuration.list.current[0
                                                ].getElementsByTagName('li');
            }

            // Passing the live collection with the callback function was
            //   causing it to be lost in an apparently random manner
            var items = [];

            for (var i = 0; i < itemsDOM.length; i++) {
                items.push(itemsDOM[i]);
            }

            var linkId = WM.Bot.configuration.list.current[1];

            WM.Bot._disableForceStart();
            WM.Bot._setBotToken();
            WM.Log.logInfo('Starting bot ...');
            WM.Log.logHidden("Plugin: " + WM.Bot.configuration.plugin);
            WM.Log.logHidden("Filter: " + document.getElementById(
                                                'WikiMonkeyBotFilter').value);
            WM.Bot._disableStartBot('Bot is running ...');
            WM.Bot._disableControls();
            WM.Bot.configuration.visited = [];

            WM.MW.isUserBot(WM.Bot._startAutomaticContinue, [items, linkId]);
        }
    };

    this._startAutomaticContinue = function (botTest, args) {
        var items = args[0];
        var linkId = args[1];

        WM.Bot.configuration.interval = (botTest) ? 3000 : 30000;
        WM.Bot._processItem(0, items, 0, linkId, null);
    };

    var makeCallContinue = function (lis, id, linkId, ln, article) {
        return function (status, resArgs) {
            switch (status) {
                // The article hasn't been saved
                case 0:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotUnchanged');
                    WM.Log.logInfo(WM.Log.linkToWikiPage(article, article) +
                                                    " processed (unchanged)");
                    id++;
                    WM.Bot._processItem(status, lis, id, linkId, resArgs);
                    break;
                // The article has been saved
                case 1:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotChanged');
                    WM.Log.logInfo(WM.Log.linkToWikiPage(article, article) +
                                                    " processed (changed)");
                    id++;
                    WM.Bot._processItem(status, lis, id, linkId, resArgs);
                    break;
                // The plugin has encountered a protectedpage error
                case 'protectedpage':
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotBypassed');
                    WM.Log.logWarning("This user doesn't have the rights to " +
                                    "edit " + WM.Log.linkToWikiPage(article,
                                    article) + ", bypassing it ...");
                    id++;
                    // Change status to 0 (page not changed)
                    WM.Bot._processItem(0, lis, id, linkId, resArgs);
                    break;
                // The plugin has encountered a critical error
                default:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                        'WikiMonkeyBotFailed');
                    WM.Log.logError("Error processing " +
                                    WM.Log.linkToWikiPage(article, article) +
                                    ", stopping the bot");
                    WM.Bot._endAutomatic(true);
            }
        };
    };

    this._processItem = function (status, items, index, linkId, chainArgs) {
        if (items[index]) {
            var link = items[index].getElementsByTagName('a')[linkId];

            // Also test 'link' itself, because the list item could refer to an
            // invalid title, represented by e.g.
            // <span class="mw-invalidtitle">Invalid title with namespace
            // "Category" and text ""</span>
            if (link && canProcessPage(link)) {
                var title = link.title;

                if (status === 0) {
                    var interval = 1000;
                }
                else {
                    var interval = WM.Bot.configuration.interval;
                }

                WM.Log.logInfo('Waiting ' + (interval / 1000) +
                                                            ' seconds ...');

                var stopId = setTimeout((function (lis, id, ln, article,
                                                                chainArgs) {
                    return function () {
                        // Stop must be disabled before any check is performed
                        WM.Bot._disableStopBot();

                        // Check here if other bots have been started,
                        // _not_ before setTimeout!
                        if (!WM.Bot._checkOtherBotsRunning()) {
                            ln.className = changeWikiMonkeyLinkClassName(
                                    ln.className, 'WikiMonkeyBotProcessing');
                            WM.Log.logInfo("Processing " +
                                    WM.Log.linkToWikiPage(article, article) +
                                    " ...");

                            WM.Bot.configuration.function_(article,
                                makeCallContinue(lis, id, linkId, ln, article),
                                chainArgs);
                        }
                        else {
                            WM.Log.logError('Another bot has been ' +
                                                'force-started, stopping ...');
                            WM.Bot._endAutomatic(false);
                        }
                    };
                })(items, index, link, title, chainArgs), interval);

                this._enableStopBot(stopId);
            }
            else {
                index++;
                WM.Bot._processItem(status, items, index, linkId, chainArgs);
            }
        }
        else {
            this._endAutomatic(true);
        }
    };

    this._endAutomatic = function (reset) {
        this._resetBotToken(reset);
        WM.Log.logInfo('Bot operations completed (check the log for ' +
                                                        'warnings or errors)');
        this._disableStartBot('Bot operations completed, reset and preview ' +
                                                                'the filter');
        this._reEnableControls();
    };
};

WM.Cat = new function () {
    "use strict";

    this.recurseTree = function (params) {
        params.callChildren = WM.Cat._recurseTreeCallChildren;
        Alib.Async.recurseTreeAsync(params);
    };

    this.recurseTreeContinue = function (params) {
        Alib.Async.recurseTreeAsync(params);
    };

    this._recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node,
                            WM.Cat._recurseTreeCallChildrenContinue, params);
    };

    this._recurseTreeCallChildrenContinue = function (subCats, params) {
        for (var s in subCats) {
            params.children.push(subCats[s].title);
        }
        Alib.Async.recurseTreeAsync(params);
    };

    this.getSubCategories = function (parent, call, callArgs) {
        WM.Cat._getMembers(parent, "subcat", call, callArgs);
    };

    this.getAllMembers = function (parent, call, callArgs) {
        WM.Cat._getMembers(parent, null, call, callArgs);
    };

    this._getMembers = function (name, cmtype, call, callArgs) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: name,
                     cmlimit: 500};

        if (cmtype) {
            query.cmtype = cmtype;
        }

        this._getMembersContinue(query, call, callArgs, []);
    };

    this._getMembersContinue = function (query, call, callArgs, members) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"
                                                ].categorymembers.cmcontinue;
                this._getMembersContinue(query, call, args, members);
            }
            else {
                call(members, args);
            }
        },
        callArgs, null);
    };

    this.getParentsAndInfo = function (name, call, callArgs) {
        var query = {action: "query",
                     prop: "categories|categoryinfo",
                     titles: name,
                     cllimit: 500};

        this._getParentsAndInfoContinue(query, call, callArgs, [], null);
    };

    this._getParentsAndInfoContinue = function (query, call, callArgs, parents,
                                                                        info) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);

            if (page.categories) {
                parents = parents.concat(page.categories);
            }

            if (page.categoryinfo) {
                info = page.categoryinfo;
            }

            if (res["query-continue"]) {
                // Request categoryinfo only once
                query.prop = "categories";
                query.clcontinue = res["query-continue"].categories.clcontinue;
                this._getParentsAndInfoContinue(query, call, args, parents,
                                                                        info);
            }
            else {
                call(parents, info, args);
            }
        },
        callArgs, null);
    };
};

WM.Cfg = new function () {
    "use strict";

    this._makeUI = function () {
        /*
         * Creating the preferences interface shouldn't rely on the saved
         * configuration, in order to always make it possible to fix a
         * misconfiguration
         */
        Alib.CSS.addStyleElement("#WikiMonkey-prefsection textarea {" +
                                                            "height:30em;} " +
            "#WikiMonkey-prefsection div, #WikiMonkey-prefsection p.message " +
                            "{display:inline-block; margin-bottom:0.5em;} " +
            "#WikiMonkey-prefsection input {margin-right:0.5em;}" +
            "#WikiMonkey-prefsection input[value='Save'] {font-weight:bold;}");

        var toc = $("#preftoc");
        var tlinks = toc.find("a").click(WM.Cfg._hideEditor);

        var link = $("<a/>")
            .attr({"id": "WikiMonkey-preftab", "href": "#wiki-monkey"})
            .text("Wiki Monkey")
            .click(WM.Cfg._showEditor);

        $("<li/>").appendTo(toc).append(link);

        var editor = $("<fieldset/>")
                        .addClass("prefsection")
                        .attr("id", "WikiMonkey-prefsection")
                        .hide();
        $("<legend/>")
            .addClass("mainLegend")
            .text("Wiki Monkey")
            .appendTo(editor);

        var bdiv = $("<div/>");
        $("<input/>")
            .attr("type", "button")
            .val("Save").click(saveEditor)
            .appendTo(bdiv);
        $("<input/>")
            .attr("type", "button")
            .val("Reset")
            .click(resetEditor)
            .appendTo(bdiv);
        $("<input/>")
            .attr("type", "button")
            .val("Defaults")
            .click(requestDefaults)
            .appendTo(bdiv);
        $("<input/>")
            .attr("type", "button")
            .val("Import")
            .click(importFile)
            .appendTo(bdiv);
        $("<input/>")
            .attr({"type": "file", "id": "WikiMonkey-import"})
            .change(doImportFile)
            .appendTo(bdiv)
            .hide();
        $("<input/>")
            .attr("type", "button")
            .val("Export")
            .click(exportEditor)
            .appendTo(bdiv);
        $("<a/>")
            .attr({"id": "WikiMonkey-export", "download": "WikiMonkey.conf"})
            .appendTo(bdiv);
        editor.append(bdiv);

        var help = $("<a/>")
            .attr("href", "https://github.com/kynikos/wiki-monkey/wiki")
            .text("[help]");

        $("<p/>")
            .addClass("message")
            .text("All pages running Wiki Monkey need to be refreshed " +
                                        "for saved changes to take effect. ")
            .append(help).appendTo(editor);

        $("<textarea/>").attr("id", "WikiMonkey-editor").appendTo(editor);

        $("<p/>")
            .text('Wiki Monkey version: ' + GM_info.script.version)
            .appendTo(editor);

        $("<p/>")
            .text("Actually installed plugins (in general, a subset of " +
                                    "those set in the loaded configuration):")
            .appendTo(editor);

        var list = $("<ul/>");

        for (var plugin in WM.Plugins) {
            $("<li/>").text(plugin).appendTo(list);
        }

        list.appendTo(editor);

        $("#preferences").children("fieldset").last().after(editor);

        resetEditor();

        if (location.hash == "#wiki-monkey") {
            WM.Cfg._showEditor();
        }
    };

    this._showEditor = function () {
        var tab = $("#WikiMonkey-preftab").parent();
        tab.siblings(".selected").removeClass("selected");
        tab.addClass("selected");

        var editor = $("#WikiMonkey-prefsection");
        editor.siblings("fieldset").hide();
        editor.show();

        editor.siblings(".mw-prefs-buttons").hide();
    };

    this._hideEditor = function () {
        $("#WikiMonkey-preftab").parent().removeClass("selected");

        var editor = $("#WikiMonkey-prefsection");
        editor.hide()
        editor.siblings(".mw-prefs-buttons").show();
    };

    var config = {};

    var DEFAULTS_REQUEST = "WARNING: If you click on the \"Save\" button " +
        "now, the saved configuration will be reset to the default values " +
        "at the next refresh!\nTo cancel this request, simply click on the " +
        "\"Reset\" button.";

    this._load = function(defaultConfig) {
        // Upper-scope config
        config = defaultConfig;

        var savedConfig = JSON.parse(localStorage.getItem("WikiMonkey"));

        if (savedConfig) {
            for (var section in savedConfig) {
                for (var type in config[section]) {
                    if (savedConfig[section][type]) {
                        // Don't do a deep (recursive) merge! It would also
                        // merge the plugins' arguments, and also other
                        // possible unexpected effects
                        $.extend(config[section][type],
                                                savedConfig[section][type]);
                    }
                }
            }
        }

        save();
    };

    this._getEditorPlugins = function() {
        return config["Plugins"]["Editor"];
    };

    this._getDiffPlugins = function() {
        return config["Plugins"]["Diff"];
    };

    this._getBotPlugins = function() {
        return config["Plugins"]["Bot"];
    };

    this._getSpecialPlugins = function() {
        return config["Plugins"]["Special"];
    };

    this._getRecentChangesPlugins = function() {
        return config["Plugins"]["RecentChanges"];
    };

    this._getNewPagesPlugins = function() {
        return config["Plugins"]["NewPages"];
    };

    this._getGeneralMods = function() {
        return config["Mods"]["General"];
    };

    this._getEditorMods = function() {
        return config["Mods"]["Editor"];
    };

    this._getRecentChangesMods = function() {
        return config["Mods"]["RecentChanges"];
    };

    this._getContributionsMods = function() {
        return config["Mods"]["Contributions"];
    };

    var save = function() {
        localStorage.setItem("WikiMonkey", JSON.stringify(config));
    };

    var saveEditor = function () {
        var text = $("#WikiMonkey-editor").val();

        try {
            // Upper-scope config
            config = JSON.parse(text)
        }
        catch (err) {
            if (text == DEFAULTS_REQUEST) {
                /*
                 * Setting config to {} will make it be completely overridden
                 * when the configuration is reloaded at the next refresh
                 */
                // Upper-scope config
                config = {};
                $("#WikiMonkey-editor").val("The configuration has been " +
                    "reset to the default values and will be available " +
                    "after refreshing the page.");
            }
            else {
                alert("Not a valid JSON object, the configuration has not " +
                                                                "been saved.");
                return false;
            }
        }

        save();
    };

    var resetEditor = function () {
        $("#WikiMonkey-editor").val(JSON.stringify(config, undefined, 4));
    };

    var requestDefaults = function () {
        $("#WikiMonkey-editor").val(DEFAULTS_REQUEST);
    };

    var importFile = function () {
        $("#WikiMonkey-import").trigger("click");
    };

    var doImportFile= function () {
        var file = this.files[0];
        var freader = new FileReader();

        freader.onload = function(fileLoadedEvent) {
            $("#WikiMonkey-editor").val(fileLoadedEvent.target.result);
        };

        freader.readAsText(file, "UTF-8");
    };

    var exportEditor = function () {
        var blob = new Blob([$("#WikiMonkey-editor").val()],
                                                        {type:'text/plain'});
        $("#WikiMonkey-export")
            .attr("href", window.URL.createObjectURL(blob))
            // .trigger("click"); doesn't work
            [0].click();
    };
};

WM.Diff = new function () {
    "use strict";

    this.getEndTimestamp = function (call, callArgs) {
        var title = decodeURIComponent(Alib.HTTP.getURIParameter(null,
                                                                    'title'));
        var diff = Alib.HTTP.getURIParameter(null, 'diff');
        var oldid = Alib.HTTP.getURIParameter(null, 'oldid');

        var giveEndTimestamp = function (page, id) {
            call(page.revisions[id].timestamp, callArgs);
        };

        switch (diff) {
            case 'next':
                WM.MW.callQuery({prop: "revisions",
                                 titles: title,
                                 rvlimit: "2",
                                 rvprop: "timestamp",
                                 rvdir: "newer",
                                 rvstartid: oldid},
                                 giveEndTimestamp,
                                 1,
                                 null);
                break;
            case 'prev':
                WM.MW.callQuery({prop: "revisions",
                                 revids: oldid,
                                 rvprop: "timestamp"},
                                 giveEndTimestamp,
                                 0,
                                 null);
                break;
            default:
                WM.MW.callQuery({prop: "revisions",
                                 revids: diff,
                                 rvprop: "timestamp"},
                                 giveEndTimestamp,
                                 0,
                                 null);
        }
    };
};

WM.Editor = new function () {
    "use strict";

    this.getTitle = function () {
        return WM.Parser.squashContiguousWhitespace(decodeURIComponent(
                                    Alib.HTTP.getURIParameter(null, 'title')));
    };

    this.isSection = function () {
        return (document.getElementsByName('wpSection')[0].value) ? true :
                                                                        false;
    };

    this.readSource = function () {
        var value = document.getElementById('wpTextbox1').value;
        // For compatibility with Opera and IE
        return Alib.Compatibility.normalizeCarriageReturns(value);
    };

    this.writeSource = function (text) {
        document.getElementById('wpTextbox1').value = text;
    };

    this.readSummary = function () {
        return document.getElementById('wpSummary').getAttribute("value");
    };

    this.writeSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value", text);
    };

    this.appendToSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value",
                                                    this.readSummary() + text);
    };
};

WM.Filters = new function () {
    "use strict";

    this._makeUI = function (plugins) {
        Alib.CSS.addStyleElement("#WikiMonkeyFilters-Select, " +
                    "#WikiMonkeyFilters-Apply {float:left;} " +
                    "#WikiMonkeyFilters-Select {width:100%; " +
                        "margin-right:-16em;} " +
                    "#WikiMonkeyFilters-Select > p {margin:0 17em 0 0;} " +
                    "#WikiMonkeyFilters-Select > p > select {width:100%;} " +
                    "#WikiMonkeyFilters-Apply > input[type='button'] " +
                        "{margin-right:1em;} " +
                    "#WikiMonkeyFilters-Apply > input[type='checkbox'] " +
                        "{margin-right:0.4em;} " +
                    "#WikiMonkeyFilters-Options {clear:both;}");

        var filters = [];
        var selectFilter = $('<select/>').change(updateFilterUI(filters));

        for (var pid in plugins) {
            var pluginConf = plugins[pid];
            var pluginName = pluginConf[0];
            var pluginInst = pluginConf[1];

            // This protects from configurations that define plugins
            // that are actually not installed
            // A try-catch doesn't work...
            if (!WM.Plugins[pluginName]) {
                continue;
            }

            // This allows to disable an entry by giving it any second
            // parameter that evaluates to false
            if (!pluginInst || !pluginInst.length) {
                continue;
            }

            filters.push(pluginConf);
            $('<option/>').text(pluginInst[pluginInst.length - 1])
                                                .appendTo(selectFilter);
        }

        if (filters.length) {
            var applyFilterDiv = $('<div/>')
                .attr('id', 'WikiMonkeyFilters-Apply');

            $('<input/>')
                .attr('type', 'button')
                .val('Apply filter')
                .click(executePlugin(filters))
                .appendTo(applyFilterDiv);

            $('<input/>')
                .attr('type', 'checkbox')
                .change(toggleLog)
                .appendTo(applyFilterDiv);

            $('<span/>')
                .text('Show Log')
                .appendTo(applyFilterDiv);

            var divFilter = $('<div/>')
                .attr('id', "WikiMonkeyFilters-Options");

            // This allows updateFilterUI replace it the first time
            $('<div/>').appendTo(divFilter);
            doUpdateFilterUI(divFilter, filters, 0);

            var selectFilterP = $('<p/>').append(selectFilter);

            var selectFilterDiv = $('<div/>')
                .attr('id', 'WikiMonkeyFilters-Select')
                .append(selectFilterP);

            return $('<div/>')
                .attr('id', 'WikiMonkeyFilters')
                .append(selectFilterDiv)
                .append(applyFilterDiv)
                .append(divFilter)
                [0];
        }
        else {
            return false;
        }
    };

    var updateFilterUI = function (filters) {
        return function (event) {
            var UI = $('#WikiMonkeyFilters-Options');
            var id = $('#WikiMonkeyFilters-Select')
                .find('select')
                .first()
                [0].selectedIndex;

            doUpdateFilterUI(UI, filters, id);
        };
    };

    var doUpdateFilterUI = function (UI, filters, id) {
        var makeUI = WM.Plugins[filters[id][0]].makeUI;

        if (makeUI instanceof Function) {
            UI.children().first().replaceWith(makeUI(filters[id][2]));
        }
        else {
            // Don't remove, otherwise if another plugin with interface is
            // selected, replaceWith won't work
            UI.children().first().replaceWith($('<div/>'));
        }
    };

    var executePlugin = function (filters) {
        return function (event) {
            var id = $('#WikiMonkeyFilters-Select')
                .find('select')
                .first()
                [0].selectedIndex;

            WM.Plugins[filters[id][0]].main(filters[id][2]);

            this.disabled = true;
        };
    };

    var toggleLog = function (event) {
        if (this.checked) {
            $('#WikiMonkeyLog').show();
        }
        else {
            $('#WikiMonkeyLog').hide();
        }
    };
};

WM.Interlanguage = new function () {
    "use strict";

    this.parseLinks = function (supportedLangs, source, iwmap) {
        var parsedLinks = WM.Parser.findSpecialLinks(
            source,
            supportedLangs.join("|")
        );

        var langlinks = [];
        for (var p in parsedLinks) {
            var link = parsedLinks[p];
            // Do not store the tag lowercased, since it should be kept as
            // original
            var ltag = link.namespace;
            var ltitle = link.title + ((link.fragment) ?
                                                ("#" + link.fragment) : "");
            for (var iw in iwmap) {
                if (iwmap[iw].prefix.toLowerCase() == ltag.toLowerCase()) {
                    // Fix the url _before_ replacing $1
                    var lurl = WM.MW.fixInterwikiUrl(iwmap[iw].url);
                    lurl = lurl.replace("$1", encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(ltitle)));
                    break;
                }
            }
            langlinks.push({
                lang: ltag,
                title: ltitle,
                url: lurl,
                index: link.index,
                length: link.length,
            });
        }

        return langlinks;
    };

    this.queryLinks = function (api, queryTitle, title, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) {
        var query = {
            action: "query",
            prop: "info|revisions",
            rvprop: "content|timestamp",
            intoken: "edit",
            titles: queryTitle,
            meta: "siteinfo",
            siprop: "interwikimap",
            sifilteriw: "local",
        }

        // When called by the bot, if the start page is a redirect itself, it
        // shoudln't be resolved
        if (!firstPage) {
            query.redirects = "1";
        }

        WM.MW.callAPIGet(
            query,
            api,
            function (res, args) {
                if (res.query.pages) {
                    var page = Alib.Obj.getFirstItem(res.query.pages);
                    if (page.revisions) {
                        var error = null;
                        var source = page.revisions[0]["*"];
                        var timestamp = page.revisions[0].timestamp;
                        var edittoken = page.edittoken;
                        var iwmap = res.query.interwikimap;
                        var langlinks = WM.Interlanguage.parseLinks(
                                                supportedLangs, source, iwmap);
                    }
                    else {
                        // The requested article doesn't exist
                        var error = 'nonexisting';
                        var source = false;
                        var timestamp = false;
                        var edittoken = false;
                        var iwmap = res.query.interwikimap;
                        var langlinks = false;
                    }
                }
                else if (res.query.redirects) {
                    // The requested article is an unsolved redirect
                    // (redirect over interwiki link?)
                    var error = 'unsolvedredirect';
                    var source = false;
                    var timestamp = false;
                    var edittoken = false;
                    var iwmap = res.query.interwikimap;
                    var langlinks = false;
                }
                else {
                    // Unknown error
                    var error = 'unknown';
                    var source = false;
                    var timestamp = false;
                    var edittoken = false;
                    var iwmap = res.query.interwikimap;
                    var langlinks = false;
                }

                callEnd(
                    api,
                    title,
                    supportedLangs,
                    whitelist,
                    false,
                    error,
                    langlinks,
                    iwmap,
                    source,
                    timestamp,
                    edittoken,
                    args
                );
            },
            callArgs,
            function (args) {
                callEnd(
                    api,
                    title,
                    supportedLangs,
                    whitelist,
                    false,
                    'unknown',
                    false,
                    false,
                    false,
                    false,
                    false,
                    args
                );
            }
        );
    };

    this.createNewLink = function (origTag, title, url) {
        return {
            origTag: origTag,
            title: title,
            url: url,
        };
    };

    this.createVisitedLink = function (origTag, title, url, iwmap, api, source,
                                                timestamp, edittoken, links) {
        var entry = {
            origTag: origTag,
            title: title,
            url: url,
            iwmap: iwmap,
            api: api,
            source: source,
            timestamp: timestamp,
            edittoken: edittoken,
            links: [],
        };
        for (var l in links) {
            entry.links.push(links[l]);
        }
        return entry;
    };

    this.collectLinks = function (visitedlinks, newlinks, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) {
        for (var tag in newlinks) {
            var link = newlinks[tag];
            break;
        }

        if (link) {
            delete newlinks[tag];

            var url = link.url;

            // Don't use WM.MW.getTitleFromWikiUrl(decodeURI(url)) because
            // it wouldn't decode some characters like colons, which are
            // required to be decoded instead when making an API call
            var queryTitle = decodeURIComponent(WM.MW.getTitleFromWikiUrl(
                                                                        url));

            if (queryTitle) {
                var origTag = link.origTag;
                var title = link.title;
                var api = WM.MW.getWikiUrls(url).api;

                // If this is the first processed page, it's local for sure, so
                //   query its links in any case. This e.g. prevents the
                //   application from crashing in case the local page is in a
                //   language whose language tag is not in the white list
                // tag is already lower-cased
                if (firstPage || whitelist.indexOf(tag) > -1) {
                    WM.Log.logInfo("Reading " +
                                WM.Log.linkToPage(url, "[[" + origTag + ":" +
                                title + "]]") + " ...");

                    this.queryLinks(
                        api,
                        queryTitle,
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        WM.Interlanguage._collectLinksContinue,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    );
                }
                else {
                    WM.Interlanguage._collectLinksContinue(
                        api,
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        'notinwhitelist',
                        null,
                        false,
                        null,
                        null,
                        null,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    );

                }
            }
            else {
                WM.Log.logWarning("Cannot extract the page title from " +
                            WM.Log.linkToPage(url, decodeURI(url)) +
                            ", removing it if it" +
                            " was linked from the processed article");
                WM.Interlanguage.collectLinks(
                    visitedlinks,
                    newlinks,
                    supportedLangs,
                    whitelist,
                    firstPage,
                    callEnd,
                    callArgs
                );
            }
        }
        else {
            callEnd(visitedlinks, callArgs);
        }
    };

    this._collectLinksContinue = function (api, title, supportedLangs,
                                whitelist, firstPage, error, langlinks,
                                iwmap, source, timestamp, edittoken, args) {
        var url = args[0];
        var tag = args[1];
        var origTag = args[2];
        var visitedlinks = args[3];
        var newlinks = args[4];
        var callEnd = args[5];
        var callArgs = args[6];

        if (error == 'nonexisting') {
            WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " seems to point " +
                                "to a non-existing article: removing it if " +
                                "it was linked from the processed article");
        }
        else {
            if (error == 'unsolvedredirect') {
                WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because it points to " +
                                "an external redirect");
            }
            else if (error == 'unknown') {
                WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because of an " +
                                "unspecified problem");
            }
            else if (error == 'notinwhitelist') {
                WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because " + tag +
                                " is not included in the whitelist defined " +
                                "in the configuration");
            }

            visitedlinks[tag] = WM.Interlanguage.createVisitedLink(origTag,
                                            title, url, iwmap, api, source,
                                            timestamp, edittoken, langlinks);

            for (var l in langlinks) {
                var link = langlinks[l];
                var nlink = newlinks[link.lang.toLowerCase()];
                var vlink = visitedlinks[link.lang.toLowerCase()];

                if (!vlink && !nlink) {
                    newlinks[link.lang.toLowerCase()] =
                                            WM.Interlanguage.createNewLink(
                                            link.lang, link.title, link.url);
                }
                else if (vlink && vlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"));
                }
                else if (nlink && nlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"));
                }
            }
        }

        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            firstPage,
            callEnd,
            callArgs
        );
    };

    this.updateLinks = function (lang, url, iwmap, source, oldlinks,
                                                                    newlinks) {
        lang = lang.toLowerCase();
        var linkList = [];

        for (var tag in newlinks) {
            if (tag != lang) {
                var link = newlinks[tag];
                var tagFound = false;

                // New links that were not in the white list will have the
                // "iwmap" attribute false, "timestamp" and "edittoken" null
                // and "links" as an empty array
                // Note the difference between 'iwmap' and 'link.iwmap'
                for (var iw in iwmap) {
                    if (iwmap[iw].prefix.toLowerCase() == tag.toLowerCase()) {
                        if (WM.MW.getWikiUrls(iwmap[iw].url).api == link.api) {
                            linkList.push("[[" + link.origTag + ":" +
                                                            link.title + "]]");
                        }
                        else {
                            WM.Log.logWarning("On " + WM.Log.linkToPage(url,
                                    "[[" + link.origTag + ":" + link.title +
                                    "]]") + " , " + tag + " interlanguage " +
                                    "links point to a different wiki than " +
                                    "the others, ignoring them");
                        }

                        tagFound = true;
                        break;
                    }
                }

                if (!tagFound) {
                    WM.Log.logWarning(tag + " interlanguage links are not " +
                        "supported in " + WM.Log.linkToPage(url, "[[" +
                        link.origTag + ":" + link.title + "]]") +
                        " , ignoring them");
                }
            }
        }

        linkList.sort(
            function (a, b) {
                // Sorting is case sensitive by default
                if (a.toLowerCase() > b.toLowerCase())
                    return 1;
                if (b.toLowerCase() > a.toLowerCase())
                    return -1;
                else
                    return 0;
            }
        );

        var cleanText = "";
        var textId = 0;

        for (var l in oldlinks) {
            var link = oldlinks[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);

        if (oldlinks.length) {
            // Insert the new links at the index of the first previous link
            var firstLink = oldlinks[0].index;
        }
        else {
            var firstLink = 0;
        }

        var parts = [];
        // Do not add empty strings to parts, otherwise when it's joined
        //   unnecessary line breaks will be added

        var head = cleanText.substring(0, firstLink).trim();

        if (head) {
            parts.push(head);
        }

        var links = linkList.join("\n");

        if (links) {
            parts.push(links);
        }

        var body = cleanText.substr(firstLink).trim();

        if (body) {
            parts.push(body);
        }

        // Make sure to preserve the original white space at the end, otherwise
        //   the final (newText != source) may return true even when no actual
        //   change has been made
        // Note that /\s+$/ would return null in the absence of trailing
        //   whitespace, so a further check should be made, while /\s*$/
        //   safely returns an empty string in that case
        var trailws = /\s*$/;

        return parts.join("\n") + trailws.exec(source);
    };
};

WM.Log = new function () {
    "use strict";

    this._makeLogArea = function () {
        Alib.CSS.addStyleElement("#WikiMonkeyLogArea {height:10em; " +
                        "border:2px solid #07b; padding:0.5em; " +
                        "overflow:auto; resize:vertical; " +
                        "background-color:#111;} " +
                    "#WikiMonkeyLogArea p.timestamp, " +
                        "#WikiMonkeyLog p.message {border:none; padding:0; " +
                        "font-family:monospace; color:#eee;} " +
                    "#WikiMonkeyLogArea p.timestamp {float:left; width:5em; " +
                        "margin:0 -5em 0 0; font-size:0.9em;} " +
                    "#WikiMonkeyLogArea p.message {margin:0 0 0.5em 5em;} " +
                    "#WikiMonkeyLogArea div.mhidden {display:none;} " +
                    "#WikiMonkeyLogArea div.mjson {display:none;} " +
                    "#WikiMonkeyLogArea div.mdebug p.message {color:cyan;} " +
                    "#WikiMonkeyLogArea div.minfo {} " +
                    // The .warning and .error classes are already used by
                    // MediaWiki, without associating them with an id and a tag
                    "#WikiMonkeyLogArea div.mwarning p.message " +
                        "{color:gold;} " +
                    "#WikiMonkeyLogArea div.merror p.message {color:red;} " +
                    "#WikiMonkeyLogArea a {color:inherit; " +
                                                "text-decoration:underline;}");

        var log = document.createElement('div');
        log.id = 'WikiMonkeyLog';

        var par = document.createElement('p');
        par.appendChild(makeFilterLink());
        par.appendChild(document.createTextNode(' '));
        par.appendChild(makeSaveLink());
        log.appendChild(par);

        var logarea = document.createElement('div');
        logarea.id = 'WikiMonkeyLogArea';
        log.appendChild(logarea);

        return log;
    };

    var makeFilterLink = function () {
        var link = document.createElement('a');
        link.href = '#WikiMonkey';
        link.innerHTML = computeFilterLinkAnchor();

        link.addEventListener("click", function () {
            // Change _currentInfoDisplayState *before* the loop, to prevent
            // race bugs
            WM.Log._currentInfoDisplayState = !WM.Log._currentInfoDisplayState;
            this.innerHTML = computeFilterLinkAnchor();

            var msgs = document.getElementById('WikiMonkeyLogArea'
                                            ).getElementsByClassName('minfo');

            for (var m = 0; m < msgs.length; m++) {
                msgs[m].style.display = computeInfoDisplayStyle();
            }

            scrollToBottom();
        }, false);

        return link;
    };

    var makeSaveLink = function () {
        var link = document.createElement('a');
        link.href = '#';
        link.download = 'WikiMonkey.log';
        link.innerHTML = '[save log]';
        link.id = 'WikiMonkeyLog-Save';

        link.addEventListener("click", function () {
            link.href = 'data:text/plain;charset=utf-8,' +
                                    encodeURIComponent(composeSaveLogText());
            link.download = composeSaveLogFilename();
        }, false);

        return link;
    };

    var classesToLevels = {'mhidden': 'HDN',
                           'mjson': 'JSN',
                           'mdebug': 'DBG',
                           'minfo': 'INF',
                           'mwarning': 'WRN',
                           'merror': 'ERR'};

    var composeSaveLogText = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        var divs = log.getElementsByTagName('div');
        var text = '';

        for (var d = 0; d < divs.length; d++) {
            var div = divs[d];
            var ps = div.getElementsByTagName('p');
            var tstamp = ps[0].innerHTML;
            var level = classesToLevels[div.className];
            var message = ps[1].innerHTML;

            text += tstamp + '\t' + level + '\t' + message + '\n';
        }

        return text;
    };

    var composeSaveLogFilename = function () {
        var date = new Date();
        return 'WikiMonkey-' + date.getFullYear() +
                        Alib.Str.padLeft(String(date.getMonth() + 1), '0', 2) +
                        Alib.Str.padLeft(String(date.getDate()), '0', 2) +
                        Alib.Str.padLeft(String(date.getHours()), '0', 2) +
                        Alib.Str.padLeft(String(date.getMinutes()), '0', 2) +
                        '.log';
    };

    this._currentInfoDisplayState = true;

    var computeInfoDisplayStyle = function () {
        return (WM.Log._currentInfoDisplayState) ? 'block' : 'none';
    };

    var computeFilterLinkAnchor = function () {
        return (WM.Log._currentInfoDisplayState) ? '[hide info messages]' :
                                                        '[show info messages]';
    };

    var scrollToBottom = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    };

    var appendMessage = function (text, type) {
        var tstamp = document.createElement('p');
        tstamp.className = 'timestamp';
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();

        var msg = document.createElement('p');
        msg.className = 'message';
        // Do not allow the empty string, otherwise the resulting html element
        // may not be rendered by the browser
        msg.innerHTML = (text) ? text : " ";

        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        line.className = type;

        if (type == 'minfo') {
            line.style.display = computeInfoDisplayStyle();
        }

        var log = document.getElementById('WikiMonkeyLogArea');

        var test = log.scrollTop + log.clientHeight == log.scrollHeight;

        log.appendChild(line);

        if (test) {
            scrollToBottom();
        }
    };

    this.logHidden = function (text) {
        appendMessage(text, 'mhidden');
    };

    this.logJson = function (component, data) {
        var text = JSON.stringify({"component": component, "data": data});
        appendMessage(text, 'mjson');
    };

    this.logDebug = function (text) {
        appendMessage(text, 'mdebug');
    };

    this.logInfo = function (text) {
        appendMessage(text, 'minfo');
    };

    this.logWarning = function (text) {
        appendMessage(text, 'mwarning');
    };

    this.logError = function (text) {
        appendMessage(text, 'merror');
    };

    this.linkToPage = function (url, anchor) {
        // Must return a string, not a DOM element
        return "<a href=\"" + url + "\">" + anchor + "</a>";
    };

    this.linkToWikiPage = function (title, anchor) {
        // Must return a string, not a DOM element
        // Use an absolute (full) URL so it will be usable in the downloadable
        //   version of the log
        // Do *not* use encodeURIComponent(title) because the passed title may
        //   have a fragment or a query string that would then be encoded
        //   MediaWiki should be able to correctly resolve the title anyway
        var wikiUrls = WM.MW.getWikiUrls();
        return "<a href=\"" + wikiUrls.short + title + "\">" + anchor + "</a>";
    };
};

WM.Menu = new function () {
    "use strict";

    this._makeUI = function (plugins) {
        Alib.CSS.addStyleElement(
                "#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");

        var mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
        var groupActions = {};

        for (var pid in plugins) {
            var pluginConf = plugins[pid];
            var pluginName = pluginConf[0];
            var pluginInst = pluginConf[1];

            // This protects from configurations that define plugins
            // that are actually not installed
            // A try-catch doesn't work...
            if (WM.Plugins[pluginName]) {
                var plugin = WM.Plugins[pluginName];
            }
            else {
                continue;
            }

            // This allows to disable an entry by giving it any second
            // parameter that evaluates to false
            if (!pluginInst || !pluginInst.length) {
                continue;
            }

            if (plugin.makeUI) {
                var groupAction = [warnInputNeeded, pluginConf[0]];
            }
            else {
                var groupAction = [executeEntryAction, [plugin, pluginConf]];
            }

            pluginInst.unshift("WikiMonkeyMenuRoot");
            var currId = false;

            for (var m = 0; m < pluginInst.length - 1; m++) {
                var parentId = currId;
                currId = pluginInst.slice(0, m + 1).join("-")
                                                    .replace(/ /g, "_");

                // I can't simply do $("#" + currId) because mainDiv
                // hasn't been added to the DOM tree yet
                var menuSel = mainDiv.children("div[id='" + currId + "']");

                if (!menuSel.length) {
                    var currMenu = $("<div/>")
                        .attr("id", currId)
                        .hide()
                        .appendTo(mainDiv);

                    groupActions[currId] = [];

                    if (m > 0) {
                        // I can't simply do $("#" + currId) because mainDiv
                        // hasn't been added to the DOM tree yet
                        var parentMenu = mainDiv.children("div[id='" +
                                                            parentId + "']");

                        $('<input/>')
                            .attr('type', 'button')
                            .val('<')
                            .addClass('margin')
                            .click(makeChangeMenu(currMenu, parentMenu))
                            .appendTo(currMenu);

                        $('<input/>')
                            .attr('type', 'button')
                            .val(pluginInst[m])
                            .click(makeGroupAction(groupActions[currId]))
                            .appendTo(parentMenu);

                        $('<input/>')
                            .attr('type', 'button')
                            .val('>')
                            .addClass('margin')
                            .click(makeChangeMenu(parentMenu, currMenu))
                            .appendTo(parentMenu);
                    }
                }
                else {
                    var currMenu = menuSel.first();
                }

                groupActions[currId].push(groupAction);
            }

            var entry = $("<input/>")
                .attr('type', 'button')
                .val(pluginInst[pluginInst.length - 1])
                .addClass('margin')
                .appendTo(currMenu);

            if (plugin.makeUI) {
                entry.click(makeEntryUI(currMenu, plugin, pluginConf));
            }
            else {
                entry.click(makeEntryAction(plugin, pluginConf));
            }
        }

        var menus = mainDiv.children();

        if (menus.length) {
            var execAll = $('<input/>')
                .attr('type', 'button')
                .val("*")
                .addClass('margin')
                .click(makeGroupAction(groupActions["WikiMonkeyMenuRoot"]));

            // I can't simply do $("#" + currId) because mainDiv
            // hasn't been added to the DOM tree yet
            mainDiv
                .children("div[id='WikiMonkeyMenuRoot']")
                .first()
                .prepend(execAll);

            menus.first().show();
            return mainDiv[0];
        }
        else {
            return false;
        }
    };

    var makeChangeMenu = function (currentMenu, changeMenu) {
        return function (event) {
            currentMenu.hide();
            changeMenu.show();
        };
    };

    var makeEntryUI = function (currMenu, plugin, pluginConf) {
        return function (event) {
            currMenu.hide();
            var UIdiv = $('<div/>');

            $('<input/>')
                .attr('type', 'button')
                .val('<')
                .addClass('margin')
                .click(function (event) {
                    UIdiv.remove();
                    currMenu.show();
                })
                .appendTo(UIdiv);

            $('<input/>')
                .attr('type', 'button')
                .val('Execute')
                .click(makeEntryAction(plugin, pluginConf))
                .appendTo(UIdiv);

            var UI = plugin.makeUI(pluginConf[2]);
            UIdiv.append(UI).insertAfter(currMenu);
        };
    };

    var makeEntryAction = function (plugin, pluginConf) {
        return function (event) {
            executeEntryAction([plugin, pluginConf], null);
        };
    };

    var executeEntryAction = function (args, callNext) {
        var plugin = args[0];
        var pluginConf = args[1];
        WM.Log.logHidden("Plugin: " + pluginConf[0]);
        plugin.main(pluginConf[2], callNext);
    };

    var warnInputNeeded = function (pluginName, callNext) {
        WM.Log.logWarning("Plugin " + pluginName +
            " was not executed because it requires input from its interface.");

        if (callNext) {
            callNext();
        }
    };

    var makeGroupAction = function (subGroupActions) {
        return function (event) {
            Alib.Async.executeAsync(subGroupActions, -1);
        };
    };
};

WM.Mods = new function () {
    "use strict";

    var changeHeadingNumberStyle = function (style) {
        Alib.CSS.addStyleElement("span.mw-headline-number {" + style + "}");
    };

    var disableEditSummarySubmitOnEnter = function () {
        $('#wpSummary').keydown(function(event) {
            // 'keyCode' is deprecated, but not all browsers support 'key' yet
            if (event.key == 'Enter' || (typeof event.key === 'undefined' &&
                                                        event.keyCode == 13)) {
                event.preventDefault();
                return false;
            }
        });
    };

    var hideRollbackLinks = function () {
        Alib.CSS.addStyleElement("span.mw-rollback-link {display:none;}");
    };

    var scrollToFirstHeading = function () {
        window.scrollTo(0, $('#firstHeading').offset().top);
    };

    this.applyGeneralMods = function() {
        var conf = WM.Cfg._getGeneralMods();
        if (conf['heading_number_style']) {
            changeHeadingNumberStyle(conf['heading_number_style']);
        }
    };

    this.applyEditorMods = function() {
        var conf = WM.Cfg._getEditorMods();
        if (conf['disable_edit_summary_submit_on_enter']) {
            disableEditSummarySubmitOnEnter();
        }
        if (conf['scroll_to_first_heading']) {
            scrollToFirstHeading();
        }
    };

    this.applyRecentChangesMods = function() {
        var conf = WM.Cfg._getRecentChangesMods();
        if (conf['hide_rollback_links']) {
            hideRollbackLinks();
        }
    };

    this.applyContributionsMods = function() {
        var conf = WM.Cfg._getContributionsMods();
        if (conf['hide_rollback_links']) {
            hideRollbackLinks();
        }
    };
};

WM.MW = new function () {
    "use strict";

    var wikiPaths = {
        known: {
            "^https?://[^\.]+\.wikipedia\.org": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^https?://wiki\.archlinux\.org": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^https?://wiki\.archlinux\.de": {
                short: "/title/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.fr": {
                short: "/",
                full: "/index.php",
                api: "/api.php"
            },
            "^https?://wiki\.archlinuxjp\.org": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ro": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archlinux\.fi": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^http://wiki\.archlinux\.se": {
                short: "/index.php?title=",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archtr\.org": {
                short: "/index.php?title=",
                full: "/wiki/index.php",
                api: "/wiki/api.php"
            },
            "^http://wiki\.archlinux\.rs": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ir": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
        },
        default_: {
            short: "/index.php?title=",
            full: "/index.php",
            api: "/api.php"
        }
    };

    var interwikiFixes = [
        ["https://wiki.archlinux.org/index.php/$1_(",
                                "https://wiki.archlinux.org/index.php/$1%20("]
    ];

    var getWikiPaths = function (href) {
        // It's necessary to keep this function in a private attribute,
        // otherwise localWikiPaths and localWikiUrls cannot be initialized
        for (var r in wikiPaths.known) {
            var re = new RegExp(r, "i");
            var match = re.exec(href);

            if (match) {
                var hostname = match[0];
                var paths = {};

                for (var p in wikiPaths.known[r]) {
                    paths[p] = wikiPaths.known[r][p];
                }

                break;
            }
        }

        if (!paths) {
            var hostname = Alib.HTTP.getUrlLocation(href).hostname;
            var paths = {};

            for (var p in wikiPaths.default_) {
                paths[p] = wikiPaths.default_[p];
            }
        }

        return [hostname, paths]
    };

    var localWikiPaths;
    var localWikiUrls;

    // This function must be run *after* getWikiPaths (!= this.getWikiPaths)
    (function () {
        var wpaths = getWikiPaths(location.href);
        var hostname = wpaths[0];

        localWikiPaths = wpaths[1];
        localWikiUrls = {};

        for (var key in localWikiPaths) {
            localWikiUrls[key] = hostname + localWikiPaths[key];
        }
    })();

    this.getWikiPaths = function (href) {
        if (href) {
            return getWikiPaths(href)[1];
        }
        else {
            return localWikiPaths;
        }
    };

    this.getWikiUrls = function (href) {
        if (href) {
            var wpaths = getWikiPaths(href);
            var hostname = wpaths[0];
            var paths = wpaths[1];

            var urls = {};

            for (var key in paths) {
                urls[key] = hostname + paths[key];
            }

            return urls;
        }
        else {
            return localWikiUrls;
        }
    };

    this.getTitleFromWikiUrl = function (url) {
        var title = Alib.HTTP.getURIParameters(url).title;

        // Test this *before* the short paths, in fact a short path may just be
        // the full one with the "title" parameter pre-added
        if (!title) {
            var pathname = Alib.HTTP.getUrlLocation(url).pathname;

            for (var r in wikiPaths.known) {
                var re = new RegExp(r, "i");
                var match = re.exec(url);

                if (match) {
                    if (pathname.indexOf(wikiPaths.known[r].short) == 0) {
                        title = pathname.substr(wikiPaths.known[r
                                                            ].short.length);
                    }
                    else {
                        title = false;
                    }

                    break;
                }
            }

            if (!title) {
                if (pathname.indexOf(wikiPaths.default_.short) == 0) {
                    title = pathname.substr(wikiPaths.default_.short.length);
                }
                else {
                    title = false;
                }
            }
        }

        return title;
    };

    this.failedQueryError = function (finalUrl) {
        return "Failed query: " + WM.Log.linkToPage(finalUrl, finalUrl) +
            "\nYou may have tried to use a " +
            "plugin which requires cross-origin HTTP requests, but you are " +
            "not using Greasemonkey (Firefox), Tampermonkey " +
            "(Chrome/Chromium), Violentmonkey (Opera) or a similar extension";
    };

    this.failedHTTPRequestError = function (err) {
        return "Failed HTTP request - " + err + "\nYou may have tried to " +
            "use a plugin which requires cross-origin HTTP requests, but " +
            "you are not using Greasemonkey (Firefox), Tampermonkey " +
            "(Chrome/Chromium), Violentmonkey (Opera) or a similar extension";
    };

    this.callAPIGet = function (params, api, call, callArgs, callError) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "GET",
            url: api + "?format=json" + joinParams(params),
            onload: function (res) {
                try {
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                    if (callError) {
                        callError(callArgs);
                    }
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIGet(params, api, call, callArgs, callError);
                }
                else if (callError) {
                    callError(callArgs);
                }
            }
        };

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    this.callAPIPost = function (params, api, call, callArgs, callError) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "POST",
            url: api,
            onload: function (res) {
                try {
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                    if (callError) {
                        callError(callArgs);
                    }
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIPost(params, api, call, callArgs, callError);
                }
                else if (callError) {
                    callError(callArgs);
                }
            }
        };

        var string = "format=json" + joinParams(params);

        // It's necessary to use try...catch because some browsers don't
        // support FormData yet and will throw an exception
        try {
            if (string.length > 8000) {
                query.data = new FormData();
                query.data.append("format", "json");
                for (var p in params) {
                    query.data.append(p, params[p]);
                }
                // Do not add "multipart/form-data" explicitly or the query
                //   will fail
                //query.headers = {"Content-type": "multipart/form-data"};
            }
            else {
                throw "string <= 8000 characters";
            }
        }
        catch (err) {
            query.data = string;
            query.headers = {"Content-type":
                                        "application/x-www-form-urlencoded"};
        }

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    var joinParams = function (params) {
        var string = "";
        for (var key in params) {
            string += ("&" + key + "=" + encodeURIComponent(params[key]));
        }
        return string;
    };

    this.callQuery = function (params, call, callArgs, callError) {
        params.action = "query";
        var callBack = function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            call(page, args);
        };
        this.callAPIGet(params, null, callBack, callArgs, callError);
    };

    this.callQueryEdit = function (title, call, callArgs) {
        var callBack = function (page, args) {
            var source = page.revisions[0]["*"];
            var timestamp = page.revisions[0].timestamp;
            var edittoken = page.edittoken;
            call(title, source, timestamp, edittoken, args);
        };
        this.callQuery({prop: "info|revisions",
                        rvprop: "content|timestamp",
                        intoken: "edit",
                        titles: title},
                        callBack,
                        callArgs,
                        null);
    };

    var userInfo;

    var getUserInfo = function (call) {
        var storeInfo = function (res, call) {
            userInfo = res;
            call();
        };

        if (!userInfo) {
            WM.MW.callAPIGet({action: "query",
                                meta: "userinfo",
                                uiprop: "groups"},
                                null,
                                storeInfo,
                                call,
                                null);
        }
        else {
            call();
        }
    };

    this.isLoggedIn = function (call, args) {
        getUserInfo(function () {
            var test = userInfo.query.userinfo.id != 0;
            call(test, args);
        });
    };

    this.getUserName = function (call, args) {
        getUserInfo(function () {
            call(userInfo.query.userinfo.name, args);
        });
    };

    this.isUserBot = function (call, args) {
        getUserInfo(function () {
            var groups = userInfo.query.userinfo.groups;
            var res = groups.indexOf("bot") > -1;
            call(res, args);
        });
    };

    this.getBacklinks = function (bltitle, blnamespace, call, callArgs) {
        var query = {action: "query",
                     list: "backlinks",
                     bltitle: bltitle,
                     bllimit: 500};

        if (blnamespace) {
            query.blnamespace = blnamespace;
        }

        this._getBacklinksContinue(query, call, callArgs, []);
    };

    this._getBacklinksContinue = function (query, call, callArgs, backlinks) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            backlinks = backlinks.concat(res.query.backlinks);
            if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                WM.MW._getBacklinksContinue(query, call, args, backlinks);
            }
            else {
                call(backlinks, args);
            }
        },
        callArgs, null);
    };

    this.getLanglinks = function (title, iwmap, call, callArgs) {
        var query = {action: "query",
                     prop: "langlinks",
                     titles: title,
                     lllimit: 500,
                     llurl: "1",
                     redirects: "1"};

        if (iwmap) {
            query.meta = "siteinfo";
            query.siprop = "interwikimap";
            query.sifilteriw = "local";
        }

        this._getLanglinksContinue(query, call, callArgs, [], null);
    };

    this._getLanglinksContinue = function (query, call, callArgs, langlinks,
                                                                    iwmap) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            langlinks = langlinks.concat(page.langlinks);

            if (res.query.interwikimap) {
                iwmap = res.query.interwikimap;
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
                delete query.sifilteriw;
            }

            if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                WM.MW._getLanglinksContinue(query, call, args, langlinks,
                                                                        iwmap);
            }
            else {
                call(langlinks, iwmap, args);
            }
        },
        callArgs, null);
    };

    this.getInterwikiMap = function (title, call, callArgs) {
        var query =

        WM.MW.callAPIGet(
            {action: "query",
             meta: "siteinfo",
             siprop: "interwikimap",
             sifilteriw: "local"},
            null,
            function (res, args) {
                call(res.query.interwikimap, args);
            },
            callArgs,
            null
        );
    };

    this.fixInterwikiUrl = function (url) {
        for (var f = 0; f < interwikiFixes.length; f++) {
            var furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1]);

            if (furl != url) {
                return furl;
            }
        }

        // Return the unmodified url if no replacement has been done
        return url;
    };

    this.getSpecialList = function (qppage, siprop, call, callArgs) {
        var query = {action: "query",
                     list: "querypage",
                     qppage: qppage,
                     qplimit: 500};

        if (siprop) {
            query.meta = "siteinfo";
            query.siprop = siprop;
        }

        this._getSpecialListContinue(query, call, callArgs, [], {});
    };

    this._getSpecialListContinue = function (query, call, callArgs, results,
                                                                    siteinfo) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.querypage.results);

            for (var key in res.query) {
                if (key != "querypage") {
                    siteinfo[key] = res.query[key];
                }
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
            }

            if (res["query-continue"]) {
                query.qpoffset = res["query-continue"].querypage.qpoffset;
                WM.MW._getSpecialListContinue(query, call, args, results,
                                                                    siteinfo);
            }
            else {
                call(results, siteinfo, args);
            }
        },
        callArgs, null);
    };

    this.getUserContribs = function (ucuser, ucstart, ucend, call, callArgs) {
        var query = {action: "query",
                    list: "usercontribs",
                    ucuser: ucuser,
                    ucprop: "",
                    ucstart: ucstart,
                    ucend: ucend,
                    uclimit: 500}

        this._getUserContribsContinue(query, call, callArgs, []);
    };

    this._getUserContribsContinue = function (query, call, callArgs, results) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.usercontribs);

            if (res["query-continue"]) {
                query.uccontinue = res["query-continue"].usercontribs
                                                                .uccontinue;
                WM.MW._getUserContribsContinue(query, call, args, results);
            }
            else {
                call(results, args);
            }
        },
        callArgs, null);
    };
};

WM.Parser = new function () {
    "use strict";

    this.squashContiguousWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the returned text
        return title.replace(/[_ ]+/g, " ");
    };

    this.neutralizeNowikiTags = function (source) {
        // Empty nowiki tags (<nowiki></nowiki>) must be neutralized as well,
        //   otherwise Tampermonkey will hang, see also
        //   https://github.com/kynikos/wiki-monkey/issues/133
        // Note that the concept of "nesting" doesn't make sense with <nowiki>
        //   tags, so do *not* use Alib.Str.findNestedEnclosures
        var OPENLENGTH = 8;
        var CLOSELENGTH = 9;
        var tags = Alib.Str.findSimpleEnclosures(source, /<nowiki>/i,
                                    OPENLENGTH, /<\/nowiki>/i, CLOSELENGTH);
        var maskedText = "";
        var prevId = 0;

        for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];

            if (tag[1]) {
                var maskLength = tag[1] - tag[0] + CLOSELENGTH;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = tag[1] + CLOSELENGTH;
                continue;
            }
            else {
                // If a <nowiki> tag is left open (no closing tag is found), it
                //   does its job until the end of the text
                // This also neutralizes the final \n, but it shouldn't matter
                var maskLength = source.substr(tag[0]).length;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = source.length;
                break;
            }
        }

        maskedText += source.substring(prevId);

        return maskedText;
    };

    this.dotEncode = function (text) {
        return encodeURIComponent(text).replace(/%/g, ".");
    };

    this.dotEncodeLinkBreakingFragmentCharacters = function (fragment) {
        // These characters are known to break internal links if found in
        //   fragments
        // This function is not tested on link paths or anchors!
        fragment = fragment.replace(/\[/g, ".5B");
        fragment = fragment.replace(/\]/g, ".5D");
        fragment = fragment.replace(/\{/g, ".7B");
        fragment = fragment.replace(/\}/g, ".7D");
        fragment = fragment.replace(/\|/g, ".7C");
        return fragment;
    };

    var prepareRegexpWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the title before passing it here
        return title.replace(/[_ ]+/g, "[_ ]+");
    };

    var prepareTitleCasing = function (pattern) {
        var firstChar = pattern.charAt(0);
        var fcUpper = firstChar.toUpperCase();
        var fcLower = firstChar.toLowerCase();
        if (fcUpper != fcLower) {
            pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1);
        }
        return pattern;
    };

    this.compareArticleTitles = function (title1, title2) {
        // Actually also namespaces should be kept into account,
        // e.g. 'Help:Title' and 'Help:title' should return true
        var t1 = prepareTitleCasing(this.squashContiguousWhitespace(title1
                                                                    ).trim());
        var t2 = prepareTitleCasing(this.squashContiguousWhitespace(title2
                                                                    ).trim());
        return t1 == t2;
    };

    this.findBehaviorSwitches = function (source, word) {
        source = this.neutralizeNowikiTags(source);
        var regExp;
        if (word) {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__",
                                                                        "gi");
        }
        else {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__(TOC|NOTOC|FORCETOC|NOEDITSECTION|" +
                    "NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|" +
                    "NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|" +
                    "NOINDEX|STATICREDIRECT|START|END)__", "gi");
        }
        return Alib.RegEx.matchAll(source, regExp);
    };

    var findLinksEngine = function (source, titlePattern, specialOnly,
                                                            caseSensitive) {
        // Links cannot contain other links, not even in the alternative text
        //   (only the innermost links are valid)
        // Make sure to prepare whitespace in titlePattern like in
        //   prepareRegexpWhitespace
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var flags = (caseSensitive) ? "" : "i";
        // The following colon/space combinations are valid
        //   "[[a:b#c|d]]"
        //   "[[ a:b#c|d]]"
        //   "[[ :a:b#c|d]]"
        //   "[[ : a:b#c|d]]"
        //   "[[:a:b#c|d]]"
        //   "[[: a:b#c|d]]"
        //   "[[::a:b#c|d]]"
        //   "[[: :a:b#c|d]]"
        //   "[[:: a:b#c|d]]"
        //   "[[: : a:b#c|d]]"
        // A link like "[[ ::a:b#c|d]]" isn't valid, but it would still be
        //   found when specialOnly is false (bug #166)
        var special = (specialOnly) ? "(?:[ _]+:)?[ _]*" :
                                                        "(?:\\:?[ _]*){0,2}";
        var regExp = new RegExp("^" + special + "(" + titlePattern + ")" +
                    "[ _]*(?:\\|[_\\s]*([\\s\\S]+?)[_\\s]*)?[_\\s]*$", flags);
        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var links = [];
        var dbraces = Alib.Str.findInnermostEnclosures(nSource, "[[", "]]");

        for (var e = 0; e < dbraces.length; e++) {
            var dbrace = dbraces[e];
            var inText = source.substring(dbrace[0] + 2, dbrace[1]);
            var match = regExp.exec(inText);

            if (match) {
                var push = true;

                if (match[6]) {
                    // Incomplete templates in the alternative text have an
                    //   apparently weird behaviour, hard to reverse-engineer,
                    //   so issue a warning when one is found
                    //   See also the examples in findTransclusionArguments
                    // Note that the title already doesn't allow "{" or "}"
                    var nText = WM.Parser.neutralizeNowikiTags(match[6]);
                    var maskedText = Alib.Str.findNestedEnclosures(nText, "{{",
                                                                "}}", "x")[1];

                    if (maskedText.search(/(\{\{|\}\})/) > -1) {
                        WM.Log.logWarning("[[" + match[0] + "]] seems to " +
                            "contain part of a template, and the resulting " +
                            "behaviour cannot be predicted by this " +
                            "function, so the link will be ignored " +
                            "altogether");
                        push = false;
                    }
                }

                if (push) {
                    links.push({"rawLink": "[[" + match[0] + "]]",
                                "link": match[1],
                                "rawTitle": match[2],
                                "namespace": match[3],
                                "title": match[4],
                                "fragment": match[5],
                                "anchor": match[6],
                                "index": dbrace[0],
                                "length": dbrace[1] + 2 - dbrace[0]});
                }
            }
        }

        return links;
    };

    this.findSectionLinks = function (source) {
        // Keep the capturing groups as required by findLinksEngine
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "(()())#(" + fragmentChars + ")";
        return findLinksEngine(source, titlePattern, false, true);
    }

    this.findInternalLinks = function (source, namespace, title) {
        // Keep the capturing groups as required by findLinksEngine
        var namespaceChars = "[^\\n\\{\\}\\[\\]\\|\\:\\#]+?";
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";

        if (namespace) {
            var rens = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                namespace));

            if (title) {
                var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces wouldn't be case-sensitive, but titles are, so be
                //   safe and don't use the i flag
                var caseSensitive = true;
            }
            else {
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces aren't case-sensitive
                var caseSensitive = false;
            }
        }
        else if (title) {
            var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));

            // Keep the capturing groups as required by findLinksEngine
            var titlePattern = "(()(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

            // Titles are case-sensitive
            var caseSensitive = true;
        }
        else {
            var titlePattern = "((?:(" + namespaceChars + ")[ _]*:[ _]*)?" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
            var caseSensitive = true;
        }

        return findLinksEngine(source, titlePattern, false, caseSensitive);
    };

    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };

    this.findSpecialLinks = function (source, pattern) {
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Keep the capturing groups as required by findLinksEngine
        // See also WM.ArchWiki.findAllInterlanguageLinks
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "((" + pattern + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
        // Categories and language tags aren't case-sensitive
        return findLinksEngine(source, titlePattern, true, false);
    };

    this.findCategories = function (source) {
        return this.findSpecialLinks(source, "Category");
    };

    this.findInterlanguageLinks = function (source, language) {
        // See also WM.ArchWiki.findAllInterlanguageLinks
        return this.findSpecialLinks(source, Alib.RegEx.escapePattern(
                                                                    language));
    };

    this.findVariables = function (source, variable) {
        // There don't seem to exist variable names with whitespace, applying
        //   prepareRegexpWhitespace could be dangerous in this case
        var pattern = Alib.RegEx.escapePattern(variable);
        return this.findVariablesPattern(source, pattern);
    };

    this.findVariablesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // There can't be an underscore before the variable name
        // There can't be a whitespace between the variable name and the colon
        var nSource = this.neutralizeNowikiTags(source);
        var results = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);

            // Variables are case-sensitive
            // Do *not* use the g flag, or when using RegExp.exec the index
            //   will have to be reset at every loop
            var regExp = new RegExp("^\\s*(" + pattern + ")" +
                                        "(?:\\:\\s*([\\s\\S]*?))?\\s*$", "");
            var match = regExp.exec(inText);

            if (match) {
                results.push({"rawVariable": "{{" + match[0] + "}}",
                            "name": match[1],
                            "value": match[2],
                            "index": dbracket[0],
                            "length": dbracket[1] + 2 - dbracket[0]});
            }
        }

        return results;
    };

    var findTransclusionsEngine = function (source, pattern, templatesOnly) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // The difference between generic transclusions and templates is the
        //   possibility of a colon before the title which forces the
        //   transclusion of a page instead of a template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        // Template names are case-sensitive, just make sure to prepare them
        //   with prepareTitleCasing
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var regExp = new RegExp("^(\\s*" + ((templatesOnly) ? "" : ":?") +
                                        "[_ ]*(" + pattern + ")[_ ]*\\s*)" +
                                        "(?:\\|([\\s\\S]*))?$", "");

        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var transclusions = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);
            var match = regExp.exec(inText);

            if (match) {
                // 3 is the length of "{{" + the first "|"
                var argIndex = dbracket[0] + match[1].length + 3;

                transclusions.push({
                    "rawTransclusion": "{{" + match[0] + "}}",
                    "title": match[2],
                    "index": dbracket[0],
                    "length": dbracket[1] - dbracket[0] + 2,
                    "arguments": findTransclusionArguments(match, argIndex),
                });
            }
        }

        return transclusions;
    };

    var findTransclusionArguments = function (match, argIndex) {
        var rawArguments = match[3];
        var args = [];

        if (rawArguments) {
            var nArgs = WM.Parser.neutralizeNowikiTags(rawArguments);

            // Mask any inner links, so that their "|" characters won't be
            //   interpreted as belonging to the template
            //   Note that double braces ("[[]]") "escape" a pipe in a template
            //   argument even if a link is not correctly formed, e.g. [[|]] or
            //   using unallowed characters etc.
            var maskedArgs = Alib.Str.findNestedEnclosures(nArgs, "[[", "]]",
                                                                    "x")[1];

            // Mask any inner templates, so that their "|" characters won't be
            //   interpreted as belonging to the outer template
            maskedArgs = Alib.Str.findNestedEnclosures(maskedArgs, "{{", "}}",
                                                                    "x")[1];

            // Also tables would have pipes, but using tables inside templates
            //   doesn't seem to be supported by MediaWiki, except if enclosing
            //   them in special parser functions, e.g.
            //   http://www.mediawiki.org/wiki/Extension:Pipe_Escape which
            //   would then be safely masked by the function above

            // Incomplete links and templates in the arguments text have an
            //   apparently weird behaviour, hard to reverse-engineer, so issue
            //   a warning when one is found
            //   Try for example the following cases:
            //     000{{hc|BBB[[AAA|ZZZ}}CCC]]111
            //     000{{hc|BBB[[AAA}}CCC|ZZZ]]111
            //     000[[BBB{{hc|AAA|ZZZ]]CCC}}111
            //     000{{hc|BBB[[AAA|ZZZ}}[[KKK]]111000{{hc|AAA|BBB}}111
            //     {{bc|{{Accuracy|[[test}}]]}}
            //     {{bc|{{Accuracy|[[test|}}]]}}
            //     {{Accuracy|[[}}]]
            //     {{Accuracy|[[test|}}]]
            //     [[{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]
            //     [[test|{{ic|aaa]]}}
            //   Note that the title already doesn't allow "{", "}", "[" nor
            //     "]"
            if (maskedArgs.search(/(\{\{|\}\}|\[\[|\]\])/) > -1) {
                WM.Log.logWarning("{{" + match[0] + "}} seems to " +
                    "contain part of a link or template, and the resulting " +
                    "behaviour cannot be predicted by this function, so " +
                    "the whole template will be ignored altogether");
            }
            else {
                var mArgs = maskedArgs.split("|");
                var relIndex = 0;

                for (var m = 0; m < mArgs.length; m++) {
                    var mArgument = mArgs[m];
                    var argL = mArgument.length;
                    var argument = rawArguments.substr(relIndex, argL);
                    var eqIndex = mArgument.indexOf("=");

                    // eqIndex must be > 0, not -1, in fact the key must not be
                    //   empty
                    if (eqIndex > 0) {
                        var rawKey = argument.substring(0, eqIndex);
                        var reKey = /^(\s*)(.+?)\s*$/;
                        var keyMatches = reKey.exec(rawKey);
                        var key = keyMatches[2];
                        var keyIndex = argIndex + ((keyMatches[1]) ?
                                                    keyMatches[1].length : 0);

                        // 1 is the length of "="
                        var value = argument.substr(eqIndex + 1);
                        var valueIndex = argIndex + keyMatches[0].length + 1;
                    }
                    else {
                        var key = null;
                        var keyIndex = null;
                        var value = argument;
                        var valueIndex = argIndex;
                    }

                    args.push({key: key,
                                    key_index: keyIndex,
                                    value: value,
                                    value_index: valueIndex});

                    // 1 is the length of "|"
                    relIndex += argL + 1;
                }
            }
        }

        return args;
    };

    this.findTemplates = function (source, template) {
        if (template) {
            var pattern = Alib.RegEx.escapePattern(template);
            pattern = prepareRegexpWhitespace(pattern);
            pattern = prepareTitleCasing(pattern);
        }
        else {
            var pattern = "[^\\n\\{\\}\\[\\]\\||\\#]+?";
        }

        return this.findTemplatesPattern(source, pattern);
    };

    this.findTemplatesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Templates can't be transcluded with a colon before the title
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        return findTransclusionsEngine(source, pattern, true);
    };

    this.findTransclusions = function (source, namespace, title) {
        // The difference from templates is the possibility of a colon before
        //   the title which forces the transclusion of a page instead of a
        //   template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        var titleChars = "[^\\n\\{\\}\\[\\]\\||\\#]+?";

        if (namespace) {
            var namespacePattern = Alib.RegEx.escapePattern(namespace);
            namespacePattern = prepareRegexpWhitespace(namespacePattern);
            namespacePattern = prepareTitleCasing(namespacePattern);
        }

        if (title) {
            var titlePattern = Alib.RegEx.escapePattern(title);
            titlePattern = prepareRegexpWhitespace(titlePattern);
            titlePattern = prepareTitleCasing(titlePattern);
        }

        if (namespacePattern && titlePattern) {
            var pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern;
        }
        else if (!namespacePattern && titlePattern) {
            var pattern = titlePattern;
        }
        else if (namespacePattern && !titlePattern) {
            var pattern = namespacePattern + "[ _]*:" + titleChars;
        }
        else {
            var pattern = titleChars;
        }

        return findTransclusionsEngine(source, pattern, false);
    };

    this.findSectionHeadings = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;

        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^(\=+([ _]*(.+?)[ _]*)\=+)[ \t]*$/gm;
        var match, line, rawheading, heading, cleanheading, L0, L1, level,
                                            prevLevels, start, end, tocPeer;

        while (true) {
            match = regExp.exec(source);

            if (match) {
                L0 = match[0].length;
                line = match[1];
                rawheading = match[2];
                heading = match[3];
                cleanheading = WM.Parser.squashContiguousWhitespace(heading);
                L1 = line.length;
                level = 1;
                start = "=";
                end = "=";

                // ==Title=== and ===Title== are both 2nd levels and so on
                // (the shortest sequence of = between the two sides is
                //  considered)

                // = and == are not titles
                // === is read as =(=)=, ==== is read as =(==)= (both 1st
                //                                               levels)
                // ===== is read as ==(=)== (2nd level) and so on

                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L1 - level - 1, 1);

                    if (L1 - level * 2 > 2 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level > MAXLEVEL) {
                            level = MAXLEVEL;
                        }
                        else if (level < minLevel) {
                            minLevel = level;
                        }
                        break;
                    }
                }

                if (level == minLevel) {
                    tocLevel = 1;
                    prevLevels = {};
                    prevLevels[level] = 1;
                    prevLevels.relMax = level;
                    if (maxTocLevel == 0) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level > prevLevels.relMax) {
                    tocLevel++;
                    prevLevels[level] = tocLevel;
                    prevLevels.relMax = level;
                    if (tocLevel > maxTocLevel) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level < prevLevels.relMax) {
                    if (prevLevels[level]) {
                        tocLevel = prevLevels[level];
                    }
                    else {
                        // tocPeer is the level immediately greater than the
                        // current one, and it should have the same tocLevel
                        // I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax;
                        for (var pLevel in prevLevels) {
                            if (pLevel > level && pLevel < tocPeer) {
                                tocPeer = pLevel;
                            }
                        }
                        tocLevel = prevLevels[tocPeer];
                        prevLevels[level] = tocLevel;
                    }
                    prevLevels.relMax = level;
                }

                sections.push({line: line,
                               rawheading: rawheading,
                               heading: heading,
                               cleanheading: cleanheading,
                               level: level,
                               tocLevel: tocLevel,
                               index: (regExp.lastIndex - L0),
                               length0: L0,
                               length1: L1});
            }
            else {
                break;
            }
        }

        // Articles without sections
        if (maxTocLevel == 0) {
            minLevel = 0;
        }

        return {sections: sections,
                minLevel: minLevel,
                maxTocLevel: maxTocLevel};
    };
};

WM.Tables = new function () {
    "use strict";

    this.appendRow = function (source, mark, values) {
        var lastId = source.lastIndexOf('|}' + mark);
        var endtable = (lastId > -1) ? lastId : source.lastIndexOf('|}');

        var row = "|-\n|" + values.join("\n|") + "\n";

        var newText = Alib.Str.insert(source, row, endtable);

        return newText;
    };
};

WM.UI = new function () {
    "use strict";

    this._makeUI = function () {
        var nextNode, UI;
        var display = true;
        var displayLog = true;

        WM.Mods.applyGeneralMods();

        if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel'
                                                    ).parentNode.nextSibling;
            var conf = WM.Cfg._getEditorPlugins();
            UI = (conf) ? WM.Menu._makeUI(conf) : null;
            WM.Mods.applyEditorMods();
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent'
                                            ).getElementsByTagName('h2')[0];
            var conf = WM.Cfg._getDiffPlugins();
            UI = (conf) ? WM.Menu._makeUI(conf) : null;
        }
        else if (document.getElementById('mw-subcategories') ||
                                        document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-pages'), 0, "Pages"],
                            [document.getElementById('mw-subcategories'), 0,
                            "Subcategories"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent'
                                ).getElementsByTagName('form')[0].nextSibling;
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-whatlinkshere-list'),
                            0, "Pages"]]) : null;
            display = false;
        }
        else if (document.body.classList.contains('mw-special-LinkSearch') &&
                                        document.getElementById('bodyContent'
                                        ).getElementsByTagName('ol')[0]) {
            nextNode = document.getElementsByClassName('mw-spcontent')[0];
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                        [[document.getElementById('bodyContent'
                        ).getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-prefixindex-list-table')) {
            nextNode = document.getElementById('mw-prefixindex-list-table');
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
            display = false;
        }
        /*
         * Making the interface shouldn't rely on saved configuration, in order
         * to always make it possible to fix a misconfiguration
         */
        else if (document.getElementById('mw-prefs-form')) {
            WM.Cfg._makeUI();
        }
        else {
            var wikiUrls = WM.MW.getWikiUrls();
            var patt1A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])SpecialPages", '');
            var patt1B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])SpecialPages", '');
            var patt2A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])RecentChanges", '');
            var patt2B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])RecentChanges", '');
            var patt3A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])NewPages", '');
            var patt3B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])NewPages", '');
            var patt4A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])ProtectedPages", '');
            var patt4B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])ProtectedPages", '');
            var patt5A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])Contributions", '');
            var patt5B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])Contributions", '');

            if (location.href.search(patt1A) > -1 ||
                                        location.href.search(patt1B) > -1) {
                nextNode = document.getElementById('bodyContent');
                var conf = WM.Cfg._getSpecialPlugins();
                UI = (conf) ? WM.Menu._makeUI(conf) : null;
            }
            else if (location.href.search(patt2A) > -1 ||
                                        location.href.search(patt2B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('h4')[0];
                var conf = WM.Cfg._getRecentChangesPlugins();
                UI = (conf) ? WM.Filters._makeUI(conf) : null;
                displayLog = false;
                WM.Mods.applyRecentChangesMods();
            }
            else if (location.href.search(patt3A) > -1 ||
                                        location.href.search(patt3B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0];
                var conf = WM.Cfg._getNewPagesPlugins();
                UI = (conf) ? WM.Filters._makeUI(conf) : null;
                displayLog = false;
            }
            else if (location.href.search(patt4A) > -1 ||
                                        location.href.search(patt4B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                    [[document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0],
                                    0, "Pages"]]) : null;
                display = false;
            }
            else if (location.href.search(patt5A) > -1 ||
                                        location.href.search(patt5B) > -1) {
                WM.Mods.applyContributionsMods();
            }
            else if (document.getElementsByClassName('mw-spcontent'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName('mw-spcontent')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                    [[nextNode.getElementsByTagName('ol')[0],
                                    0, "Pages"]]) : null;
                display = false;
            }
            else if (document.getElementsByClassName('mw-allpages-table-chunk'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName(
                                                'mw-allpages-table-chunk')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
                display = false;
            }
        }

        if (UI) {
            Alib.CSS.addStyleElement("#WikiMonkey {position:relative;} " +
                        "#WikiMonkey fieldset {margin:0 0 1em 0;}");

            var main = document.createElement('fieldset');
            main.id = 'WikiMonkey';

            var legend = document.createElement('legend');
            legend.appendChild(document.createTextNode('Wiki Monkey '));

            var hide = document.createElement('a');
            hide.href = '#WikiMonkey';
            hide.innerHTML = '[hide]';
            hide.addEventListener("click", function () {
                var wmmain = document.getElementById('WikiMonkeyMain');
                if (wmmain.style.display == 'none') {
                    wmmain.style.display = 'block';
                    this.innerHTML = '[hide]';
                }
                else {
                    wmmain.style.display = 'none';
                    this.innerHTML = '[show]';
                }
                return false;
            }, false);
            legend.appendChild(hide);

            legend.appendChild(document.createTextNode(' '));

            var conf = document.createElement('a');
            conf.href = WM.MW.getWikiPaths().short +
                                            'Special:Preferences#wiki-monkey';
            conf.innerHTML = '[conf]';
            legend.appendChild(conf);

            legend.appendChild(document.createTextNode(' '));

            var help = document.createElement('a');
            help.href = 'https://github.com/kynikos/wiki-monkey/wiki'
            help.innerHTML = '[help]';
            legend.appendChild(help);

            main.appendChild(legend);

            var main2 = document.createElement('div');
            main2.id = 'WikiMonkeyMain';

            main2.appendChild(UI);

            var logArea = WM.Log._makeLogArea();
            if (!displayLog) {
                logArea.style.display = 'none';
            }
            main2.appendChild(logArea);

            if (!display) {
                main2.style.display = 'none';
                hide.innerHTML = '[show]';
            }
            main.appendChild(main2);

            nextNode.parentNode.insertBefore(main, nextNode);

            WM.Log.logHidden('Wiki Monkey version: ' + GM_info.script.version);
            var date = new Date();
            WM.Log.logHidden('Date: ' + date.toString());
            WM.Log.logHidden('URL: ' + location.href);
        }
    };
};

WM.WhatLinksHere = new function () {
    "use strict";

    this.isWhatLinksHerePage = function () {
        return (document.getElementById('mw-whatlinkshere-list')) ? true :
                                                                        false;
    };

    this.getTitle = function () {
        return document.getElementById('contentSub').getElementsByTagName('a'
                                                                    )[0].title;
    };
};

WM.Plugins.ExpandContractions = new function () {
    "use strict";

    var replace = function (source, regExp, newString, checkString,
                                                                checkStrings) {
        var newtext = source.replace(regExp, newString);
        if (checkStrings.length > 1 && newtext != source) {
            WM.Log.logWarning("Replaced some \"" + checkString + "\" with \"" +
                        checkStrings[0] + "\": check that it didn't mean \"" +
                        checkStrings.slice(1).join("\" or \"") + "\" instead");
        }
        return newtext;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;

        // Ignoring "I" since writing in 1st person isn't formal anyway
        // Note that JavaScript doesn't support look behind :(
        // Pay attention to preserve the original capitalization

        newtext = replace(newtext, /([a-z])'re/ig, '$1 are', "'re", ["are"]);
        newtext = replace(newtext, /([a-z])'ve/ig, '$1 have', "'ve", ["have"]);
        newtext = replace(newtext, /([a-z])'ll/ig, '$1 will', "'ll",
                                                            ["will", "shall"]);
        newtext = replace(newtext, /([a-z])'d/ig, '$1 would', "'d",
                                                            ["would", "had"]);
        newtext = replace(newtext, /(c)an't/ig, '$1annot', "can't",
                                                                ["cannot"]);
        newtext = replace(newtext, /(w)on't/ig, '$1ill not', "won't",
                                                                ["will not"]);
        newtext = replace(newtext, /([a-z])n't/ig, '$1 not', "n't", ["not"]);
        newtext = replace(newtext, /(here|there)'s/ig, '$1 is', "here/there's",
                                        ["here/there is", "here/there has"]);
        newtext = replace(newtext, /(g)onna/ig, '$1oing to', "gonna",
                                                                ["going to"]);
        // Replacing he's, she's, that's, what's, where's, who's ... may be too
        //   dangerous
        newtext = replace(newtext, /([a-z])'s (been)/ig, '$1 has $2',
                                                    "'s been", ["has been"]);
        newtext = replace(newtext, /(let)'s/ig, '$1 us', "let's", ["let us"]);
        newtext = replace(newtext, /(it)'(s own)/ig, '$1$2', "it's own",
                                                                ["its own"]);

        var ss = newtext.match(/[a-z]'s/gi);
        if (ss) {
            WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": " +
                    "check if they can be replaced with \"is\", \"has\", ...");
        }

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Expanded contractions");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.FixBacklinkFragments = new function () {
    "use strict";

    this.makeBotUI = function (args) {
        Alib.CSS.addStyleElement("#WikiMonkey-FixBacklinkFragments " +
                                "input[type='text'] {margin-left:0.33em;}");

        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-FixBacklinkFragments";

        var label = document.createElement('span');
        label.innerHTML = 'Target page:';
        divMain.appendChild(label);

        var target = document.createElement('input');
        target.setAttribute('type', 'text');
        target.id = "WikiMonkey-FixBacklinkFragments-Target";

        if (WM.WhatLinksHere.isWhatLinksHerePage()) {
            target.value = WM.WhatLinksHere.getTitle();
        }

        divMain.appendChild(target);

        return divMain;
    };

    var readTarget = function () {
        return document.getElementById(
                            "WikiMonkey-FixBacklinkFragments-Target").value;
    };

    var fixLinks = function (source, target, sections) {
        // Note that it's impossible to recognize any namespaces in the title
        //   without querying the server
        // Alternatively, a list of the known namespaces could be maintained
        //   for each wiki
        // Recognizing namespaces would let recognize more liberal link
        //   syntaxes (e.g. spaces around the colon)
        var links = WM.Parser.findInternalLinks(source, null, target);

        var newText = "";
        var prevId = 0;

        for (var l = 0; l < links.length; l++) {
            var link = links[l];

            newText += source.substring(prevId, link.index);
            var newlink = link.rawLink;

            var rawfragment = link.fragment;

            if (rawfragment) {
                var fixedFragment = fixFragment(rawfragment, sections);

                if (fixedFragment === true) {}
                else if (fixedFragment) {
                    var oldlink = newlink;
                    newlink = "[[" + target + "#" + fixedFragment +
                        ((link.anchor) ? "|" + link.anchor : "") + "]]";
                    WM.Log.logInfo("Fixed broken link fragment: " + oldlink +
                        " -> " + WM.Log.linkToWikiPage(link.link, newlink));
                }
                else {
                    WM.Log.logWarning("Cannot fix broken link fragment: " +
                                    WM.Log.linkToWikiPage(link.link, newlink));
                }
            }

            newText += newlink;
            prevId = link.index + link.length;
        }
        newText += source.substr(prevId);

        // Without this check this plugin would be specific to ArchWiki
        if (location.hostname == 'wiki.archlinux.org') {
            newText = fixArchWikiLinks(newText, target, sections);
        }

        return newText;
    };

    var fixArchWikiLinks = function (source, target, sections) {
        var links = WM.Parser.findTemplates(source, 'Related');

        var newText1 = "";
        var prevId = 0;

        for (var l = 0; l < links.length; l++) {
            newText1 += source.substring(prevId, links[l].index);
            newText1 += fixArchWikiLink(target, sections, links[l], 1);
            prevId = links[l].index + links[l].length;
        }
        newText1 += source.substr(prevId);

        var links2 = WM.Parser.findTemplates(newText1, 'Related2');

        var newText2 = "";
        var prevId = 0;

        for (var l = 0; l < links2.length; l++) {
            newText2 += newText1.substring(prevId, links2[l].index);
            newText2 += fixArchWikiLink(target, sections, links2[l], 2);
            prevId = links2[l].index + links2[l].length;
        }
        newText2 += newText1.substr(prevId);

        return newText2;
    };

    var fixArchWikiLink = function (target, sections, template, expectedArgs) {
        var args = template.arguments;

        // Don't crash in case of malformed templates
        if (args.length == expectedArgs) {
            var link = args[0].value;
            var fragId = link.indexOf('#');

            if (fragId > -1) {
                var ltitle = link.substring(0, fragId);

                // Note that it's impossible to recognize any namespaces in the
                //   title without querying the server
                // Alternatively, a list of the known namespaces could be
                //   maintained for each wiki
                // Recognizing namespaces would let recognize more liberal link
                //   syntaxes (e.g. spaces around the colon)
                if (WM.Parser.compareArticleTitles(ltitle, target)) {
                    var rawfragment = link.substr(fragId + 1);
                    var fixedFragment = fixFragment(rawfragment, sections);

                    if (fixedFragment === true) {
                        // Don't do anything in this case
                    }
                    else if (fixedFragment) {
                        var anchor = (args[1]) ? ("|" + args[1].value) : "";
                        var newlink = "{{" + template.title + "|" + target +
                                        "#" + fixedFragment  + anchor + "}}";
                        WM.Log.logInfo("Fixed broken link fragment: " +
                                        template.rawTransclusion + " -> " +
                                        WM.Log.linkToWikiPage(link, newlink));
                        return newlink;
                    }
                    else {
                        WM.Log.logWarning("Cannot fix broken link fragment: " +
                                                    WM.Log.linkToWikiPage(link,
                                                    template.rawTransclusion));
                    }
                }
            }
        }
        else {
            WM.Log.logWarning("Template:" + template.title + " must have " +
                        expectedArgs + " and only " + expectedArgs +
                        ((expectedArgs > 1) ? " arguments: " : " argument: ") +
                        template.rawTransclusion);
        }

        return template.rawTransclusion;
    };

    var fixFragment = function (rawfragment, sections) {
        if (rawfragment) {
            var fragment = WM.Parser.squashContiguousWhitespace(rawfragment
                                                                    ).trim();

            if (sections.indexOf(fragment) < 0) {
                for (var s = 0; s < sections.length; s++) {
                    var section = sections[s];

                    // The FixFragments and FixLinkFragments plugins also try
                    // to fix dot-encoded fragments however it's too dangerous
                    // to do it with this bot plugin, have the user fix
                    // fragments manually
                    if (section.toLowerCase() == fragment.toLowerCase()) {
                        return section;
                    }
                }
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var summary = args;

        var target = readTarget();
        WM.Log.logHidden("Target page: " + target);

        if (target) {
            if (chainArgs === null) {
                var params = {
                    'action': 'parse',
                    'prop': 'sections',
                    'page': target,
                    'redirects': 1,
                };
                WM.Log.logWarning("If some articles in the list are " +
                    "linking to the target article " +
                    "through a redirect, you should process the backlinks " +
                    "of that redirect page separately through its " +
                    "Special:WhatLinksHere page, as this plugin can only " +
                    "fix links that exactly match the title of the target " +
                    "article.\nIn order to save time you are advised to " +
                    "hide the redirects in the page lists that allow to do " +
                    "so.");

                WM.MW.callAPIGet(params,
                         null,
                         WM.Plugins.FixBacklinkFragments.mainAutoFindSections,
                         [title, target, summary, callBot],
                         null);
            }
            else {
                WM.Plugins.FixBacklinkFragments.mainAutoRead(target, chainArgs,
                                                    title, summary, callBot);
            }
        }
        else {
            WM.Log.logError('The target page cannot be empty');
            callBot(false, null);
        }
    };

    this.mainAutoFindSections = function (res, args) {
        var title = args[0];
        var target = args[1];
        var summary = args[2];
        var callBot = args[3];
        var sections = [];

        if (res.parse) {
            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        res.parse.sections[s].line).trim());
            }

            WM.Plugins.FixBacklinkFragments.mainAutoRead(target, sections,
                                                    title, summary, callBot);
        }
        else {
            WM.Log.logError("The set target page, " + target +
                                                    ", seems not to exist");

            if (res.error) {
                callBot(res.error.code, sections);
            }
            else {
                callBot(false, sections);
            }
        }
    };

    this.mainAutoRead = function (target, sections, title, summary, callBot) {
        WM.MW.callQueryEdit(title,
                            WM.Plugins.FixBacklinkFragments.mainAutoWrite,
                            [target, summary, callBot, sections]);
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var target = args[0];
        var summary = args[1];
        var callBot = args[2];
        var sections = args[3];

        var newtext = fixLinks(source, target, sections);

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.FixBacklinkFragments.mainAutoEnd,
                               [callBot, sections],
                               null);
        }
        else {
            callBot(0, sections);
        }
    };

    this.mainAutoEnd = function (res, args) {
        var callBot = args[0];
        var sections = args[1];

        if (res.edit && res.edit.result == 'Success') {
            callBot(1, sections);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, sections);
        }
        else {
            callBot(false, sections);
        }
    };
};

WM.Plugins.FixDoubleRedirects = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var summary = args;

        WM.Log.logInfo("Fixing double redirects ...");

        WM.MW.getSpecialList("DoubleRedirects",
                             "namespaces",
                             WM.Plugins.FixDoubleRedirects.reverseResults,
                             [summary, callNext]);
    };

    this.reverseResults = function (results, siteinfo, args) {
        var summary = args[0];
        var callNext = args[1];

        var namespaces = siteinfo.namespaces;

        results.reverse();

        WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces,
                                                        [summary, callNext]);
    };

    this.iterateList = function (doubleRedirects, namespaces, args) {
        var summary = args[0];
        var callNext = args[1];

        var doubleRedirect = doubleRedirects.pop();

        if (doubleRedirect) {
            WM.MW.callQueryEdit(doubleRedirect.title,
                            WM.Plugins.FixDoubleRedirects.readMiddleRedirect,
                            [doubleRedirect, doubleRedirects, namespaces,
                             summary, callNext]);
        }
        else {
            WM.Log.logInfo("Fixed double redirects");
            if (callNext) {
                callNext();
            }
        }
    };

    this.readMiddleRedirect = function (doubleRedirectTitle,
                            doubleRedirectSource, timestamp, edittoken, args) {
        var doubleRedirect = args[0];
        var doubleRedirects = args[1];
        var namespaces = args[2];
        var summary = args[3];
        var callNext = args[4];
        var middleRedirectTitle = namespaces[
                                doubleRedirect.databaseResult.nsb]['*'] + ':' +
                                doubleRedirect.databaseResult.tb;

        WM.MW.callQuery({prop: "revisions",
                         rvprop: "content",
                         titles: middleRedirectTitle},
                         WM.Plugins.FixDoubleRedirects.processDoubleRedirect,
                         [doubleRedirect, doubleRedirectTitle,
                          doubleRedirectSource, timestamp, edittoken,
                          doubleRedirects, namespaces, summary, callNext],
                         null);
    };

    this.processDoubleRedirect = function (middleRedirect, args) {
        var middleRedirectSource = middleRedirect.revisions[0]["*"];
        var doubleRedirect = args[0];
        var doubleRedirectTitle = args[1];
        var doubleRedirectSource = args[2];
        var timestamp = args[3];
        var edittoken = args[4];
        var doubleRedirects = args[5];
        var namespaces = args[6];
        var summary = args[7];
        var callNext = args[8];

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(
                        doubleRedirectTitle, doubleRedirectTitle) + " ...");

        var rawOldTarget = doubleRedirectSource.match(/\s*#redirect *[^\n]+/i);
        var oldTarget = WM.Parser.findInternalLinks(rawOldTarget[0], null)[0];

        var rawMiddleTarget = middleRedirectSource.match(
                                                    /\s*#redirect *[^\n]+/i);
        var middleTarget = WM.Parser.findInternalLinks(rawMiddleTarget[0],
                                                                    null)[0];

        if (oldTarget.fragment) {
            var newTargetFragment = "#" + oldTarget.fragment;
        }
        else if (middleTarget.fragment) {
            var newTargetFragment = "#" + middleTarget.fragment;
        }
        else {
            var newTargetFragment = "";
        }

        if (oldTarget.anchor) {
            var newTargetAltAnchor = "|" + oldTarget.anchor;
        }
        else if (middleTarget.anchor) {
            var newTargetAltAnchor = "|" + middleTarget.anchor;
        }
        else {
            var newTargetAltAnchor = "";
        }

        var newTargetInterlanguage = (doubleRedirect.databaseResult.iwc) ?
                                doubleRedirect.databaseResult.iwc + ":" : "";
        var newTargetNamespace = (namespaces[
                                doubleRedirect.databaseResult.nsc]["*"]) ?
                                WM.Parser.squashContiguousWhitespace(
                                namespaces[doubleRedirect.databaseResult.nsc][
                                "*"]) + ":" : "";
        var newTargetTitle = WM.Parser.squashContiguousWhitespace(
                                            doubleRedirect.databaseResult.tc);

        var newTarget = "[[" + newTargetInterlanguage +
                        newTargetNamespace + newTargetTitle +
                        newTargetFragment + newTargetAltAnchor + "]]";
        var newText = Alib.Str.overwriteFor(doubleRedirectSource, newTarget,
                                            oldTarget.index, oldTarget.length);

        if (newText != doubleRedirectSource) {
            WM.MW.callAPIPost(
                    {action: "edit",
                     bot: "1",
                     title: doubleRedirectTitle,
                     summary: summary,
                     text: newText,
                     b1asetimestamp: timestamp,
                     token: edittoken},
                    null,
                    WM.Plugins.FixDoubleRedirects.processDoubleRedirectEnd,
                    [doubleRedirects, namespaces, summary, callNext],
                    null);
        }
        else {
            WM.Log.logWarning("Could not fix " +
                                WM.Log.linkToWikiPage(doubleRedirectTitle,
                                doubleRedirectTitle));
            WM.Plugins.FixDoubleRedirects.iterateList(doubleRedirects,
                                        namespaces, [summary, callNext]);
        }
    };

    this.processDoubleRedirectEnd = function (res, args) {
        var doubleRedirects = args[0];
        var namespaces = args[1];
        var summary = args[2];
        var callNext = args[3];

        if (res.edit && res.edit.result == 'Success') {
            WM.Plugins.FixDoubleRedirects.iterateList(doubleRedirects,
                                            namespaces, [summary, callNext]);
        }
        else {
            WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")");
        }
    };
};

WM.Plugins.FixFragments = new function () {
    "use strict";

    var fixLinks = function (source) {
        var title = WM.Editor.getTitle();
        var sections = WM.Parser.findSectionHeadings(source).sections;

        var slinks = WM.Parser.findSectionLinks(source);
        var newtext1 = "";
        var prevId = 0;

        for (var l = 0; l < slinks.length; l++) {
            var link = slinks[l];
            newtext1 += source.substring(prevId, link.index);
            newtext1 += fixLink(source, sections, link.rawLink, link.fragment,
                                                                link.anchor);
            prevId = link.index + link.length;
        }
        newtext1 += source.substr(prevId);

        // Note that it's impossible to recognize any namespaces in the title
        //   without querying the server
        // Alternatively, a list of the known namespaces could be maintained
        //   for each wiki
        // Recognizing namespaces would let recognize more liberal link
        //   syntaxes (e.g. spaces around the colon)
        var ilinks = WM.Parser.findInternalLinks(newtext1, null, title);
        var newtext2 = "";
        var prevId = 0;

        for (var l = 0; l < ilinks.length; l++) {
            var link = ilinks[l];
            newtext2 += newtext1.substring(prevId, link.index);
            var rawfragment = link.fragment;

            if (rawfragment) {
                newtext2 += fixLink(newtext1, sections, link.rawLink,
                                                    rawfragment, link.anchor);
            }
            else {
                newtext2 += link.rawLink;
            }

            prevId = link.index + link.length;
        }
        newtext2 += newtext1.substr(prevId);

        return newtext2;
    };

    var fixLink = function (source, sections, rawlink, rawfragment, lalt) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment
                                                                    ).trim();

        for (var s = 0; s < sections.length; s++) {
            var heading = sections[s].cleanheading;
            var dotHeading = WM.Parser.dotEncode(heading);
            var dotFragment = WM.Parser.dotEncode(fragment);

            if (dotHeading.toLowerCase() == dotFragment.toLowerCase()) {
                if (fragment == dotFragment) {
                    // If the fragment was encoded, re-encode it because it
                    // could contain link-breaking characters (e.g. []|{})
                    // The condition would also be true if the fragment doesn't
                    // contain any encodable characters, but since heading and
                    // fragment at most differ by capitalization, encoding the
                    // heading won't have any effect
                    return "[[#" + dotHeading + ((lalt) ? "|" + lalt : "") +
                                                                        "]]";
                }
                else {
                    // If the fragment was not encoded, if the fragment
                    // contained link-breaking characters the link was already
                    // broken, and replacing it with heading wouldn't make
                    // things worse; if the fragment didn't contain
                    // link-breaking characters, the heading doesn't either,
                    // since heading and fragment at most differ by
                    // capitalization, so it's safe to replace it
                    // If the fragment was *partially* encoded instead, a
                    // link-breaking character may have been encoded, so all
                    // link-breaking characters must be re-encoded here!
                    var escHeading =
                            WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    heading);
                    return "[[#" + escHeading + ((lalt) ? "|" + lalt : "") +
                                                                        "]]";
                }
            }
        }

        // It's not easy to use WM.Log.linkToWikiPage because pure fragments
        //   are not supported yet
        WM.Log.logWarning("Cannot fix broken section link: " + rawlink);
        return rawlink;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = fixLinks(source);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section links");
        }
        else {
            WM.Log.logInfo("No fixable section links found");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.FixLinkFragments = new function () {
    "use strict";

    this.processLink = function (title, links, index, source, newText, prevId,
                                                            call, callArgs) {
        if (links[index]) {
            var link = links[index];
            var rawfragment = link.fragment;

            if (rawfragment) {
                WM.Log.logInfo("Processing " +
                    WM.Log.linkToWikiPage(link.link, link.rawLink) + " ...");

                var target = ((link.namespace) ? link.namespace + ":" : "") +
                                                                    link.title;

                // Note that it's impossible to recognize any namespaces in the
                //   title without querying the server
                // Alternatively, a list of the known namespaces could be
                //   maintained for each wiki
                // Recognizing namespaces would let recognize more liberal link
                //   syntaxes (e.g. spaces around the colon)
                if (!WM.Parser.compareArticleTitles(target, title)) {
                    var params = {
                        'action': 'parse',
                        'prop': 'sections',
                        'page': target,
                        'redirects': 1,
                    };

                    WM.MW.callAPIGet(params,
                             null,
                             WM.Plugins.FixLinkFragments.processLinkContinue,
                             [link, target, rawfragment, links, index, source,
                                    newText, prevId, title, call, callArgs],
                             null);
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processLink(title, links,
                            index, source, newText, prevId, call, callArgs);
                }
            }
            else {
                index++;
                WM.Plugins.FixLinkFragments.processLink(title, links, index,
                                    source, newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processLinkContinue = function (res, args) {
        var link = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var links = args[3];
        var index = args[4];
        var source = args[5];
        var newText = args[6];
        var prevId = args[7];
        var title = args[8];
        var call = args[9];
        var callArgs = args[10];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, link.index);

            if (fixedFragment === true) {
                newText += link.rawLink;
            }
            else if (fixedFragment) {
                newText += "[[" + target + "#" + fixedFragment  +
                            ((link.anchor) ? "|" + link.anchor : "") + "]]";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " +
                            WM.Log.linkToWikiPage(link.link, link.rawLink));
                newText += link.rawLink;
            }

            prevId = link.index + link.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processLink(title, links, index, source,
                                            newText, prevId, call, callArgs);
    };

    var fixFragment = function (rawfragment, sections) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment
                                                                    ).trim();

        if (sections.indexOf(fragment) < 0) {
            for (var s = 0; s < sections.length; s++) {
                var section = sections[s];
                var dotSection = WM.Parser.dotEncode(section);
                var dotFragment = WM.Parser.dotEncode(fragment);

                if (dotSection.toLowerCase() == dotFragment.toLowerCase()) {
                    if (fragment == dotFragment) {
                        // If the fragment was encoded, re-encode it because it
                        // could contain link-breaking characters (e.g. []|{})
                        // The condition would also be true if the fragment
                        // doesn't contain any encodable characters, but since
                        // section and fragment at most differ by
                        // capitalization, encoding the section won't have any
                        // effect
                        return dotSection;
                    }
                    else {
                        // If the fragment was not encoded, if the fragment
                        // contained link-breaking characters the link was
                        // already broken, and replacing it with section
                        // wouldn't make things worse; if the fragment didn't
                        // contain link-breaking characters, the section
                        // doesn't either, since section and fragment at most
                        // differ by capitalization, so it's safe to replace it
                        // If the fragment was *partially* encoded instead, a
                        // link-breaking character may have been encoded, so
                        // all link-breaking characters must be re-encoded
                        // here!
                        return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    section);
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    };

    this.findArchWikiLinks = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 1, 0,
                    newText, "", 0,
                    WM.Plugins.FixLinkFragments.findArchWikiLinks2, callArgs);
    };

    this.findArchWikiLinks2 = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related2');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 2, 0,
                newText, "", 0, WM.Plugins.FixLinkFragments.mainEnd, callArgs);
    };

    this.processArchWikiLink = function (title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs) {
        if (templates[index]) {
            var template = templates[index];
            var args = template.arguments;

            // Don't crash in case of malformed templates
            if (args.length == expectedArgs) {
                var link = args[0].value;
                var fragId = link.indexOf('#');

                if (fragId > -1) {
                    var rawtarget = link.substring(0, fragId);
                    var target = WM.Parser.squashContiguousWhitespace(rawtarget
                                                                    ).trim();
                    var rawfragment = link.substr(fragId + 1);

                    if (rawfragment) {
                        // Note that it's impossible to recognize any
                        //   namespaces in the title without querying the
                        //   server
                        // Alternatively, a list of the known namespaces could
                        //   be maintained for each wiki
                        // Recognizing namespaces would let recognize more
                        //   liberal link syntaxes (e.g. spaces around the
                        //   colon)
                        if (!WM.Parser.compareArticleTitles(target, title)) {
                            WM.Log.logInfo("Processing " +
                                        WM.Log.linkToWikiPage(link,
                                        template.rawTransclusion) + " ...");

                            var params = {
                                'action': 'parse',
                                'prop': 'sections',
                                'page': target,
                                'redirects': 1,
                            };

                            WM.MW.callAPIGet(params,
                                 null,
                                 WM.Plugins.FixLinkFragments.processArchWikiLinkContinue,
                                 [template, target, rawfragment, templates,
                                 expectedArgs, index, source, newText,
                                 prevId, title, call, callArgs],
                                 null);
                        }
                        else {
                            index++;
                            WM.Plugins.FixLinkFragments.processArchWikiLink(
                                    title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs);
                        }
                    }
                    else {
                        index++;
                        WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
                    }
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
                }
            }
            else {
                WM.Log.logWarning("Template:" + template.title +
                        " must have " + expectedArgs + " and only " +
                        expectedArgs +
                        ((expectedArgs > 1) ? " arguments: " : " argument: ") +
                        template.rawTransclusion);
                index++;
                WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processArchWikiLinkContinue = function (res, args) {
        var template = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var templates = args[3];
        var expectedArgs = args[4];
        var index = args[5];
        var source = args[6];
        var newText = args[7];
        var prevId = args[8];
        var title = args[9];
        var call = args[10];
        var callArgs = args[11];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, template.index);

            if (fixedFragment === true) {
                newText += template.rawTransclusion;
            }
            else if (fixedFragment) {
                var anchor = (template.arguments[1]) ? ("|" +
                                            template.arguments[1].value) : "";
                newText += "{{" + template.title + "|" + target + "#" +
                                                fixedFragment  + anchor + "}}";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " +
                    WM.Log.linkToWikiPage(target, template.rawTransclusion));
                newText += template.rawTransclusion;
            }

            prevId = template.index + template.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates,
                expectedArgs, index, source, newText, prevId, call, callArgs);
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Fixing links to sections of other articles ...");
        var links = WM.Parser.findInternalLinks(source, null, null);
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processLink(title, links, 0, source, "", 0,
                        WM.Plugins.FixLinkFragments.mainContinue, callNext);
    };

    this.mainContinue = function (newText, callNext) {
        // Without this check this plugin would be specific to ArchWiki
        if (location.hostname == 'wiki.archlinux.org') {
            var templates = WM.Plugins.FixLinkFragments.findArchWikiLinks(
                                                            newText, callNext);
        }
        else {
            WM.Plugins.FixLinkFragments.mainEnd(newText, callNext);
        }
    };

    this.mainEnd = function (newText, callNext) {
        var source = WM.Editor.readSource();

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Replaced links to sections of other articles");
        }
        else {
            WM.Log.logInfo("No fixable links to sections of other articles " +
                                                                    "found");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.MultipleLineBreaks = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;

        newtext = newtext.replace(/[\n]{3,}/g, '\n\n');

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Removed multiple line breaks");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.SimpleReplace = new function () {
    "use strict";

    var makeUI = function () {
        Alib.CSS.addStyleElement("#WikiMonkey-SimpleReplace div " +
                                                "{margin-bottom:0.33em;} " +
                            "#WikiMonkey-SimpleReplace input[type='text'] " +
                                        "{margin-left:0.33em; width:60%;}");

        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";

        var par1 = document.createElement('div');

        var regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';

        var regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp";

        var ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase";

        var ignoreCaseLabel = document.createElement('span');
        ignoreCaseLabel.innerHTML = 'i';

        par1.appendChild(regexpLabel);
        par1.appendChild(regexp);
        par1.appendChild(ignoreCase);
        par1.appendChild(ignoreCaseLabel);

        var par2 = document.createElement('div');

        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';

        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString";

        par2.appendChild(newStringLabel);
        par2.appendChild(newString);

        divMain.appendChild(par1);
        divMain.appendChild(par2);

        return divMain;
    };

    this.makeUI = function (args) {
        return makeUI();
    };

    this.makeBotUI = function (args) {
        var divMain = makeUI();
        var par3 = document.createElement('div');

        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';

        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary";

        par3.appendChild(summaryLabel);
        par3.appendChild(summary);

        divMain.appendChild(par3);

        return divMain;
    };

    var configuration;

    var storeConfiguration = function () {
        configuration = {pattern: document.getElementById(
                                "WikiMonkey-SimpleReplace-RegExp").value,
                ignoreCase: document.getElementById(
                        "WikiMonkey-SimpleReplace-IgnoreCase").checked,
                newString: document.getElementById(
                            "WikiMonkey-SimpleReplace-NewString").value,
        };

        WM.Log.logHidden("Pattern: " + configuration.pattern);
        WM.Log.logHidden("Ignore case: " + configuration.ignoreCase);
        WM.Log.logHidden("New string: " + configuration.newString);
    };

    var storeRegExp = function () {
        configuration.regExp = new RegExp(configuration.pattern,
                                "g" + ((configuration.ignoreCase) ? "i" : ""));
    };

    this.main = function (args, callNext) {
        storeConfiguration();

        try {
            storeRegExp();
        }
        catch (exc) {
            WM.Log.logError("Invalid pattern: " + exc);
            // Block the execution of this function
            return false;
        }

        var source = WM.Editor.readSource();
        var newtext = source.replace(configuration.regExp,
                                                    configuration.newString);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        storeConfiguration();

        try {
            storeRegExp();
        }
        catch (exc) {
            WM.Log.logError("Invalid pattern: " + exc);
            callBot(false, null);
            // Block the execution of this function
            return false;
        }

        var summary = document.getElementById(
                                    "WikiMonkey-SimpleReplace-Summary").value;

        if (summary != "") {
            WM.MW.callQueryEdit(title,
                                WM.Plugins.SimpleReplace.mainAutoWrite,
                                [summary, callBot]);
        }
        else {
            WM.Log.logError("The edit summary cannot be empty");
            callBot(false, null);
        }
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var summary = args[0];
        var callBot = args[1];

        var newtext = source.replace(configuration.regExp,
                                                    configuration.newString);

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.SimpleReplace.mainAutoEnd,
                               callBot,
                               null);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};

WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    "use strict";

    var detectLang = function (title, tag) {
        // Without this check this plugin would be specific to ArchWiki
        if (tag == "ArchWiki") {
            var detect = WM.ArchWiki.detectLanguage(title);
            var pureTitle = detect[0];
            tag = WM.ArchWiki.getInterlanguageTag(detect[1]);
        }
        else {
            var pureTitle = title;
        }

        return [pureTitle, tag];
    };

    var computeWhiteList = function (whitelist) {
        // Without this check this plugin would be specific to ArchWiki
        if (whitelist == "ArchWiki") {
            if (typeof GM_emulation === "undefined") {
                return WM.ArchWiki.getInterwikiLanguages();
            }
            else {
                return WM.ArchWiki.getInternalInterwikiLanguages();
            }
        }
        else {
            return whitelist;
        }
    };

    var computeSupportedLangs = function (supportedLangs) {
        // Without this check this plugin would be specific to ArchWiki
        if (supportedLangs == "ArchWiki") {
            return WM.ArchWiki.getInterwikiLanguages();
        }
        else {
            return supportedLangs;
        }
    };

    this.main = function (args, callNext) {
        var title = WM.Editor.getTitle();

        var detect = detectLang(title, args[0]);
        var pureTitle = detect[0];
        var tag = detect[1];

        var whitelist = computeWhiteList(args[1]);
        var supportedLangs = computeSupportedLangs(args[2]);

        WM.Log.logInfo("Synchronizing interlanguage links ...");

        WM.MW.getInterwikiMap(
            title,
            WM.Plugins.SynchronizeInterlanguageLinks.mainContinue,
            [tag, pureTitle, supportedLangs, whitelist, title, callNext]
        );
    };

    this.mainContinue = function (iwmap, args) {
        var tag = args[0];
        var pureTitle = args[1];
        var supportedLangs = args[2];
        var whitelist = args[3];
        var title = args[4];
        var callNext = args[5];

        var source = WM.Editor.readSource();

        var langlinks = WM.Interlanguage.parseLinks(supportedLangs, source,
                                                                        iwmap);

        var wikiUrls = WM.MW.getWikiUrls();
        var url = wikiUrls.short + encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(title));
        var api = wikiUrls.api;

        var visitedlinks = {};
        visitedlinks[tag.toLowerCase()] = WM.Interlanguage.createVisitedLink(
                                            tag, pureTitle, url, iwmap, api,
                                            source, null, null, langlinks);

        var newlinks = {};

        WM.Log.logInfo("Reading " + WM.Log.linkToPage(url, "edited article") +
                                                                    " ...");

        if (langlinks) {
            for (var l in langlinks) {
                var link = langlinks[l];
                var nlink = newlinks[link.lang.toLowerCase()];
                var vlink = visitedlinks[link.lang.toLowerCase()];

                if (!vlink && !nlink) {
                    newlinks[link.lang.toLowerCase()] =
                                            WM.Interlanguage.createNewLink(
                                            link.lang, link.title, link.url);
                }
                else if (vlink && vlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"));
                }
                else if (nlink && nlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"));
                }
            }

            WM.Interlanguage.collectLinks(
                visitedlinks,
                newlinks,
                supportedLangs,
                whitelist,
                false,
                WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
                [tag, url, source, langlinks, iwmap, callNext]
            );
        }
        else {
            WM.Log.logInfo("No interlanguage links found");

            if (callNext) {
                callNext();
            }
        }
    };

    this.mainEnd = function (links, args) {
        var tag = args[0];
        var url = args[1];
        var source = args[2];
        var langlinks = args[3];
        var iwmap = args[4];
        var callNext = args[5];

        var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links);

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Synchronized interlanguage links");
        }
        else {
            WM.Log.logInfo("Interlanguage links were already synchronized");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var detect = detectLang(title, args[0]);
        var pureTitle = detect[0];
        var tag = detect[1];

        var whitelist = computeWhiteList(args[1]);
        var supportedLangs = computeSupportedLangs(args[2]);

        var summary = args[3];

        var wikiUrls = WM.MW.getWikiUrls();
        var url = wikiUrls.short + encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(title));

        var visitedlinks = {};

        var newlinks = {};
        newlinks[tag.toLowerCase()] = WM.Interlanguage.createNewLink(tag,
                                                            pureTitle, url);

        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            true,
            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
            [title, url, tag, summary, callBot]
        );
    };

    this.mainAutoWrite = function (links, args) {
        var title = args[0];
        var url = args[1];
        var tag = args[2];
        var summary = args[3];
        var callBot = args[4];

        var lcTag = tag.toLowerCase();
        // New links that were not in the white list will have the "iwmap"
        // attribute false, "timestamp" and "edittoken" null and "links" as an
        // empty array, however links[lcTag] should always be safe
        var iwmap = links[lcTag].iwmap;
        var source = links[lcTag].source;
        var langlinks = links[lcTag].links;
        var timestamp = links[lcTag].timestamp;
        var edittoken = links[lcTag].edittoken;

        var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links);

        if (newText != source) {
            WM.MW.callAPIPost(
                {action: "edit",
                 bot: "1",
                 title: title,
                 summary: summary,
                 text: newText,
                 basetimestamp: timestamp,
                 token: edittoken},
                null,
                WM.Plugins.SynchronizeInterlanguageLinks.mainAutoEnd,
                callBot,
                null
            );
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};

WM.Plugins.UpdateCategoryTree = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var inparams = args[0];
        var summary = args[1];

        if (inparams.constructor === Array) {
            if (inparams[0] == "ArchWiki") {
                var params = WM.ArchWiki.getTableOfContents(inparams[1]);
            }
            else {
                WM.Log.logError("Unrecognized parameter");
                return false;
            }
        }
        else {
            var params = inparams;
        }

        WM.MW.isUserBot(this.mainContinue, [params, summary, callNext]);
    };

    this.mainContinue = function (botTest, args) {
        readToC({
            params: args[0],
            minInterval: (botTest) ? 60000 : 21600000,
            edittoken: "",
            timestamp: "",
            source: "",
            startId: 0,
            endId: 0,
            treeText: "",
            startMark: "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->",
            endMark: "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK",
            altNames: {},
            summary: args[1],
            callNext: args[2],
        });
    };

    var readToC = function (args) {
        WM.Log.logInfo('Updating ' + WM.Log.linkToWikiPage(args.params.page,
                                                args.params.page) + " ...");
        WM.MW.callQueryEdit(args.params.page,
                            WM.Plugins.UpdateCategoryTree.processToC,
                            args);
    };

    this.processToC = function (title, source, timestamp, edittoken, args) {
        args.source = source;
        args.timestamp = timestamp;
        args.edittoken = edittoken;

        var now = new Date();
        var msTimestamp = Date.parse(args.timestamp);
        if (now.getTime() - msTimestamp >= args.minInterval) {
            var start = args.source.indexOf(args.startMark);
            var end = args.source.lastIndexOf(args.endMark);

            if (start > -1 && end > -1) {
                args.startId = start + args.startMark.length;
                args.endId = end;
                args.treeText = "";
                args.altNames = (args.params.keepAltName) ?
                                    storeAlternativeNames(args.source) : {};
                WM.Cat.recurseTree({node: args.params.root,
                    callNode: WM.Plugins.UpdateCategoryTree.processCategory,
                    callEnd: WM.Plugins.UpdateCategoryTree.writeToC,
                    callArgs: args});
            }
            else {
                WM.Log.logError("Cannot find insertion marks in " +
                    WM.Log.linkToWikiPage(args.params.page, args.params.page));

                if (args.callNext) {
                    args.callNext();
                }
            }
        }
        else {
            WM.Log.logWarning(WM.Log.linkToWikiPage(args.params.page,
                        args.params.page) + ' has been updated too recently');

            if (args.callNext) {
                args.callNext();
            }
        }
    };

    var storeAlternativeNames = function (source) {
        var dict = {};
        var regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm;
        while (true) {
            var match = regExp.exec(source);
            if (match) {
                dict[match[1].toLowerCase()] = match[2];
            }
            else {
                break;
            }
        }
        return dict;
    };

    this.processCategory = function (params) {
        var args = params.callArgs;

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(params.node,
                                                        params.node) + " ...");

        var text = "";

        for (var i = 0; i < params.ancestors.length; i++) {
            text += args.params.indentType;
        }

        if (args.params.showIndices) {
            var indices = [];
            var node = params;
            while (node.parentIndex != null) {
                indices.push(node.siblingIndex + 1);
                node = params.nodesList[node.parentIndex];
            }
            if (indices.length) {
                text += "<small>" + indices.reverse().join(".") + ".</small> ";
            }
        }

        var altName = (args.altNames[params.node.toLowerCase()]) ?
                            args.altNames[params.node.toLowerCase()] : null;
        text += createCatLink(params.node, args.params.replace, altName);

        text += (args.params.rightToLeft) ? "&lrm; " : " ";

        if (params.children == "loop") {
            text += "'''[LOOP]'''\n";
            WM.Log.logWarning("Loop in " + WM.Log.linkToWikiPage(params.node,
                                                                params.node));
            WM.Plugins.UpdateCategoryTree.processCategoryEnd(params, args,
                                                                        text);
        }
        else {
            WM.Cat.getParentsAndInfo(
                params.node,
                WM.Plugins.UpdateCategoryTree.processCategoryAddSuffix,
                [params, args, text, altName]
            );
        }
    };

    this.processCategoryAddSuffix = function (parents, info, args_) {
        var params = args_[0];
        var args = args_[1];
        var text = args_[2];
        var altName = args_[3];

        text += "<small>(" + ((info) ? info.pages : 0) + ")";

        if (parents.length > 1) {
            outer_loop:
            for (var p in parents) {
                var par = parents[p].title;
                for (var a in params.ancestors) {
                    var anc = params.ancestors[a];
                    if (par == anc) {
                        parents.splice(p, 1);
                        break outer_loop;
                    }
                }
            }
            var parentTitles = [];
            for (var i in parents) {
                altName = (args.altNames[parents[i].title.toLowerCase()]) ?
                        args.altNames[parents[i].title.toLowerCase()] : null;
                parentTitles.push(createCatLink(parents[i].title,
                                                args.params.replace, altName));
            }
            text += " (" + args.params.alsoIn + " " +
                                                parentTitles.join(", ") + ")";
        }

        text += "</small>\n";

        WM.Plugins.UpdateCategoryTree.processCategoryEnd(params, args, text);
    };

    this.processCategoryEnd = function (params, args, text) {
        args.treeText += text;

        params.callArgs = args;

        WM.Cat.recurseTreeContinue(params);
    };

    var createCatLink = function (cat, replace, altName) {
        var catName;
        if (altName) {
            catName = altName;
        }
        else if (replace) {
            var regExp = new RegExp(replace[0], replace[1]);
            catName = cat.substr(9).replace(regExp, replace[2]);
        }
        else {
            catName = cat.substr(9);
        }
        return "[[:" + cat + "|" + catName + "]]";
    };

    this.writeToC = function (params) {
        var args = params.callArgs;

        args.treeText = "\n" + args.treeText;
        var newtext = Alib.Str.overwriteBetween(args.source, args.treeText,
                                                    args.startId, args.endId);

        if (newtext != args.source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               minor: "1",
                               title: args.params.page,
                               summary: args.summary,
                               text: newtext,
                               basetimestamp: args.timestamp,
                               token: args.edittoken},
                              null,
                              WM.Plugins.UpdateCategoryTree.checkWrite,
                              args,
                              null);
        }
        else {
            WM.Log.logInfo(WM.Log.linkToWikiPage(args.params.page,
                                args.params.page) + ' is already up to date');

            if (args.callNext) {
                args.callNext();
            }
        }
    };

    this.checkWrite = function (res, args) {
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(WM.Log.linkToWikiPage(args.params.page,
                                    args.params.page) + ' correctly updated');

            if (args.callNext) {
                args.callNext();
            }
        }
        else {
            WM.Log.logError(WM.Log.linkToWikiPage(args.params.page,
                    args.params.page) + ' has not been updated!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};

WM.main({
    "Mods": {
        "Contributions": {
            "hide_rollback_links": true
        },
        "Editor": {
            "disable_edit_summary_submit_on_enter": true,
            "scroll_to_first_heading": false
        },
        "General": {
            "heading_number_style": false
        },
        "RecentChanges": {
            "hide_rollback_links": true
        }
    },
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                [
                    "Fix links to specific sections of a target page"
                ],
                "fix links to specific sections"
            ]
        },
        "Diff": {},
        "Editor": {
            "040SL": [
                "FixFragments",
                [
                    "Text plugins",
                    "Fix section links"
                ],
                null
            ],
            "060EC": [
                "ExpandContractions",
                [
                    "Text plugins",
                    "Expand contractions"
                ],
                null
            ],
            "070ML": [
                "MultipleLineBreaks",
                [
                    "Text plugins",
                    "Squash multiple line breaks"
                ],
                null
            ],
            "110SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "210ES": [
                "FixLinkFragments",
                [
                    "Query plugins",
                    "Fix external section links"
                ],
                null
            ]
        },
        "NewPages": {},
        "RecentChanges": {},
        "Special": {
            "020DR": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ]
        }
    }
});
