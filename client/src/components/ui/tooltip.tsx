import { defineComponent, h, ref, onMounted, onBeforeUnmount } from 'vue'

import styles from '@/assets/styles/tooltip.module.css'
import { cn } from '@/lib/utilts'

// Tooltip Button
export const TooltipButton = defineComponent({
  props: {
    className: String,
    tooltip: { type: String, default: '' }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const isMobile = ref(window.innerWidth < 400)

    const checkIsMobile = () => {
      isMobile.value = window.innerWidth < 400
    }

    onMounted(() => window.addEventListener('resize', checkIsMobile))
    onBeforeUnmount(() => window.removeEventListener('resize', checkIsMobile))

    return () => h('button', { 'data-tooltip': props.tooltip, onClick: () => emit('click'), class: cn(props.className, !isMobile && props.tooltip.length > 0 && styles['bottom-tooltip'], 'data-[tooltip]:after:text-black dark:data-[tooltip]:after:text-gray-100', 'data-[tooltip]:after:bg-light-200 dark:data-[tooltip]:after:bg-dark-800') }, slots.default ? slots.default() : [])
  }
})
