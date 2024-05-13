/**Vue */
import { defineComponent, h } from "vue";

/**Lib */
import { cn } from "../../lib/utilts";

const BaseButton = defineComponent({
  emits: ["click"],
  props: {
    to: String,
    asChild: Boolean,
    className: String,
  },
  setup() {
    const getClassNames = (customClassName: string) => {
      return cn(
        "transition-all duration-300 flex items-center justify-center rounded-md backdrop-blur-3xl pointer-events-auto bg-blue-600 bg-opacity-80 hover:bg-opacity-100 py-2 px-8 font-poppins-regular text-gray-100",
        customClassName
      );
    };

    return { getClassNames };
  },
  render() {
    const slotContent = this.$slots.default ? this.$slots.default() : [];

    if (this.$props.to) {
      return h(
        <router-link
          to={this.$props.to}
          class={this.getClassNames(this.$props.className as string)}
        >
          {slotContent}
        </router-link>
      );
    } else {
      return h(
        <button
          onClick={() => this.$emit("click")}
          class={this.getClassNames(this.$props.className as string)}
        >
          {slotContent}
        </button>
      );
    }
  },
});

export { BaseButton };
