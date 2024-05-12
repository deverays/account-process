import useStore from "../store";
import { postReq, getReq } from "./axiosReqs";
import { useRoute, useRouter } from "vue-router";
import {
    watchEffect,
    watch,
    reactive,
    defineEmits,
    onMounted,
    ref,
    computed,
    onUnmounted,
} from "vue";
import i18next from "i18next";
export default () => {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    return {
        store,
        route,
        router,
        watch,
        reactive,
        defineEmits,
        watchEffect,
        postReq,
        getReq,
        onMounted,
        ref,
        computed,
        onUnmounted,
        i18next,
    };
};
