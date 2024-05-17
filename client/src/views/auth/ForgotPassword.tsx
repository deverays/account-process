import { defineComponent } from "vue";
import imports from "../../utils/imports";

import BoxAnimation from "../../components/animations/BoxAnimation";
import { Form, FormInput, FormButton } from "../../components/ui/form";

import { validateUsername } from "../../utils/auth/validator";

export default defineComponent({
  setup() {
    const { store, route, reactive, watchEffect, postReq } = imports();

    const state = reactive({
      step: 0,
      errorStatus: 200,
      buttonActive: false,
      username: route.query.username || "",
    });

    watchEffect(() => {
      state.buttonActive = validateUsername(state.username as string);
    });

    const onForgotPassword = async () => {
      store._isProgress = 40;
      try {
        await postReq("/forgot-password", {
          username: state.username,
          ref: `${window.location.origin}/auth/password-reset/:code?ref=${
            route.query.ref || "/"
          }`,
        });
        state.step = 1;
        store._isProgress = 100;
      } catch (err: any) {
        store._isProgress = 100;
        state.errorStatus = err.response.status;
        setTimeout(() => (state.errorStatus = 200), 5000);
      }
    };

    return { route, state, onForgotPassword };
  },
  render() {
    const { step, errorStatus, buttonActive } = this.state;
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form title={this.$t("Form.ForgotPasswordForm.title")}>
            <section class="flex flex-col items-center gap-y-4">
              {step <= 0 ? (
                <FormInput
                  errorActive={errorStatus == 404}
                  onChange={(item) => (this.state.username = item)}
                  type="text"
                  label={this.$t("Form.ForgotPasswordForm.Input.username")}
                />
              ) : (
                <p class="text-3xl text-gray-200 font-poppins-regular text-center w-[90%]">
                  {this.$t("Form.ForgotPasswordForm.message")}
                </p>
              )}
            </section>
            <section class="flex flex-col gap-y-1 items-center w-full">
              {step <= 0 && (
                <FormButton
                  label={this.$t("Form.ForgotPasswordForm.Button.reset")}
                  isActive={buttonActive}
                  onClick={this.onForgotPassword}
                />
              )}
              <router-link
                to="/auth/login"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.ForgotPasswordForm.Button.login")}
              </router-link>
            </section>
          </Form>
        </div>
      </div>
    );
  },
});
