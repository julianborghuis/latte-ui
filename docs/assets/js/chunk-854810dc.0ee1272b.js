(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-854810dc"],{"27d8":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 mb-4"},[n("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),n("div",{staticClass:"row"},[t._t("default")],2)])},a=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},l=i,r=n("d802"),c=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=c.exports},"36ad":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[n("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 py-3"},[n("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return n("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(n){return t.navigate(e.selector)}}},[n("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},a=[],i=(n("2d6d"),n("cfce"),n("28eb"),n("b506"),n("a287")),l={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var n=e.getBoundingClientRect();window.scrollTo({top:n.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return i["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,n){return Math.abs(e.rect.top-t)<Math.abs(n.rect.top-t)?e:n}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var n=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:n})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},r=l,c=n("d802"),o=Object(c["a"])(r,s,a,!1,null,null,null);e["a"]=o.exports},"886c":function(t,e,n){"use strict";n.r(e),e["default"]='<div class="d-flex flex-column">\n\t<div class="message-bubble incoming">\n\t\t<div class="message-bubble-container">\n\t\t\t<latte-initials initials="CS" class="avatar"></latte-initials>\n\t\t\t<div class="message-bubble-content">\n\t\t\t\t<strong>Customer service</strong>\n\t\t\t\t<p>Hey! Anything I can help you with?</p>\n\t\t\t\t<small>5 minutes ago</small>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="message-bubble outgoing">\n\t\t<div class="message-bubble-container">\n\t\t\t<latte-initials initials="BM" class="avatar"></latte-initials>\n\t\t\t<div class="message-bubble-content">\n\t\t\t\t<p>Hi! Yes, where can I find more information about your services?</p>\n\t\t\t\t<small>Just now</small>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n'},"8e27":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page",attrs:{id:"component-chat"}},[n("PageHeader",{attrs:{title:"Chat",tabs:t.tabs}}),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[n("div",{staticClass:"col-12 col-lg-6"},[n("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),n("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[n("div",{staticClass:"col-12"},[n("CodeExample",{attrs:{code:t.previews.standard,title:"Standard",classes:"bg-panel"}}),n("CodeExample",{attrs:{code:t.previews.avatar,title:"With avatars",classes:"bg-panel"}})],1)])],1)},a=[],i=n("36ad"),l=n("27d8"),r=n("c8e6"),c={name:"Chat",components:{CodeExample:r["a"],TitledRow:l["a"],PageHeader:i["a"]},data:function(){return{previews:{standard:n("ca65").default,avatar:n("886c").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"}]}}},o=c,d=n("d802"),u=Object(d["a"])(o,s,a,!1,null,null,null);e["default"]=u.exports},c8e6:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel overflow-hidden"},[n("div",{staticClass:"panel-header"},[n("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?n(t.preview,{tag:"component"}):t._e(),n("div",{staticClass:"panel-body"},[n("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},a=[],i=(n("d86f"),n("2aa5"),n("32f5"),n("b55a"),n("4f2b")),l=n("2d1a"),r={name:"CodeExample",components:{CodeSnippet:l["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/\sclass=""/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,n=this.previewCode;return i["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(n,"</div>"),data:function(){return t}})}}},c=r,o=n("d802"),d=Object(o["a"])(c,s,a,!1,null,null,null);e["a"]=d.exports},ca65:function(t,e,n){"use strict";n.r(e),e["default"]='<div class="d-flex flex-column">\n\t<div class="message-bubble incoming">\n\t\t<div class="message-bubble-content">\n\t\t\t<strong>Bas</strong>\n\t\t\t<p v-emojify>Hey Fleur 👋🏽</p>\n\t\t</div>\n\t</div>\n\n\t<div class="message-bubble incoming">\n\t\t<div class="message-bubble-content">\n\t\t\t<strong>Bas</strong>\n\t\t\t<p v-emojify>Do you want to get 🍕 tonight and go to the 🎥🍿 after?</p>\n\t\t\t<small>5 minutes ago</small>\n\t\t</div>\n\t</div>\n\n\t<div class="message-bubble outgoing">\n\t\t<div class="message-bubble-content">\n\t\t\t<p v-emojify>Yeah sure! 😍</p>\n\t\t\t<small>Just now</small>\n\t\t</div>\n\t</div>\n</div>\n'}}]);
//# sourceMappingURL=chunk-854810dc.0ee1272b.js.map