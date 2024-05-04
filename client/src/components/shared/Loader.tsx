import classNames from "classnames";
import { defineComponent, ref, watch } from "vue";

const Progress = defineComponent({
  name: "Progress",
  props: {
    value: {
      type: Number,
      required: true,
      validator: (v: unknown): boolean => {
        return typeof v === "number" && v >= 0 && v <= 100;
      },
    },
  },
  setup(props) {
    const width = ref(`${props.value}%`);

    watch(
      () => props.value,
      (val) => {
        width.value = "100%";
        if (val >= 100) {
          const timeout = setTimeout(() => {
            width.value = "0%";
            clearTimeout(timeout);
          }, 500);
        }
      },
      { immediate: true }
    );

    return { width };
  },
  render() {
    const { width } = this;
    return (
      <div
        class={classNames(
          "transition-all fixed h-1.5 bg-blue-200 top-0 z-[999]",
          parseInt(width.split("%")[0]) >= 100
            ? "duration-300 opacity-100"
            : "duration-150 opacity-0"
        )}
        style={{ width }}
        id="progress"
      ></div>
    );
  },
});

const Loading = defineComponent({
  name: "Loading",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
  render() {
    return;
  },
});

const Spinner = defineComponent({
  name: "Spinner",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
  render() {
    return;
  },
});

export { Progress, Spinner, Loading };
