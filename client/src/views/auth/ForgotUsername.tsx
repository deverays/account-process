import { defineComponent } from "vue";
import imports from "../../utils/imports";

import BoxAnimation from "../../components/animations/BoxAnimation";
import { Form, FormInput, FormButton } from "../../components/ui/form";

import { validateEmail } from "../../utils/auth/validator";

export default defineComponent({
  setup() {
    const { store, route, reactive, watchEffect, postReq } = imports();

    const state = reactive({
      step: 0,
      errorStatus: 200,
      buttonActive: false,
      email: route.query.email || "",
    });

    watchEffect(() => {
      state.buttonActive = validateEmail(state.email as string);
    });

    const onForgotUsername = async () => {
      store._isProgress = 40;
      try {
        await postReq("/forgot-username", { email: state.email });
        state.step = 1;
        store._isProgress = 100;
      } catch (err: any) {
        store._isProgress = 100;
        state.errorStatus = err.response.status;
        setTimeout(() => (state.errorStatus = 200), 5000);
      }
    };

    return { route, state, onForgotUsername };
  },
  render() {
    const { step, errorStatus, buttonActive } = this.state;
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form title={this.$t("Form.ForgotUsernameForm.title")}>
            <section class="flex flex-col items-center gap-y-4">
              {step <= 0 ? (
                <FormInput
                  errorActive={errorStatus == 404}
                  onChange={(item) => (this.state.email = item)}
                  type="text"
                  label="E-mail"
                />
              ) : (
                <p class="text-3xl text-gray-200 font-poppins-regular text-center w-[90%]">
                  {this.$t("Form.ForgotUsernameForm.message")}
                </p>
              )}
            </section>
            <section class="flex flex-col gap-y-1 items-center w-full">
              {step <= 0 && (
                <FormButton
                  label={this.$t("Form.ForgotUsernameForm.Button.send")}
                  isActive={buttonActive}
                  onClick={this.onForgotUsername}
                />
              )}
              <router-link
                to="/auth/login"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.ForgotUsernameForm.Button.login")}
              </router-link>
            </section>
          </Form>
        </div>
      </div>
    );
  },
});
