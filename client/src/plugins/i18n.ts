import { App } from "vue";
import i18next, { InitOptions } from "i18next";
import I18NextVue from "i18next-vue";

import tr from "../../public/locales/tr.json";
import enUs from "../../public/locales/en-US.json";

export interface Language {
    name: string;
    lng: string;
}

const defaultLanguage: string = "en-US";
const localStorageKey: string = "lng";

const languages: Language[] = [
    { name: "Türkçe", lng: "tr" },
    { name: "English", lng: "en-US" },
];

const languageFromLocalStorage: string | null =
    localStorage.getItem(localStorageKey);
const userLanguage: string = window.navigator.language || defaultLanguage;
const selectedLanguage: Language =
    languages.find(
        (lang) => lang.lng === (languageFromLocalStorage || userLanguage)
    ) || languages.find((lang) => lang.lng === defaultLanguage)!;

const i18nOptions: InitOptions = {
    lng: selectedLanguage.lng,
    fallbackLng: "en-US",
    fallbackNS: "common",
    resources: {
        "en-US": { translation: enUs },
        tr: { translation: tr },
    },
};

const changeLanguage = (lang: string): void => {
    i18next.changeLanguage(lang);
    localStorage.setItem(localStorageKey, lang);
};

const installI18nPlugin = (app: App): void => {
    if (!languages.some((lang) => lang.lng === languageFromLocalStorage))
        localStorage.setItem(localStorageKey, selectedLanguage.lng);

    app.config.globalProperties.$i18n = {
        languages,
        changeLanguage,
    };

    i18next.init(i18nOptions);

    app.use(I18NextVue, { i18next });
};

const I18nPlugin = {
    languages,
    selectedLanguage,
    changeLanguage,
    install: installI18nPlugin,
};

export default I18nPlugin;
