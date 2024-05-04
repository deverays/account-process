import { defineComponent } from "vue";
import { BaseHeader } from "../components/Header";

const BaseLayout = defineComponent({
  name: "BaseLayout",
  render() {
    const { $slots } = this;
    return (
      <>
        <BaseHeader />
        <div class="flex flex-col items-center transition-all mt-12 md:mt-16 mb-20">
          {$slots.default ? $slots.default() : <p></p>}
        </div>
      </>
    );
  },
});

export default BaseLayout;
