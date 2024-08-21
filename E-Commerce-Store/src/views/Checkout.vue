<template>
  <div
    class="flex justify-center items-center bg-gradient-to-r from-[#f8f9fa] to-[#7d7d7d] w-full min-h-screen p-4 dark:from-gray-900 dark:to-gray-800"
  >
    <form
      @submit.prevent="submitOrder"
      class="flex flex-col gap-6 bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 w-full max-w-lg dark:bg-gray-800"
    >
      <h1 class="text-2xl font-semibold text-gray-800 mb-4 text-center dark:text-white">
        Checkout
      </h1>

      <div>
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          v-model="checkoutForm.name"
          placeholder="Name"
          required
        />
      </div>

      <div>
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="email"
          v-model="checkoutForm.email"
          placeholder="Email"
          required
        />
      </div>

      <div>
        <input
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
          type="text"
          v-model="checkoutForm.address"
          placeholder="Address"
          required
        />
      </div>

      <div>
        <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Payment Method
        </label>
        <select
          v-model="checkoutForm.paymentMethod"
          class="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="paypal">PayPal</option>
          <option value="credit-card">Credit Card</option>
        </select>
      </div>

      <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
        <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between mb-2">
          <span class="text-gray-700 dark:text-gray-300">{{ item.title }} x {{ item.quantity }}</span>
          <span class="text-gray-700 dark:text-gray-300">{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between font-semibold text-gray-800 dark:text-white">
          <span>Total:</span>
          <span>{{ cartStore.totalCost.toFixed(2) }}</span>
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Place Order
      </button>

      <p v-if="orderError" class="text-red-500 text-sm mt-4 text-center">
        {{ orderError }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useAuthenticationStore } from '@/stores/loginAuthenticate'
import { useRouter } from 'vue-router'


const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthenticationStore()

const checkoutForm = ref({
  name: '',
  email: '',
  address: '',
  paymentMethod: 'paypal'
})

// Populate the checkout form with the user's information
onMounted(() => {
  if (authStore.isAuthenticated) {
    authStore.fetchUserInfo().then(() => {
      checkoutForm.value.name = authStore.user?.name || ''
      checkoutForm.value.email = authStore.user?.email || ''
      checkoutForm.value.address = authStore.user?.address || ''
    })
  }
})

const submitOrder = () => {
  console.log('Order submitted:', checkoutForm.value)
  cartStore.clearCart()
  router.push('/order-confirmation')
}
</script>