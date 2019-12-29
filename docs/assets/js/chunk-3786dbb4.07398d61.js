(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3786dbb4"],{3663:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-tab-container",{staticClass:"panel"},[""!==t.title?a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title m-0"},[t._v(t._s(t.title))])]):t._e(),a("latte-tab-bar"),t.properties?a("latte-tab",{attrs:{label:"Properties"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th"),a("th"),a("th")])]),a("tbody",[t._l(t.properties,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?a("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("strong",{staticClass:"text-monospace"},[t._v("NULL")]):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?a("latte-tab",{attrs:{label:"CSS-vars"}},[a("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("em",[t._v("NULL")]):"rgb"===e.type?a("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?a("latte-tab",{attrs:{label:"Events"}},[a("table",{staticClass:"table"},[t._l(t.events,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Signature")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?a("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rgb-display",style:t.styles},[a("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},l=[],o=(a("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),r=o,c=(a("543d"),a("d802")),d=Object(c["a"])(r,i,l,!1,null,"fbec4d7e",null),p=d.exports,u={name:"ApiExplorer",components:{RgbDisplay:p},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array},title:{default:"API",type:String}}},m=u,v=Object(c["a"])(m,s,n,!1,null,null,null);e["a"]=v.exports},"543d":function(t,e,a){"use strict";var s=a("708e"),n=a.n(s);n.a},"708e":function(t,e,a){},"73d1":function(t,e,a){"use strict";var s=a("fbc7"),n=a.n(s);n.a},"857a":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"components-pagination"}},[a("PageHeader",[a("h1",[t._v("Pagination")])]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[a("CodeExample",{attrs:{title:"Basic",url:"/snippets/components/pagination/basic.html"}}),a("CodeExample",{attrs:{title:"Controller bar",url:"/snippets/components/pagination/controller-bar.html"}}),a("CodeExample",{attrs:{title:"Vue component",url:"/snippets/components/pagination/vue-component.html"}},[a("ApiExplorer",t._b({staticClass:"panel-blank border-top",attrs:{slot:"root",title:""},slot:"root"},"ApiExplorer",t.api,!1))],1)],1),a("div",{staticClass:"col-12 col-lg-3"},[a("TableOfContents")],1)])])],1)},n=[],i=a("3663"),l=a("c8e6"),o=a("36ad"),r=a("9f6c"),c={name:"Pagination",components:{ApiExplorer:i["a"],CodeExample:l["a"],PageHeader:o["a"],TableOfContents:r["a"]},data:function(){return{api:{events:[{name:"limit",description:"Invoked when the limit is changed by the user.",signature:"(limit: number)"},{name:"navigate",description:"Invoked when the user clicked an item.",signature:"(page: number)"}],properties:[{name:"limit",description:"Tells pagination what the limit per page is.",type:"number",default:10,required:!0},{name:"offset",description:"Tells pagination what the current offset is.",type:"number",default:0,required:!0},{name:"total",description:"Tells pagination how many items there are in total.",type:"number",default:0,required:!0},{name:"controller-bar",description:"Shows the controller bar.",type:"boolean",default:!1},{name:"navigation-controls",description:"Shows arrow navigation controls.",type:"boolean",default:!0},{name:"size-end",description:"Controls how many pages are be visible at both ends.",type:"number",default:2},{name:"size-mid",description:"Controls how many pages are visible in the middle.",type:"number",default:1}]}}}},d=c,p=a("d802"),u=Object(p["a"])(d,s,n,!1,null,null,null);e["default"]=u.exports},"9f6c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel mb-panel-gutter"},[a("nav",{staticClass:"nav nav-list"},[t._l(t.elements,(function(e){return[e.isSeparator?a("div",{staticClass:"divider divider-horizontal"}):a("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(a){return t.goToElement(e.el)}}},[a("span",[t._v(t._s(e.title))])])]}))],2)])},n=[],i=(a("cfce"),a("33ef"),a("a287")),l={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map((function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}}))},methods:{goToElement:function(t){var e=i["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var a=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:a.top+document.scrollingElement.scrollTop-84})}}},o=l,r=(a("e0cb"),a("d802")),c=Object(r["a"])(o,s,n,!1,null,"d9f8fe3a",null);e["a"]=c.exports},c8e6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),a("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?a("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),a("div",{staticClass:"code-example-preview"},[null!==t.component?a(t.component,{tag:"component"}):t._e()],1),t.showCode?a("div",{staticClass:"code-example-code"},[t.code?a("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),t._t("root"),a("span",{staticClass:"spinner spinner-primary"})],2)},n=[],i=(a("d86f"),a("88a1"),a("2aa5"),a("0d9f"),a("32f5"),a("a287")),l=a("4f2b"),o=a("2d1a"),r={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{bindings:{default:function(){return{}},type:Object},previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,i["a"].api.request(this.url).then((function(t){return t.text()})).then((function(e){return t.onSnippetLoaded(e)})).catch((function(t){return i["a"].core.handleError(t)}))},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),"");var e=this.bindings||{};this.component=l["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(t,"</div>"),data:function(){return e||{}}}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},c=r,d=(a("73d1"),a("d802")),p=Object(d["a"])(c,s,n,!1,null,null,null);e["a"]=p.exports},e0cb:function(t,e,a){"use strict";var s=a("e322"),n=a.n(s);n.a},e322:function(t,e,a){},fbc7:function(t,e,a){}}]);
//# sourceMappingURL=chunk-3786dbb4.07398d61.js.map