import i18next, { dir } from 'i18next';
import { localStorageKey } from '../settings';

export const changeLanguage = (newLanguage: string) => {
    i18next.changeLanguage(newLanguage);

    saveLanguageToLocalStorage(newLanguage);

    applyLanguageSettingsToHTML(newLanguage);
}

function saveLanguageToLocalStorage(language: string) {
    localStorage.setItem(localStorageKey, language);
}

export function applyLanguageSettingsToHTML(language: string) {
    document.documentElement.lang = language;
    document.documentElement.dir = dir(language);
}
