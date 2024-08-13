<template>
  <div class="flex justify-center items-center bg-slate-300 w-full min-h-screen p-4">
    <form
      @submit.prevent="handleLogin"
      class="flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    >
      <h1>Please enter your login details below:</h1>
      <div>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': errors.username }"
          type="text"
          v-model="username"
          placeholder="Username"
          required
          @blur="validateUsername"
        />
        <p v-if="errors.username" class="text-red-500 text-xs italic mt-1">{{ errors.username }}</p>
      </div>
      <div class="relative">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
          :class="{ 'border-red-500': errors.password }"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          required
          @blur="validatePassword"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-2 flex items-center text-sm text-center bg-transparent border-0 cursor-pointer"
          @click="togglePassword"
        >
          <svg
            v-if="!showPassword"
            class="h-6 w-6 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C8.36428 6 5.23207 9.21014 3.81198 10.9343C3.42382 11.4056 3.22974 11.6412 3.22974 12C3.22974 12.3588 3.42382 12.5944 3.81198 13.0657C5.23207 14.7899 8.36428 18 12 18C15.6357 18 18.768 14.7899 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z"
              fill="currentColor"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.2371 15.1157C19.0484 14.3833 19.7137 13.6416 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C11.1605 6 10.3479 6.17115 9.57695 6.45563L12.1238 9.00251C13.6822 9.06577 14.9342 10.3178 14.9975 11.8762L18.2371 15.1157ZM9.39308 10.5144C9.14295 10.9524 9.00001 11.4595 9.00001 12C9.00001 13.6569 10.3432 15 12 15C12.5405 15 13.0476 14.8571 13.4856 14.6069L15.7872 16.9085C14.636 17.5555 13.3529 18 12 18C8.36428 18 5.23207 14.7899 3.81198 13.0657C3.42382 12.5944 3.22974 12.3588 3.22974 12C3.22974 11.6412 3.42382 11.4056 3.81198 10.9343C4.48541 10.1167 5.54385 8.96489 6.85842 7.97974L9.39308 10.5144Z"
              fill="currentColor"
            />
            <path d="M5 2L21 18" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
        <p v-if="errors.password" class="text-red-500 text-xs italic mt-1">{{ errors.password }}</p>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        :disabled="!isFormValid || productStore.loading"
      >
        {{ productStore.loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="productStore.error" class="text-red-500 text-sm">{{ productStore.error }}</p>
    </form>
 
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthenticationStore } from '../stores/loginAuthenticate.js'
import { useRouter } from 'vue-router'

const productStore = useAuthenticationStore()
const router = useRouter()

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

      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } else {
      alert(productStore.error)
    }
  }
}
</script>
