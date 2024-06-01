import { defineComponent, ref, reactive } from 'vue'
import { DropdownMenu, DropdownCircleButton, DropdownItem, DropdownMenuTitle } from '../ui/dropdown'
import { cn, renderSvg } from '@/lib/utilts'
import { languages, changeLanguage, languageIcon, languageName } from '@/plugins/language'
import { themes, changeTheme, themeIcon } from '@/plugins/theme'
import imports from '@/utils/imports'
import { svgIcons } from '@/lib/icons'
import { TooltipButton } from '../ui/tooltip'

export const UserDropdown = defineComponent({
  components: { DropdownMenu, DropdownItem, DropdownCircleButton, DropdownMenuTitle, TooltipButton },
  setup() {
    const isOpen = ref(false)
    const { store } = imports()

    const isDropdownOpen = reactive({ language: false, theme: false })

    const closeDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (target.closest('[id="user-dropdown"]') || target.closest('[id="user-dropdown-button"]')) return
      if (isDropdownOpen.language || isDropdownOpen.theme) resetDropdownStates()
      else isOpen.value = false
    }

    const resetDropdownStates = () => Object.assign(isDropdownOpen, { language: false, theme: false })

    return { store, isOpen, isDropdownOpen, closeDropdown, resetDropdownStates }
  },
  mounted() { document.addEventListener('click', this.closeDropdown) },
  beforeUnmount() { document.removeEventListener('click', this.closeDropdown) },
  methods: {
    onLogout(): void {
      this.store.handleUnauthorized()
      this.navigateTo('/')
    },
    toggleDropdown(): void {
      this.isOpen = !this.isOpen
      if (!this.isOpen) this.resetDropdownStates()
    },
    toggleDropdownType(type: 'language' | 'theme'): void {
      this.isDropdownOpen[type] = !this.isDropdownOpen[type]
      this.isOpen = true
    },
    navigateTo(path: string): void { this.$router.push({ path }) },
    openExternalLink(url: string): void { window.location.href = url },
    dropdownHeight(): number {
      const type: 'language' | 'theme' | null = this.isDropdownOpen.language ? 'language' : this.isDropdownOpen.theme ? 'theme' : null
      return type ? (type === 'language' ? languages.length : themes.length) * 40 + 115 : this.store._isLogin ? 340 : 300
    }
  },
  render() {
    const { isOpen, store, isDropdownOpen } = this

    const user = store.getters?._getUser || { avatar: null, username: null }

    // Dropdown Button
    const renderUserButton = () => (
      <TooltipButton tooltip={user.username ? user.username.slice(0, 1).toUpperCase() + user.username.slice(1).toLowerCase() : ''} onClick={this.toggleDropdown} className={cn('transition-all relative flex items-center justify-center h-10 w-10 rounded-full ring-4 group', 'ring-light-300 bg-light-400 dark:bg-dark-800 dark:ring-dark-600 text-black dark:text-gray-100', isOpen ? 'ring-2 text-opacity-80 dark:text-opacity-80' : `hover:ring-2 text-opacity-60 dark:text-opacity-60 hover:text-opacity-80 dark:hover:text-opacity-80`)}>
        {renderSvg({ ...svgIcons.user, className: 'relative w-3 h-3 lg:w-4 lg:h-4 z-30' })}
      </TooltipButton>
    )

    // Dropdown Content
    const renderDropdownContent = () => (
      <DropdownMenu style={{ height: `${this.dropdownHeight()}px` }} isOpen={isOpen} class="relative right-0 z-20 min-[400px]:w-[250px]">
        <div class="flex items-center justify-center w-[90%] m-auto">
          {/* Circle Items */}
          {store._isLogin ? (
            <>
              <DropdownCircleButton to="/self/settings" label={this.$t('dropdown.user-dropdown.circle.settings')}>{renderSvg({ ...svgIcons.settings, className: 'w-4 h-4 group-hover:animate-spin' })}</DropdownCircleButton>
              <DropdownCircleButton to="/self" label={this.$t('dropdown.user-dropdown.circle.self')}>{renderSvg({ ...svgIcons.user, className: 'w-4 h-4 group-hover:animate-pulse' })}</DropdownCircleButton>
            </>
          ) : (
            <>
              <DropdownCircleButton to="/users/signin" label={this.$t('dropdown.user-dropdown.circle.signin')}>{renderSvg({ ...svgIcons.signin, className: 'w-4 h-4 group-hover:animate-pulse' })}</DropdownCircleButton>
              <DropdownCircleButton to="/users/signup" label={this.$t('dropdown.user-dropdown.circle.signup')}>{renderSvg({ ...svgIcons.signup, className: 'w-4 h-4 group-hover:animate-pulse' })}</DropdownCircleButton>
            </>
          )}
          <DropdownCircleButton onClick={() => this.openExternalLink(import.meta.env.VITE_SUPPORT_DISCORD_SERVER_URL)} label="Discord">{renderSvg({ ...svgIcons.discord, className: 'w-4 h-4 group-hover:animate-pulse' })}</DropdownCircleButton>
        </div>

        <div class="relative m-auto w-[90%]">
          <div class="w-full h-[2px] my-2 rounded-full opacity-20 dark:opacity-10 bg-gray-400"></div>
          {/* Language Items */}
          <div class={cn('absolute transition-all w-full', isDropdownOpen.language && !isDropdownOpen.theme ? 'opacity-100 translate-y-0 z-[50]' : 'pointer-events-none opacity-0 translate-y-2')}>
            {languages.map((language) => (
              <DropdownItem id="user-dropdown-button" onClick={() => {
                changeLanguage(language)
                isDropdownOpen.language = false
              }}>{renderSvg({ iconPath: languageIcon.get(language)!, className: 'w-4 h-4' })}{languageName.get(language)}</DropdownItem>
            ))}
          </div>

          {/* Theme Items */}
          <div class={cn('absolute transition-all w-full', !isDropdownOpen.language && isDropdownOpen.theme ? 'opacity-100 translate-y-0 z-[50]' : 'pointer-events-none opacity-0 translate-y-2')}>
            {themes.map((theme) => (
              <DropdownItem id="user-dropdown-button" onClick={() => {
                changeTheme(theme as any)
                isDropdownOpen.theme = false
              }}>{renderSvg({ iconPath: themeIcon.get(theme)!, className: 'w-4 h-4' })}{this.$t(`dropdown.user-dropdown.theme.${theme}`)}</DropdownItem>
            ))}
          </div>

          {/* Dropdown Items */}
          <div class={cn('absolute transition-all w-full', !isDropdownOpen.language && !isDropdownOpen.theme ? 'opacity-100 translate-y-0 z-[50]' : 'pointer-events-none opacity-0 translate-y-2')}>
            <DropdownItem id="user-dropdown-button">{renderSvg({ ...svgIcons.premium, className: 'w-4 h-4' })}{this.$t('dropdown.user-dropdown.button.premium')}</DropdownItem>
            <DropdownItem id="user-dropdown-button">{renderSvg({ ...svgIcons.support, className: 'w-4 h-4' })}{this.$t('dropdown.user-dropdown.button.support')}</DropdownItem>
            <DropdownMenuTitle>{this.$t('dropdown.user-dropdown.title.settings')}</DropdownMenuTitle>
            <DropdownItem id="user-dropdown-button" onClick={() => this.toggleDropdownType('theme')}>{renderSvg({ ...svgIcons.theme, className: 'w-4 h-4' })}{this.$t('dropdown.user-dropdown.button.theme')}</DropdownItem>
            <DropdownItem id="user-dropdown-button" onClick={() => this.toggleDropdownType('language')}>{renderSvg({ ...svgIcons.language, className: 'w-4 h-4' })}{this.$t('dropdown.user-dropdown.button.language')}</DropdownItem>
            {/* Logged */}
            <div class={cn('absolute transition-all w-full', this.store._isLogin ? 'opacity-100 translate-y-0 z-[50]' : 'pointer-events-none opacity-0 translate-y-2')}>
              <DropdownItem id="user-dropdown-button" onClick={this.onLogout}>{renderSvg({ ...svgIcons.logout, className: 'w-4 h-4' })}{this.$t('dropdown.user-dropdown.button.logout')}</DropdownItem>
            </div>
          </div>
        </div>
      </DropdownMenu>
    )

    return (
      <div id="user-dropdown" class="relative">
        {renderUserButton()}
        {renderDropdownContent()}
      </div>
    )
  }
})
