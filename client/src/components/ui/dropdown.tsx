import { defineComponent, PropType, h } from "vue";
import { cn } from "../../lib/utilts";

const Dropdown = defineComponent({
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
    return h(
      <div
        class={cn(
          this.className,
          "transition-all absolute rounded-lg bg-light-300 dark:bg-dark-300",
          this.isOpen
            ? "opacity-100 top-[calc(100%+8px)] pointer-events-auto"
            : "opacity-0 top-[calc(100%-24px)] pointer-events-none"
        )}
      >
        {this.$slots.default ? this.$slots.default() : []}
      </div>
    );
  },
});

const DropdownButton = defineComponent({
  props: {
    onClick: Function as PropType<() => void>,
    to: String,
    redirect: String,
    className: {
      type: String,
      default: "w-[94%]",
    },
  },
  setup() {
    const getClassNames = (customClassName: string) => {
      return cn(
        "transition-all flex items-center justify-start m-auto rounded-md py-2 pl-3 space-x-2 font-poppins-regular text-sm opacity-80 hover:opacity-100 hover:bg-opacity-60 text-black dark:text-gray-100 hover:bg-light-100 dark:hover:bg-dark-100",
        customClassName
      );
    };

    return { getClassNames };
  },
  render() {
    const slotContent = this.$slots.default ? this.$slots.default() : [];

    if (this.$props.to)
      return h(
        <router-link
          class={cn(this.getClassNames(this.$props.className))}
          to={this.$props.to}
        >
          {slotContent}
        </router-link>
      );

    if (this.$props.redirect)
      return h(
        <button
          class={cn(this.getClassNames(this.$props.className))}
          onClick={() => (location.href = this.$props.redirect as string)}
        >
          {slotContent}
        </button>
      );

    if (this.$props.onClick)
      return h(
        <button
          class={cn(this.getClassNames(this.$props.className))}
          onClick={this.$props.onClick}
        >
          {slotContent}
        </button>
      );
  },
});

const DropdownTitle = defineComponent({
  render() {
    return h(
      <h1 class="transition-all m-auto w-[94%] py-1.5 pl-3 text-sm font-poppins-bold opacity-95 text-black dark:text-gray-100">
        {this.$slots.default ? this.$slots.default() : []}
      </h1>
    );
  },
});

export { Dropdown, DropdownButton, DropdownTitle };
