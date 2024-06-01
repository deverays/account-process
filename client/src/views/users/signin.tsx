import { defineComponent, h } from 'vue'
import { FormMenu, FormInput, FormSubmitButton, FormBottomButton, FormPinInput } from '@/components/ui/form'
import imports from '@/utils/imports'
import { Spinner } from '@/components/ui/loader'
import { cn } from '@/lib/utilts'
import { postReq } from '@/utils/axiosReqs'
import validator from 'validator'
import { FormContainer } from '@/components/container'

export default defineComponent({
  components: { FormMenu, FormInput, FormSubmitButton, FormBottomButton, FormContainer, FormPinInput },
  setup() {
    const { store, reactive, watchEffect } = imports()

    const state = reactive({ username: '', password: '', input_code: '', access_token: '', server_verification_code: '', status: 201, step: 0 })

    const active = reactive({ submit: false, success: true })

    watchEffect(() => (active.submit = validator.isLength(state.username, { min: 3, max: 20 }) && validator.isAlphanumeric(state.username) && validator.isLength(state.password, { min: 8, max: 20 })))

    return { active, state, store }
  },
  methods: {
    async onSignin() {
      this.store._isWorked = 40
      this.active.success = false
      try {
        const { data } = await postReq('/users/signin', { ...this.state })
        Object.assign(this.state, { step: 1, access_token: data.access_token, server_verification_code: data.verification_code })
        setTimeout(() => (this.state.step = 0), 180 * 1000)
      } catch (err: any) {
        this.state.status = err.response?.status || 500
        setTimeout(() => (this.state.status = 201), 5000)
      } finally {
        this.active.success = true
        this.store._isWorked = 100
      }
    },
    onVerifyCode() {
      this.store._isWorked = 40
      this.active.success = false

      if (this.state.server_verification_code == this.state.input_code) {
        const existingData = JSON.parse(localStorage.getItem('user_data') || '{}')
        localStorage.setItem('user_data', JSON.stringify({ ...existingData, access_token: this.state.access_token }))
        window.location.href = '/'
      } else {
        this.state.status = 403
        setTimeout(() => (this.state.status = 201), 5000)
      }

      this.store._isWorked = 100
      this.active.success = true
    }
  },
  render() {
    const message = new Map([
      [404, this.$t('form.signin-form.input.error.username')],
      [401, this.$t('form.signin-form.input.error.password')],
      [403, this.$t('form.signin-form.input.error.code')]
    ])

    return (
      <FormContainer isError={this.state.status !== 201} message={message.get(this.state.status)}>
        <FormMenu links={['discord']} title={this.$t('form.signin-form.title')} description={this.$t('form.signin-form.description')}>
          {{
            default: () => (
              <>
                <div class="transition-all flex flex-col items-center w-full gap-y-4 mb-10">
                  <FormPinInput isShow={this.state.step == 1} length={4} onChange={(value) => (this.state.input_code = value)} />
                  <FormInput isShow={this.state.step == 0} onChange={(value) => (this.state.username = value)} type="text" label={this.$t('form.signin-form.input.username')} />
                  <FormInput isShow={this.state.step == 0} onChange={(value) => (this.state.password = value)} type="password" label={this.$t('form.signin-form.input.password')} />
                </div>

                <div class="flex flex-col items-center gap-y-2">
                  <FormSubmitButton onClick={this.state.step == 0 ? this.onSignin : this.onVerifyCode} class={cn('mb-2')} isActive={this.active.submit && this.active.success}> {this.active.success ? this.state.step == 0 ? this.$t('form.signin-form.button.send') : this.$t('form.signin-form.button.signin') : h(Spinner, { className: 'w-6 h-6' })}</FormSubmitButton>
                  <FormBottomButton to="/recovery">{this.$t('form.signin-form.other.recovery')}</FormBottomButton>
                  <FormBottomButton to="/users/signup">{this.$t('form.signin-form.other.signup')}</FormBottomButton>
                </div>
              </>
            )
          }}
        </FormMenu>
      </FormContainer>
    )
  }
})
