import { defineComponent } from "vue";
import { ArrowIcon } from "../ui/Icon";
import { BaseButton } from "../ui/Base";
import imports from "../../utils/imports";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { Dropdown, DropdownButton, DropdownTitle } from "../ui/Dropdown";

const ProfileDropdown = defineComponent({
  name: "ProfileDropdown",
  setup() {
    const { onUnmounted, onMounted, ref, store, router } = imports();

    const showProfileDropdown = ref(false);
    const showLanguageDropdown = ref(false);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const profileDropdown = document.getElementById("ProfileDropdown");
      if (!profileDropdown?.contains(target)) {
        if (showProfileDropdown.value) {
          if (showLanguageDropdown.value) {
            return (showLanguageDropdown.value = false);
          }
          showProfileDropdown.value = false;
        }
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const toggleProfileDropdown = () => {
      showProfileDropdown.value = !showProfileDropdown.value;
    };

    const toggleLanguageDropdown = () => {
      showLanguageDropdown.value = !showLanguageDropdown.value;
    };

    const logout = () => {
      showProfileDropdown.value = false;
      router.push("/logout");
    };

    return {
      showProfileDropdown,
      showLanguageDropdown,
      toggleProfileDropdown,
      toggleLanguageDropdown,
      logout,
      store,
    };
  },
  render() {
    const {
      store,
      $t,
      toggleProfileDropdown,
      toggleLanguageDropdown,
      logout,
      showLanguageDropdown,
      showProfileDropdown,
      $i18next,
    } = this;

    const user = store.getters._getUser;
    const isLogin = store._isLogin;
    const username = user?.username || "User";

    const languages = [
      { name: "English", lng: "en" },
      { name: "Türkçe", lng: "tr" },
    ];

    if (!isLogin) {
      return (
        <BaseButton
          to="/login"
          label={$t("Dropdown.ProfileDropdown.Button.login")}
        />
      );
    }

    return (
      <div id="ProfileDropdown" class="relative">
        <button
          class="flex items-center md:gap-x-1 text-grey-100 font-rubik-regular text-lg pointer-events-auto"
          onClick={toggleProfileDropdown}
        >
          <img
            v-lazy={defaultAvatar}
            class="w-8 h-8 rounded-full text-grey-100"
            alt="Avatar"
          />
          <span class="max-md:hidden">{username}</span>
          <ArrowIcon active={showProfileDropdown || showLanguageDropdown} />
        </button>

        <Dropdown open={showProfileDropdown && !showLanguageDropdown}>
          <DropdownTitle title={import.meta.env.VITE_PROJECT_TITLE} />
          <DropdownButton label="test" />
          <DropdownTitle
            title={$t("Dropdown.ProfileDropdown.Title.settings")}
          />
          <DropdownButton
            click={toggleLanguageDropdown}
            label={$t("Dropdown.ProfileDropdown.Button.language")}
          />
          <DropdownButton
            click={logout}
            label={$t("Dropdown.ProfileDropdown.Button.logout")}
          />
        </Dropdown>

        <Dropdown open={showProfileDropdown && showLanguageDropdown}>
          {languages.map((language) => (
            <DropdownButton
              key={language.lng}
              click={() => {
                $i18next.changeLanguage(language.lng);
                localStorage.setItem("lng", language.lng);
                this.showLanguageDropdown = false;
              }}
              label={language.name}
            />
          ))}
        </Dropdown>
      </div>
    );
  },
});

export { ProfileDropdown };
