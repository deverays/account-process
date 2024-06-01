import { Fragment, defineComponent, h } from 'vue'
import { cn } from '@/lib/utilts'

import styles from '@/assets/styles/container.module.css'

// Form Container
export const FormContainer = defineComponent({
  props: {
    isError: { type: Boolean, default: false },
    message: { type: String, default: '' }
  },
  setup(props, { slots }) {
    return () =>
      h(Fragment, [
        h('header', { class: cn(styles['form-container'], props.isError ? 'opacity-100 translate-y-0 py-3' : 'opacity-0 -translate-y-full') }, props.message),
        h('div', { class: styles['form-container-content'] }, slots.default ? slots.default() : [])
      ])
  }
})
