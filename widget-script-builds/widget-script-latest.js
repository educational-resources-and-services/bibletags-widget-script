!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t,e){if(null==t)return{};var n,o,i=function(t,e){if(null==t)return{};var n,o,i={},r=Object.keys(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}!function(t,e){if(!e.bibleTagsWidget){var r,a,l={};(document.currentScript||document.getElementById("bibletags-widget-script")).getAttribute("src").split("#").slice(1).join("#").split("&").forEach(function(t){var e=t.split("=");l[e[0]]=e[1]}),"local"===l.widget?(r="*",a="http://localhost:3000/index.html"):a="staging"===l.widget?"".concat(r="https://cdn.staging.bibletags.org","/widget/build/index.html"):"".concat(r="https://cdn.bibletags.org","/widget/build/index.html");var c,d="#data=".concat(l.data||""),s=[],u=1,p={},f={},h=1,g=function(e,n){var o=t.createElement(e);for(var i in n)o[i]=n[i];return o},b=function(){return Math.min(e.innerWidth,e.innerHeight)<500},y=function(e){return!b()&&e.containerEl||t.body},v=function(t){var e=g("div");!function(t){var e=t.style;e.position="absolute",e.overflow="hidden",e.top=0,e.left=0,e.width="1px",e.height="1px",e.visibility="hidden"}(e);var n=g("div",{style:"\n        position: absolute;\n        width: 16px;\n        height: 16px;\n        border: 1px solid #333;\n      "}),o=g("iframe",{src:"".concat(a).concat(d).concat(t?"&utility=1":""),style:"\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 1px;\n        background: white;\n        border: none;\n      "});return o.addEventListener("load",function(){return o.loaded=!0}),e.appendChild(n),e.appendChild(o),{widgetEl:e,arrowEl:n,iframeEl:o}},m=function(t){var e=t&&getComputedStyle(t);t&&"static"===e.position&&t.style.setProperty("position","relative","important")},E=function(){if(!c||!t.body.contains(c.iframeEl)){(c=v(!0)).actionIndexResponseMap={};var n=c,o=n.widgetEl,i=n.arrowEl,a=n.iframeEl,l=n.actionIndexResponseMap;i.remove();e.addEventListener("message",function(t){var e=t.data,n=t.source,o=t.origin;if(n==a.contentWindow&&(o==r||"*"==r)){var i=l[e.payload.actionIndex];i&&i({data:e}),delete l[e.payload.actionIndex]}}),t.body.appendChild(o)}return c},w=function(){var e=s.map(function(t){return t.widgetEl.parentNode});i(f.containerEls instanceof Array?f.containerEls:[]).concat([t.body]).slice(0,10).forEach(function(t){if(!e.includes(t)){var n=v();s.push(n),m(t),t.appendChild(n.widgetEl)}}),E()},x=function(t){if(p[t]){var n=p[t],o=n.widgetEl,i=n.iframeElEvent;o.remove(),e.removeEventListener("message",i),delete p[t]}},O=function(t){var e=t.action,n=t.payload,i=t.handleResponse,a=E(),l=(a.widgetEl,a.iframeEl),c=a.actionIndexResponseMap,d=u++,s=function(){l.contentWindow.postMessage({action:e,payload:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){o(t,e,n[e])})}return t}({},n,{actionIndex:d})},r)};i&&(c[d]=i),l.loaded?s():l.addEventListener("load",s)},j=t.createElement("style");j.innerHTML="",t.head.appendChild(j),e.addEventListener("load",w),e.bibleTagsWidget={setUp:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f=t||{},w()},preload:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};O({action:"preload",payload:{settings:f,options:t}})},show:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=h++,i=function(e){var n=e.options,o=b(),i=y(n),r=parseInt(n.margin,10)||10,a=o?{x:0,y:0}:n.containerElTargetScroll||{x:i.scrollLeft,y:i.scrollTop},l=i.getBoundingClientRect(),c=i.clientWidth,d=i.clientHeight,s=l.top+.1*l.height,u=n.anchorEl?n.anchorEl.getBoundingClientRect():{top:s,bottom:s,left:l.left+c/2,width:0,height:0},p=getComputedStyle(i),f=parseInt(p.borderTopWidth,10)||0,h=parseInt(p.borderLeftWidth,10)||0,g=l.height-d-f,v=l.width-c-h,m=o?"100%":Math.max(Math.min(c-2*r,400),.1),E=u.top-l.top-f,w=l.bottom-u.bottom-g,x=u.top,O=t.body.clientHeight-u.bottom,j=Math.min(E,x),M=Math.min(w,O),k=a.y+E,I=(i.scrollHeight,u.height,a.x+(u.left-h-l.left)),C=M>800||(Math.max(M,j)>=200?M>=j:O>=x),L=o?0:C?k+u.height:null,S=o?0:C?null:w-a.y+u.height,W=o?0:Math.min(Math.max(I+u.width/2-m/2,a.x+Math.max(-1*l.left-h,0)+r),c+i.scrollLeft-Math.max(l.right-v-t.body.clientWidth,0)-r-m),T=o?"100vh":Math.max((C?M:j)-r,200);return{top:L,bottom:S,left:W,width:m,maxHeight:T,height:o?"100vh":Math.min(250,T),position:o?"fixed":"absolute",zIndex:(null!=n.zIndex?n.zIndex:100)+"",border:o?"":"1px solid #333",borderRadius:o?0:3,boxShadow:o?"":"0 2px 8px rgba(0,0,0,.2)",visibility:"visible"}}({options:n}),a=y(n),l=function(){for(var t=0;t<s.length;t++)if(s[t].widgetEl.parentNode===a)return s.splice(t,1)[0];return s.length>0?s.splice(0,1)[0]:v()}(),c=l.widgetEl,d=l.iframeEl,u=l.arrowEl;f.containerEls instanceof Array?(f.containerEls=f.containerEls.filter(function(t){return t!==a}),f.containerEls.unshift(a)):f.containerEls=[a],d.style.width="".concat(i.width,"px"),n.maxHeight=i.maxHeight;var g=function(){var t=Object.assign({},f),e=Object.assign({},n);delete t.containerEls,delete e.anchorEl,delete e.containerEl,(e.addlOptions||[]).forEach(function(t){return t.callback=!!t.callback}),e.fetchVerseCallback=!!e.fetchVerseCallback,e.jumpToLocationCallback=!!e.jumpToLocationCallback,e.searchData&&(e.searchData.callback=!!e.searchData.callback),e.infoCallback=!!e.infoCallback,d.contentWindow.postMessage({action:"show",payload:{settings:t,options:e}},r)},E=function(t){var e=t.data,n=t.source,a=t.origin;if(n==d.contentWindow&&(a==r||"*"==r))switch(e.action){case"close":x(o);break;case"ready":!function(t){var e=t.widgetEl,n=t.style,o=t.iframeEl,i=function(t){return"number"==typeof t?"".concat(t,"px"):null==t?"auto":t};for(var r in n)e.style[r]=i(n[r]);o.style.width="100%",o.style.height="100%"}({widgetEl:c,style:i,iframeEl:d}),setTimeout(function(){return c.style.transition="height .1s ease-in-out"},100);break;case"updateHeight":var l=parseInt(e.payload.height);l&&(c.style.height="".concat(l,"px"),i.height=l)}};return c.parentElement!=a&&(m(a),d.loaded=!1,a.appendChild(c)),n.anchorEl&&!b()||u.remove(),e.addEventListener("message",E),d.loaded?g():d.addEventListener("load",g),p[o]={widgetEl:c,iframeElEvent:E},setTimeout(w,500),o},hide:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).widgetInstanceId;t?x(t):Object.keys(p).forEach(function(t){return x(t)})},getCorrespondingVerseLocations:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.callback,o=n(t,["callback"]);O({action:"getCorrespondingVerseLocations",payload:{options:o},handleResponse:function(t){var n=t.data;switch(n.action){case"reportCorrespondingVerseLocations":e(n.payload.verseLocations)}}})},splitVerseIntoWords:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.callback,o=n(t,["callback"]);O({action:"splitVerseIntoWords",payload:{options:o},handleResponse:function(t){var n=t.data;switch(n.action){case"reportWordsArray":e(n.payload.words)}}})}}}}(document,window)}]);