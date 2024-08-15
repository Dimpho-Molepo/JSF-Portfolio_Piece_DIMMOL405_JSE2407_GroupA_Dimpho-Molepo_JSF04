<template>
  <div
    class="flex justify-center items-center bg-gradient-to-r from-slate-400 to-slate-500 w-full min-h-screen p-4"
  >
    <form
      @submit.prevent="handleLogin"
      class="flex flex-col gap-6 bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 w-full max-w-lg"
    >
      <h1 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Login to Your Account</h1>

      <div>
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
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
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 pr-12 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
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
          <label for="showPassword" class="text-gray-700 text-sm cursor-pointer"
            >Show Password</label
          >
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
        :disabled="!isFormValid || productStore.loading"
      >
        {{ productStore.loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="productStore.error" class="text-red-500 text-sm mt-4 text-center">
        {{ productStore.error }}
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
import Password from 'primevue/password'

const productStore = useAuthenticationStore()
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
    const success = await productStore.login(username.value, password.value)
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Login Successful',
        detail: 'Welcome back!',
        life: 3000
      })
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: productStore.error || 'Invalid credentials',
        life: 3000
      })
    }
  }
}
</script>
