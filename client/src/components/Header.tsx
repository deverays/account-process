import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import classNames from "classnames";
import { ProfileDropdown } from "./shared/Dropdown";
import P4BLogo from "../assets/images/P4B-logo.png";

const AppHeader = defineComponent({
  name: "AppHeader",
  setup() {
    const showHeader = ref(true);
    const showBackground = ref(false);
    const beforeY = ref(0);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      showBackground.value = currentScrollY > 0;
      showHeader.value = beforeY.value > currentScrollY;
      beforeY.value = currentScrollY;
    };

    onMounted(() => {
      document.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
    });

    return { showHeader, showBackground };
  },
  render() {
    const { showHeader, showBackground } = this;

    return (
      <div
        id="AppHeader"
        class={classNames(
          "transition-all fixed top-0 max-lg:h-16 lg:h-20 flex items-center justify-between md:justify-around w-full max-md:pl-[5%] max-md:pr-[5%] z-[998]",
          showHeader ? "translate-y-0" : "-translate-y-full",
          showBackground ? "bg-dark-100 duration-500" : ""
        )}
      >
        <HomeButton />
        <ProfileDropdown />
      </div>
    );
  },
});

const HomeButton = defineComponent({
  name: "HomeButton",
  render() {
    const { $router } = this;

    return (
      <button
        onClick={() => $router.push("/")}
        class="flex items-center gap-x-4 text-2xl group font-rubik-semibold pointer-events-auto"
      >
        <img v-lazy={P4BLogo} class="w-7" alt="P4B" />
        <span class="opacity-90 gropu-hover:opacity-100 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
          {import.meta.env.VITE_PROJECT_TITLE}
        </span>
      </button>
    );
  },
});

const BaseHeader = defineComponent({
  name: "BaseHeader",
  render() {
    return (
      <div class="transition-all py-3 flex justify-start w-full pl-[5%] md:pl-3 z-[998]">
        <HomeButton />
      </div>
    );
  },
});

export { AppHeader, BaseHeader, HomeButton };
