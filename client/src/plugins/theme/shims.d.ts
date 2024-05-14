import { Theme } from "./config";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $theme: {
            theme: string;
            themes: string[];
            changeTheme: () => void;
        };
    }
}
