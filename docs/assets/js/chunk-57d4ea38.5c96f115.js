(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57d4ea38"],{"064d":function(t,e,a){},"5cab":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"components-chat"}},[a("PageHeader",[a("h1",[t._v("Chat")])]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[a("CodeExample",{attrs:{title:"Bubbles",url:"/snippets/components/chat/bubbles.html"}}),a("CodeExample",{attrs:{title:"With avatars",url:"/snippets/components/chat/with-avatar.html"}})],1),a("div",{staticClass:"col-12 col-lg-3"},[a("TableOfContents")],1)])])],1)},s=[],l=a("c8e6"),i=a("9f6c"),o=a("36ad"),c={name:"Chat",components:{CodeExample:l["a"],PageHeader:o["a"],TableOfContents:i["a"]}},r=c,d=a("2be6"),p=Object(d["a"])(r,n,s,!1,null,null,null);e["default"]=p.exports},"5f1a":function(t,e,a){"use strict";var n=a("064d"),s=a.n(n);s.a},"73d1":function(t,e,a){"use strict";var n=a("8311"),s=a.n(n);s.a},8311:function(t,e,a){},"9f6c":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel mb-panel-gutter"},[a("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(e){return[e.isSeparator?a("div",{staticClass:"divider divider-horizontal"}):a("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(a){return t.goToElement(e.el)}}},[a("span",[t._v(t._s(e.title))])])]})],2)])},s=[],l=a("a287"),i={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var e=l["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var a=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:a.top+document.scrollingElement.scrollTop-84})}}},o=i,c=(a("5f1a"),a("2be6")),r=Object(c["a"])(o,n,s,!1,null,"76e53672",null);e["a"]=r.exports},c8e6:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),a("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?a("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),a("div",{staticClass:"code-example-preview"},[null!==t.component?a(t.component,{tag:"component"}):t._e()],1),t.showCode?a("div",{staticClass:"code-example-code"},[t.code?a("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),t._t("root"),a("span",{staticClass:"spinner spinner-primary"})],2)},s=[],l=(a("04f7"),a("ae66"),a("a287")),i=a("4f2b"),o=a("2d1a"),c={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{bindings:{default:function(){return{}},type:Object},previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,l["a"].api.request(this.url).then(function(t){return t.text()}).then(function(e){return t.onSnippetLoaded(e)}).catch(function(t){return l["a"].core.handleError(t)})},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),"");var e=this.bindings||{};this.component=i["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(t,"</div>"),data:function(){return e||{}}}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},r=c,d=(a("73d1"),a("2be6")),p=Object(d["a"])(r,n,s,!1,null,null,null);e["a"]=p.exports}}]);
//# sourceMappingURL=chunk-57d4ea38.5c96f115.js.map