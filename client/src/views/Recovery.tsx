import { defineComponent } from "vue";
import BaseLayout from "../layouts/BaseLayout";
import { UserIcon, LockIcon } from "../components/ui/Icon";

const RecoveryItem = defineComponent({
  name: "RecoveryItem",
  props: {
    icon: {
      type: [String, Object, Function],
      default: <div></div>,
    },
    title: {
      type: String,
      default: "Default Title",
    },
    description: {
      type: String,
      default: "Default Description",
    },
    to: {
      type: String,
      default: "/",
    },
  },
  render() {
    return (
      <button
        onClick={() => this.$router.push(this.to)}
        class="transition-all pointer-events-auto relative flex flex-col items-center w-72 h-[360px] rounded-t-xl hover:-mt-4 border-b-4 border-blue-200 bg-dark-300"
      >
        <div class="mt-4 opacity-80">{this.icon}</div>
        <div class="flex flex-col items-center absolute mt-[150px]">
          <h1 class="text-grey-100 font-rubik-semibold text-2xl mt-8 mb-2 text-center w-[95%]">
            {this.title}
          </h1>
          <p class="text-grey-200 font-rubik-regular text-sm opacity-80 text-center w-[90%]">
            {this.description}
          </p>
        </div>
      </button>
    );
  },
});

const Recovery = defineComponent({
  name: "Recovery",
  render() {
    return (
      <BaseLayout>
        <h1 class="text-grey-100 font-rubik-semibold text-5xl sm:text-6xl text-center mb-5 w-[90%]">
          {this.$t("Recovery.title")}
        </h1>
        <p class="transition-all text-grey-200 font-rubik-regular text-xl text-center opacity-80 w-[90%] lg:w-[40%] mb-10 sm:mb-24">
          {this.$t("Recovery.description")}
        </p>

        <div
          v-motion-slide-visible-once-bottom
          class="grid grid-cols-1 sm:grid-cols-2 gap-10"
        >
          <RecoveryItem
            to="/forgot-username"
            icon={<UserIcon class="w-32 h-32 text-grey-100" />}
            title={this.$t("Recovery.Item.ForgotUsername.title")}
            description={this.$t("Recovery.Item.ForgotUsername.description")}
          />
          <RecoveryItem
            to="/forgot-password"
            icon={<LockIcon class="w-32 h-32 text-grey-100" />}
            title={this.$t("Recovery.Item.ForgotPassword.title")}
            description={this.$t("Recovery.Item.ForgotPassword.description")}
          />
        </div>
      </BaseLayout>
    );
  },
});

export { RecoveryItem };
export default Recovery;
