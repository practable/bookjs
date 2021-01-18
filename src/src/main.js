import { createApp } from "vue";
import store from "./store";
import App from "./app.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(store).use(router);

app.mount("#app");
