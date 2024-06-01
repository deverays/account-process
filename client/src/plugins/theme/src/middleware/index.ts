import { fallbackTheme, localStorageKey } from '../settings';

type Theme = 'dark' | 'light' | 'system';

function getStoredTheme(): Theme {
    const storedTheme = localStorage.getItem(localStorageKey) as Theme | null;
    if (isValidTheme(storedTheme)) {
        return storedTheme;
    }
    return fallbackTheme;
}

function isValidTheme(theme: any): theme is Theme {
    return theme === 'dark' || theme === 'light' || theme === 'system';
}

function getClassListTheme(currentTheme: Theme): Theme {
    if (currentTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return currentTheme;
}

export default function applyTheme() {
    const currentTheme = getStoredTheme();
    const classListTheme = getClassListTheme(currentTheme);

    localStorage.setItem(localStorageKey, currentTheme);
    document.documentElement.classList.add(classListTheme);
}
