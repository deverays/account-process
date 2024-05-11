import { defineComponent } from "vue";
import { AppHeader } from "../components/Header";
import classNames from "classnames";

export default defineComponent({
  name: "AppLayout",
  render() {
    return (
      <>
        <AppHeader />
        <div
          class={classNames(
            "transition-all duration-700 flex flex-col items-center mb-20 mt-16 lg:mt-20 w-full"
          )}
        >
          <div v-motion-slide-visible-once-left>
            {this.$slots.default ? this.$slots.default() : null}
          </div>
        </div>
      </>
    );
  },
});
