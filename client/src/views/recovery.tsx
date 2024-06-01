import { defineComponent, h } from 'vue'
import { cn, renderSvg } from '@/lib/utilts'
import { RouterLink } from 'vue-router'
import { BaseHeader } from '@/components/header'
import { svgIcons } from '@/lib/icons'

const RecoveryCard = defineComponent({
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    to: { type: String, default: '/' },
    direction: { type: String, default: 'right' }
  },
  setup(props, { slots }) {
    return () =>
      h('div', {},
        h(RouterLink, { class: cn('transition-all flex flex-col hover:mt-2 items-center relative rounded-3xl overflow-hidden place-content-center place-items-center flex w-full sm:w-60 h-80', "before:content-[''] before:absolute before:w-[90px] before:bg-blue-500 before:h-[200%] before:animate-card-circle", "after:content-[''] after:absolute after:inset-[5px] after:rounded-3xl", 'bg-light-200 dark:bg-dark-800 after:bg-light-200 dark:after:bg-dark-900 text-black dark:text-gray-100'), to: props.to || '/' },
          {
            default: () => [
              h('h1', { class: 'flex flex-col items-center justify-center gap-y-5 z-10 w-[90%] sm:w-[80%]' }, [slots.default ? slots.default() : [], h('span', { class: 'text-center text-xl font-bold mb-2' }, props.title)]),
              h('p', { class: 'w-[80%] font-regular text-center opacity-60 z-10' }, props.description)
            ]
          }
        )
      )
  }
})

export default defineComponent({
  components: { RecoveryCard },
  render() {
    return (
      <>
        <BaseHeader />
        <div class="flex flex-col items-center mb-12">
          <div class="flex flex-col items-center pt-16 sm:pt-32 gap-5">
            <div v-motion-slide-visible-once-top class="flex flex-col items-center py-6 w-[90%] sm:w-[500px] rounded-xl text-black dark:text-gray-100 bg-light-200 dark:bg-dark-900" >
              <h1 class="text-center font-bold text-xl">{this.$t('recovery.title')}</h1>
              <p class="text-center font-regular text-base opacity-60 w-[80%]">{this.$t('recovery.description')}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-5 max-sm:w-[90%]">
              <RecoveryCard v-motion-slide-visible-once-left to="/users/forgot-username" title={this.$t('recovery.card.forgot-username.title')} description={this.$t('recovery.card.forgot-username.description')}
              >
                {{
                  default: () => renderSvg({ ...svgIcons.username, className: 'w-12 h-12 opacity-60' })
                }}
              </RecoveryCard>
              <RecoveryCard v-motion-slide-visible-once-right to="/users/forgot-password" title={this.$t('recovery.card.forgot-password.title')} description={this.$t('recovery.card.forgot-password.description')}>
                {{
                  default: () => renderSvg({ ...svgIcons.password, className: 'w-12 h-12 opacity-60' })
                }}
              </RecoveryCard>
            </div>
          </div>
        </div>
      </>
    )
  }
})
