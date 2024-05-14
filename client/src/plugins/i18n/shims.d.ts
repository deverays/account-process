import { Language } from "./config";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $i18n: {
            language: Language;
            languages: Language[];
            changeLanguage: (lang: string) => void;
        };
    }
}