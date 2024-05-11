import { defineComponent } from "vue";
import imports from "../../utils/imports";
import { BoxAnimation } from "../../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../../components/ui/Form";
import { validateEmail } from "../../utils/auth/validator";

export default defineComponent({
  name: "ForgotUsername",
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
        await postReq("/users/forgot-username", { email: state.email });
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
          <Form
            class="md:h-[450px]"
            top={
              step <= 0 ? (
                <FormInput
                  errorActive={errorStatus == 404}
                  onChange={(item) => (this.state.email = item)}
                  type="text"
                  label="E-mail"
                />
              ) : (
                <p class="text-3xl text-gray-200 font-rubik-regular text-center w-[90%]">
                  {this.$t("Form.ForgotUsernameForm.message")}
                </p>
              )
            }
            bottom={
              <>
                {step <= 0 && (
                  <FormButton
                    class="hover:w-32 lg:hover:w-[110px] mb-5"
                    label={this.$t("Form.ForgotUsernameForm.Button.send")}
                    active={buttonActive}
                    onClick={this.onForgotUsername}
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
                  label={this.$t("Form.ForgotUsernameForm.Button.login")}
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
            label={this.$t("Form.ForgotUsernameForm.title")}
          />
        </div>
      </div>
    );
  },
});