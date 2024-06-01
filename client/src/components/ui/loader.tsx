import { defineComponent, ref, watch, type PropType } from 'vue'
import { cn } from '@/lib/utilts'
import styles from '@/assets/styles/loader.module.css'

// ProgressBar Component
const ProgressBar = defineComponent({
  props: {
    value: { type: Number, required: true, validator: (v: unknown): boolean => typeof v === 'number' && v >= 0 && v <= 100 }
  },
  setup(props) {
    const width = ref(`${props.value}%`)

    watch(() => props.value, (val) => {
      if (val >= 100) {
        width.value = `99%`
        const timeout = setTimeout(() => {
          width.value = '101%'
          clearTimeout(timeout)
        }, 500)
      } else { width.value = `${val}%` }
    }, { immediate: true })

    return { width }
  },
  render() {
    const { width } = this
    const progressBarClass = cn(styles['progress-bar'], parseInt(width.split('%')[0]) >= 100 || parseInt(width.split('%')[0]) <= 0 ? 'duration-700 opacity-0' : 'opacity-100')

    return <div class={progressBarClass} style={{ width }} id="progress-bar" dir="ltr-progress-bar"></div>
  }
})

// Preloader Component
const Preloader = defineComponent({
  render() {
    return (
      <div class="flex items-center justify-center h-dvh">
        <svg class={styles['pl']} viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg"  >
          <defs>  <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stop-color="hsl(193,90%,55%)"></stop>  <stop offset="100%" stop-color="hsl(223,90%,55%)"></stop> </linearGradient> </defs>
          <circle class={styles['pl__ring']} r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)" stroke-width="16" troke-linecap="round"  ></circle>
          <path class={styles['pl__worm']} d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44 1111" stroke-dashoffset="10"></path>
        </svg>
      </div>
    )
  }
})

// Spinner Component
const Spinner = defineComponent({
  props: {
    className: { type: String, default: '' }
  },
  render() {
    const { className } = this.$props
    const spinnerClass = cn(className || 'w-8 h-8', 'animate-spin text-light-400 dark:text-gray-600 dark:text-opacity-20 fill-blue-500')

    return (
      <div role="status">
        <svg aria-hidden="true" class={spinnerClass} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    )
  }
})

export { ProgressBar, Spinner, Preloader }
