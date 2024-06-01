import { languages, localStorageKey, fallbackLng } from '../settings'
import { applyLanguageSettingsToHTML } from '../methods'

export default function applyLanguage() {
    let currentLanguage = getCurrentLanguage()

    if (!isValidLanguage(currentLanguage)) {
        currentLanguage = fallbackLng
    }

    applyLanguageSettingsToHTML(currentLanguage)
}

function getCurrentLanguage(): string {
    return localStorage.getItem(localStorageKey) || fallbackLng
}

function isValidLanguage(language: string): boolean {
    return languages.includes(language)
}
