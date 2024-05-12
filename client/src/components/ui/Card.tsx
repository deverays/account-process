import { defineComponent } from "vue";
import { ArrowIcon } from "./Icon";
import classNames from "classnames";
import { BaseToggle, BaseButton } from "./Base";
import { Spinner } from "../shared/Loader";

const SaveCard = defineComponent({
  name: "SaveCard",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isSaveLoaded: {
      type: Boolean,
      default: true,
    },
    isResetLoaded: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["save", "reset"],
  render() {
    return (
      <div
        class={classNames(
          "transition-all fixed flex items-center bottom-5 lg:bottom-10 w-[95%] lg:w-[60%] rounded-lg h-20 justify-between pl-5 pr-5 bg-gray-200 dark:bg-dark-100",
          this.isOpen
            ? "opacity-100 translate-y-[0px] pointer-events-auto"
            : "opacity-0 translate-y-[10px] pointer-events-none"
        )}
      >
        <h1 class="transition-all max-sm:hidden font-poppins-regular text-black dark:text-gray-100 ">
          {this.$t("Dashboard.SaveCard.description")}
        </h1>
        <div class="flex items-center justify-between gap-x-4 max-sm:w-full">
          <button
            onClick={this.onReset}
            class="transition-all flex items-center justify-center h-12 rounded-lg w-full sm:w-24 text-black dark:text-gray-100 bg-gray-300 hover:bg-opacity-60 dark:bg-dark-200 dark:hover:bg-opacity-60"
          >
            {this.isResetLoaded ? (
              this.$t("Dashboard.SaveCard.Button.reset")
            ) : (
              <Spinner className="w-6 h-6" />
            )}
          </button>
          <BaseButton
            className="h-12 w-full sm:w-32"
            onClick={() => this.$emit("save")}
          >
            {this.$props.isSaveLoaded ? (
              this.$t("Dashboard.SaveCard.Button.save")
            ) : (
              <Spinner className="w-6 h-6" />
            )}
          </BaseButton>
        </div>
      </div>
    );
  },
});

const BaseCheckCard = defineComponent({
  name: "BaseCheckCard",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: String,
    description: String,
  },
  emits: ["click"],
  render() {
    const { $emit, isOpen, title, description } = this;

    return (
      <>
        <button
          class={classNames(
            "transition-all py-4 justify-between pl-5 pr-5 flex border-b items-center w-[95%] lg:w-[90%] font-poppins-regular text-sm bg-gray-200 dark:bg-dark-100 text-black dark:text-gray-100",
            isOpen
              ? "border-b border-gray-400 border-opacity-20 rounded-t-lg"
              : "rounded-lg border-solid dark:border-dark-100"
          )}
          onClick={() => $emit("click")}
        >
          <div class="flex flex-col items-start w-full">
            <h1 class="flex items-center gap-2 text-base font-poppins-bold opacity-90">
              {title}
            </h1>
            <p class="opacity-60 text-left">{description}</p>
          </div>
          <ArrowIcon isActive={isOpen} />
        </button>
      </>
    );
  },
});

const BaseToggleCard = defineComponent({
  name: "BaseToggleCard",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: String,
    description: String,
  },
  emits: ["toggle"],
  render() {
    return (
      <div
        class={classNames(
          "transition-all py-4 justify-between pl-5 pr-5 flex border-b items-center w-[95%] lg:w-[90%] font-poppins-regular text-sm bg-gray-200 dark:bg-dark-100 text-black dark:text-gray-100",
          this.isOpen
            ? "border-b border-gray-400 border-opacity-20 rounded-t-lg"
            : "rounded-lg border-solid dark:border-dark-100"
        )}
      >
        <div class="flex flex-col items-start w-full">
          <h1 class="flex items-center gap-2 text-base font-poppins-bold opacity-90">
            {this.title}
          </h1>
          <p class="opacity-60 text-left">{this.description}</p>
        </div>
        <BaseToggle
          onToggle={() => this.$emit("toggle")}
          isOpen={this.isOpen}
        />
      </div>
    );
  },
});

const BaseCard = defineComponent({
  name: "BaseCard",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    return (
      this.isOpen && (
        <div class="transition-all w-[95%] lg:w-[90%] rounded-b-lg py-6 justify-between pl-5 pr-5 shadow-lg bg-gray-200 dark:bg-dark-100">
          {this.$slots.default ? this.$slots.default() : null}
        </div>
      )
    );
  },
});

export { SaveCard, BaseCard, BaseCheckCard, BaseToggleCard };
