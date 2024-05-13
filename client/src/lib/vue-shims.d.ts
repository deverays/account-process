import { Language } from "../plugins/i18n";
import { Theme } from "../plugins/theme";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $i18n: {
            language: Language;
            languages: Language[];
            changeLanguage: (lang: string) => void;
        };
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $theme: {
            theme: Theme;
            themes: Theme[];
            changeTheme: () => void;
        };
    }
}
