import { defineComponent } from "vue";
import imports from "../../utils/imports";
import { BoxAnimation } from "../../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../../components/ui/Form";
import { validateUsername } from "../../utils/auth/validator";

export default defineComponent({
  name: "ForgotPassword",
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
        await postReq("/users/forgot-password", {
          username: state.username,
          ref: `http://${window.location.host}/password-reset/:code?ref=${
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
          <Form
            class="md:h-[450px]"
            top={
              step <= 0 ? (
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
              )
            }
            bottom={
              <>
                {step <= 0 && (
                  <FormButton
                    class="hover:w-32 lg:hover:w-[110px] mb-5"
                    label={this.$t("Form.ForgotPasswordForm.Button.reset")}
                    active={buttonActive}
                    onClick={this.onForgotPassword}
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
                  label={this.$t("Form.ForgotPasswordForm.Button.login")}
                  onClick={() =>
                    this.$router.push({
                      path: "/users/login",
                      query: {
                        ref: this.route.query.ref || "/",
                      },
                    })
                  }
                />
              </>
            }
            label={this.$t("Form.ForgotPasswordForm.title")}
          />
        </div>
      </div>
    );
  },
});
