import { defineComponent } from 'vue'
import { cn } from '@/lib/utilts'
import { UserDropdown } from './shared/user'

// Application Header
export const AppHeader = defineComponent({
  render() {
    return (
      <header class={cn('transition-all fixed w-full flex items-center justify-between lg:justify-around h-16 lg:h-20 max-lg:pl-[5%] max-lg:pr-[5%] z-50 bg-light-200 dark:bg-dark-900')}>
        <span></span>
        <UserDropdown />
      </header>
    )
  }
})

// Base Header
export const BaseHeader = defineComponent({
  render() {
    return (
      <header class={cn('transition-all fixed w-full flex items-center justify-between lg:justify-around h-16 lg:h-20 max-lg:pl-[5%] max-lg:pr-[5%] z-50')} >
        <span></span>
        <UserDropdown />
      </header>
    )
  }
})
