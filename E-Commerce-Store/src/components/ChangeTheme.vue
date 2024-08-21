<template>
  <label class="flex items-center justify-center cursor-pointer">
    <input
      type="checkbox"
      @change="themeStore.toggleTheme"
      class="hidden"
      :checked="themeStore.isDarkMode"
    />
    <div class="relative">
      <div class="block bg-blue-500 w-12 h-5 rounded-full"></div>
      <div
        class="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition flex items-center justify-center"
        :class="{ 'translate-x-4': themeStore.isDarkMode }"
      >
        <svg
          v-if="!themeStore.isDarkMode"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-3 h-3 text-yellow-400"
        >
          <path
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 14.25a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-3 h-3 text-gray-700"
        >
          <path
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      </div>
    </div>
  </label>
</template>

<script setup>
/**
 * Sets up the theme store
 *
 * @script setup
 */
import { useThemeStore } from '@/stores/themeStore'

/**
 * Instance of the theme store
 *
 * @type {ReturnType<typeof useThemeStore>}
 */
const themeStore = useThemeStore()
</script>

<style scoped>
.dot {
  transition: transform 0.2s;
}
input:checked + div .dot {
  transform: translateX(1.6rem);
}
</style>
