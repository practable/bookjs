import { createApp } from "vue";
import store from "./store";
import App from "./app.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(store);

app.mount("#app");
