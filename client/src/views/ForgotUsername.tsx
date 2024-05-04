import { defineComponent } from "vue";
import imports from "../utils/imports";
import { BoxAnimation } from "../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../components/ui/Form";
import { validateEmail } from "../utils/auth/validator";

const Reset = defineComponent({
  name: "ForgotUsername",
  setup() {
    const { store, route, reactive, watchEffect, postReq } = imports();

    const state = reactive({
      step: 0,
      errorStatus: 200,
      buttonActive: false,
      email: route.query.email ?? "",
    });

    watchEffect(() => {
      const isValue = validateEmail(state.email as string);

      state.buttonActive = isValue;
    });

    const onForgotUsername = () => {
      store._isProgress = 40;
      postReq("/forgot-username", {
        email: state.email,
      })
        .then(() => {
          state.step = 1;
          store._isProgress = 100;
        })
        .catch((err) => {
          store._isProgress = 100;
          state.errorStatus = err.response.status;
          setTimeout(() => (state.errorStatus = 200), 5000);
        });
    };

    return { route, state, onForgotUsername };
  },
  render() {
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form
            class="md:h-[450px]"
            top={
              this.state.step <= 0 ? (
                <FormInput
                  errorActive={this.state.errorStatus == 404}
                  onInput-change={(item) => (this.state.email = item)}
                  type="text"
                  label="E-mail"
                />
              ) : (
                <p class="text-3xl text-grey-200 font-rubik-regular text-center w-[90%]">
                  {this.$t("ForgotUsernameForm.message")}
                </p>
              )
            }
            bottom={
              <>
                {this.state.step <= 0 ? (
                  <FormButton
                    class="hover:w-32 lg:hover:w-[110px] mb-5"
                    label={this.$t("ForgotUsernameForm.Button.send")}
                    active={this.state.buttonActive}
                    click={this.onForgotUsername}
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
                  label={this.$t("ForgotUsernameForm.Button.login")}
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
            label={this.$t("ForgotUsernameForm.title")}
          />
        </div>
      </div>
    );
  },
});

export default Reset;
