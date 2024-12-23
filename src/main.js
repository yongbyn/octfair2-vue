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
app.use(VueQueryPlugin).use(pinia).use(router).use(VueAwesomePaginate);

app.mount("#app");
