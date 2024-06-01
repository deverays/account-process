import { ref, reactive, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReq, postReq } from './axiosReqs'
import useStore from '@/store'
export default () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    return {
        ref,
        reactive,
        watch,
        watchEffect,
        route,
        router,
        store,
        getReq,
        postReq
    }
}
