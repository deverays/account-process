import imports from "../utils/imports";
import { defineComponent } from "vue";
import { Loading } from "../components/shared/Loader";

const Logout = defineComponent({
  name: "Logout",
  setup() {
    const { router, store, onMounted } = imports();

    onMounted(() => {
      store._isProgress = 40;
      const userData = JSON.parse(localStorage.user_data);

      delete userData?.access_token;

      store.getters._getUser = {} as any;
      store._isLogin = false;
      localStorage.setItem("user_data", JSON.stringify(userData));
      store._isProgress = 100;
      router.push("/login");
    });
  },
  render() {
    return <Loading />;
  },
});

export default Logout;
