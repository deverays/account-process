import { defineComponent, h, ref, onMounted, onBeforeUnmount, type PropType } from 'vue'
import { cn } from '@/lib/utilts'
import { RouterLink } from 'vue-router'
import styles from '@/assets/styles/dropdown.module.css'

// Dropdown Menu
export const DropdownMenu = defineComponent({
  props: {
    isOpen: { type: Boolean, default: false },
    className: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const isMobile = ref(window.innerWidth < 400)

    const checkIsMobile = () => {
      isMobile.value = window.innerWidth < 400
    }

    onMounted(() => window.addEventListener('resize', checkIsMobile))
    onBeforeUnmount(() => window.removeEventListener('resize', checkIsMobile))

    const renderMenu = (type: 'desktop' | 'mobile') => {
      const baseClass = type === 'desktop' ? styles['dropdown-desktop-menu'] : styles['dropdown-mobile-menu']
      const openClass = type === 'desktop' ? 'opacity-100 top-[calc(100%+8px)]' : 'opacity-100 translate-y-0'
      const closeClass = type === 'desktop' ? 'opacity-0 top-[calc(100%-24px)]' : 'opacity-0 translate-y-full'

      return h('div', { class: cn(props.className, baseClass, 'bg-light-200 dark:bg-dark-900 border-light-300 dark:border-dark-800', props.isOpen ? openClass : closeClass, props.isOpen ? 'pointer-events-auto' : 'pointer-events-none') }, slots.default ? slots.default() : [])
    }

    return () => (isMobile.value ? renderMenu('mobile') : renderMenu('desktop'))
  }
})

// Dropdown Item
export const DropdownItem = defineComponent({
  emits: ['click'],
  props: {
    id: { type: String, default: '' },
    to: { type: String, default: '' }
  },
  setup(props, { emit, slots }) {
    const handleClick = () => emit('click')

    const baseClasses = cn(styles['dropdown-item'], 'hover:bg-light-300 hover:dark:bg-dark-700 text-opacity-60 hover:text-opacity-100 dark:text-opacity-60 dark:hover:text-opacity-100 text-black dark:text-gray-100')

    const buttonContent = { default: () => [slots.default ? slots.default() : []] }

    return () =>
      props.to ? h(RouterLink, { class: baseClasses, id: props.id, to: props.to }, buttonContent) : h('button', { class: baseClasses, id: props.id, onClick: handleClick }, buttonContent)
  }
})

// Dropdown Menu Title
export const DropdownMenuTitle = defineComponent({
  setup(_, { slots }) {
    return () => h('h1', { class: cn(styles['dropdown-menu-title'], 'text-black dark:text-gray-100') }, slots.default ? slots.default() : [])
  }
})

// Dropdown Circle Button
export const DropdownCircleButton = defineComponent({
  emits: ['click'],
  props: {
    label: { type: String, default: '' },
    to: { type: String, default: '' }
  },
  setup(props, { emit, slots }) {
    const handleClick = () => emit('click')

    const circleContent = () =>
      h('div', { class: cn(styles['circle-button-content'], 'group') }, [
        h('div', { class: cn(styles['circle-button-icon'], 'opacity-60 group-hover:opacity-100 bg-light-300 ring-light-300 dark:bg-dark-700 dark:ring-dark-700 text-black dark:text-gray-100') }, slots.default ? slots.default() : []),
        h('p', { class: cn(styles['circle-button-label'], 'group-hover:opacity-100 text-black dark:text-gray-100') }, props.label)
      ])

    const baseClasses = cn(styles['dropdown-circle-button'], 'group hover:bg-light-100 dark:hover:bg-dark-500')

    return () =>
      props.to ? h(RouterLink, { class: baseClasses, to: props.to }, { default: circleContent }) : h('button', { class: baseClasses, onClick: handleClick }, circleContent())
  }
})
