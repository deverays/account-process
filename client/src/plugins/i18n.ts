import { App } from "vue";
import i18next, { InitOptions } from "i18next";
import I18NextVue from "i18next-vue";
import tr from "../../public/locales/tr.json";
import enUs from "../../public/locales/en-US.json";

export interface Language {
    name: string;
    lng: string;
}

const BASE_LANGUAGE = "en-US";
const BASE_LOCAL_STORAGE_KEY = "lang";

export const languages: Language[] = [
    { name: "Türkçe", lng: "tr" },
    { name: "English", lng: "en-US" },
];

function getInitialLanguage(): Language {
    const languageFromLocalStorage = localStorage.getItem(BASE_LOCAL_STORAGE_KEY);
    const userLanguage = window.navigator.language || BASE_LANGUAGE;
    return (
        languages.find(
            (lang) => lang.lng === (languageFromLocalStorage || userLanguage)
        ) || languages.find((lang) => lang.lng === BASE_LANGUAGE)!
    );
}

function changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
    localStorage.setItem(BASE_LOCAL_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
}

export default {
    languages,
    install(app: App) {
        const initialLanguage = getInitialLanguage();

        if (
            !languages.some(
                (lang) => lang.lng === localStorage.getItem(BASE_LOCAL_STORAGE_KEY)
            )
        ) {
            localStorage.setItem(BASE_LOCAL_STORAGE_KEY, initialLanguage.lng);
        }

        app.config.globalProperties.$i18n = {
            language: initialLanguage,
            languages: languages,
            changeLanguage,
        };

        i18next.init<InitOptions>({
            lng: initialLanguage.lng,
            fallbackLng: "en-US",
            resources: {
                "en-US": { translation: enUs },
                tr: { translation: tr },
            },
        });

        document.documentElement.lang = initialLanguage.lng;

        app.use(I18NextVue, { i18next });
    },
};
