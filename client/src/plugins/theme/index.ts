import { App } from "vue";

import { getTheme } from "./methods";
import properties from "./properties";
import { themes, LOCAL_STORAGE_KEY } from "./config";

export default {
    install(app: App) {
        const theme = getTheme();

        if (!themes.some((theme) => theme == theme)) {
            localStorage.setItem(LOCAL_STORAGE_KEY, theme!);
        }

        app.use(properties);

        document.documentElement.classList.add(theme!);
    },
};
