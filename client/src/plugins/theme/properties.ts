import { type App } from "vue";

import { themes } from "./config";
import { getTheme, changeTheme } from "./methods";

export default {
    install(app: App) {
        const state = {
            theme: getTheme(),
            themes,
        };

        const methods = {
            changeTheme,
        };

        app.config.globalProperties.$theme = {
            ...state,
            ...methods,
        };
    },
};
