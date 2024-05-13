import { Language } from "../plugins/i18n";
import { Theme } from "../plugins/theme";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $i18n: {
            languages: Language[];
            changeLanguage: (lang: string) => void;
        };
    }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $theme: {
            themes: Theme[];
            changeTheme: () => void;
        };
    }
}