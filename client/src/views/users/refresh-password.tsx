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

    const state = reactive({ password: '', 'password-again': '', status: 201 })

    const active = reactive({ submit: false, success: false, verified: false })

    watchEffect(() => (active.submit = validator.isLength(state.password, { min: 8, max: 20 }) && state.password == state['password-again']))

    return { active, state, store }
  },
  async mounted() {
    this.store._isWorked = 40
    try {
      const { code } = this.$route.params
      await postReq('/auth/request-verification', { ...this.state, code, type: 'refresh-password' })
      this.active.verified = true
    } finally {
      this.store._isWorked = 100
      this.active.success = true
    }
  },
  methods: {
    async onForgotPassword() {
      this.store._isWorked = 40
      this.active.success = false
      try {
        await postReq('/users/refresh-password', { ...this.state, code: this.$route.params.code })
        this.$router.push('/users/login')
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
    const message = new Map([[400, this.$t('form.refresh-password-form.input.error.password')]])

    return (
      <FormContainer isError={this.state.status !== 201} message={message.get(this.state.status)}>
        <FormMenu title={this.$t('form.refresh-password-form.title')} description={this.$t('form.refresh-password-form.description')}>
          {{
            default: () => (
              <>
                <div class="transition-all flex flex-col items-center w-full gap-y-4 mb-10">
                  {this.active.success ? (
                    <>
                      <FormInput isShow={this.active.verified} onChange={(value) => (this.state.password = value)} type="text" label={this.$t('form.refresh-password-form.input.password')} />
                      <FormInput isShow={this.active.verified} onChange={(value) => (this.state['password-again'] = value)} type="text" label={this.$t('form.refresh-password-form.input.password-again')} />
                      <FormText isOpen={!this.active.verified}>{this.$t('form.refresh-password-form.err-message')}</FormText>
                    </>
                  ) : h(Spinner, { className: 'w-20 h-20' })}
                </div>

                <div class="flex flex-col items-center gap-y-2">
                  {this.active.verified && <FormSubmitButton onClick={this.onForgotPassword} class={cn('mb-2')} isActive={this.active.submit && this.active.success}>{this.$t('form.refresh-password-form.button.refresh')}</FormSubmitButton>}
                  <FormBottomButton to="/users/signin">{this.$t('form.refresh-password-form.other.signin')}</FormBottomButton>
                </div>
              </>
            )
          }}
        </FormMenu>
      </FormContainer>
    )
  }
})
