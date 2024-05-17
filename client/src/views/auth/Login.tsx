import { defineComponent } from "vue";
import imports from "../../utils/imports";

import BoxAnimation from "../../components/animations/BoxAnimation";
import { Form, FormInput, FormButton } from "../../components/ui/form";

import { validateUsername, validatePassword } from "../../utils/auth/validator";

export default defineComponent({
  setup() {
    const { store, route, reactive, watchEffect, postReq } = imports();

    const state = reactive({
      errorStatus: 200,
      buttonActive: false,
      username: route.query.username || "",
      password: route.query.password || "",
    });

    watchEffect(() => {
      const isValue =
        validateUsername(state.username as string) &&
        validatePassword(state.password as string);
      state.buttonActive = isValue;
    });

    const onLogin = async () => {
      store._isProgress = 40;
      try {
        const res = await postReq("/login", {
          username: state.username,
          password: state.password,
        });
        store._isProgress = 100;
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            access_token: res.data.user_data.access_token,
            ...(JSON.parse(localStorage.user_data || "null") || {}),
          })
        );
        location.href = (route.query.ref as string) || "/";
      } catch (err: any) {
        store._isProgress = 100;
        state.errorStatus = err.response.status;
        setTimeout(() => (state.errorStatus = 200), 5000);
      }
    };

    return { route, state, onLogin };
  },
  render() {
    const { errorStatus, buttonActive } = this.state;
    return (
      <div v-motion-slide-visible-once-right>
        <BoxAnimation class="fixed" />
        <div class="flex justify-center items-center h-dvh w-dvw">
          <Form title={this.$t("Form.LoginForm.title")}>
            <section class="flex flex-col items-center gap-y-4">
              <FormInput
                errorActive={errorStatus === 404}
                onChange={(item) => (this.state.username = item)}
                type="text"
                label={this.$t("Form.LoginForm.Input.username")}
              />
              <FormInput
                errorActive={errorStatus === 401}
                onChange={(item) => (this.state.password = item)}
                type="password"
                label={this.$t("Form.LoginForm.Input.password")}
              />
            </section>
            <section class="flex flex-col gap-y-1 items-center w-full">
              <FormButton
                class="hover:w-[120px] mb-5"
                label={this.$t("Form.LoginForm.Button.login")}
                isActive={buttonActive}
                onClick={this.onLogin}
              />
              <router-link
                to="/auth/recovery"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.LoginForm.Button.recovery")}
              </router-link>
              <router-link
                to="/auth/signup"
                class="transition-all text-center opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
              >
                {this.$t("Form.LoginForm.Button.signup")}
              </router-link>
            </section>
          </Form>
        </div>
      </div>
    );
  },
});
