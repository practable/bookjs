import { createApp } from "vue";
import store from "./store";
import displayBearer from "./components/displayBearer.vue";

const app = createApp(displayBearer);

app.use(store);

app.mount("#app");
