(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23c4a5ed"],{"27d8":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 mb-4"},[n("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),n("div",{staticClass:"row"},[t._t("default")],2)])},r=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},s=i,o=n("d802"),l=Object(o["a"])(s,a,r,!1,null,null,null);e["a"]=l.exports},3663:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("latte-tab-container",{staticClass:"panel overflow-auto text-left",staticStyle:{"z-index":"0"}},[n("latte-tab-bar",{staticStyle:{position:"sticky",left:"0"}}),t.properties?n("latte-tab",{attrs:{label:"Properties"}},[n("table",{staticClass:"table"},[n("thead",[n("tr",[n("th"),n("th"),n("th")])]),n("tbody",[t._l(t.properties,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?n("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Type")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?n("strong",{staticClass:"text-monospace"},[t._v("NULL")]):n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?n("latte-tab",{attrs:{label:"CSS-vars"}},[n("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Type")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?n("em",[t._v("NULL")]):"rgb"===e.type?n("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?n("latte-tab",{attrs:{label:"Events"}},[n("table",{staticClass:"table"},[t._l(t.events,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Signature")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?n("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},r=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rgb-display",style:t.styles},[n("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},s=[],o=(n("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),l=o,c=(n("a1c0"),n("d802")),u=Object(c["a"])(l,i,s,!1,null,"6ba614da",null),d=u.exports,p={name:"ApiExplorer",components:{RgbDisplay:d},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},f=p,h=Object(c["a"])(f,a,r,!1,null,null,null);e["a"]=h.exports},"36ad":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[n("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 py-3"},[n("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return n("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(n){return t.navigate(e.selector)}}},[n("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},r=[],i=(n("2d6d"),n("cfce"),n("28eb"),n("b506"),n("a287")),s={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var n=e.getBoundingClientRect();window.scrollTo({top:n.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return i["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,n){return Math.abs(e.rect.top-t)<Math.abs(n.rect.top-t)?e:n}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var n=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:n})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},o=s,l=n("d802"),c=Object(l["a"])(o,a,r,!1,null,null,null);e["a"]=c.exports},"5aea":function(t,e,n){"use strict";n.r(e),e["default"]='export default function exampleDataSource()\n{\n\tlet rows = [];\n\n\tfor (let i = 0; i < 100; i++)\n\t{\n\t\trows.push({\n\t\t\tname: `Item ${i + 1}`,\n\t\t\temail: `user${i + 1}@example.com`\n\t\t});\n\t}\n\n\treturn {\n\t\tactions: [],\n\t\tcolumns: [\n\t\t\t{\n\t\t\t\tfield: "name",\n\t\t\t\tlabel: "Name",\n\t\t\t\ttemplate: `<div class="column-content"><strong>{{ row.name }}</strong></div>`,\n\t\t\t\twidth: 150\n\t\t\t},\n\t\t\t{\n\t\t\t\tfield: "name",\n\t\t\t\tlabel: "Name",\n\t\t\t\ttemplate: `<div class="column-content">{{ row.email }}</div>`\n\t\t\t}\n\t\t],\n\t\tinitial_data: undefined,\n\t\tlimit: 10,\n\t\toffset: 0,\n\n\t\tasync requestData(offset, limit, filters, params, sorting)\n\t\t{\n\t\t\treturn {\n\t\t\t\tdata: rows.slice(offset, offset + limit),\n\t\t\t\tpagination: undefined,\n\t\t\t\ttotal: rows.length\n\t\t\t};\n\t\t}\n\t};\n}\n'},8701:function(t,e,n){},9310:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page",attrs:{id:"component-app-bar"}},[n("PageHeader",{attrs:{title:"Datatable",tabs:t.tabs}}),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[n("div",{staticClass:"col-12 col-lg-6"},[n("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[n("div",{staticClass:"col-12"},[n("CodeExample",{attrs:{code:t.previews.standard,bindings:t.bindings.standard,title:"Standard",classes:"bg-panel"}})],1)]),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[n("div",{staticClass:"col-12"},[n("ApiExplorer",t._b({},"ApiExplorer",t.api,!1)),n("div",{staticClass:"panel"},[n("div",{staticClass:"panel-header"},[n("span",{staticClass:"panel-title"},[t._v("Data source")])]),n("div",{staticClass:"panel-body"},[n("CodeSnippet",{attrs:{"code-string":t.snippets.dataSource,lang:"js"}})],1)])],1)])],1)},r=[],i=n("36ad"),s=n("27d8"),o=n("c8e6"),l=n("2d1a"),c=n("3663"),u={name:"Chat",components:{ApiExplorer:c["a"],CodeSnippet:l["a"],CodeExample:o["a"],TitledRow:s["a"],PageHeader:i["a"]},data:function(){return{api:{events:[{name:"input",description:"Invoked when the selection of the data table is changed.",signature:"(selection: Array | number)"}],properties:[{name:"data-source",description:"When a function is passed, that function should return a data source object described below. When an URL is given that is used as a data source.",default:null,type:"Function, string"},{name:"default-limit",description:"The initial limit of items to load and show. This property is used when the datatable is mounted.",default:"20",type:"number"},{name:"name",description:"The name of the datatable within a <form> element.",default:"[random]",type:"string"},{name:"select-mode",description:"The selection mode used in the datatable. When single is used, value is a number containing an ID and when multiple is used value is an array containing the IDs.",default:"none",type:"'none', 'single', 'multiple'"},{name:"show-header",description:"Enable or disable the table header.",default:!0,type:"boolean"},{name:"show-search",description:"Enable or disable searching the data.",default:!0,type:"boolean"},{name:"show-sorting",description:"Enable or disable data sorting.",default:!0,type:"boolean"},{name:"spinner",description:"Should the datatable add a spinner when data is loading?",default:!0,type:"boolean"},{name:"value",description:"The selection value.",default:null,type:"Array, number, NULL"}]},bindings:{standard:{exampleDataSource:n("d446").default}},previews:{standard:n("e4c5").default},snippets:{dataSource:n("5aea").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},d=u,p=n("d802"),f=Object(p["a"])(d,a,r,!1,null,null,null);e["default"]=f.exports},a1c0:function(t,e,n){"use strict";var a=n("8701"),r=n.n(a);r.a},c8e6:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel overflow-hidden"},[n("div",{staticClass:"panel-header"},[n("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?n(t.preview,{tag:"component"}):t._e(),n("div",{staticClass:"panel-body"},[n("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},r=[],i=(n("d86f"),n("2aa5"),n("32f5"),n("b55a"),n("4f2b")),s=n("2d1a"),o={name:"CodeExample",components:{CodeSnippet:s["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,n=this.previewCode;return i["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(n,"</div>"),data:function(){return t}})}}},l=o,c=n("d802"),u=Object(c["a"])(l,a,r,!1,null,null,null);e["a"]=u.exports},d446:function(t,e,n){"use strict";n.r(e);n("33ef"),n("df26"),n("ef1f"),n("26d3");function a(t,e,n,a,r,i,s){try{var o=t[i](s),l=o.value}catch(c){return void n(c)}o.done?e(l):Promise.resolve(l).then(a,r)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var s=t.apply(e,n);function o(t){a(s,r,i,o,l,"next",t)}function l(t){a(s,r,i,o,l,"throw",t)}o(void 0)}))}}function i(){for(var t=[],e=0;e<100;e++)t.push({name:"Item ".concat(e+1),email:"user".concat(e+1,"@example.com")});return{actions:[],columns:[{field:"name",label:"Name",template:'<div class="column-content"><strong>{{ row.name }}</strong></div>',width:150},{field:"name",label:"Name",template:'<div class="column-content">{{ row.email }}</div>'}],initial_data:void 0,limit:10,offset:0,requestData:function(){var e=r(regeneratorRuntime.mark((function e(n,a,r,i,s){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",{data:t.slice(n,n+a),pagination:void 0,total:t.length});case 1:case"end":return e.stop()}}),e)})));function n(t,n,a,r,i){return e.apply(this,arguments)}return n}()}}n.d(e,"default",(function(){return i}))},df26:function(t,e,n){var a=function(t){"use strict";var e,n=Object.prototype,a=n.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function l(t,e,n,a){var r=e&&e.prototype instanceof m?e:m,i=Object.create(r.prototype),s=new T(a||[]);return i._invoke=E(t,n,s),i}function c(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(a){return{type:"throw",arg:a}}}t.wrap=l;var u="suspendedStart",d="suspendedYield",p="executing",f="completed",h={};function m(){}function v(){}function g(){}var y={};y[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(O([])));w&&w!==n&&a.call(w,i)&&(y=w);var _=g.prototype=m.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function C(t){function e(n,r,i,s){var o=c(t[n],t,r);if("throw"!==o.type){var l=o.arg,u=l.value;return u&&"object"===typeof u&&a.call(u,"__await")?Promise.resolve(u.__await).then((function(t){e("next",t,i,s)}),(function(t){e("throw",t,i,s)})):Promise.resolve(u).then((function(t){l.value=t,i(l)}),(function(t){return e("throw",t,i,s)}))}s(o.arg)}var n;function r(t,a){function r(){return new Promise((function(n,r){e(t,a,n,r)}))}return n=n?n.then(r,r):r()}this._invoke=r}function E(t,e,n){var a=u;return function(r,i){if(a===p)throw new Error("Generator is already running");if(a===f){if("throw"===r)throw i;return k()}n.method=r,n.arg=i;while(1){var s=n.delegate;if(s){var o=L(s,n);if(o){if(o===h)continue;return o}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===u)throw a=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=p;var l=c(t,e,n);if("normal"===l.type){if(a=n.done?f:d,l.arg===h)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(a=f,n.method="throw",n.arg=l.arg)}}}function L(t,n){var a=t.iterator[n.method];if(a===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,L(t,n),"throw"===n.method))return h;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var r=c(a,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,h;var i=r.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,h):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,h)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,s=function n(){while(++r<t.length)if(a.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=e,n.done=!0,n};return s.next=s}}return{next:k}}function k(){return{value:e,done:!0}}return v.prototype=_.constructor=g,g.constructor=v,g[o]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,o in t||(t[o]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(C.prototype),C.prototype[s]=function(){return this},t.AsyncIterator=C,t.async=function(e,n,a,r){var i=new C(l(e,n,a,r));return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(_),_[o]="Generator",_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var a=e.pop();if(a in t)return n.value=a,n.done=!1,n}return n.done=!0,n}},t.values=O,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&a.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(a,r){return o.type="throw",o.arg=t,n.next=a,r&&(n.method="next",n.arg=e),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var s=this.tryEntries[i],o=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var l=a.call(s,"catchLoc"),c=a.call(s,"finallyLoc");if(l&&c){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(l){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if("throw"===a.type){var r=a.arg;j(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,a){return this.delegate={iterator:O(t),resultName:n,nextLoc:a},"next"===this.method&&(this.arg=e),h}},t}(t.exports);try{regeneratorRuntime=a}catch(r){Function("r","regeneratorRuntime = r")(a)}},e4c5:function(t,e,n){"use strict";n.r(e),e["default"]='<latte-data-table class="border" :data-source="exampleDataSource" :default-limit="5"></latte-data-table>\n'}}]);
//# sourceMappingURL=chunk-23c4a5ed.66da0c74.js.map