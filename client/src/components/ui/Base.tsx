import { defineComponent } from "vue";

const BaseButton = defineComponent({
  name: "BaseButton",
  props: {
    label: { type: String, default: "Default Label" },
    to: { tpye: String, default: "/" },
  },
  render() {
    const { $router, to, label } = this;
    return (
      <button
        onClick={() => $router.push(to)}
        class="transition-all duration-300 rounded-md backdrop-blur-3xl pointer-events-auto bg-blue-200 bg-opacity-80 hover:bg-opacity-100 py-2 px-8 font-rubik-regular text-grey-100"
      >
        {label}
      </button>
    );
  },
});

export { BaseButton };
