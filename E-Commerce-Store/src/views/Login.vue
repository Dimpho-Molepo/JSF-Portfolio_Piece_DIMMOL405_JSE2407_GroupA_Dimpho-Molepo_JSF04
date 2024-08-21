<template>
  <div
    class="flex justify-center items-center bg-gradient-to-r from-[#f8f9fa] to-[#7d7d7d] w-full min-h-screen p-4 dark:from-gray-900 dark:to-gray-800"
  >
    <form
      @submit.prevent="handleLogin"
      class="flex flex-col gap-6 bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 w-full max-w-lg dark:bg-gray-800"
    >
      <h1 class="text-2xl font-semibold text-gray-800 mb-4 text-center dark:text-white">Login to Your Account</h1>

      <div>
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          :class="{ 'border-red-500': errors.username }"
          type="text"
          v-model="username"
          placeholder="Username"
          required
          @blur="validateUsername"
        />
        <p v-if="errors.username" class="text-red-500 text-sm mt-2">{{ errors.username }}</p>
      </div>

      <div class="relative">
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 pr-12 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          :class="{ 'border-red-500': errors.password }"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          required
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password }}</p>

        <div class="flex items-center mt-2">
          <input
            type="checkbox"
            id="showPassword"
            v-model="showPassword"
            class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-opacity-25"
          />
          <label for="showPassword" class="text-gray-700 text-sm cursor-pointer dark:text-gray-300">Show Password</label>
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
        :disabled="!isFormValid || loginStore.loading"
      >
        {{ loginStore.loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="loginStore.error" class="text-red-500 text-sm mt-4 text-center">
        {{ loginStore.error }}
      </p>
    </form>
    
  </div>
  <Toast v-if="showToast" :type="toastType" @closed="closeToast">
    {{ toastMessage }}
  </Toast>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthenticationStore } from '../stores/loginAuthenticate.js'
import { useRouter } from 'vue-router'
import Toast from '@/components/Toast.vue';

/**
 * The authentication store
 * @type {Object}
 */
const loginStore = useAuthenticationStore()

/**
 * The Vue Router instance
 * @type {Object}
 */
const router = useRouter()

/**
 * Whether to show the toast notification
 * @type {Boolean}
 */
const showToast = ref(false)

/**
 * The type of toast notification (success or error)
 * @type {String}
 */
const toastType = ref('success')

/**
 * The message to display in the toast notification
 * @type {String}
 */
const toastMessage = ref('')

/**
 * The username input field
 * @type {String}
 */
const username = ref('')

/**
 * The password input field
 * @type {String}
 */
const password = ref('')

/**
 * Whether to show the password input field
 * @type {Boolean}
 */
const showPassword = ref(false)

/**
 * The error messages for the form fields
 * @type {Object}
 */
const errors = ref({ username: '', password: '' })

/**
 * Show a toast notification with a message
 * @param {String} type The type of notification (success or error)
 * @param {String} message The message to display
 * @returns {void}
 */
const showToastNotification = (type, message) => {
  toastType.value = type
  toastMessage.value = message
  showToast.value = true
}

/**
 * Close the toast notification
 * @returns {void}
 */
const closeToast = () => {
  showToast.value = false
}

/**
 * Validate the username input field
 * @returns {void}
 */
const validateUsername = () => {
  errors.value.username = username.value.trim() === '' ? 'Username is required' : ''
}

/**
 * Validate the password input field
 * @returns {void}
 */
const validatePassword = () => {
  errors.value.password = password.value.trim() === '' ? 'Password is required' : ''
}

/**
 * Whether the form is valid
 * @returns {Boolean} Whether the form is valid
 */
const isFormValid = computed(() => {
  return (
    username.value.trim() !== '' &&
    password.value.trim() !== '' &&
    !errors.value.username &&
    !errors.value.password
  )
})

/**
 * Handle the login form submission
 * @returns {void}
 */
const handleLogin = async () => {
  validateUsername()
  validatePassword()

  if (isFormValid.value) {
    const success = await loginStore.login(username.value, password.value)
    if (success) {
      showToastNotification('success', 'Login successful.')
      setTimeout(() => {
        const redirectPath = loginStore.returnTo || '/'
        router.push(redirectPath)
      }, 1500)
    } else {
      showToastNotification('error', 'Login failed. Please check your login details.')
    }
  }
}
</script>