import imports from "../utils/imports";
import { defineComponent } from "vue";
import { BoxAnimation } from "../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../components/ui/Form";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/auth/validator";

const Signup = defineComponent({
  name: "Signup",
  setup() {
    const { store, router, route, postReq, reactive, watchEffect } = imports();

    const state = reactive({
      errorStatus: 200,
      passwordAgain: "",
      buttonActive: false,
      email: route.query.email ?? "",
      username: route.query.username ?? "",
      password: route.query.password ?? "",
    });

    watchEffect(() => {
      const isValue =
        validateEmail(state.email as string) &&
        validatePassword(state.password as string) &&
        validatePassword(state.passwordAgain) &&
        validateUsername(state.username as string);

      state.buttonActive = isValue;
    });

    const onSignup = () => {
      store._isProgress = 40;
      postReq("/signup", {
        email: state.email,
        username: state.username,
        password: state.password,
        passwordAgain: state.passwordAgain,
      })
        .then(() => {
          store._isProgress = 100;
          router.push({
            path: "/login",
            query: {
              redirectUrl: (route.query.redirectUrl as string) ?? "/",
            },
          });
        })
        .catch((err) => {
          store._isProgress = 100;
          state.errorStatus = err.response.status;
          setTimeout(() => (state.errorStatus = 200), 5000);
        });
    };

    return { route, state, onSignup };
  },
  render() {
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form
            class="md:h-[550px]"
            top={
              <>
                <FormInput
                  errorActive={this.state.errorStatus == 409}
                  onInput-change={(item) => (this.state.username = item)}
                  type="text"
                  label={this.$t("SignupForm.Input.username")}
                />
                <FormInput
                  errorActive={this.state.errorStatus == 409}
                  onInput-change={(item) => (this.state.email = item)}
                  class=""
                  type="email"
                  label="E-mail"
                />
                <FormInput
                  onInput-change={(item) => (this.state.password = item)}
                  class=""
                  type="password"
                  label={this.$t("SignupForm.Input.password")}
                />
                <FormInput
                  onInput-change={(item) => (this.state.passwordAgain = item)}
                  type="password"
                  label={this.$t("SignupForm.Input.passwordAgain")}
                />
              </>
            }
            bottom={
              <>
                <FormButton
                  click={this.onSignup}
                  class="hover:w-36 lg:hover:w-32 mb-5"
                  label={this.$t("SignupForm.Button.signup")}
                  active={this.state.buttonActive}
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
                <FormParagraph
                  label={this.$t("SignupForm.Button.login")}
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
            label={this.$t("SignupForm.title")}
          />
        </div>
      </div>
    );
  },
});

export default Signup;
