import { createApp } from "vue";
import App from "./App/App.vue";
import router from "./router";
import store from "@/store";

export const app = createApp(App);

app.use(store).use(router).mount("#app");
