import '@/assets/globals.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueLazyload from 'vue-lazyload'

import App from './app.vue'
import router from './router'

import { useTheme } from './plugins/theme/src/client'
import { useLanguage } from './plugins/language'

import loading from './assets/images/loading.gif'

const app = createApp(App)

app.use(createPinia())
app.use(MotionPlugin)
app.use(VueLazyload, {
    preLoad: 0,
    error: loading,
    loading: loading,
    attempt: 1
})

app.use(router)

app.use(useTheme)
app.use(useLanguage)

app.mount('#root')
