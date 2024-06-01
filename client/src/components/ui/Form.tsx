import { defineComponent, h, ref, type PropType, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import { cn, renderSvg } from '@/lib/utilts'
import { svgIcons } from '@/lib/icons'

import styles from '@/assets/styles/form.module.css'

// Form Connection Button
export const FormConnectionButton = defineComponent({
  emits: ['click'],
  setup(_, { emit }) {
    return () =>
      h('button', { class: cn(styles['form-connection-button'], 'hover:bg-light-300 dark:hover:bg-dark-700'), onClick: () => emit('click') },
        h('div', { class: cn(styles['form-connection-inner'], 'group-hover:bg-opacity-100 group-hover:ring-opacity-40 group-hover:text-opacity-100') }, [renderSvg({ ...svgIcons.discord, className: 'w-5 h-5' })])
      )
  }
})

// Form Bottom Button
export const FormBottomButton = defineComponent({
  props: {
    to: { type: String, required: true }
  },
  setup(props, { slots }) {
    return () => h(RouterLink, { to: props.to, class: cn(styles['form-bottom-button'], 'text-black dark:text-gray-100') }, { default: () => (slots.default ? slots.default() : []) })
  }
})

// Form Text
export const FormText = defineComponent({
  props: {
    isOpen: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    return () => props.isOpen && <span v-motion-slide-visible-once-bottom class="w-full"><p class={cn(styles['form-text'], 'text-black dark:text-gray-100')}>{slots.default ? slots.default() : []}</p></span>
  }
})

// Form Submit Button
export const FormSubmitButton = defineComponent({
  emits: ['click'],
  props: {
    isActive: { type: Boolean, default: false },
    isShow: { type: Boolean, default: true }
  },
  setup(props, { emit, slots }) {
    return () => h('button', { class: cn(styles['form-submit-button'], 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-gray-100 dark:hover:text-blue-600', props.isActive ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none opacity-80'), onClick: () => emit('click') }, slots.default ? slots.default() : [])
  }
})

// Form Pin Input
export const FormPinInput = defineComponent({
  props: {
    isShow: { type: Boolean, default: true },
    length: { type: Number, default: 4 }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const values: Ref<string[]> = ref(Array(props.length).fill(''))

    const handleInput = (event: Event, index: number) => {
      const input = event.target as HTMLInputElement
      const value = input.value

      if (value.length <= 1) { values.value[index] = value } else { values.value[index] = value[0] }

      emit('change', values.value.join(''))

      if (value.length == 1 && index < props.length - 1) {
        const nextInput = document.getElementById(`code-${index + 2}`) as HTMLInputElement
        if (nextInput) nextInput.focus()
      } else if (value == '' && index > 0) {
        const prevInput = document.getElementById(`code-${index}`) as HTMLInputElement
        if (prevInput) prevInput.focus()
      }
    }

    const inputs = Array.from({ length: props.length }, (_, i) => {
      return h('input', { type: 'text', maxlength: 1, id: `code-${i + 1}`, class: cn(styles['form-pin-input'], 'text-opacity-80 dark:text-opacity-90 bg-light-100 dark:bg-dark-800 dark:border-dark-700 text-black dark:text-gray-100'), required: true, onInput: (event: Event) => handleInput(event, i) })
    })

    return () => props.isShow && <div v-motion-slide-visible-once-bottom class="w-full">
      <div class={cn(styles['form-pin-input-container'])}>{inputs}</div>
    </div>
  }
})

// Form Input
export const FormInput = defineComponent({
  props: {
    label: { type: String, required: true },
    type: { type: String as PropType<'text' | 'password' | 'email' | 'number'>, required: true },
    isShow: { type: Boolean, default: true }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const inputValue = ref('')

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      inputValue.value = target.value
      emit('change', target.value)
    }

    return () => props.isShow && <div v-motion-slide-visible-once-bottom class="w-full">
      <div class={cn(styles['form-input-container'])}>{[h('label', { class: cn(styles['form-input-label'], 'text-black dark:text-gray-100') }, props.label), h('input', { type: props.type, value: inputValue.value, class: cn(styles['form-input'], 'focus:opacity-100 dark:border-dark-700 text-opacity-80 dark:text-opacity-90 bg-light-100 dark:bg-dark-800 text-black dark:text-gray-100'), onInput: handleInput })]}</div>
    </div>
  }
})

// Form Menu
export const FormMenu = defineComponent({
  props: {
    title: { type: String, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    links: { type: Array as PropType<string[]>, default: () => [] }
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn(styles['form-menu-container'], 'bg-light-200 dark:bg-dark-900 ring-light-300 dark:ring-dark-800') },
      [h('div', { class: styles['form-menu-connection-content'] }, [props.links.includes('discord') &&
        h('div', { class: 'mb-4' }, [
          h(FormConnectionButton, { onClick: () => (window.location.href = import.meta.env.VITE_DISCORD_OAUTH2_URL) })
        ]),
      h('div', { class: cn(styles['form-menu-text'], 'text-black dark:text-gray-100') }, [
        h('h1', { class: styles['form-menu-title'] }, props.title),
        h('p', { class: styles['form-menu-description'] }, props.description)
      ]),
      h('div', { class: styles['form-menu-content'] }, slots.default ? slots.default() : [])
      ])
      ]
    )
  }
})
