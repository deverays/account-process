import { defineComponent } from "vue";
import { AppHeader } from "../components/Header";
import classNames from "classnames";

const AppLayout = defineComponent({
  name: "AppLayout",
  props: {
    top: { type: String, default: "mt-24 md:mt-44" },
  },
  render() {
    const { top, $slots } = this;
    return (
      <>
        <AppHeader />
        <div
          v-motion-slide-visible-once-left
          class={classNames("flex flex-col items-center mb-20", top)}
        >
          {$slots.default ? $slots.default() : <p></p>}
        </div>
      </>
    );
  },
});

export default AppLayout;
