import { DEFAULT_THEME, LOCAL_STORAGE_KEY, themes } from "./config";

export const getTheme = () => {
    const themeFromLocalStorage: string | null =
        localStorage.getItem(LOCAL_STORAGE_KEY);
    return (
        themes.find((theme) => theme == themeFromLocalStorage) ||
        themes.find((theme) => theme == DEFAULT_THEME)
    );
};

export const changeTheme = () => {
    const theme = getTheme();

    const newThemeClass = theme == "dark" ? "light" : "dark";

    document.documentElement.classList.remove(theme!);
    document.documentElement.classList.add(newThemeClass);

    localStorage.setItem(LOCAL_STORAGE_KEY, newThemeClass);

    return themes.find((theme) => theme == newThemeClass) || DEFAULT_THEME;
};
