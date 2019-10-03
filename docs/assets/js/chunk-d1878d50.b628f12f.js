(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d1878d50"],{"1d88":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page",attrs:{id:"components-form-elements"}},[n("PageHeader",[n("h1",[e._v("Form elements")])]),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[n("CodeExample",{attrs:{title:"Field",url:"/snippets/components/form-elements/field.html"}}),n("CodeExample",{attrs:{title:"Select",url:"/snippets/components/form-elements/select.html"}}),n("CodeExample",{attrs:{title:"Date/Time",url:"/snippets/components/form-elements/datetime.html"}}),n("CodeExample",{attrs:{title:"Addons",url:"/snippets/components/form-elements/addons.html"}}),n("CodeExample",{attrs:{title:"Colors",url:"/snippets/components/form-elements/colors.html"}}),n("CodeExample",{attrs:{title:"Password",url:"/snippets/components/form-elements/password.html"}}),n("CodeExample",{attrs:{title:"Autocomplete",url:"/snippets/components/form-elements/autocomplete.html"}}),n("CodeExample",{attrs:{title:"Range",url:"/snippets/components/form-elements/range.html"}}),n("CodeExample",{attrs:{title:"Checkbox",url:"/snippets/components/form-elements/checkbox.html"}}),n("CodeExample",{attrs:{title:"Radio",url:"/snippets/components/form-elements/radio.html"}}),n("CodeExample",{attrs:{title:"Toggle",url:"/snippets/components/form-elements/toggle.html"}})],1),n("div",{staticClass:"col-12 col-lg-3"},[n("TableOfContents")],1)])])],1)},a=[],l=n("c8e6"),o=n("9f6c"),i=n("36ad"),r={name:"FormElements",components:{CodeExample:l["a"],PageHeader:i["a"],TableOfContents:o["a"]}},c=r,p=n("2be6"),d=Object(p["a"])(c,s,a,!1,null,null,null);t["default"]=d.exports},"1f76":function(e,t,n){},"73d1":function(e,t,n){"use strict";var s=n("8311"),a=n.n(s);a.a},8311:function(e,t,n){},"9f6c":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel mb-panel-gutter"},[n("nav",{staticClass:"nav nav-list"},[e._l(e.elements,function(t){return[t.isSeparator?n("div",{staticClass:"divider divider-horizontal"}):n("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===t.type},attrs:{as:"a"},on:{click:function(n){return e.goToElement(t.el)}}},[n("span",[e._v(e._s(t.title))])])]})],2)])},a=[],l=n("a287"),o={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var e=document.querySelector("div.page"),t=Array.prototype.slice.call(e.querySelectorAll("h2,h3,.docs-separator"));this.elements=t.map(function(e){return{el:e,title:e.textContent,type:e.tagName.toLowerCase(),isSeparator:e.classList.contains("docs-separator")}})},methods:{goToElement:function(e){var t=l["a"].util.dom.closest(e,"div.panel");null!==t&&(e=t);var n=e.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:n.top+document.scrollingElement.scrollTop-84})}}},i=o,r=(n("b313"),n("2be6")),c=Object(r["a"])(i,s,a,!1,null,"24566663",null);t["a"]=c.exports},b313:function(e,t,n){"use strict";var s=n("1f76"),a=n.n(s);a.a},c8e6:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel code-example-panel",class:{"is-loading":e.isLoading}},[n("div",{staticClass:"panel-header"},[n("h2",{staticClass:"panel-title mb-0"},[e._v(e._s(e.title))]),n("div",{staticClass:"ml-auto"}),e._t("header")],2),e.$slots.default?n("div",{staticClass:"panel-body"},[e._t("default")],2):e._e(),n("div",{staticClass:"code-example-preview"},[null!==e.component?n(e.component,{tag:"component"}):e._e()],1),e.showCode?n("div",{staticClass:"code-example-code"},[e.code?n("CodeSnippet",{attrs:{lang:"html"}},[e._v(e._s(e.code))]):e._e()],1):e._e(),e._t("root"),n("span",{staticClass:"spinner spinner-primary"})],2)},a=[],l=(n("04f7"),n("ae66"),n("a287")),o=n("4f2b"),i=n("2d1a"),r={name:"CodeExample",components:{CodeSnippet:i["a"]},props:{bindings:{default:function(){return{}},type:Object},previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var e=this;this.isLoading=!0,l["a"].api.request(this.url).then(function(e){return e.text()}).then(function(t){return e.onSnippetLoaded(t)}).catch(function(e){return l["a"].core.handleError(e)})},onSnippetLoaded:function(e){this.code=e.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),"");var t=this.bindings||{};this.component=o["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(e,"</div>"),data:function(){return t||{}}}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},c=r,p=(n("73d1"),n("2be6")),d=Object(p["a"])(c,s,a,!1,null,null,null);t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-d1878d50.b628f12f.js.map