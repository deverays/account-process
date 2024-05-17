import { defineComponent } from "vue";
import imports from "../../utils/imports";

import BoxAnimation from "../../components/animations/BoxAnimation";
import { Form, FormInput, FormButton } from "../../components/ui/form";

import { validatePassword } from "../../utils/auth/validator";

export default defineComponent({
  setup() {
    const { store, route, router, reactive, watchEffect, onMounted, postReq } =
      imports();

    const state = reactive({
      errorStatus: 200,
      verifyCode: false,
      buttonActive: false,
      password: route.query.password || "",
      passwordAgain: route.query.passwordAgain || "",
    });

    watchEffect(() => {
      const { password, passwordAgain } = state;
      state.buttonActive =
        validatePassword(password as string) &&
        validatePassword(passwordAgain as string) &&
        password === passwordAgain;
    });

    const onPasswordReset = async () => {
      store._isProgress = 40;
      try {
        const { code } = route.params;
        await postReq("/auth/password-reset", {
          resetCode: code,
          resetType: "password-reset",
          password: state.password,
        });
        store._isProgress = 100;
        router.push({
          path: "/auth/login",
          query: { ref: route.query.ref || "/" },
        });
      } catch (err: any) {
        store._isProgress = 100;
        state.errorStatus = err.response.status;
        setTimeout(() => (state.errorStatus = 200), 5000);
      }
    };

    onMounted(async () => {
      store._isProgress = 40;
      try {
        const { code } = route.params;
        await postReq("/auth/password-reset", {
          resetCode: code,
          resetType: "check",
          password: state.password,
        });
        store._isProgress = 100;
        state.verifyCode = true;
      } catch {
        store._isProgress = 100;
        state.verifyCode = false;
      }
    });

    return { route, state, onPasswordReset };
  },
  render() {
    const { errorStatus, buttonActive, verifyCode } = this.state;
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form title={this.$t("Form.PasswordResetForm.title")}>
            <section class="flex flex-col items-center gap-y-4">
              {verifyCode ? (
                <>
                  <FormInput
                    errorActive={errorStatus === 400}
                    onChange={(item) => (this.state.password = item)}
                    type="password"
                    label={this.$t("Form.PasswordResetForm.Input.password")}
                  />
                  <FormInput
                    errorActive={errorStatus === 400}
                    onChange={(item) => (this.state.passwordAgain = item)}
                    type="password"
                    label={this.$t(
                      "Form.PasswordResetForm.Input.passwordAgain"
                    )}
                  />
                </>
              ) : (
                <p class="text-3xl text-gray-200 font-rubik-regular text-center w-[90%]">
                  {this.$t("Form.PasswordResetForm.message")}
                </p>
              )}
            </section>
            <section class="flex flex-col gap-y-1 items-center w-full">
              {verifyCode && (
                <FormButton
                  label={this.$t("Form.PasswordResetForm.Button.reset")}
                  isActive={buttonActive}
                  onClick={this.onPasswordReset}
                />
              )}
              <router-link
                to="/auth/login"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.PasswordResetForm.Button.login")}
              </router-link>
            </section>
          </Form>
        </div>
      </div>
    );
  },
});
