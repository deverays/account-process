import { defineComponent } from "vue";
import imports from "../../utils/imports";
import { BoxAnimation } from "../../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../../components/ui/Form";
import { validatePassword } from "../../utils/auth/validator";

export default defineComponent({
  name: "PasswordReset",
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
        await postReq("/users/password-reset", {
          resetCode: code,
          resetType: "password-reset",
          password: state.password,
        });
        store._isProgress = 100;
        router.push({
          path: "/users/login",
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
        await store.dispatch("USER_PASSWORD_RESET", {
          data: {
            resetCode: code,
            resetType: "check",
            password: state.password,
          },
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
          <Form
            class="md:h-[450px]"
            top={
              verifyCode ? (
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
              )
            }
            bottom={
              <>
                {verifyCode && (
                  <FormButton
                    class="hover:w-32 lg:hover:w-[110px] mb-5"
                    label={this.$t("Form.PasswordResetForm.Button.reset")}
                    active={buttonActive}
                    onClick={this.onPasswordReset}
                    icon={
                      <svg
                        class="w-[32px] h-[32px] text-gray-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                  />
                )}
                <FormParagraph
                  label={this.$t("Form.PasswordResetForm.Button.login")}
                  onClick={() =>
                    this.$router.push({
                      path: "/users/login",
                      query: { ref: this.route.query.ref || "/" },
                    })
                  }
                />
              </>
            }
            label={this.$t("Form.PasswordResetForm.title")}
          />
        </div>
      </div>
    );
  },
});
