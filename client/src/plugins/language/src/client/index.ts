import { type App } from 'vue'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import { getOptions } from '../settings'
import middleware from '../middleware'

import * as enUS from '../../public/locales/en-US.json'
import * as trTR from '../../public/locales/tr-TR.json'

let hasInit = false

const initialize = () => {
    if (hasInit) {
        return
    }
    hasInit = true

    i18next.init({
        ...getOptions(localStorage.lng),
        resources: {
            'en-US': { translation: enUS },
            'tr-TR': { translation: trTR }
        }
    })
}

export function useLanguage(app: App) {
    initialize()
    middleware()

    app.use(I18NextVue, { i18next })
}
