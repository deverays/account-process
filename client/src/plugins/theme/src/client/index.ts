import type { App } from 'vue'
import middleware from '../middleware'

export function useTheme(app: App) {
    middleware()
}
