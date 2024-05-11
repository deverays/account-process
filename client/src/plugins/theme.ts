import { App } from "vue";

export default {
    install(app: App) {
        let theme = localStorage.theme;
        const themes = ["dark", "light"];

        if (!themes.includes(theme)) {
            theme = "dark";
            localStorage.setItem("lng", theme);
        }

        const classList = document.documentElement.classList;

        if (/dark/.test(theme)) {
            classList.add("dark");
            classList.remove("light");
        } else {
            classList.add("light");
            classList.remove("dark");
        }
    },
};
