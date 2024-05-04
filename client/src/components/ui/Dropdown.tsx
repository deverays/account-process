import { defineComponent, PropType } from "vue";
import classNames from "classnames";

const Dropdown = defineComponent({
  name: "Dropdown",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    const { $slots, open } = this;
    return (
      <div
        class={classNames(
          "transition-all absolute right-0 z-20 w-[228px] py-1.5 rounded-lg",
          "bg-dark-300",
          open
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
    click: {
      type: Function as PropType<() => void>,
      default: () => console.log("Default Click"),
    },
    label: {
      type: String,
      default: "Default Label",
    },
  },
  methods: {
    handleClick() {
      this.click();
    },
  },
  render() {
    const { handleClick, label } = this;
    return (
      <button
        class="transition-all flex items-center justify-start w-[94%] m-auto rounded-md py-2 pl-3 space-x-2 font-rubik-regular text-sm opacity-80 hover:opacity-100 hover:bg-opacity-60 text-grey-100 hover:bg-dark-100"
        onClick={handleClick}
      >
        {label}
      </button>
    );
  },
});

const DropdownTitle = defineComponent({
  name: "DropdownTitle",
  props: {
    title: {
      type: String,
      default: "Default Title",
    },
  },
  render() {
    const { title } = this;
    return (
      <h1 class="m-auto w-[94%] py-1.5 pl-3 text-sm font-rubik-semibold opacity-95 text-grey-100">
        {title}
      </h1>
    );
  },
});

export { Dropdown, DropdownButton, DropdownTitle };
