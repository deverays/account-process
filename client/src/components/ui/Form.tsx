import classNames from "classnames";
import imports from "../../utils/imports";
import { defineComponent, onMounted, onUnmounted } from "vue";

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
  emits: ["input-change"],
  render() {
    const { label, errorActive, type, $emit } = this;

    const handleInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      $emit("input-change", value);
    };

    return (
      <div
        class={classNames(
          "transition-all duration-500 flex flex-col items-center w-full relative",
          errorActive ? "mb-3" : "mb-0"
        )}
      >
        <input
          placeholder={label}
          class="transition-all duration-500 w-[90%] h-12 pl-3 outline-none resize-none border-2 border-solid ring-2 rounded-xl font-rubik-regular bg-dark-200 border-dark-100 ring-dark-100 text-grey-200 placeholder:text-grey-200 hover:border-blue-200 focus:ring-blue-200 focus:ring-opacity-40 hover:border-opacity-40 focus:border-opacity-0 focus:placeholder:opacity-0"
          type={type}
          onInput={handleInputChange}
        />
        <p
          class={classNames(
            "transition-all duration-500 flex justify-start absolute bottom-0 -mb-6 w-[90%] pl-2 font-rubik-regular text-red-400 pointer-events-none",
            errorActive ? "opacity-60" : "opacity-0"
          )}
        >
          The information you entered is incorrect
        </p>
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
    click: {
      type: Function,
      default: () => console.log("Default Button Click"),
    },
  },
  render() {
    const { click, label } = this;
    return (
      <button
        onClick={click as () => {}}
        class="transition-all duration-75 opacity-60 hover:opacity-80 text-grey-200 font-rubik-regular"
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
    click: {
      type: Function,
      default: () => console.log("Default Button Click"),
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
    const { keypress, click, icon, label, active } = this;
    return (
      <button
        id="FormButton"
        accesskey={keypress}
        onClick={click as () => {}}
        class={classNames(
          "transition-all duration-500 relative flex items-center h-20 lg:h-[60px] w-20 lg:w-[60px] group pl-6 lg:pl-3.5 rounded-xl bg-blue-200",
          active
            ? "pointer-events-auto rounded-tr-3xl lg:rounded-tr-[30%] hover:rounded-tr-xl ring-4 ring-blue-200 ring-opacity-0 hover:ring-opacity-40 focus:ring-opacity-0"
            : "pointer-events-none opacity-80"
        )}
      >
        {icon}
        <span class="transition-all duration-700 absolute right-0 pr-5 lg:pr-3.5 opacity-0 group-hover:opacity-100 text-lg font-rubik-regular text-grey-100">
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
          `transition-all duration-1000 flex flex-col items-center w-[90%] h-[95%] sm:h-[90%] md:w-[420px] rounded-tr-[10%] rounded-xl ring-8 bg-dark-100 ring-dark-100 z-[500]`,
          store._isProgress >= 100
            ? "pointer-events-auto"
            : "pointer-events-none"
        )}
      >
        <h1 class="transition-all duration-1000 text-grey-200 text-3xl font-rubik-semibold pointer-events-none mt-10 mb-8">
          {label}
        </h1>
        <div class="flex flex-col justify-between items-center h-full w-full">
          <span class="flex flex-col gap-y-4 items-center w-full">{top}</span>
          <span class="flex flex-col gap-y-1 items-center w-full mb-4">
            {bottom}
          </span>
        </div>
      </div>
    );
  },
});

export { Form, FormInput, FormButton, FormParagraph };
