import { defineStore } from 'pinia'
import { store } from '@/store'
import { useWebStorage } from '@/utils/storage'

const darkStorage = useWebStorage('darkSetting')

export const useAppSettingStore = defineStore({
  id: 'AppSetting',
  state: (): AppSetting => ({
    isMobile: false,
    isDark: false,
  }),
  getters: {
    getIsMobile(state): boolean {
      return state.isMobile
    },

    getIsDark(state): boolean {
      const res = darkStorage.getLocal<boolean | string>()
      if (typeof res === 'boolean') {
        if (res) {
          state.isDark = true
        }
      }
      try {
        const $html = window.document.querySelector('html')
        if ($html) {
          state.isDark ? $html.classList.add('dark') : $html.classList.remove('dark')
          $html.dataset.theme = state.isDark ? 'dark' : 'light'
        }
      } finally {
      }
      return state.isDark
    }
  },
  actions: {
    setIsMobile(value: boolean): void {
      this.isMobile = value
    },
    setIsDark(value: boolean): void {
      darkStorage.setLocal(value)
      try {
        const $html = window.document.querySelector('html')
        if ($html) {
          value ? $html.classList.add('dark') : $html.classList.remove('dark')
          $html.dataset.theme = value ? 'dark' : 'light'
        }
      } finally {
      }
      this.isDark = value
    }
  }
})

// Need to be used outside the setup
export function useAppSettingStoreOut() {
  return useAppSettingStore(store)
}
