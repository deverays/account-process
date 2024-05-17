/**Vue */
import { defineComponent, onMounted, onUnmounted, h } from "vue";

/**Lib */
import { cn } from "../../lib/utilts";

/**Utils */
import imports from "../../utils/imports";

const FormInput = defineComponent({
  name: "FormInput",
  props: {
    label: {
      type: String,
      default: "Default Form Label",
    },
    type: {
      type: String,
      default: "text",
    },
    errorActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change"],
  render() {
    const { label, errorActive, type, $emit } = this;

    return h(
      <section class="w-full">
        <h1 class="block mb-2 text-sm font-poppins-regular text-black dark:text-gray-100">
          {label}
        </h1>
        <input
          class={cn(
            "transition-all w-full h-10 pl-3 outline-none resize-none rounded-xl font-poppins-regular",
            "dark:bg-dark-100 dark:ring-dark-100 dark:text-gray-200 dark:placeholder:text-gray-200",
            "bg-gray-100 ring-gray-200 text-black placeholder:text-black",
            "ring-2 border-2 border-solid border-gray-100 dark:border-dark-100 focus:ring-opacity-40 hover:border-opacity-40 focus:border-opacity-0 dark:focus:ring-opacity-40 dark:hover:border-opacity-40 dark:focus:border-opacity-0",
            errorActive
              ? "bg-red-400 bg-opacity-10 dark:bg-red-400 dark:bg-opacity-10"
              : "hover:border-blue-600 dark:hover:border-blue-600 focus:ring-blue-600 dark:focus:ring-blue-600"
          )}
          type={type}
          onInput={(event: any) => $emit("change", event.target.value)}
        />
      </section>
    );
  },
});

const FormButton = defineComponent({
  name: "FormButton",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    keypress: {
      type: String,
      default: "Enter",
    },
    label: {
      type: String,
      default: "Default Label",
    },
  },
  emits: ["click"],
  setup(props) {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === props.keypress && props.isActive) {
        const button = document.getElementById(
          "FormButton"
        ) as HTMLButtonElement;
        if (button) {
          button.click();
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", handleKeyPress);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleKeyPress);
    });
  },
  render() {
    const { keypress, label, isActive } = this.$props;
    console.log(label.length * 20);
    return h(
      <button
        id="FormButton"
        accesskey={keypress}
        onClick={() => this.$emit("click")}
        class={cn(
          "transition-all relative flex justify-between mb-3 pl-3.5 items-center h-[60px] group rounded-xl bg-blue-600",
          {
            "pointer-events-auto hover:bg-opacity-80": isActive,
            "pointer-events-none opacity-80": !isActive,
          }
        )}
        style={{
          width: isActive
            ? `${label.length < 6 ? label.length * 20 : label.length * 16}px`
            : "60px",
        }}
      >
        <svg
          class="w-[32px] h-[32px] text-gray-100"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h1
          class={cn(
            "transition-all absolute right-0 text-lg font-poppins-regular text-gray-100",
            isActive ? "opacity-100 pr-3" : "opacity-0"
          )}
        >
          {label}
        </h1>
      </button>
    );
  },
});

const Form = defineComponent({
  name: "Form",
  props: {
    title: {
      type: String,
    },
    className: String,
  },
  render() {
    const { store } = imports();
    const { title, className } = this.$props;

    return (
      <div
        class={cn("transition-all flex flex-col items-center w-full z-[500]", {
          "pointer-events-auto": store._isProgress >= 100,
          "pointer-events-none opacity-60": store._isProgress < 100,
        })}
      >
        <h1 class="transition-all text-black dark:text-gray-200 text-3xl font-poppins-bold pointer-events-none mt-10 mb-8">
          {title}
        </h1>
        <div
          class={cn(
            "space-y-14 w-[90%] h-[95%] sm:h-[90%] md:w-[380px]",
            className
          )}
        >
          {this.$slots.default ? this.$slots.default() : []}
        </div>
      </div>
    );
  },
});

export { Form, FormInput, FormButton };
