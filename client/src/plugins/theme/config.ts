export interface Theme {

}

const DEFAULT_THEME = "dark";
const LOCAL_STORAGE_KEY = "theme";

const themes: string[] = [
    "dark",
    "light"
];

export { themes, LOCAL_STORAGE_KEY, DEFAULT_THEME };
