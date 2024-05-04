import { createApp } from "vue";

import "./index.css";
import App from "./App.tsx";
import router from "./router";
import i18next from "i18next";
import { pinia } from "./store";
import I18NextVue from "i18next-vue";
import VueLazyLoad from "vue3-lazyload";
import { MotionPlugin } from "@vueuse/motion";

import * as en from "./locales/en.json";
import * as tr from "./locales/tr.json";

if (!localStorage.lng) localStorage.setItem("lng", "en");
i18next.init({
    lng: localStorage.lng ?? "en",
    resources: {
        en: { translation: en },
        tr: { translation: tr },
    },
});

createApp(App)
    .use(VueLazyLoad, {
        loading: "",
        error: "",
        lifecycle: {
            loading: (el) => {
                console.log("loading", el);
            },
            error: (el) => {
                console.log("error", el);
            },
            loaded: (el) => {
                console.log("loaded", el);
            },
        },
    })
    .use(I18NextVue, { i18next })
    .use(MotionPlugin)
    .use(pinia)
    .use(router)
    .mount("#root");
