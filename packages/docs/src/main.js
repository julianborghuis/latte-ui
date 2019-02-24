import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import LatteUI, { Latte } from "@bybas/latte-ui";

import "highlight.js/styles/github-gist.css";
import "@mdi/font/css/materialdesignicons.css";
import "./scss/page.scss";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(LatteUI);

new Vue({

	router,

	render: ce => ce(App)

}).$mount("#app");

console.log(`Using Latte UI ${Latte.version} by ${Latte.author}`);
