import classNames from "classnames";
import { defineComponent, PropType } from "vue";

const BaseButton = defineComponent({
  name: "BaseButton",
  props: {
    onClick: Function as PropType<() => void>,
    to: String,
    redirect: String,
    className: String,
  },
  render() {
    const { onClick, $slots, to, redirect } = this;

    if (to)
      return (
        <router-link
          class={classNames(
            "transition-all duration-300 flex items-center justify-center rounded-md backdrop-blur-3xl pointer-events-auto bg-blue-600 bg-opacity-80 hover:bg-opacity-100 py-2 px-8 font-poppins-regular text-gray-100",
            this.className
          )}
          to={to}
        >
          {$slots.default ? $slots.default() : null}
        </router-link>
      );

    if (redirect)
      return (
        <button
          class={classNames(
            "transition-all duration-300 flex items-center justify-center rounded-md backdrop-blur-3xl pointer-events-auto bg-blue-600 bg-opacity-80 hover:bg-opacity-100 py-2 px-8 font-poppins-regular text-gray-100",
            this.className
          )}
          onClick={() => (location.href = redirect)}
        >
          {$slots.default ? $slots.default() : null}
        </button>
      );

    if (onClick)
      return (
        <button
          class={classNames(
            "transition-all duration-300 flex items-center justify-center rounded-md backdrop-blur-3xl pointer-events-auto bg-blue-600 bg-opacity-80 hover:bg-opacity-100 py-2 px-8 font-poppins-regular text-gray-100",
            this.className
          )}
          onClick={onClick}
        >
          {$slots.default ? $slots.default() : null}
        </button>
      );
  },
});

const BaseToggle = defineComponent({
  name: "BaseToggle",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle"],
  render() {
    return (
      <div
        onClick={() => this.$emit("toggle")}
        class="inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          checked={this.isOpen}
        />
        <div
          class={classNames(
            "transition-all duration-300 relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
            this.isOpen
              ? "ring-0 hover:ring-4 hover:ring-blue-300 hover:dark:ring-blue-500"
              : ""
          )}
        ></div>
      </div>
    );
  },
});

export { BaseButton, BaseToggle };
