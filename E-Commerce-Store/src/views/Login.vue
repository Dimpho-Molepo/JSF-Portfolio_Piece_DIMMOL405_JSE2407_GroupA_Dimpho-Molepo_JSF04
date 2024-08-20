<template>
  <div
    class="flex justify-center items-center bg-gradient-to-r from-[#f8f9fa] to-[#c0c0c0] w-full min-h-screen p-4 dark:from-gray-600 dark:to-gray-700"
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
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthenticationStore } from '../stores/loginAuthenticate.js'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const loginStore = useAuthenticationStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const errors = ref({ username: '', password: '' })

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateUsername = () => {
  errors.value.username = username.value.trim() === '' ? 'Username is required' : ''
}

const validatePassword = () => {
  errors.value.password = password.value.trim() === '' ? 'Password is required' : ''
}

const isFormValid = computed(() => {
  return (
    username.value.trim() !== '' &&
    password.value.trim() !== '' &&
    !errors.value.username &&
    !errors.value.password
  )
})

const handleLogin = async () => {
  validateUsername()
  validatePassword()

  if (isFormValid.value) {
    const success = await loginStore.login(username.value, password.value)
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Welcome back!',
        life: 3000
      })
      const redirectPath = loginStore.returnTo || '/'
      router.push(redirectPath)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: loginStore.error || 'Invalid credentials',
        life: 3000
      })
    }
  }
}
</script>
