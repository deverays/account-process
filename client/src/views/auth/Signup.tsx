import { defineComponent } from "vue";
import imports from "../../utils/imports";

import BoxAnimation from "../../components/animations/BoxAnimation";
import { Form, FormInput, FormButton } from "../../components/ui/form";

import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../utils/auth/validator";

export default defineComponent({
  setup() {
    const { store, router, route, reactive, watchEffect, postReq } = imports();

    const state = reactive({
      errorStatus: 200,
      passwordAgain: "",
      buttonActive: false,
      email: route.query.email || "",
      username: route.query.username || "",
      password: route.query.password || "",
    });

    watchEffect(() => {
      const { email, password, passwordAgain, username } = state;
      const isValue =
        validateEmail(email as string) &&
        validatePassword(password as string) &&
        validatePassword(passwordAgain as string) &&
        validateUsername(username as string);
      state.buttonActive = isValue;
    });

    const onSignup = async () => {
      store._isProgress = 40;
      try {
        await postReq("/signup", {
          email: state.email,
          username: state.username,
          password: state.password,
          passwordAgain: state.passwordAgain,
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

    return { route, state, onSignup };
  },
  render() {
    const { errorStatus, buttonActive } = this.state;
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form title={this.$t("Form.SignupForm.title")}>
            <section class="flex flex-col items-center gap-y-4">
              <FormInput
                errorActive={errorStatus === 409}
                onChange={(item) => (this.state.username = item)}
                type="text"
                label={this.$t("Form.SignupForm.Input.username")}
              />
              <FormInput
                errorActive={errorStatus === 409}
                onChange={(item) => (this.state.email = item)}
                class=""
                type="email"
                label="E-mail"
              />
              <FormInput
                onChange={(item) => (this.state.password = item)}
                class=""
                type="password"
                label={this.$t("Form.SignupForm.Input.password")}
              />
              <FormInput
                onChange={(item) => (this.state.passwordAgain = item)}
                type="password"
                label={this.$t("Form.SignupForm.Input.passwordAgain")}
              />
            </section>
            <section class="flex flex-col gap-y-1 items-center w-full">
              <FormButton
                onClick={this.onSignup}
                label={this.$t("Form.SignupForm.Button.signup")}
                isActive={buttonActive}
              />
              <router-link
                to="/auth/login"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.SignupForm.Button.login")}
              </router-link>
            </section>
          </Form>
        </div>
      </div>
    );
  },
});
