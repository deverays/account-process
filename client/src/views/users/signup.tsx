import { defineComponent, h } from 'vue'
import { FormMenu, FormInput, FormSubmitButton, FormBottomButton } from '@/components/ui/form'
import imports from '@/utils/imports'
import { Spinner } from '@/components/ui/loader'
import { cn } from '@/lib/utilts'
import { postReq } from '@/utils/axiosReqs'
import validator from 'validator'
import { FormContainer } from '@/components/container'

export default defineComponent({
  components: { FormMenu, FormInput, FormSubmitButton, FormBottomButton, FormContainer },
  setup() {
    const { store, reactive, watchEffect } = imports()

    const state = reactive({ username: '', email: '', password: '', 'password-again': '', status: 201 })

    const active = reactive({ submit: false, success: true })

    watchEffect(() => (active.submit = validator.isLength(state.username, { min: 3, max: 20 }) && validator.isAlphanumeric(state.username) && validator.isLength(state.password, { min: 8, max: 20 }) && validator.isEmail(state.email) && state.password == state['password-again']))

    return { active, state, store }
  },
  methods: {
    async onSignup() {
      this.store._isWorked = 40
      this.active.success = false
      try {
        await postReq('/users/signup', { ...this.state })
        this.$router.push('/users/signin')
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
    const message = new Map([
      [409, this.$t('form.signup-form.input.error.email')],
      [422, this.$t('form.signup-form.input.error.username')]
    ])

    return (
      <FormContainer isError={this.state.status !== 201} message={message.get(this.state.status)}>
        <FormMenu title={this.$t('form.signup-form.title')} description={this.$t('form.signup-form.description')}>
          {{
            default: () => (
              <>
                <div class="transition-all flex flex-col items-center w-full gap-y-4 mb-10">
                  <FormInput onChange={(value) => (this.state.username = value)} type="text" label={this.$t('form.signup-form.input.username')} />
                  <FormInput onChange={(value) => (this.state.email = value)} type="email" label={this.$t('form.signup-form.input.email')} />
                  <FormInput onChange={(value) => (this.state.password = value)} type="password" label={this.$t('form.signup-form.input.password')} />
                  <FormInput onChange={(value) => (this.state['password-again'] = value)} type="password" label={this.$t('form.signup-form.input.password-again')} />
                </div>

                <div class="flex flex-col items-center gap-y-2">
                  <FormSubmitButton onClick={this.onSignup} class={cn('mb-2')} isActive={this.active.submit && this.active.success}>{this.active.success ? this.$t('form.signup-form.button.signup') : h(Spinner, { className: 'w-6 h-6' })}</FormSubmitButton>
                  <FormBottomButton to="/users/signin">{this.$t('form.signup-form.other.signin')}</FormBottomButton>
                  <FormBottomButton to="/recovery">{this.$t('form.signup-form.other.recovery')}</FormBottomButton>
                </div>
              </>
            )
          }}
        </FormMenu>
      </FormContainer>
    )
  }
})
