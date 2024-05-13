/**Vue */
import { useRoute } from "vue-router";
import { defineComponent, computed, h } from "vue";

/**Icons */
import { ArrowIcon } from "./icon";

/**Lib */
import { cn } from "../../lib/utilts";

const LeftsideButton = defineComponent({
  props: {
    place: String,
    to: String,
  },
  render() {
    const route = useRoute();
    return h(
      <div class="w-full">
        <router-link
          to={this.to?.replace(":id", route.params.id as string)}
          class={cn(
            "transition-all flex justify-between items-center w-full py-2 rounded-md pl-4 pr-2",
            route.fullPath.includes(
              this.place?.replace(":id", route.params.id as string)!
            )
              ? "bg-opacity-60 dark:bg-opacity-40 hover:bg-opacity-80 dark:hover:bg-opacity-60 bg-gray-300 dark:bg-dark-300 text-black dark:text-gray-100"
              : "hover:bg-opacity-60 dark:hover:bg-opacity-40 hover:bg-gray-300 dark:hover:bg-dark-300 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <div class="flex items-center group font-poppins-regular gap-x-3 text-sm">
            {this.$slots.default ? this.$slots.default() : []}
          </div>
        </router-link>
      </div>
    );
  },
});

const LeftsideCategory = defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  render() {
    return h(
      <button
        onClick={() => this.$emit("click")}
        class={cn(
          "flex items-center w-full justify-between pl-2 my-2 z-40 text-black dark:text-gray-100"
        )}
      >
        <section class="transition-all text-[13px] font-poppins-bold">
          {this.$slots.default ? this.$slots.default() : []}
        </section>
        <ArrowIcon isActive={this.isOpen} />
      </button>
    );
  },
});

const Leftside = defineComponent({
  props: {
    direction: String,
    isOpen: Boolean,
    required: Boolean,
    id: String,
  },
  render() {
    const { direction, isOpen, required, id } = this.$props;

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

    return h(
      <div
        id={id}
        class={cn(
          "scrollbar fixed top-0 h-full transition-all overflow-x-hidden overflow-y-auto flex flex-col items-center bg-gray-200 dark:bg-dark-100",
          leftSideClasses.value
        )}
      >
        {this.$slots.default ? this.$slots.default() : []}
      </div>
    );
  },
});

export { Leftside, LeftsideButton, LeftsideCategory };
