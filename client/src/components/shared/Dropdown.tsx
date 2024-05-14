/**Vue */
import { defineComponent, onMounted, onUnmounted } from "vue";

/**Utils */
import imports from "../../utils/imports";

/**Components */
import { ArrowIcon } from "../ui/icon";
import { BaseButton } from "../ui/base";
import { Dropdown, DropdownButton, DropdownTitle } from "../ui/dropdown";

export const ProfileDropdown = defineComponent({
  setup() {
    const { reactive, store, computed } = imports();

    const showDropdown = reactive({
      profile: false,
      language: false,
    });

    const user = computed(() => store.getters._getUser);

    const handleClickOutside = (event: { target: any }) => {
      const profileDropdownElement = document.getElementById("ProfileDropdown");
      if (
        profileDropdownElement &&
        !profileDropdownElement.contains(event.target)
      ) {
        const { profile, language } = showDropdown;
        if (profile) {
          showDropdown.profile = false;
          if (language) {
            showDropdown.language = false;
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

    return { showDropdown, user, store };
  },

  render() {
    const { VITE_DISCORD_SUPPORT_SERVER } = import.meta.env;
    const { showDropdown, $t, user, store } = this;

    if (!store._isLogin) {
      return (
        <BaseButton to="/auth/login">
          {$t("Dropdown.ProfileDropdown.Button.login")}
        </BaseButton>
      );
    }

    return (
      <div id="ProfileDropdown" class="relative">
        <button
          class="flex items-center lg:gap-x-1 text-black dark:text-gray-100 font-poppins-regular text-base"
          onClick={() => {
            showDropdown.profile = !showDropdown.profile;
            showDropdown.language = false;
          }}
        >
          <img v-lazy={user.avatar} class="w-8 h-8 rounded-full" alt="Avatar" />
          <span class="transition-all max-lg:hidden ml-1">{user.username}</span>
          <ArrowIcon isActive={showDropdown.profile || showDropdown.language} />
        </button>

        <Dropdown
          className="right-0 z-20 w-[228px] py-1.5"
          isOpen={showDropdown.profile && !showDropdown.language}
        >
          <DropdownTitle>{import.meta.env.VITE_PROJECT_TITLE}</DropdownTitle>
          <DropdownButton to="/settings/profile">
            {$t("Dropdown.ProfileDropdown.Button.profile")}
          </DropdownButton>
          <DropdownTitle>
            {$t("Dropdown.ProfileDropdown.Title.payment")}
          </DropdownTitle>
          <DropdownButton to="/billing">
            {$t("Dropdown.ProfileDropdown.Button.billing")}
          </DropdownButton>
          <DropdownTitle>
            {$t("Dropdown.ProfileDropdown.Title.settings")}
          </DropdownTitle>
          <DropdownButton onClick={this.$theme.changeTheme}>
            {$t("Dropdown.ProfileDropdown.Button.theme")}
          </DropdownButton>
          <DropdownButton
            onClick={() => (showDropdown.language = !showDropdown.language)}
          >
            {$t("Dropdown.ProfileDropdown.Button.language")}
          </DropdownButton>
          <DropdownButton redirect={VITE_DISCORD_SUPPORT_SERVER}>
            {$t("Dropdown.ProfileDropdown.Button.support")}
          </DropdownButton>
          <DropdownButton to="/auth/logout">
            {$t("Dropdown.ProfileDropdown.Button.logout")}
          </DropdownButton>
        </Dropdown>

        <Dropdown isOpen={showDropdown.language}>
          {this.$i18n.languages.map((language) => (
            <DropdownButton
              onClick={() => {
                this.$i18n.changeLanguage(language.id);
                showDropdown.language = false;
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
