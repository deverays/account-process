import i18next from "i18next";
import { LOCAL_STORAGE_KEY, DEFAULT_LANGUAGE, languages } from "./config";

export const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    document.documentElement.lang = lang;
    localStorage.setItem(LOCAL_STORAGE_KEY, lang);
};

export const getLanguage = () => {
    const languageFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const userLanguage = window.navigator.language || DEFAULT_LANGUAGE;
    return (
        languages.find(
            (lang) => lang.id === (languageFromLocalStorage || userLanguage)
        ) || languages.find((lang) => lang.id === DEFAULT_LANGUAGE)!
    );
};
