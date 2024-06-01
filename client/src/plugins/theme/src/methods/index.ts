import { localStorageKey } from '../settings'

type Theme = 'dark' | 'light' | 'system';

function mapThemeToClassList(currentTheme: Theme): Theme {
    if (currentTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        return currentTheme;
    }
}

export const changeTheme = (newTheme: Theme) => {
    const classListTheme = mapThemeToClassList(newTheme);

    const htmlElement = document.documentElement;
    htmlElement.classList.remove('dark', 'light', 'system');
    htmlElement.classList.add(classListTheme);

    localStorage.setItem(localStorageKey, newTheme);
}
