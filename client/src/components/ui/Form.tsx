import { defineComponent, onMounted, onUnmounted } from "vue";
import classNames from "classnames";
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

    return (
      <div
        class={classNames(
          "transition-all flex flex-col items-center w-full relative"
        )}
      >
        <input
          placeholder={label}
          class={classNames(
            "transition-all w-[90%] h-12 pl-3 outline-none resize-none rounded-xl font-poppins-regular",
            "dark:bg-dark-200 dark:ring-dark-100 dark:text-gray-200 dark:placeholder:text-gray-200",
            "bg-gray-100 ring-gray-200 text-black placeholder:text-black",
            "ring-2 border-2 border-solid border-gray-100 dark:border-dark-100 focus:ring-opacity-40 focus:placeholder:opacity-0 hover:border-opacity-40 focus:border-opacity-0 dark:focus:ring-opacity-40 dark:focus:placeholder:opacity-0 dark:hover:border-opacity-40 dark:focus:border-opacity-0",
            errorActive
              ? "bg-red-400 bg-opacity-10 dark:bg-red-400 dark:bg-opacity-10"
              : "hover:border-blue-600 dark:hover:border-blue-600 focus:ring-blue-600 dark:focus:ring-blue-600"
          )}
          type={type}
          onInput={(event: any) => $emit("change", event.target.value)}
        />
      </div>
    );
  },
});

const FormParagraph = defineComponent({
  name: "FormParagraph",
  props: {
    label: {
      type: String,
      default: "Default Form Label",
    },
  },
  emits: ["click"],
  render() {
    const { label } = this;
    return (
      <button
        onClick={() => this.$emit("click")}
        class="transition-all opacity-60 hover:opacity-80 text-black dark:text-gray-200 font-rubik-regular"
      >
        {label}
      </button>
    );
  },
});

const FormButton = defineComponent({
  name: "FormButton",
  props: {
    icon: {
      type: [String, Object, Function],
      default: null,
    },
    active: {
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
      if (event.key === props.keypress && props.active) {
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
    const { keypress, icon, label, active } = this;
    return (
      <button
        id="FormButton"
        accesskey={keypress}
        onClick={() => this.$emit("click")}
        class={classNames(
          "transition-all relative flex items-center h-[60px] w-[60px] group pl-3.5 rounded-xl bg-blue-600",
          {
            "pointer-events-auto": active,
            "pointer-events-none opacity-80": !active,
          }
        )}
      >
        {icon}
        <span class="transition-all absolute right-0 pr-3.5 opacity-0 group-hover:opacity-100 text-lg font-poppins-regular text-gray-100">
          {label}
        </span>
      </button>
    );
  },
});

const Form = defineComponent({
  name: "Form",
  props: {
    label: {
      type: String,
      default: "Default Form Label",
    },
    top: {
      type: [String, Object, Function],
      default: null,
    },
    bottom: {
      type: [String, Object, Function],
      default: null,
    },
  },
  render() {
    const { store } = imports();
    const { label, bottom, top } = this.$props;

    return (
      <div
        class={classNames(
          "transition-all flex flex-col items-center w-[90%] h-[95%] sm:h-[90%] md:w-[420px] rounded-tr-[10%] rounded-xl ring-8 bg-gray-200 dark:bg-dark-100 ring-gray-200 dark:ring-dark-100 z-[500]",
          {
            "pointer-events-auto": store._isProgress >= 100,
            "pointer-events-none": store._isProgress < 100,
          }
        )}
      >
        <h1 class="transition-all text-black dark:text-gray-200 text-3xl font-poppins-bold pointer-events-none mt-10 mb-8">
          {label}
        </h1>
        <div class="flex flex-col justify-between items-center h-full w-full">
          <span class="flex flex-col gap-y-3 items-center w-full">{top}</span>
          <span class="flex flex-col gap-y-1 items-center w-full mb-4">
            {bottom}
          </span>
        </div>
      </div>
    );
  },
});

export { Form, FormInput, FormButton, FormParagraph };
