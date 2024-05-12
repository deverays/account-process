import { defineComponent } from "vue";
import { BoxAnimation } from "../../components/Animations";
import {
  Form,
  FormInput,
  FormButton,
  FormParagraph,
} from "../../components/ui/Form";
import { validateUsername, validatePassword } from "../../utils/auth/validator";
import imports from "../../utils/imports";

export default defineComponent({
  name: "Login",
  setup() {
    const { store, router, route, reactive, watchEffect, postReq } = imports();

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
        const res = await postReq("/users/login", {
          username: state.username,
          password: state.password,
        });
        store._isProgress = 100;
        store.getters._getUser = res.data.user_data;
        store._isLogin = true;
        router.push((route.query.ref as string) || "/");
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            access_token: res.data.user_data.access_token,
            ...(JSON.parse(localStorage.user_data || "null") || {}),
          })
        );
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
          <Form
            class="md:h-[450px]"
            top={
              <>
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
              </>
            }
            bottom={
              <>
                <FormButton
                  class="hover:w-[120px] mb-5"
                  label={this.$t("Form.LoginForm.Button.login")}
                  active={buttonActive}
                  onClick={this.onLogin}
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
                <FormParagraph
                  onClick={() => this.$router.push("/users/recovery")}
                  label={this.$t("Form.LoginForm.Button.recovery")}
                />
                <FormParagraph
                  label={this.$t("Form.LoginForm.Button.signup")}
                  onClick={() =>
                    this.$router.push({
                      path: "/users/signup",
                      query: {
                        ref: this.route.query.ref || "/",
                      },
                    })
                  }
                />
              </>
            }
            label={this.$t("Form.LoginForm.title")}
          />
        </div>
      </div>
    );
  },
});
