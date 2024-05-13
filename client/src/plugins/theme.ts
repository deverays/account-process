import { App } from "vue";

export interface Theme {
    name: string;
    class: string;
}

const BASE_LOCAL_STORAGE_KEY = "theme";

const themes: Theme[] = [
    { name: "Dark", class: "dark" },
    { name: "Light", class: "light" },
];

function getInitialTheme(): Theme {
    const themeFromLocalStorage: string | null = localStorage.getItem(
        BASE_LOCAL_STORAGE_KEY
    );
    return (
        themes.find((theme) => theme.class === themeFromLocalStorage) || themes[0]
    );
}

function changeTheme(theme: Theme) {
    const newThemeClass = theme.class === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(theme.class);
    document.documentElement.classList.add(newThemeClass);
    localStorage.setItem(BASE_LOCAL_STORAGE_KEY, newThemeClass);
    return themes.find((theme) => theme.class === newThemeClass) || themes[0];
}

export default {
    install(app: App) {
        const initialTheme = getInitialTheme();

        if (!themes.some((theme) => theme.class === initialTheme.class)) {
            localStorage.setItem(BASE_LOCAL_STORAGE_KEY, initialTheme.class);
        }

        const state = {
            theme: initialTheme,
            themes: themes,
        };

        const methods = {
            changeTheme: () => {
                state.theme = changeTheme(state.theme);
            },
        };

        app.config.globalProperties.$theme = {
            ...methods,
            ...state,
        };

        document.documentElement.classList.add(initialTheme.class);
    },
};
