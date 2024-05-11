import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowIcon } from "./Icon";
import classNames from "classnames";

const LeftsideButton = defineComponent({
  name: "LeftsideButton",
  props: {
    path: String,
    to: String,
    isActive: {
      type: Boolean,
      default: null,
    },
  },
  render() {
    const route = useRoute();
    const { $slots, path, to, isActive } = this;

    return (
      <div class="w-full">
        <router-link
          to={to?.replace(":id", route.params.id as string)}
          class={classNames(
            "transition-all flex justify-between items-center w-full py-2 rounded-md pl-4 pr-2",
            route.fullPath.includes(
              path?.replace(":id", route.params.id as string)!
            )
              ? "bg-opacity-60 dark:bg-opacity-40 hover:bg-opacity-80 dark:hover:bg-opacity-60 bg-gray-300 dark:bg-dark-300 text-black dark:text-gray-100"
              : "hover:bg-opacity-60 dark:hover:bg-opacity-40 hover:bg-gray-300 dark:hover:bg-dark-300 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <div class="flex items-center group font-poppins-regular gap-x-3 text-sm">
            {isActive !== null && (
              <div class="relative">
                <div
                  class={classNames(
                    "transition-all w-[8px] h-[8px] min-w-[8px] min-h-[8px] rounded-full",
                    isActive
                      ? "bg-blue-500 animate-ping absolute"
                      : "bg-gray-400 group-hover:bg-black dark:group-hover:bg-gray-100"
                  )}
                ></div>
                {isActive && (
                  <div
                    class={classNames(
                      "transition-all ml-[1.3px] mt-[1.2px] w-[6px] h-[6px] min-w-[6px] min-h-[6px] rounded-full",
                      isActive
                        ? "bg-blue-600"
                        : "bg-gray-400 group-hover:bg-black dark:group-hover:bg-gray-100"
                    )}
                  ></div>
                )}
              </div>
            )}
            {$slots.default ? $slots.default() : null}
          </div>
        </router-link>
      </div>
    );
  },
});

const LeftsideCategory = defineComponent({
  name: "LeftsideCategory",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  render() {
    const { $slots, isOpen, $emit } = this;

    return (
      <button
        onClick={() => $emit("click")}
        class={classNames(
          "flex items-center w-full justify-between pl-2 my-2 z-40 text-black dark:text-gray-100"
        )}
      >
        <section class="transition-all text-[13px] font-poppins-bold">
          {$slots.default ? $slots.default() : null}
        </section>
        <ArrowIcon isActive={isOpen} />
      </button>
    );
  },
});

const Leftside = defineComponent({
  name: "Leftside",
  props: {
    direction: String,
    isOpen: Boolean,
    required: Boolean,
    id: String,
  },
  render() {
    const { direction, isOpen, required, $slots, id } = this;

    const leftSideClasses = computed(() => {
      const baseClasses = {
        "left-0": direction === "left",
        "right-0": direction === "right",
      };

      if (required) {
        return {
          ...baseClasses,
          "opacity-100 pointer-events-auto": isOpen,
          "max-lg:opacity-0 max-lg:pointer-events-none": !isOpen,
          "max-lg:-translate-x-20": direction === "left" && !isOpen,
          "max-lg:translate-x-20": direction === "right" && !isOpen,
        };
      } else {
        return {
          ...baseClasses,
          "opacity-100 pointer-events-auto": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
          "-translate-x-20": direction === "left" && !isOpen,
          "translate-x-20": direction === "right" && !isOpen,
        };
      }
    });

    return (
      <div
        id={id}
        class={classNames(
          "scrollbar fixed top-0 h-full transition-all overflow-x-hidden overflow-y-auto flex flex-col items-center bg-gray-200 dark:bg-dark-100",
          leftSideClasses.value
        )}
      >
        {$slots.default ? $slots.default() : null}
      </div>
    );
  },
});

export { Leftside, LeftsideButton, LeftsideCategory };
