import { App } from "vue";
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import * as en from "../locales/en.json";
import * as tr from "../locales/tr.json";

export const availableLanguages = [
    { name: "Türkçe", lng: "tr" },
    { name: "English", lng: "en" },
];

export default {
    install(app: App) {
        let lng = localStorage.lng;
        const navigateLanguage = navigator.language.split("-")[0];

        if (!availableLanguages.find((language) => language.lng == lng)) {
            lng = navigateLanguage;
            localStorage.setItem("lng", navigateLanguage);
        }

        i18next.init({
            lng,
            resources: {
                en: { translation: en },
                tr: { translation: tr },
            },
        });

        app.use(I18NextVue, { i18next });
    },
};
