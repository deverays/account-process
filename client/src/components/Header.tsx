import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import classNames from "classnames";
import { ProfileDropdown } from "./shared/Dropdown";
import Logo from "../assets/images/logo.png";

const AppHeader = defineComponent({
  name: "AppHeader",
  setup() {
    const showHeader = ref(true);
    const beforeY = ref(0);

    const handleScroll = () => {
      if (window.scrollY < 40) return;
      const currentScrollY = window.scrollY;
      showHeader.value = beforeY.value > currentScrollY;
      beforeY.value = currentScrollY;
    };

    onMounted(() => {
      document.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
    });

    return { showHeader };
  },
  render() {
    return (
      <div
        class={classNames(
          "transition-all fixed top-0 max-lg:h-16 lg:h-20 flex items-center justify-between lg:justify-around w-full max-lg:pl-[2%] max-lg:pr-[2%] z-[998]",
          this.showHeader ? "translate-y-0" : "-translate-y-full",
          "bg-gray-200 dark:bg-dark-100 duration-500"
        )}
      >
        <router-link to="/" class="flex items-center gap-x-4 group relative">
          <img
            v-lazy={Logo}
            class="transition-all w-8 group-hover:-rotate-12"
            alt="P4B"
          />
          <span class="transition-all text-2xl font-poppins-bold opacity-90 gropu-hover:opacity-100 text-dark-100 dark:text-gray-100">
            <div class="absolute ml-3 bg-gray-100 w-6 h-6 blur-2xl"></div>
            {import.meta.env.VITE_PROJECT_TITLE}
          </span>
        </router-link>
        <ProfileDropdown />
      </div>
    );
  },
});

const DashboardHeader = defineComponent({
  name: "DashboardHeader",
  emits: ["showLeftside"],
  render() {
    return (
      <div
        class={classNames(
          "transition-all fixed top-0 max-lg:h-16 lg:h-20 flex items-center justify-between w-full pl-[2%] pr-[2%] z-[997]",
          "bg-gray-200 dark:bg-dark-100"
        )}
      >
        <div class="z-10">
          <button
            id="DashboardLeftsideButton"
            onClick={() => this.$emit("showLeftside")}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="transition-all stroke-black dark:stroke-gray-100"
            >
              <path
                d="M7.283 19H20m0-7H4m16-7h-7.028"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
        </div>
        <div class="absolute left-0 right-0 flex w-dvw justify-center z-0 lg:hidden">
          <h1 class="text-3xl font-poppins-bold text-black dark:text-gray-100 relative">
            <div class="absolute ml-3 bg-gray-100 w-6 h-6 blur-2xl"></div>
            {import.meta.env.VITE_PROJECT_TITLE}
          </h1>
        </div>
        <div class="z-10">
          <ProfileDropdown />
        </div>
      </div>
    );
  },
});

export { AppHeader, DashboardHeader };
