import { h } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  })
}

export const renderSvg = ({ iconPath, className, viewBox }: { iconPath: string, className?: string, viewBox?: string }) => {
  return h(
    'svg',
    { class: className || 'w-4 h-4', xmlns: 'http://www.w3.org/2000/svg', viewBox: viewBox || '0 0 640 512' },
    [h('path', { fill: 'currentColor', d: iconPath })]
  )
}