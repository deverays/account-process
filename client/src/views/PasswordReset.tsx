import { defineComponent } from "vue";
import imports from "../utils/imports";
import { BoxAnimation } from "../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../components/ui/Form";
import { validatePassword } from "../utils/auth/validator";

const Reset = defineComponent({
  name: "PasswordReset",
  setup() {
    const { store, route, router, reactive, watchEffect, postReq, onMounted } =
      imports();

    const state = reactive({
      errorStatus: 200,
      verifyCode: false,
      buttonActive: false,
      password: route.query.password ?? "",
      passwordAgain: route.query.passwordAgain ?? "",
    });

    watchEffect(() => {
      const isValue =
        validatePassword(state.password as string) &&
        validatePassword(state.passwordAgain as string) &&
        state.password == state.passwordAgain;

      state.buttonActive = isValue;
    });

    const onPasswordReset = () => {
      store._isProgress = 40;
      postReq("/password-reset", {
        resetCode: route.params.code,
        resetType: "password-reset",
        password: state.password,
      })
        .then(() => {
          store._isProgress = 100;
          router.push({
            path: "/login",
            query: {
              redirectUrl: route.query.redirectUrl ?? "/",
            },
          });
        })
        .catch((err) => {
          store._isProgress = 100;
          state.errorStatus = err.response.status;
          setTimeout(() => (state.errorStatus = 200), 5000);
        });
    };

    onMounted(async () => {
      store._isProgress = 40;
      postReq("/password-reset", {
        resetType: "check",
        resetCode: route.params.code,
      })
        .then(() => {
          store._isProgress = 100;
          state.verifyCode = state.verifyCode = true;
        })
        .catch(() => {
          store._isProgress = 100;
          state.verifyCode = state.verifyCode = false;
        });
    });

    return { route, state, onPasswordReset };
  },
  render() {
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form
            class="md:h-[450px]"
            top={
              <>
                {this.state.verifyCode ? (
                  <>
                    <FormInput
                      errorActive={this.state.errorStatus == 400}
                      onInput-change={(item) => (this.state.password = item)}
                      type="password"
                      label={this.$t("PasswordResetForm.Input.password")}
                    />
                    <FormInput
                      errorActive={this.state.errorStatus == 400}
                      onInput-change={(item) =>
                        (this.state.passwordAgain = item)
                      }
                      type="password"
                      label={this.$t("PasswordResetForm.Input.passwordAgain")}
                    />
                  </>
                ) : (
                  <p class="text-3xl text-grey-200 font-rubik-regular text-center w-[90%]">
                    {this.$t("PasswordResetForm.message")}
                  </p>
                )}
              </>
            }
            bottom={
              <>
                {this.state.verifyCode ? (
                  <FormButton
                    class="hover:w-32 lg:hover:w-[110px] mb-5"
                    label={this.$t("PasswordResetForm.Button.reset")}
                    active={this.state.buttonActive}
                    click={this.onPasswordReset}
                    icon={
                      <svg
                        class="w-[32px] h-[32px] text-grey-100"
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
                ) : (
                  <span></span>
                )}

                <FormParagraph
                  label={this.$t("PasswordResetForm.Button.login")}
                  click={() =>
                    this.$router.push({
                      path: "/login",
                      query: {
                        redirectUrl: this.route.query.redirectUrl ?? "/",
                      },
                    })
                  }
                />
              </>
            }
            label={this.$t("PasswordResetForm.title")}
          />
        </div>
      </div>
    );
  },
});

export default Reset;
