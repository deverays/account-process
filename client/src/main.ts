import { createApp } from "vue";

import "./index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueLazyLoad from "vue3-lazyload";
import { MotionPlugin } from "@vueuse/motion";
import i18next from "./plugins/i18next.ts";
import theme from "./plugins/theme.ts";
import AppLayout from "./layouts/AppLayout.tsx";

const app = createApp(App);

app.component("appLayout", AppLayout);

app.use(createPinia());
app.use(VueLazyLoad, {
    loading: "",
    error: "",
    lifecycle: {
        loading: (el) => {
            //pass
        },
        error: (el) => {
            //pass
        },
        loaded: (el) => {
            console.log("loaded", el);
        },
    },
});
app.use(MotionPlugin);
app.use(i18next);
app.use(theme);
app.use(router);
app.mount("#root");
