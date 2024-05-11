import { defineComponent, PropType } from "vue";
import classNames from "classnames";

const Dropdown = defineComponent({
  name: "Dropdown",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "right-0 z-20 w-[228px] py-1.5",
    },
  },
  render() {
    const { $slots, isOpen, className } = this;
    return (
      <div
        class={classNames(
          className,
          "transition-all absolute rounded-lg bg-light-300 dark:bg-dark-300",
          isOpen
            ? "opacity-100 top-[calc(100%+8px)] pointer-events-auto"
            : "opacity-0 top-[calc(100%-24px)] pointer-events-none"
        )}
      >
        {$slots.default ? $slots.default() : null}
      </div>
    );
  },
});

const DropdownButton = defineComponent({
  name: "DropdownButton",
  props: {
    onClick: Function as PropType<() => void>,
    to: String,
    redirect: String,
    className: {
      type: String,
      default: "w-[94%]",
    },
  },
  render() {
    const { onClick, $slots, to, redirect } = this;

    if (to)
      return (
        <router-link
          class={classNames(
            "transition-all flex items-center justify-start m-auto rounded-md py-2 pl-3 space-x-2 font-poppins-regular text-sm opacity-80 hover:opacity-100 hover:bg-opacity-60 text-black dark:text-gray-100 hover:bg-light-100 dark:hover:bg-dark-100",
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
            "transition-all flex items-center justify-start m-auto rounded-md py-2 pl-3 space-x-2 font-poppins-regular text-sm opacity-80 hover:opacity-100 hover:bg-opacity-60 text-black dark:text-gray-100 hover:bg-light-100 dark:hover:bg-dark-100",
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
            "transition-all flex items-center justify-start m-auto rounded-md py-2 pl-3 space-x-2 font-poppins-regular text-sm opacity-80 hover:opacity-100 hover:bg-opacity-60 text-black dark:text-gray-100 hover:bg-light-100 dark:hover:bg-dark-100",
            this.className
          )}
          onClick={onClick}
        >
          {$slots.default ? $slots.default() : null}
        </button>
      );
  },
});

const DropdownTitle = defineComponent({
  name: "DropdownTitle",
  render() {
    return (
      <h1 class="transition-all m-auto w-[94%] py-1.5 pl-3 text-sm font-poppins-bold opacity-95 text-black dark:text-gray-100">
        {this.$slots.default ? this.$slots.default() : null}
      </h1>
    );
  },
});

export { Dropdown, DropdownButton, DropdownTitle };
