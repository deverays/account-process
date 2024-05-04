import actions from "./actions";
import { defineStore, createPinia } from "pinia";

export interface Store {
    _isLogin: boolean;
    _isProgress: number;
    getters: {
        _getUser: { username: string } | null;
    };
}

const pinia = createPinia()

const useStore = defineStore("store", {
    state: (): Store => ({
        _isLogin: false,
        _isProgress: 0,
        getters: {
            _getUser: null,
        },
    }),

    getters: {},
    actions,
});

export { useStore, pinia };
