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

    const state = reactive({ username: '', status: 201, step: 0 })

    const active = reactive({ submit: false, success: true })

    watchEffect(() => (active.submit = validator.isLength(state.username, { min: 3, max: 20 }) && validator.isAlphanumeric(state.username)))

    return { active, state, store }
  },
  methods: {
    async onForgotPassword() {
      this.store._isWorked = 40
      this.active.success = false
      try {
        await postReq('/users/forgot-password', { ...this.state, ref: `${window.location.origin}/users/refresh-password/:code` })
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
    const message = new Map([[404, this.$t('form.forgot-password-form.input.error.username')]])

    return (
      <FormContainer isError={this.state.status !== 201} message={message.get(this.state.status)}>
        <FormMenu title={this.$t('form.forgot-password-form.title')} description={this.$t('form.forgot-password-form.description')} >
          <div class="transition-all flex flex-col items-center w-full gap-y-4 mb-10">
            <FormInput isShow={this.state.step == 0} onChange={(value) => (this.state.username = value)} type="text" label={this.$t('form.forgot-password-form.input.username')} />
            <FormText isOpen={this.state.step == 1}>{this.$t('form.forgot-password-form.message')}</FormText>
          </div>

          <div class="w-full flex flex-col items-center gap-y-2">
            {this.state.step == 0 && <FormSubmitButton onClick={this.onForgotPassword} class={cn('mb-2')} isActive={this.active.submit && this.active.success}> {this.active.success ? this.$t('form.forgot-password-form.button.send') : h(Spinner, { className: 'w-6 h-6' })}</FormSubmitButton>}
            <FormBottomButton to="/users/signin">{this.$t('form.forgot-password-form.other.signin')}</FormBottomButton>
          </div>
        </FormMenu>
      </FormContainer>
    )
  }
})
