/**Vue */
import { defineComponent, h } from "vue";

/**Lib */
import { cn } from "../lib/utilts";

/**Components */
import { AppHeader } from "../components/Header";

export default defineComponent({
  props: { className: String },
  render() {
    return h(
      <>
        <AppHeader />
        <div
          class={cn(
            "transition-all duration-700 flex flex-col items-center mb-20 mt-16 lg:mt-20 w-full"
          )}
        >
          <div v-motion-slide-visible-once-left class={this.className}>
            {this.$slots.default ? this.$slots.default() : null}
          </div>
        </div>
      </>
    );
  },
});
