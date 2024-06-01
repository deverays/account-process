import { defineComponent, h } from 'vue'
import { FormMenu, FormInput, FormSubmitButton, FormBottomButton, FormText } from '@/components/ui/form'
import imports from '@/utils/imports'
import { Spinner } from '@/components/ui/loader'
import { cn } from '@/lib/utilts'
import { postReq } from '@/utils/axiosReqs'
import validator from 'validator'
import { FormContainer } from '@/components/container'

export default defineComponent({
  components: { FormMenu, FormInput, FormSubmitButton, FormBottomButton, FormText, FormContainer },
  setup() {
    const { store, reactive, watchEffect } = imports()

    const state = reactive({ email: '', status: 201, step: 0 })

    const active = reactive({ submit: false, success: true })

    watchEffect(() => (active.submit = validator.isEmail(state.email)))

    return { active, state, store }
  },
  methods: {
    async onForgotUsername() {
      this.store._isWorked = 40
      this.active.success = false
      try {
        await postReq('/users/forgot-username', { ...this.state })
        this.state.step = 1
      } catch (err: any) {
        this.state.status = err.response.status
        setTimeout(() => (this.state.status = 201), 5000)
      } finally {
        this.active.success = true
        this.store._isWorked = 100
      }
    }
  },
  render() {
    const message = new Map([[404, this.$t('form.forgot-username-form.input.error.email')]])

    return (
      <FormContainer isError={this.state.status !== 201} message={message.get(this.state.status)}>
        <FormMenu title={this.$t('form.forgot-username-form.title')} description={this.$t('form.forgot-username-form.description')}>
          {{
            default: () => (
              <>
                <div class="transition-all flex flex-col items-center w-full gap-y-4 mb-10">
                  <FormInput isShow={this.state.step == 0} onChange={(value) => (this.state.email = value)} type="email" label={this.$t('form.forgot-username-form.input.email')} />
                  <FormText isOpen={this.state.step !== 0}>{this.$t('form.forgot-username-form.message')}</FormText>
                </div>

                <div class="flex flex-col items-center gap-y-2">
                  {this.state.step == 0 && <FormSubmitButton onClick={this.onForgotUsername} class={cn('mb-2')} isActive={this.active.submit && this.active.success}>{this.active.success ? this.$t('form.forgot-username-form.button.send') : h(Spinner, { className: 'w-6 h-6' })}</FormSubmitButton>}
                  <FormBottomButton to="/users/signin">  {this.$t('form.forgot-username-form.other.signin')}</FormBottomButton>
                </div>
              </>
            )
          }}
        </FormMenu>
      </FormContainer>
    )
  }
})
