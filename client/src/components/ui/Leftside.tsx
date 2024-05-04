import { defineComponent, computed } from "vue";
import classNames from "classnames";

const LeftsideButton = defineComponent({
  name: "LeftsideButton",
  props: {
    fullPath: String,
    label: String,
    icon: [String, Object, Function],
    to: String,
    title: String,
  },
  render() {
    const { fullPath, icon, label, $router, to, title } = this;

    return (
      <button
        onClick={() => $router.push(to as string)}
        class={classNames(
          "transition-all flex justify-between items-center w-full py-2 rounded-md pl-4 pr-2 cursor-pointer hover:bg-opacity-30 pointer-events-auto",
          fullPath?.includes(label as string)
            ? "bg-dark-300 bg-opacity-50 text-grey-100"
            : "hover:bg-dark-300 text-grey-300 hover:text-grey-100"
        )}
      >
        <div class="flex items-center group font-rubik-regular gap-x-4 text-sm">
          {icon}
          {title}
        </div>
      </button>
    );
  },
});

const Leftside = defineComponent({
  name: "Leftside",
  props: {
    direction: String,
    open: Boolean,
    required: Boolean,
  },
  render() {
    const { direction, open, required, $slots } = this;
    const leftSideClasses = computed(() => {
      const baseClasses = {
        "left-0": direction === "left",
        "right-0": direction === "right",
      };

      if (required) {
        return {
          ...baseClasses,
          "opacity-100 pointer-events-auto": open,
          "max-lg:opacity-0 max-lg:pointer-events-none": !open,
          "max-lg:-translate-x-20": direction === "left" && !open,
          "max-lg:translate-x-20": direction === "right" && !open,
        };
      } else {
        return {
          ...baseClasses,
          "opacity-100 pointer-events-auto": open,
          "opacity-0 pointer-events-none": !open,
          "-translate-x-20": direction === "left" && !open,
          "translate-x-20": direction === "right" && !open,
        };
      }
    });

    return (
      <div
        class={classNames(
          "scrollbar shadow-lg fixed top-0 h-full transition-all overflow-x-hidden overflow-y-auto flex flex-col items-center shadow-gray-200 dark:shadow-dark-100 bg-gray-200 dark:bg-dark-100",
          leftSideClasses.value
        )}
      >
        {$slots.default ? $slots.default() : null}
      </div>
    );
  },
});

export { Leftside, LeftsideButton };
