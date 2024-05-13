/**Vue */
import { createApp } from "vue";

/**Styles */
import "./assets/globals.css";
import App from "./App.vue";

/**Router */
import router from "./router";

/**Modules */
import { createPinia } from "pinia";
import VueLazyLoad from "vue3-lazyload";
import { MotionPlugin } from "@vueuse/motion";

/**Plugins */
import i18n from "./plugins/i18n.ts";
import theme from "./plugins/theme.ts";

const app = createApp(App);

app.use(createPinia());
app.use(VueLazyLoad, {});
app.use(MotionPlugin);
app.use(i18n);
app.use(theme);
app.use(router);
app.mount("#root");
