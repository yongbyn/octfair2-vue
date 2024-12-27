import { BootstrapVue3 } from "bootstrap-vue-3";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap/dist/css/bootstrap.css";
import { createPinia } from "pinia";
import { createApp } from "vue";

import { VueQueryPlugin } from "@tanstack/vue-query";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueAwesomePaginate from "vue-awesome-paginate";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(BootstrapVue3);
app.use(VueQueryPlugin).use(pinia).use(router).use(VueAwesomePaginate);

app.mount("#app");
