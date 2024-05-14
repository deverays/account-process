export interface Language {
    name: string;
    id: string;
}

const DEFAULT_LANGUAGE = "en-US";
const LOCAL_STORAGE_KEY = "lng";

const languages: Language[] = [
    { name: "Türkçe", id: "tr-TR" },
    { name: "English", id: "en-US" },
];

export { languages, DEFAULT_LANGUAGE, LOCAL_STORAGE_KEY }