import { App } from "vue";
import { languages } from "./config";
import { getLanguage, changeLanguage } from "./methods";

export default (app: App) => {
    const state = {
        languages,
        language: getLanguage(),
    };

    const methods = {
        changeLanguage,
    };

    app.config.globalProperties.$i18n = {
        ...state,
        ...methods,
    };
};
