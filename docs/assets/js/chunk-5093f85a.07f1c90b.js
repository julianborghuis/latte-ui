(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5093f85a"],{"1f76":function(t,e,a){},"50ae":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"layout-grid-system"}},[a("PageHeader",[a("h1",[t._v("Grid System")])]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[a("CodeExample",{attrs:{title:"Auto grid",url:"/snippets/layout/grid-system/auto-grid.html"}}),a("CodeExample",{attrs:{title:"Various widths",url:"/snippets/layout/grid-system/widths.html"}})],1),a("div",{staticClass:"col-12 col-lg-3"},[a("TableOfContents")],1)])])],1)},s=[],i=a("36ad"),l=a("9f6c"),o=a("c8e6"),r={name:"GridSystem",components:{CodeExample:o["a"],PageHeader:i["a"],TableOfContents:l["a"]}},c=r,d=(a("71d0"),a("2be6")),u=Object(d["a"])(c,n,s,!1,null,null,null);e["default"]=u.exports},"71d0":function(t,e,a){"use strict";var n=a("f2af"),s=a.n(n);s.a},"73d1":function(t,e,a){"use strict";var n=a("8311"),s=a.n(n);s.a},8311:function(t,e,a){},"9f6c":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel mb-panel-gutter"},[a("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(e){return[e.isSeparator?a("div",{staticClass:"divider divider-horizontal"}):a("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(a){return t.goToElement(e.el)}}},[a("span",[t._v(t._s(e.title))])])]})],2)])},s=[],i=a("a287"),l={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var e=i["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var a=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:a.top+document.scrollingElement.scrollTop-84})}}},o=l,r=(a("b313"),a("2be6")),c=Object(r["a"])(o,n,s,!1,null,"24566663",null);e["a"]=c.exports},b313:function(t,e,a){"use strict";var n=a("1f76"),s=a.n(n);s.a},c8e6:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),a("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?a("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),a("div",{staticClass:"code-example-preview"},[null!==t.component?a(t.component,{tag:"component"}):t._e()],1),t.showCode?a("div",{staticClass:"code-example-code"},[t.code?a("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),t._t("root"),a("span",{staticClass:"spinner spinner-primary"})],2)},s=[],i=(a("04f7"),a("ae66"),a("a287")),l=a("4f2b"),o=a("2d1a"),r={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,i["a"].api.request(this.url).then(function(t){return t.text()}).then(function(e){return t.onSnippetLoaded(e)}).catch(function(t){return i["a"].core.handleError(t)})},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),""),this.component=l["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(t,"</div>")}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},c=r,d=(a("73d1"),a("2be6")),u=Object(d["a"])(c,n,s,!1,null,null,null);e["a"]=u.exports},f2af:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5093f85a.07f1c90b.js.map