function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function e(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function r(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var e=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done)&&(e.push(i.value),!n||e.length!==n);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return e}}(t,n)||e(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,n,e){return t(e={path:n,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&e.path)}},e.exports),e.exports}function a(t){return t&&t.default||t}var i=o((function(n){var e=function(n){var e=Object.prototype,r=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,n,e,r){var o=n&&n.prototype instanceof l?n:l,a=Object.create(o.prototype),i=new $(r||[]);return a._invoke=function(t,n,e){var r="suspendedStart";return function(o,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw a;return S()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var u=w(i,e);if(u){if(u===f)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var c=s(t,n,e);if("normal"===c.type){if(r=e.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(r="completed",e.method="throw",e.arg=c.arg)}}}(t,e,i),a}function s(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=c;var f={};function l(){}function p(){}function h(){}var d={};d[a]=function(){return this};var v=Object.getPrototypeOf,m=v&&v(v(E([])));m&&m!==e&&r.call(m,a)&&(d=m);var y=h.prototype=l.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(n){t[n]=function(t){return this._invoke(n,t)}}))}function b(n,e){var o;this._invoke=function(a,i){function u(){return new e((function(o,u){!function o(a,i,u,c){var f=s(n[a],n,i);if("throw"!==f.type){var l=f.arg,p=l.value;return p&&"object"===t(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){o("next",t,u,c)}),(function(t){o("throw",t,u,c)})):e.resolve(p).then((function(t){l.value=t,u(l)}),(function(t){return o("throw",t,u,c)}))}c(f.arg)}(a,i,o,u)}))}return o=o?o.then(u,u):u()}}function w(t,n){var e=t.iterator[n.method];if(void 0===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,w(t,n),"throw"===n.method))return f;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=s(e,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,f;var o=r.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,f):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,f)}function x(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function _(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,o=function n(){for(;++e<t.length;)if(r.call(t,e))return n.value=t[e],n.done=!1,n;return n.value=void 0,n.done=!0,n};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return p.prototype=y.constructor=h,h.constructor=p,h[u]=p.displayName="GeneratorFunction",n.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===p||"GeneratorFunction"===(n.displayName||n.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(y),t},n.awrap=function(t){return{__await:t}},g(b.prototype),b.prototype[i]=function(){return this},n.AsyncIterator=b,n.async=function(t,e,r,o,a){void 0===a&&(a=Promise);var i=new b(c(t,e,r,o),a);return n.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},g(y),y[u]="Generator",y[a]=function(){return this},y.toString=function(){return"[object Generator]"},n.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},n.values=E,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function e(e,r){return i.type="throw",i.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return e("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),c=r.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return e(a.catchLoc,!0);if(this.prev<a.finallyLoc)return e(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return e(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return e(a.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=n&&n<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=n,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),f},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),_(e),f}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;_(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:E(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),f}},n}(n.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));function u(t,n,e,r,o,a,i){try{var u=t[a](i),c=u.value}catch(t){return void e(t)}u.done?n(c):Promise.resolve(c).then(r,o)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function i(t){u(a,r,o,i,c,"next",t)}function c(t){u(a,r,o,i,c,"throw",t)}i(void 0)}))}}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,n){return(f=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function l(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&f(t,n)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(n,e){return!e||"object"!==t(e)&&"function"!=typeof e?p(n):e}function d(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||e(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function m(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(){}var g=function(t){return t};function b(t,n){for(var e in n)t[e]=n[e];return t}function w(t){return t()}function x(){return Object.create(null)}function _(t){t.forEach(w)}function $(t){return"function"==typeof t}function E(n,e){return n!=n?e==e:n!==e||n&&"object"===t(n)||"function"==typeof n}function S(t,n,e){t.$$.on_destroy.push(function(t){if(null==t)return y;for(var n=arguments.length,e=new Array(n>1?n-1:0),r=1;r<n;r++)e[r-1]=arguments[r];var o=t.subscribe.apply(t,e);return o.unsubscribe?function(){return o.unsubscribe()}:o}(n,e))}function L(t,n,e,r){if(t){var o=R(t,n,e,r);return t[0](o)}}function R(t,n,e,r){return t[1]&&r?b(e.ctx.slice(),t[1](r(n))):e.ctx}function j(n,e,r,o,a,i,u){var c=function(n,e,r,o){if(n[2]&&o){var a=n[2](o(r));if(void 0===e.dirty)return a;if("object"===t(a)){for(var i=[],u=Math.max(e.dirty.length,a.length),c=0;c<u;c+=1)i[c]=e.dirty[c]|a[c];return i}return e.dirty|a}return e.dirty}(e,o,a,i);if(c){var s=R(e,r,o,u);n.p(s,c)}}function P(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;return t.set(e),n}var k="undefined"!=typeof window,O=k?function(){return window.performance.now()}:function(){return Date.now()},A=k?function(t){return requestAnimationFrame(t)}:y,C=new Set;function N(t){C.forEach((function(n){n.c(t)||(C.delete(n),n.f())})),0!==C.size&&A(N)}function q(t,n){t.appendChild(n)}function D(t,n,e){t.insertBefore(n,e||null)}function I(t){t.parentNode.removeChild(t)}function T(t,n){for(var e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function G(t){return document.createTextNode(t)}function F(){return G(" ")}function H(){return G("")}function M(t,n,e,r){return t.addEventListener(n,e,r),function(){return t.removeEventListener(n,e,r)}}function B(t){return function(n){return n.preventDefault(),t.call(this,n)}}function J(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Y(t){return Array.from(t.childNodes)}function z(t,n,e,r){for(var o=0;o<t.length;o+=1){var a=t[o];if(a.nodeName===n){for(var i=0,u=[];i<a.attributes.length;){var c=a.attributes[i++];e[c.name]||u.push(c.name)}for(var s=0;s<u.length;s++)a.removeAttribute(u[s]);return t.splice(o,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):U(n)}function K(t,n){for(var e=0;e<t.length;e+=1){var r=t[e];if(3===r.nodeType)return r.data=""+n,t.splice(e,1)[0]}return G(n)}function V(t){return K(t," ")}function W(t,n){n=""+n,t.data!==n&&(t.data=n)}function X(t,n){t.value=null==n?"":n}function Q(t,n,e){t.classList[e?"add":"remove"](n)}function Z(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;return Array.from(n.querySelectorAll(t))}var tt,nt=new Set,et=0;function rt(t){for(var n=5381,e=t.length;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}function ot(t,n,e,r,o,a,i){for(var u=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=16.666/r,s="{\n",f=0;f<=1;f+=c){var l=n+(e-n)*a(f);s+=100*f+"%{".concat(i(l,1-l),"}\n")}var p=s+"100% {".concat(i(e,1-e),"}\n}"),h="__svelte_".concat(rt(p),"_").concat(u),d=t.ownerDocument;nt.add(d);var v=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(U("style")).sheet),m=d.__svelte_rules||(d.__svelte_rules={});m[h]||(m[h]=!0,v.insertRule("@keyframes ".concat(h," ").concat(p),v.cssRules.length));var y=t.style.animation||"";return t.style.animation="".concat(y?"".concat(y,", "):"").concat(h," ").concat(r,"ms linear ").concat(o,"ms 1 both"),et+=1,h}function at(t,n){var e=(t.style.animation||"").split(", "),r=e.filter(n?function(t){return t.indexOf(n)<0}:function(t){return-1===t.indexOf("__svelte")}),o=e.length-r.length;o&&(t.style.animation=r.join(", "),(et-=o)||A((function(){et||(nt.forEach((function(t){for(var n=t.__svelte_stylesheet,e=n.cssRules.length;e--;)n.deleteRule(e);t.__svelte_rules={}})),nt.clear())})))}function it(t){tt=t}function ut(){if(!tt)throw new Error("Function called outside component initialization");return tt}var ct=[],st=[],ft=[],lt=[],pt=Promise.resolve(),ht=!1;function dt(t){ft.push(t)}var vt,mt=!1,yt=new Set;function gt(){if(!mt){mt=!0;do{for(var t=0;t<ct.length;t+=1){var n=ct[t];it(n),bt(n.$$)}for(ct.length=0;st.length;)st.pop()();for(var e=0;e<ft.length;e+=1){var r=ft[e];yt.has(r)||(yt.add(r),r())}ft.length=0}while(ct.length);for(;lt.length;)lt.pop()();ht=!1,mt=!1,yt.clear()}}function bt(t){if(null!==t.fragment){t.update(),_(t.before_update);var n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(dt)}}function wt(t,n,e){var r,o,a;t.dispatchEvent((r="".concat(n?"intro":"outro").concat(e),(a=document.createEvent("CustomEvent")).initCustomEvent(r,!1,!1,o),a))}var xt,_t=new Set;function $t(){xt={r:0,c:[],p:xt}}function Et(){xt.r||_(xt.c),xt=xt.p}function St(t,n){t&&t.i&&(_t.delete(t),t.i(n))}function Lt(t,n,e,r){if(t&&t.o){if(_t.has(t))return;_t.add(t),xt.c.push((function(){_t.delete(t),r&&(e&&t.d(1),r())})),t.o(n)}}var Rt={duration:0};function jt(t,n,e,r){var o=n(t,e),a=r?0:1,i=null,u=null,c=null;function s(){c&&at(t,c)}function f(t,n){var e=t.b-a;return n*=Math.abs(e),{a:a,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function l(n){var e,r=o||Rt,l=r.delay,p=void 0===l?0:l,h=r.duration,d=void 0===h?300:h,v=r.easing,m=void 0===v?g:v,b=r.tick,w=void 0===b?y:b,x=r.css,$={start:O()+p,b:n};n||($.group=xt,xt.r+=1),i?u=$:(x&&(s(),c=ot(t,a,n,d,p,m,x)),n&&w(0,1),i=f($,d),dt((function(){return wt(t,n,"start")})),e=function(n){if(u&&n>u.start&&(i=f(u,d),u=null,wt(t,i.b,"start"),x&&(s(),c=ot(t,a,i.b,i.duration,0,m,o.css))),i)if(n>=i.end)w(a=i.b,1-a),wt(t,i.b,"end"),u||(i.b?s():--i.group.r||_(i.group.c)),i=null;else if(n>=i.start){var e=n-i.start;a=i.a+i.d*m(e/i.duration),w(a,1-a)}return!(!i&&!u)},0===C.size&&A(N),new Promise((function(t){C.add({c:e,f:t})})))}return{run:function(t){$(o)?(vt||(vt=Promise.resolve()).then((function(){vt=null})),vt).then((function(){o=o(),l(t)})):l(t)},end:function(){s(),i=u=null}}}function Pt(t,n){for(var e={},r={},o={$$scope:1},a=t.length;a--;){var i=t[a],u=n[a];if(u){for(var c in i)c in u||(r[c]=1);for(var s in u)o[s]||(e[s]=u[s],o[s]=1);t[a]=u}else for(var f in i)o[f]=1}for(var l in r)l in e||(e[l]=void 0);return e}function kt(n){return"object"===t(n)&&null!==n?n:{}}function Ot(t){t&&t.c()}function At(t,n){t&&t.l(n)}function Ct(t,n,e){var r=t.$$,o=r.fragment,a=r.on_mount,i=r.on_destroy,u=r.after_update;o&&o.m(n,e),dt((function(){var n=a.map(w).filter($);i?i.push.apply(i,d(n)):_(n),t.$$.on_mount=[]})),u.forEach(dt)}function Nt(t,n){var e=t.$$;null!==e.fragment&&(_(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function qt(t,n){-1===t.$$.dirty[0]&&(ct.push(t),ht||(ht=!0,pt.then(gt)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Dt(t,n,e,r,o,a){var i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[-1],u=tt;it(t);var c=n.props||{},s=t.$$={fragment:null,ctx:null,props:a,update:y,not_equal:o,bound:x(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:x(),dirty:i},f=!1;if(s.ctx=e?e(t,c,(function(n,e){var r=!(arguments.length<=2)&&arguments.length-2?arguments.length<=2?void 0:arguments[2]:e;return s.ctx&&o(s.ctx[n],s.ctx[n]=r)&&(s.bound[n]&&s.bound[n](r),f&&qt(t,n)),e})):[],s.update(),f=!0,_(s.before_update),s.fragment=!!r&&r(s.ctx),n.target){if(n.hydrate){var l=Y(n.target);s.fragment&&s.fragment.l(l),l.forEach(I)}else s.fragment&&s.fragment.c();n.intro&&St(t.$$.fragment),Ct(t,n.target,n.anchor),gt()}it(u)}var It=function(){function t(){v(this,t)}var n,e,r;return n=t,(e=[{key:"$destroy",value:function(){Nt(this,1),this.$destroy=y}},{key:"$on",value:function(t,n){var e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),function(){var t=e.indexOf(n);-1!==t&&e.splice(t,1)}}},{key:"$set",value:function(){}}])&&m(n.prototype,e),r&&m(n,r),t}(),Tt=[];function Ut(t){var n,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y,r=[];function o(e){if(E(t,e)&&(t=e,n)){for(var o=!Tt.length,a=0;a<r.length;a+=1){var i=r[a];i[1](),Tt.push(i,t)}if(o){for(var u=0;u<Tt.length;u+=2)Tt[u][0](Tt[u+1]);Tt.length=0}}}function a(n){o(n(t))}function i(a){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y,u=[a,i];return r.push(u),1===r.length&&(n=e(o)||y),a(t),function(){var t=r.indexOf(u);-1!==t&&r.splice(t,1),0===r.length&&(n(),n=null)}}return{set:o,update:a,subscribe:i}}var Gt={},Ft=function(){return{}};function Ht(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=s(t);if(n){var o=s(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return h(this,e)}}function Mt(t){var n,e,o=t[1].default,a=L(o,t,t[0],null);return{c:function(){n=U("main"),a&&a.c()},l:function(t){var e=Y(n=z(t,"MAIN",{}));a&&a.l(e),e.forEach(I)},m:function(t,r){D(t,n,r),a&&a.m(n,null),e=!0},p:function(t,n){var e=r(n,1)[0];a&&a.p&&1&e&&j(a,o,t,t[0],e,null,null)},i:function(t){e||(St(a,t),e=!0)},o:function(t){Lt(a,t),e=!1},d:function(t){t&&I(n),a&&a.d(t)}}}function Bt(t,n,e){var r=n.$$slots,o=void 0===r?{}:r,a=n.$$scope;return t.$set=function(t){"$$scope"in t&&e(0,a=t.$$scope)},[a,o]}var Jt=function(t){l(e,It);var n=Ht(e);function e(t){var r;return v(this,e),Dt(p(r=n.call(this)),t,Bt,Mt,E,{}),r}return e}();function Yt(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=s(t);if(n){var o=s(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return h(this,e)}}function zt(t){var n,e,r=t[1].stack+"";return{c:function(){n=U("pre"),e=G(r)},l:function(t){var o=Y(n=z(t,"PRE",{}));e=K(o,r),o.forEach(I)},m:function(t,r){D(t,n,r),q(n,e)},p:function(t,n){2&n&&r!==(r=t[1].stack+"")&&W(e,r)},d:function(t){t&&I(n)}}}function Kt(t){var n,e,o,a,i,u,c,s,f,l=t[1].message+"";document.title=n=t[0];var p=t[2]&&t[1].stack&&zt(t);return{c:function(){e=F(),o=U("h1"),a=G(t[0]),i=F(),u=U("p"),c=G(l),s=F(),p&&p.c(),f=H(),this.h()},l:function(n){Z('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(I),e=V(n);var r=Y(o=z(n,"H1",{class:!0}));a=K(r,t[0]),r.forEach(I),i=V(n);var h=Y(u=z(n,"P",{class:!0}));c=K(h,l),h.forEach(I),s=V(n),p&&p.l(n),f=H(),this.h()},h:function(){J(o,"class","svelte-8od9u6"),J(u,"class","svelte-8od9u6")},m:function(t,n){D(t,e,n),D(t,o,n),q(o,a),D(t,i,n),D(t,u,n),q(u,c),D(t,s,n),p&&p.m(t,n),D(t,f,n)},p:function(t,e){var o=r(e,1)[0];1&o&&n!==(n=t[0])&&(document.title=n),1&o&&W(a,t[0]),2&o&&l!==(l=t[1].message+"")&&W(c,l),t[2]&&t[1].stack?p?p.p(t,o):((p=zt(t)).c(),p.m(f.parentNode,f)):p&&(p.d(1),p=null)},i:y,o:y,d:function(t){t&&I(e),t&&I(o),t&&I(i),t&&I(u),t&&I(s),p&&p.d(t),t&&I(f)}}}function Vt(t,n,e){var r=n.status,o=n.error;return t.$set=function(t){"status"in t&&e(0,r=t.status),"error"in t&&e(1,o=t.error)},[r,o,!1]}var Wt=function(t){l(e,It);var n=Yt(e);function e(t){var r;return v(this,e),Dt(p(r=n.call(this)),t,Vt,Kt,E,{status:0,error:1}),r}return e}();function Xt(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=s(t);if(n){var o=s(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return h(this,e)}}function Qt(t){var n,e,r,o=[t[4].props],a=t[4].component;function i(t){for(var n={},e=0;e<o.length;e+=1)n=b(n,o[e]);return{props:n}}return a&&(n=new a(i())),{c:function(){n&&Ot(n.$$.fragment),e=H()},l:function(t){n&&At(n.$$.fragment,t),e=H()},m:function(t,o){n&&Ct(n,t,o),D(t,e,o),r=!0},p:function(t,r){var u=16&r?Pt(o,[kt(t[4].props)]):{};if(a!==(a=t[4].component)){if(n){$t();var c=n;Lt(c.$$.fragment,1,0,(function(){Nt(c,1)})),Et()}a?(Ot((n=new a(i())).$$.fragment),St(n.$$.fragment,1),Ct(n,e.parentNode,e)):n=null}else a&&n.$set(u)},i:function(t){r||(n&&St(n.$$.fragment,t),r=!0)},o:function(t){n&&Lt(n.$$.fragment,t),r=!1},d:function(t){t&&I(e),n&&Nt(n,t)}}}function Zt(t){var n,e;return n=new Wt({props:{error:t[0],status:t[1]}}),{c:function(){Ot(n.$$.fragment)},l:function(t){At(n.$$.fragment,t)},m:function(t,r){Ct(n,t,r),e=!0},p:function(t,e){var r={};1&e&&(r.error=t[0]),2&e&&(r.status=t[1]),n.$set(r)},i:function(t){e||(St(n.$$.fragment,t),e=!0)},o:function(t){Lt(n.$$.fragment,t),e=!1},d:function(t){Nt(n,t)}}}function tn(t){var n,e,r,o,a=[Zt,Qt],i=[];function u(t,n){return t[0]?0:1}return n=u(t),e=i[n]=a[n](t),{c:function(){e.c(),r=H()},l:function(t){e.l(t),r=H()},m:function(t,e){i[n].m(t,e),D(t,r,e),o=!0},p:function(t,o){var c=n;(n=u(t))===c?i[n].p(t,o):($t(),Lt(i[c],1,1,(function(){i[c]=null})),Et(),(e=i[n])||(e=i[n]=a[n](t)).c(),St(e,1),e.m(r.parentNode,r))},i:function(t){o||(St(e),o=!0)},o:function(t){Lt(e),o=!1},d:function(t){i[n].d(t),t&&I(r)}}}function nn(t){for(var n,e,o=[{segment:t[2][0]},t[3].props],a={$$slots:{default:[tn]},$$scope:{ctx:t}},i=0;i<o.length;i+=1)a=b(a,o[i]);return n=new Jt({props:a}),{c:function(){Ot(n.$$.fragment)},l:function(t){At(n.$$.fragment,t)},m:function(t,r){Ct(n,t,r),e=!0},p:function(t,e){var a=r(e,1)[0],i=12&a?Pt(o,[4&a&&{segment:t[2][0]},8&a&&kt(t[3].props)]):{};147&a&&(i.$$scope={dirty:a,ctx:t}),n.$set(i)},i:function(t){e||(St(n.$$.fragment,t),e=!0)},o:function(t){Lt(n.$$.fragment,t),e=!1},d:function(t){Nt(n,t)}}}function en(t,n,e){var r,o,a,i=n.stores,u=n.error,c=n.status,s=n.segments,f=n.level0,l=n.level1,p=void 0===l?null:l,h=n.notify;return r=h,ut().$$.after_update.push(r),o=Gt,a=i,ut().$$.context.set(o,a),t.$set=function(t){"stores"in t&&e(5,i=t.stores),"error"in t&&e(0,u=t.error),"status"in t&&e(1,c=t.status),"segments"in t&&e(2,s=t.segments),"level0"in t&&e(3,f=t.level0),"level1"in t&&e(4,p=t.level1),"notify"in t&&e(6,h=t.notify)},[u,c,s,f,p,i,h]}var rn,on=function(t){l(e,It);var n=Xt(e);function e(t){var r;return v(this,e),Dt(p(r=n.call(this)),t,en,nn,E,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6}),r}return e}(),an=[/^\/blog\.json$/,/^\/blog\/([^\/]+?)\.json$/,/^\/api\/player\/?$/,/^\/api\/score\/?$/,/^\/api\/room\/?$/],un=[{js:function(){return import("./index.27ebf292.js")},css:[]},{js:function(){return import("./about.17e73009.js")},css:[]},{js:function(){return import("./index.e30307e1.js")},css:[]},{js:function(){return import("./[slug].1e47e572.js")},css:[]},{js:function(){return import("./index.db70d7b6.js")},css:[]}],cn=(rn=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/about\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/?$/,parts:[{i:2}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[null,{i:3,params:function(t){return{slug:rn(t[1])}}}]},{pattern:/^\/game\/?$/,parts:[{i:4}]}]);function sn(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{replaceState:!1},e=jn(new URL(t,document.baseURI));return e?(Sn[n.replaceState?"replaceState":"pushState"]({id:_n},"",t),kn(e,null).then((function(){}))):(location.href=t,new Promise((function(t){})))}var fn,ln,pn,hn,dn,vn="undefined"!=typeof __SAPPER__&&__SAPPER__,mn=!1,yn=[],gn="{}",bn={page:function(t){var n=Ut(t),e=!0;return{notify:function(){e=!0,n.update((function(t){return t}))},set:function(t){e=!1,n.set(t)},subscribe:function(t){var r;return n.subscribe((function(n){(void 0===r||e&&n!==r)&&t(r=n)}))}}}({}),preloading:Ut(null),session:Ut(vn&&vn.session)};bn.session.subscribe(function(){var t=c(i.mark((function t(n){var e,r,o,a,u,c;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(hn=n,mn){t.next=3;break}return t.abrupt("return");case 3:return dn=!0,e=jn(new URL(location.href)),r=ln={},t.next=8,qn(e);case 8:if(o=t.sent,a=o.redirect,u=o.props,c=o.branch,r===ln){t.next=14;break}return t.abrupt("return");case 14:return t.next=16,An(a,c,u,e.page);case 16:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}());var wn,xn=null;var _n,$n=1;var En,Sn="undefined"!=typeof history?history:{pushState:function(t,n,e){},replaceState:function(t,n,e){},scrollRestoration:""},Ln={};function Rn(n){var e=Object.create(null);return n.length>0&&n.slice(1).split("&").forEach((function(n){var o=r(/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(n.replace(/\+/g," "))),3),a=o[1],i=o[2],u=void 0===i?"":i;"string"==typeof e[a]&&(e[a]=[e[a]]),"object"===t(e[a])?e[a].push(u):e[a]=u})),e}function jn(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(vn.baseUrl))return null;var n=t.pathname.slice(vn.baseUrl.length);if(""===n&&(n="/"),!an.some((function(t){return t.test(n)})))for(var e=0;e<cn.length;e+=1){var r=cn[e],o=r.pattern.exec(n);if(o){var a=Rn(t.search),i=r.parts[r.parts.length-1],u=i.params?i.params(o):{},c={host:location.host,path:n,query:a,params:u};return{href:t.href,route:r,match:o,page:c}}}}function Pn(){return{x:pageXOffset,y:pageYOffset}}function kn(t,n,e,r){return On.apply(this,arguments)}function On(){return(On=c(i.mark((function t(n,e,r,o){var a,u,c,s,f,l,p,h,d;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e?_n=e:(a=Pn(),Ln[_n]=a,e=_n=++$n,Ln[_n]=r?a:{x:0,y:0}),_n=e,fn&&bn.preloading.set(!0),u=xn&&xn.href===n.href?xn.promise:qn(n),xn=null,c=ln={},t.next=8,u;case 8:if(s=t.sent,f=s.redirect,l=s.props,p=s.branch,c===ln){t.next=14;break}return t.abrupt("return");case 14:return t.next=16,An(f,p,l,n.page);case 16:document.activeElement&&document.activeElement.blur(),r||(h=Ln[e],o&&(d=document.getElementById(o.slice(1)))&&(h={x:0,y:d.getBoundingClientRect().top+scrollY}),Ln[_n]=h,h&&scrollTo(h.x,h.y));case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function An(t,n,e,r){return Cn.apply(this,arguments)}function Cn(){return(Cn=c(i.mark((function t(n,e,r,o){var a,u;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=2;break}return t.abrupt("return",sn(n.location,{replaceState:!0}));case 2:if(bn.page.set(o),bn.preloading.set(!1),!fn){t.next=8;break}fn.$set(r),t.next=18;break;case 8:return r.stores={page:{subscribe:bn.page.subscribe},preloading:{subscribe:bn.preloading.subscribe},session:bn.session},t.next=11,pn;case 11:if(t.t0=t.sent,r.level0={props:t.t0},r.notify=bn.page.notify,a=document.querySelector("#sapper-head-start"),u=document.querySelector("#sapper-head-end"),a&&u){for(;a.nextSibling!==u;)Un(a.nextSibling);Un(a),Un(u)}fn=new on({target:wn,props:r,hydrate:!0});case 18:yn=e,gn=JSON.stringify(o.query),mn=!0,dn=!1;case 22:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Nn(t,n,e,r){if(r!==gn)return!0;var o=yn[t];return!!o&&(n!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(e.slice(1,t+2)))||void 0))}function qn(t){return Dn.apply(this,arguments)}function Dn(){return(Dn=c(i.mark((function t(n){var e,r,o,a,u,s,f,l,p,h,d;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.route,r=n.page,o=r.path.split("/").filter(Boolean),a=null,u={error:null,status:200,segments:[o[0]]},s={fetch:function(t){function n(n,e){return t.apply(this,arguments)}return n.toString=function(){return t.toString()},n}((function(t,n){return fetch(t,n)})),redirect:function(t,n){if(a&&(a.statusCode!==t||a.location!==n))throw new Error("Conflicting redirects");a={statusCode:t,location:n}},error:function(t,n){u.error="string"==typeof n?new Error(n):n,u.status=t}},pn||(pn=vn.preloaded[0]||Ft.call(s,{host:r.host,path:r.path,query:r.query,params:{}},hn)),l=1,t.prev=7,p=JSON.stringify(r.query),h=e.pattern.exec(r.path),d=!1,t.next=13,Promise.all(e.parts.map(function(){var t=c(i.mark((function t(e,a){var c,f,v,m,y,g;return i.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=o[a],Nn(a,c,h,p)&&(d=!0),u.segments[l]=o[a+1],e){t.next=5;break}return t.abrupt("return",{segment:c});case 5:if(f=l++,dn||d||!yn[a]||yn[a].part!==e.i){t.next=8;break}return t.abrupt("return",yn[a]);case 8:return d=!1,t.next=11,Tn(un[e.i]);case 11:if(v=t.sent,m=v.default,y=v.preload,!mn&&vn.preloaded[a+1]){t.next=25;break}if(!y){t.next=21;break}return t.next=18,y.call(s,{host:r.host,path:r.path,query:r.query,params:e.params?e.params(n.match):{}},hn);case 18:t.t0=t.sent,t.next=22;break;case 21:t.t0={};case 22:g=t.t0,t.next=26;break;case 25:g=vn.preloaded[a+1];case 26:return t.abrupt("return",u["level".concat(f)]={component:m,props:g,segment:c,match:h,part:e.i});case 27:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}()));case 13:f=t.sent,t.next=21;break;case 16:t.prev=16,t.t0=t.catch(7),u.error=t.t0,u.status=500,f=[];case 21:return t.abrupt("return",{redirect:a,props:u,branch:f});case 22:case"end":return t.stop()}}),t,null,[[7,16]])})))).apply(this,arguments)}function In(t){var n="client/".concat(t);if(!document.querySelector('link[href="'.concat(n,'"]')))return new Promise((function(t,e){var r=document.createElement("link");r.rel="stylesheet",r.href=n,r.onload=function(){return t()},r.onerror=e,document.head.appendChild(r)}))}function Tn(t){var n="string"==typeof t.css?[]:t.css.map(In);return n.unshift(t.js()),Promise.all(n).then((function(t){return t[0]}))}function Un(t){t.parentNode.removeChild(t)}function Gn(t){var n=jn(new URL(t,document.baseURI));if(n)return xn&&t===xn.href||function(t,n){xn={href:t,promise:n}}(t,qn(n)),xn.promise}function Fn(t){clearTimeout(En),En=setTimeout((function(){Hn(t)}),20)}function Hn(t){var n=Bn(t.target);n&&"prefetch"===n.rel&&Gn(n.href)}function Mn(n){if(1===function(t){return null===t.which?t.button:t.which}(n)&&!(n.metaKey||n.ctrlKey||n.shiftKey||n.defaultPrevented)){var e=Bn(n.target);if(e&&e.href){var r="object"===t(e.href)&&"SVGAnimatedString"===e.href.constructor.name,o=String(r?e.href.baseVal:e.href);if(o!==location.href){if(!e.hasAttribute("download")&&"external"!==e.getAttribute("rel")&&!(r?e.target.baseVal:e.target)){var a=new URL(o);if(a.pathname!==location.pathname||a.search!==location.search){var i=jn(a);if(i)kn(i,null,e.hasAttribute("sapper-noscroll"),a.hash),n.preventDefault(),Sn.pushState({id:_n},"",a.href)}}}else location.hash||n.preventDefault()}}}function Bn(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Jn(t){if(Ln[_n]=Pn(),t.state){var n=jn(new URL(location.href));n?kn(n,t.state.id):location.href=location.href}else(function(t){_n=t})($n=$n+1),Sn.replaceState({id:_n},"",location.href)}var Yn,zn=function(){return t=Gt,ut().$$.context.get(t);var t};Yn={target:document.querySelector("#sapper")},"scrollRestoration"in Sn&&(Sn.scrollRestoration="manual"),addEventListener("beforeunload",(function(){Sn.scrollRestoration="auto"})),addEventListener("load",(function(){Sn.scrollRestoration="manual"})),function(t){wn=t}(Yn.target),addEventListener("click",Mn),addEventListener("popstate",Jn),addEventListener("touchstart",Hn),addEventListener("mousemove",Fn),Promise.resolve().then((function(){var t=location,n=t.hash,e=t.href;Sn.replaceState({id:$n},"",e);var r,o,a,i,u,c,s,f,l=new URL(location.href);if(vn.error)return r=location,o=r.host,a=r.pathname,i=r.search,u=vn.session,c=vn.preloaded,s=vn.status,f=vn.error,pn||(pn=c&&c[0]),void An(null,[],{error:f,status:s,session:u,level0:{props:pn},level1:{props:{status:s,error:f},component:Wt},segments:c},{host:o,path:a,query:Rn(i),params:{}});var p=jn(l);return p?kn(p,$n,!0,n):void 0}));export{Pt as $,P as A,$t as B,U as C,z as D,Y as E,q as F,dt as G,jt as H,J as I,X as J,M as K,B as L,T as M,_ as N,y as O,Ot as P,At as Q,Ct as R,It as S,Nt as T,g as U,Ut as V,L as W,j as X,Q as Y,$ as Z,t as _,d as a,kt as a0,b as a1,Z as a2,l as b,o as c,s as d,h as e,v as f,a as g,p as h,Dt as i,F as j,H as k,K as l,V as m,D as n,r as o,W as p,Lt as q,Et as r,E as s,G as t,St as u,I as v,S as w,zn as x,c as y,i as z};
