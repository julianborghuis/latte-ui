(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a0dc27b"],{"0576":function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-action btn-text btn-primary preview:m-1"><latte-icon>dots-horizontal</latte-icon><span>Love</span></button>\n<button class="btn btn-action btn-text btn-primary preview:m-1"><latte-icon>share</latte-icon><span>Share</span></button>\n<button class="btn btn-action btn-text btn-primary preview:m-1"><latte-icon>comment</latte-icon><span>Comment</span></button>\n'},"1a39":function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-outline btn-sm preview:m-1"><span>Button</span></button>\n<button class="btn btn-outline preview:m-1"><span>Button</span></button>\n<button class="btn btn-outline btn-lg preview:m-1"><span>Button</span></button>\n'},"27d8":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 mb-4"},[n("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),n("div",{staticClass:"row"},[t._t("default")],2)])},s=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},o=i,l=n("d802"),c=Object(l["a"])(o,a,s,!1,null,null,null);e["a"]=c.exports},3663:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("latte-tab-container",{staticClass:"panel overflow-auto text-left",staticStyle:{"z-index":"0"}},[n("latte-tab-bar",{staticStyle:{position:"sticky",left:"0"}}),t.properties?n("latte-tab",{attrs:{label:"Properties"}},[n("table",{staticClass:"table"},[n("thead",[n("tr",[n("th"),n("th"),n("th")])]),n("tbody",[t._l(t.properties,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?n("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Type")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?n("strong",{staticClass:"text-monospace"},[t._v("NULL")]):n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?n("latte-tab",{attrs:{label:"CSS-vars"}},[n("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Type")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?n("em",[t._v("NULL")]):"rgb"===e.type?n("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?n("latte-tab",{attrs:{label:"Events"}},[n("table",{staticClass:"table"},[t._l(t.events,(function(e){return[n("tr",[n("td",{staticStyle:{"min-width":"300px"}},[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Name")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?n("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),n("td",[n("div",{staticClass:"column-content justify-content-start"},[n("small",{staticClass:"text-muted"},[t._v("Signature")]),n("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?n("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},s=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rgb-display",style:t.styles},[n("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},o=[],l=(n("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),c=l,r=(n("a1c0"),n("d802")),u=Object(r["a"])(c,i,o,!1,null,"6ba614da",null),p=u.exports,b={name:"ApiExplorer",components:{RgbDisplay:p},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},d=b,m=Object(r["a"])(d,a,s,!1,null,null,null);e["a"]=m.exports},"36ad":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[n("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 py-3"},[n("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return n("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(n){return t.navigate(e.selector)}}},[n("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},s=[],i=(n("2d6d"),n("cfce"),n("28eb"),n("b506"),n("a287")),o={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var n=e.getBoundingClientRect();window.scrollTo({top:n.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return i["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,n){return Math.abs(e.rect.top-t)<Math.abs(n.rect.top-t)?e:n}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var n=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:n})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},l=o,c=n("d802"),r=Object(c["a"])(l,a,s,!1,null,null,null);e["a"]=r.exports},"37da":function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-text btn-primary preview:m-1"><span>Button</span></button>\n<button class="btn btn-text btn-primary preview:m-1"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n<button class="btn btn-text btn-primary preview:m-1"><span>Button</span><latte-icon>arrow-right-bold-circle</latte-icon></button>\n<button class="btn btn-text btn-primary btn-icon preview:m-1"><latte-icon>dots-horizontal</latte-icon></button>\n'},"6a97":function(t,e,n){"use strict";n.r(e),e["default"]='<div class="btn-group preview:m-1">\n\t<button class="btn btn-contained btn-primary"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n\t<button class="btn btn-contained btn-primary btn-icon"><latte-icon>chevron-down</latte-icon></button>\n</div>\n\n<div class="btn-group preview:m-1">\n\t<button class="btn btn-contained btn-primary btn-icon"><latte-icon>format-align-left</latte-icon></button>\n\t<button class="btn btn-contained btn-primary btn-icon"><latte-icon>format-align-center</latte-icon></button>\n\t<button class="btn btn-contained btn-primary btn-icon"><latte-icon>format-align-right</latte-icon></button>\n\t<button class="btn btn-contained btn-primary btn-icon"><latte-icon>format-align-justify</latte-icon></button>\n</div>\n'},8701:function(t,e,n){},a1c0:function(t,e,n){"use strict";var a=n("8701"),s=n.n(a);s.a},ae30:function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-soft btn-primary preview:m-1"><span>Button</span></button>\n<button class="btn btn-soft btn-primary preview:m-1"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n<button class="btn btn-soft btn-primary preview:m-1"><span>Button</span><latte-icon>arrow-right-bold-circle</latte-icon></button>\n<button class="btn btn-soft btn-primary btn-icon preview:m-1"><latte-icon>dots-horizontal</latte-icon></button>\n'},b989:function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-outline btn-primary preview:m-1"><span>Button</span></button>\n<button class="btn btn-outline btn-primary preview:m-1"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n<button class="btn btn-outline btn-primary preview:m-1"><span>Button</span><latte-icon>arrow-right-bold-circle</latte-icon></button>\n<button class="btn btn-outline btn-primary btn-icon preview:m-1"><latte-icon>dots-horizontal</latte-icon></button>\n'},c8e6:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel overflow-hidden"},[n("div",{staticClass:"panel-header"},[n("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?n(t.preview,{tag:"component"}):t._e(),n("div",{staticClass:"panel-body"},[n("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},s=[],i=(n("d86f"),n("2aa5"),n("32f5"),n("b55a"),n("4f2b")),o=n("2d1a"),l={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,n=this.previewCode;return i["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(n,"</div>"),data:function(){return t}})}}},c=l,r=n("d802"),u=Object(r["a"])(c,a,s,!1,null,null,null);e["a"]=u.exports},d069:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page",attrs:{id:"component-app-bar"}},[n("PageHeader",{attrs:{title:"Button",tabs:t.tabs}}),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[n("div",{staticClass:"col-12 col-lg-6"},[n("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[n("div",{staticClass:"col-12"},[n("CodeExample",{attrs:{code:t.previews.contained,title:"Contained",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.outline,title:"Outline",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.soft,title:"Soft",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.text,title:"Text",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.action,title:"Action",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.floatingAction,title:"Floating action",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.group,title:"Group",classes:"bg-panel d-flex flex-wrap justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.pill,title:"Pill",classes:"d-flex flex-column flex-lg-row justify-content-center"}}),n("CodeExample",{attrs:{code:t.previews.sizes,title:"Sizes",classes:"bg-panel d-flex flex-wrap align-items-center justify-content-center"}})],1)]),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[n("div",{staticClass:"col-12"},[n("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1)])],1)},s=[],i=(n("cfce"),n("0659"),n("2aa5"),n("62c8"),n("36ad")),o=n("27d8"),l=n("c8e6"),c=n("3663"),r={name:"Button",components:{ApiExplorer:c["a"],CodeExample:l["a"],TitledRow:o["a"],PageHeader:i["a"]},data:function(){var t=window.getComputedStyle(document.body);return{api:{variables:[{name:"--btnAlpha",description:"Controls the button alpha level.",type:"int",default:1},{name:"--btnBackground",description:"Background color.",type:"rgb",default:t.getPropertyValue("--btnBackground").split(",").map((function(t){return parseInt(t)}))},{name:"--btnForeground",description:"Foreground color.",type:"rgb",default:t.getPropertyValue("--btnForeground").split(",").map((function(t){return parseInt(t)}))},{name:"--btnFontSize",description:"Font size of the button.",type:"string",default:t.getPropertyValue("--btnFontSize")},{name:"--btnHeight",description:"Height of the button.",type:"string",default:t.getPropertyValue("--btnHeight")},{name:"--btnHover",description:"Hover state.",type:"int",default:0},{name:"--btnIconSize",description:"Icon size.",type:"string",default:t.getPropertyValue("--btnIconSize")},{name:"--btnPadding",description:"Button padding.",type:"string",default:t.getPropertyValue("--btnPadding")}]},previews:{contained:n("e567").default,outline:n("b989").default,soft:n("ae30").default,text:n("37da").default,action:n("0576").default,floatingAction:n("d2ef").default,group:n("6a97").default,pill:n("d4cb0").default,sizes:n("1a39").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},u=r,p=n("d802"),b=Object(p["a"])(u,a,s,!1,null,null,null);e["default"]=b.exports},d2ef:function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-contained btn-fab btn-primary preview:m-1"><latte-icon>plus</latte-icon></button>\n<button class="btn btn-contained btn-fab btn-error preview:m-1"><latte-icon>plus</latte-icon></button>\n<button class="btn btn-contained btn-fab btn-info preview:m-1"><latte-icon>plus</latte-icon></button>\n<button class="btn btn-contained btn-fab btn-success preview:m-1"><latte-icon>plus</latte-icon></button>\n<button class="btn btn-contained btn-fab btn-warning preview:m-1"><latte-icon>plus</latte-icon></button>\n'},d4cb0:function(t,e,n){"use strict";n.r(e),e["default"]='<div class="panel preview:m-0">\n\t<div class="panel-body">\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis incidunt magnam molestiae obcaecati odio rerum sint sunt tenetur totam! Alias cum debitis eveniet exercitationem expedita reiciendis temporibus unde vel.</p>\n\t\t<button class="btn btn-pill btn-contained btn-primary"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n\t</div>\n</div>\n\n<div class="panel preview:mt-panel-gutter preview:m-lg-0 preview:ml-lg-5">\n\t<div class="panel-body">\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis incidunt magnam molestiae obcaecati odio rerum sint sunt tenetur totam! Alias cum debitis eveniet exercitationem expedita reiciendis temporibus unde vel.</p>\n\t</div>\n\t<div class="btn-group">\n\t\t<button class="btn btn-pill btn-contained btn-primary"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n\t\t<button class="btn btn-pill btn-contained btn-primary"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n\t</div>\n</div>\n'},e567:function(t,e,n){"use strict";n.r(e),e["default"]='<button class="btn btn-contained btn-primary preview:m-1"><span>Button</span></button>\n<button class="btn btn-contained btn-primary preview:m-1"><latte-icon>check-circle</latte-icon><span>Button</span></button>\n<button class="btn btn-contained btn-primary preview:m-1"><span>Button</span><latte-icon>arrow-right-bold-circle</latte-icon></button>\n<button class="btn btn-contained btn-primary btn-icon preview:m-1"><latte-icon>dots-horizontal</latte-icon></button>\n'}}]);
//# sourceMappingURL=chunk-2a0dc27b.7b6df61a.js.map