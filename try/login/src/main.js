import { createApp } from "vue";
import store from "./store";
import App from "./app.vue";

const app = createApp(App); //displayBearer); //, enterToken });

app.use(store)

app.mount("#app");
