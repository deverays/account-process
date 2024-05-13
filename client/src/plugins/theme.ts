import { App } from "vue";

export interface Theme {
    name: string;
    class: string;
}

const defaultTheme: string = "dark";
const localStorageKey: string = "theme";

const themes: Theme[] = [
    { name: "Dark", class: "dark" },
    { name: "Light", class: "light" },
];

const themeFromLocalStorage: string | null =
    localStorage.getItem(localStorageKey);
const selectedTheme: Theme =
    themes.find((theme) => theme.class === themeFromLocalStorage) ||
    themes.find((theme) => theme.class === defaultTheme)!;

const setThemeClass = () => {
    const classList = document.documentElement.classList;

    if (selectedTheme.class.includes("dark")) {
        classList.remove("light");
        classList.add("dark");
    } else {
        classList.add("light");
        classList.remove("dark");
    }
};

const changeTheme = () => {
    selectedTheme.class = document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
    localStorage.setItem(localStorageKey, selectedTheme.class);
    setThemeClass();
};

const installThemePlugin = (app: App): void => {
    if (!themes.some((theme) => theme.class === themeFromLocalStorage))
        localStorage.setItem(localStorageKey, selectedTheme.class);

    app.config.globalProperties.$theme = {
        themes,
        changeTheme,
    };

    setThemeClass();
};

const ThemePlugin = {
    themes,
    selectedTheme,
    changeTheme,
    install: installThemePlugin,
};

export default ThemePlugin;
