import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * Theme store
 *
 * @module ThemeStore
 * @description Manages the application theme
 */
export const useThemeStore = defineStore('theme', () => {
  /**
   * @type {Ref<boolean>}
   * @description Whether the application is in dark mode
   */
  const isDarkMode = ref(false)

  /**
   * Loads the theme from local storage or the user's system preferences
   */
  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  /**
   * Saves the theme to local storage
   */
  const saveTheme = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }

  /**
   * Toggles the theme between light and dark mode
   */
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
  }

  /**
   * Applies the theme to the document
   */
  const applyTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Watches the isDarkMode ref and saves the theme to local storage when it changes
   */
  watch(isDarkMode, () => {
    saveTheme()
  })

  return {
    /**
     * @description Whether the application is in dark mode
     */
    isDarkMode,
    /**
     * @description Loads the theme from local storage or the user's system preferences
     */
    loadTheme,
    /**
     * @description Toggles the theme between light and dark mode
     */
    toggleTheme
  }
})