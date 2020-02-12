(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73818c90"],{"27d8":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 mb-4"},[e("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),e("div",{staticClass:"row"},[t._t("default")],2)])},s=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},l=i,o=e("2be6"),r=Object(o["a"])(l,n,s,!1,null,null,null);a["a"]=r.exports},3663:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("latte-tab-container",{staticClass:"panel overflow-auto text-left",staticStyle:{"z-index":"0"}},[e("latte-tab-bar",{staticStyle:{position:"sticky",left:"0"}}),t.properties?e("latte-tab",{attrs:{label:"Properties"}},[e("table",{staticClass:"table"},[e("tbody",[t._l(t.properties,(function(a){return[e("tr",[e("td",{staticStyle:{"min-width":"300px"}},[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Name")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.name)+" "),a.required?e("span",{staticClass:"badge badge-info is-small"},[t._v("required")]):t._e()]),a.description?e("span",{staticClass:"text-muted"},[t._v(t._s(a.description))]):t._e()])]),e("td",[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Type")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.type))])])]),e("td",[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Default")]),null===a.default?e("strong",{staticClass:"text-monospace"},[t._v("NULL")]):e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.default))])])])])]}))],2)])]):t._e(),t.variables?e("latte-tab",{attrs:{label:"CSS-vars"}},[e("table",{staticClass:"table"},[t._l(t.variables,(function(a){return[e("tr",[e("td",{staticStyle:{"min-width":"300px"}},[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Name")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.name))]),a.description?e("span",{staticClass:"text-muted"},[t._v(t._s(a.description))]):t._e()])]),e("td",[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Type")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.type))])])]),e("td",[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Default")]),null===a.default?e("em",[t._v("NULL")]):"rgb"===a.type?e("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:a.default}}):e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.default))])],1)])])]}))],2)]):t._e(),t.events?e("latte-tab",{attrs:{label:"Events"}},[e("table",{staticClass:"table"},[t._l(t.events,(function(a){return[e("tr",[e("td",{staticStyle:{"min-width":"300px"}},[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Name")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.name))]),a.description?e("span",{staticClass:"text-muted"},[t._v(t._s(a.description))]):t._e()])]),e("td",[e("div",{staticClass:"column-content justify-content-start"},[e("small",{staticClass:"text-muted"},[t._v("Signature")]),e("strong",{staticClass:"text-monospace"},[t._v(t._s(a.signature))])])])])]}))],2)]):t._e(),t.slots?e("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},s=[],i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"rgb-display",style:t.styles},[e("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},l=[],o=(e("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),r=o,c=(e("3ff3"),e("2be6")),p=Object(c["a"])(r,i,l,!1,null,"54370a1e",null),u=p.exports,d={name:"ApiExplorer",components:{RgbDisplay:u},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},b=d,v=Object(c["a"])(b,n,s,!1,null,null,null);a["a"]=v.exports},"36ad":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[e("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 py-3"},[e("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("latte-focus-zone",{attrs:{"is-horizontal":""}},[e("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},[t._l(t.tabsWithElement,(function(a){return[e("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===a.selector},attrs:{tabindex:t.currentTab&&t.currentTab.selector===a.selector?0:-1},on:{click:function(e){return t.navigate(a.selector)}}},[e("span",[t._v(t._s(a.label))])])]}))],2)])],1)]):t._e()])])},s=[],i=(e("2d6d"),e("cfce"),e("28eb"),e("a287")),l={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var a=document.querySelector(t);if(a){var e=a.getBoundingClientRect();window.scrollTo({top:e.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,a){return i["a"].operators.spaceship(t.rect.top,a.rect.top)})).filter((function(a){return a.rect.top<=t+window.innerHeight})).reduce((function(a,e){return Math.abs(a.rect.top-t)<Math.abs(e.rect.top-t)?a:e}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var a=document.querySelector(t.selector);if(a){var e=a.getBoundingClientRect();return Object.assign({},t,{elm:a,rect:e})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},o=l,r=e("2be6"),c=Object(r["a"])(o,n,s,!1,null,null,null);a["a"]=c.exports},"3ff3":function(t,a,e){"use strict";var n=e("d03a"),s=e.n(n);s.a},"5f1a":function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="app-bar app-bar-primary">\n\t<div class="app-bar-row">\n\t\t<span class="app-bar-title">I\'m normal</span>\n\t</div>\n\t<div class="app-bar-row app-bar-auto">\n\t\tAnd I\'m just gonna be as tall as I want...\n\t</div>\n</div>\n'},"5f82":function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="app-bar app-bar-primary">\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>\n\t\t<span class="app-bar-title">App bar</span>\n\t\t<label class="input-group mx-5">\n\t\t\t<div class="input-group-addon"><latte-icon>magnify</latte-icon></div>\n\t\t\t<input type="search" name="search" placeholder="Search for anything..." class="form-control" />\n\t\t</label>\n\t\t<button class="btn btn-icon btn-text"><latte-icon>dots-vertical</latte-icon></button>\n\t</div>\n</div>\n\n<div class="app-bar app-bar-light preview:mt-3">\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>\n\t\t<span class="app-bar-title">App bar</span>\n\t\t<label class="input-group mx-5">\n\t\t\t<div class="input-group-addon"><latte-icon>magnify</latte-icon></div>\n\t\t\t<input type="search" name="search" placeholder="Search for anything..." class="form-control" />\n\t\t</label>\n\t\t<button class="btn btn-icon btn-text"><latte-icon>dots-vertical</latte-icon></button>\n\t</div>\n</div>\n'},"7ee9":function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="app-bar app-bar-dark">\n\t<div class="app-bar-row app-bar-auto py-2">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>\n\t\t<div class="app-bar-column">\n\t\t\t<small class="app-bar-sub-title">mTunes</small>\n\t\t\t<span class="app-bar-title">Discover Music</span>\n\t\t</div>\n\t\t<div class="ml-auto">\n\t\t\t<button class="btn btn-text btn-action"><latte-icon>home-outline</latte-icon><span>Home</span></button>\n\t\t\t<button class="btn btn-contained btn-primary btn-action"><latte-icon>compass-outline</latte-icon><span>Discover</span></button>\n\t\t\t<button class="btn btn-text btn-action"><latte-icon>heart-outline</latte-icon><span>For You</span></button>\n\t\t</div>\n\t\t<div class="divider divider-vertical"></div>\n\t\t<button class="btn btn-icon btn-text"><latte-icon>dots-vertical</latte-icon></button>\n\t</div>\n</div>\n'},"9fd0":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page",attrs:{id:"component-app-bar"}},[e("PageHeader",{attrs:{title:"App Bar",tabs:t.tabs}}),e("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[e("div",{staticClass:"col-12 col-lg-6"},[e("p",{staticClass:"lead"},[t._v("An App Bar is the primary navigation element of your app or website. It can also show your primary branding color.")])])]),e("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[e("div",{staticClass:"col-12"},[e("CodeExample",{attrs:{code:t.previews.standard,title:"Standard"}}),e("CodeExample",{attrs:{code:t.previews.autoHeight,title:"Auto height"}}),e("CodeExample",{attrs:{code:t.previews.actionButtons,title:"Action buttons"}}),e("CodeExample",{attrs:{code:t.previews.search,title:"Search bar"}}),e("CodeExample",{attrs:{code:t.previews.panel,title:"Panel"}}),e("CodeExample",{attrs:{code:t.previews.tabs,title:"Tabs"}})],1)]),e("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[e("div",{staticClass:"col-12"},[e("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1)])],1)},s=[],i=(e("cfce"),e("2aa5"),e("62c8"),e("36ad")),l=e("27d8"),o=e("c8e6"),r=e("3663"),c={name:"AppBar",components:{ApiExplorer:r["a"],CodeExample:o["a"],TitledRow:l["a"],PageHeader:i["a"]},data:function(){var t=window.getComputedStyle(document.body);return{api:{variables:[{name:"--appBarAlpha",description:"App bar alpha.",type:"number",default:1},{name:"--appBarBackground",description:"Background color.",type:"rgb",default:t.getPropertyValue("--appBarBackground").split(",").map((function(t){return parseInt(t)}))},{name:"--appBarForeground",description:"Foreground color.",type:"rgb",default:t.getPropertyValue("--appBarForeground").split(",").map((function(t){return parseInt(t)}))},{name:"--appBarElevation",description:"Elevation shadow.",type:"string",default:t.getPropertyValue("--appBarElevation")},{name:"--appBarHeight",description:"App bar height",type:"string",default:t.getPropertyValue("--appBarHeight")}]},previews:{standard:e("ea96").default,actionButtons:e("7ee9").default,autoHeight:e("5f1a").default,panel:e("a90f").default,search:e("5f82").default,tabs:e("fcd9").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},p=c,u=e("2be6"),d=Object(u["a"])(p,n,s,!1,null,null,null);a["default"]=d.exports},a90f:function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="panel">\n\t<div class="panel-header py-3">\n\t\t<img class="avatar avatar-48px" src="/image/dog-with-hat.jpg" alt="Avatar"/>\n\t\t<div class="panel-column ml-3">\n\t\t\t<span class="panel-title">First Lastname</span>\n\t\t\t<span class="panel-sub-title">3 hours ago</span>\n\t\t</div>\n\t\t<button class="btn btn-text btn-icon ml-auto"><latte-icon>dots-vertical</latte-icon></button>\n\t</div>\n\t<div class="panel-body">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur esse facere fuga non nulla unde vero. Dicta ea est excepturi facilis in ipsam, iusto nam quasi, qui repellendus vero voluptatibus?\n\t</div>\n\t<div class="app-bar app-bar-transparent">\n\t\t<div class="app-bar-row">\n\t\t\t<button class="btn btn-text btn-icon"><latte-icon>heart</latte-icon></button>\n\t\t\t<button class="btn btn-text btn-icon"><latte-icon>comment-outline</latte-icon></button>\n\t\t\t<button class="btn btn-text btn-icon"><latte-icon>share-outline</latte-icon></button>\n\t\t\t<button class="btn btn-text btn-icon ml-auto"><latte-icon>dots-vertical</latte-icon></button>\n\t\t</div>\n\t</div>\n</div>\n'},c8e6:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel overflow-hidden"},[e("div",{staticClass:"panel-header"},[e("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?e(t.preview,{tag:"component"}):t._e(),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},s=[],i=(e("d86f"),e("2aa5"),e("32f5"),e("b55a"),e("4f2b")),l=e("2d1a"),o={name:"CodeExample",components:{CodeSnippet:l["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},references:{default:function(){return[]},type:Array},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/\sclass=""/gm,"").replace(/(\r?\n){2,}/gm,"\n\n").trim()},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,a=this.classes,e=this.previewCode,n=this.references;return i["a"].extend({refs:n,template:'<div class="panel-body bg-main '.concat(a,'">').concat(e,"</div>"),data:function(){return t}})}}},r=o,c=e("2be6"),p=Object(c["a"])(r,n,s,!1,null,null,null);a["a"]=p.exports},d03a:function(t,a,e){},ea96:function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="app-bar">\n\t<div class="app-bar-row">\n\t\t<div class="app-bar-title">App Bar</div>\n\t</div>\n</div>\n\n<div class="app-bar app-bar-primary preview:mt-3">\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>\n\t\t<div class="app-bar-title">App Bar with actions</div>\n\t\t<button class="btn btn-icon btn-text ml-auto"><latte-icon>dots-horizontal</latte-icon></button>\n\t</div>\n</div>\n\n<div class="app-bar preview:mt-3">\n\t<div class="app-bar-row">\n\t\t<img src="/image/bas.svg" alt="Bas\' logo" height="36" />\n\t\t<div class="app-bar-title mr-auto">Bas\' website</div>\n\t\t<button class="btn btn-text preview:d-none preview:d-lg-flex">About</button>\n\t\t<button class="btn btn-text preview:d-none preview:d-lg-flex">Projects</button>\n\t\t<button class="btn btn-text preview:d-none preview:d-lg-flex">Contact</button>\n\t</div>\n</div>\n\n<div class="app-bar app-bar-dark preview:mt-3">\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>\n\t\t<div class="app-bar-title">App Bar with multiple rows</div>\n\t</div>\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-icon btn-text"><latte-icon>chevron-left</latte-icon></button>\n\t\t<button class="btn btn-icon btn-text"><latte-icon>chevron-right</latte-icon></button>\n\t\t<button class="btn btn-icon btn-text"><latte-icon>arrow-up</latte-icon></button>\n\t\t<button class="btn btn-icon btn-text ml-auto"><latte-icon>plus</latte-icon></button>\n\t</div>\n</div>\n'},fcd9:function(t,a,e){"use strict";e.r(a),a["default"]='\x3c!--\n  ~ Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>\n  ~\n  ~ This file is part of the Latte UI package.\n  ~\n  ~ For the full copyright and license information, please view the\n  ~ LICENSE file that was distributed with this source code.\n  --\x3e\n\n<div class="app-bar app-bar-primary">\n\t<div class="app-bar-row">\n\t\t<button class="btn btn-text btn-icon"><latte-icon>menu</latte-icon></button>\n\t\t<span class="app-bar-title">App bar</span>\n\t\t<button class="btn btn-text btn-icon ml-auto"><latte-icon>dots-vertical</latte-icon></button>\n\t</div>\n\t<div class="app-bar-row">\n\t\t<nav class="nav nav-tabs is-fluid flex-grow-1" style="--tabsHeight: var(--appBarHeight)">\n\t\t\t<a class="nav-link is-active">Tab</a>\n\t\t\t<a class="nav-link">Tab</a>\n\t\t\t<a class="nav-link">Tab</a>\n\t\t</nav>\n\t</div>\n</div>\n'}}]);
//# sourceMappingURL=chunk-73818c90.66f6009e.js.map