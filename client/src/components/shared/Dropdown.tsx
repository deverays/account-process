import { defineComponent, onMounted, onUnmounted } from "vue";
import imports from "../../utils/imports";
import { ArrowIcon } from "../ui/Icon";
import { BaseButton } from "../ui/Base";
import { Dropdown, DropdownButton, DropdownTitle } from "../ui/Dropdown";
import { availableLanguages } from "../../plugins/i18next";
import defaultAvatar from "../../assets/images/default_avatar.png";

const ProfileDropdown = defineComponent({
  name: "ProfileDropdown",
  setup() {
    const { reactive, store, computed } = imports();

    const showDropdown = reactive({
      profileDropdown: false,
      languageDropdown: false,
    });

    const user = computed(() => store.getters._getUser);

    const handleClickOutside = (event: any) => {
      const target = event.target;
      const profileDropdownElement = document.getElementById("ProfileDropdown");
      if (!profileDropdownElement?.contains(target)) {
        const { profileDropdown, languageDropdown } = showDropdown;
        if (profileDropdown) {
          showDropdown.profileDropdown = false;
          if (languageDropdown) {
            showDropdown.languageDropdown = false;
          }
        }
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      showDropdown,
      user,
      store,
    };
  },

  render() {
    const { VITE_DISCORD_SUPPORT_SERVER } = import.meta.env;
    const { showDropdown, $t, $i18next, user, store } = this;

    if (!store._isLogin) {
      return (
        <BaseButton to="/users/login">
          {$t("Dropdown.ProfileDropdown.Button.login")}
        </BaseButton>
      );
    }

    return (
      <div id="ProfileDropdown" class="relative">
        <button
          class="flex items-center lg:gap-x-1 text-black dark:text-gray-100 font-poppins-regular text-base"
          onClick={() => {
            showDropdown.profileDropdown = !showDropdown.profileDropdown;
            showDropdown.languageDropdown = false;
          }}
        >
          <img
            v-lazy={defaultAvatar}
            class="w-8 h-8 rounded-full"
            alt="Avatar"
          />
          <span class="transition-all max-lg:hidden ml-1">{user.username}</span>
          <ArrowIcon
            isActive={
              showDropdown.profileDropdown || showDropdown.languageDropdown
            }
          />
        </button>

        <Dropdown
          className="right-0 z-20 w-[228px] py-1.5"
          isOpen={
            showDropdown.profileDropdown && !showDropdown.languageDropdown
          }
        >
          <DropdownTitle>{import.meta.env.VITE_PROJECT_TITLE}</DropdownTitle>
          <DropdownButton>test</DropdownButton>
          <DropdownTitle>
            {$t("Dropdown.ProfileDropdown.Title.payment")}
          </DropdownTitle>
          <DropdownButton to="/billing">
            {$t("Dropdown.ProfileDropdown.Button.billing")}
          </DropdownButton>
          <DropdownTitle>
            {$t("Dropdown.ProfileDropdown.Title.settings")}
          </DropdownTitle>
          <DropdownButton
            onClick={() => {
              const currentTheme =
                localStorage.getItem("theme")?.toLowerCase() ?? "dark";
              const classList = document.documentElement.classList;
              const nextTheme = currentTheme === "dark" ? "light" : "dark";
              localStorage.setItem("theme", nextTheme);
              classList.remove(currentTheme);
              classList.add(nextTheme);
            }}
          >
            {$t("Dropdown.ProfileDropdown.Button.theme")}
          </DropdownButton>
          <DropdownButton
            onClick={() =>
              (showDropdown.languageDropdown = !showDropdown.languageDropdown)
            }
          >
            {$t("Dropdown.ProfileDropdown.Button.language")}
          </DropdownButton>
          <DropdownButton redirect={VITE_DISCORD_SUPPORT_SERVER}>
            {$t("Dropdown.ProfileDropdown.Button.support")}
          </DropdownButton>
          <DropdownButton to={`/users/logout`}>
            {$t("Dropdown.ProfileDropdown.Button.logout")}
          </DropdownButton>
        </Dropdown>

        <Dropdown isOpen={showDropdown.languageDropdown}>
          {availableLanguages.map((language) => (
            <DropdownButton
              onClick={() => {
                $i18next.changeLanguage(language.lng);
                localStorage.setItem("lng", language.lng);
                showDropdown.languageDropdown = false;
              }}
            >
              {language.name}
            </DropdownButton>
          ))}
        </Dropdown>
      </div>
    );
  },
});

export { ProfileDropdown };
