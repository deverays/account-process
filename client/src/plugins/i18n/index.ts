import { App } from "vue";

import I18NextVue from "i18next-vue";
import i18next, { InitOptions } from "i18next";

import resources from "./resources";
import properties from "./properties";
import { getLanguage } from "./methods";
import { LOCAL_STORAGE_KEY, languages } from "./config";

export default {
    install(app: App) {
        const language = getLanguage();

        if (
            !languages.some(
                (lang) => lang.id == localStorage.getItem(LOCAL_STORAGE_KEY)
            )
        ) {
            localStorage.setItem(LOCAL_STORAGE_KEY, language.id);
        }

        app.use(properties);

        i18next.init<InitOptions>({
            lng: language.id,
            fallbackLng: "en-US",
            resources,
        });

        document.documentElement.lang = language.id;

        app.use(I18NextVue, { i18next });
    },
};
