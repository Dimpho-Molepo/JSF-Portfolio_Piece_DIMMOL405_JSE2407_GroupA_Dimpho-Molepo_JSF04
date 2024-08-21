<template>
  <div class="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 h-[100vh]">
    <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
      Order Confirmation
    </h2>
    <div class="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800 text-center">
      <p class="text-xl font-medium text-gray-800 dark:text-white">
        Thank you for your order! Your payment was successful.
      </p>
      <p class="text-gray-600 dark:text-gray-300 mt-4">
        Order Number: #{{ orderNumber }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mt-2">
        Total: {{ total | currency }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mt-4">
        You will receive a confirmation email shortly.
      </p>
      <button
        @click="goToOrders"
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        View My Orders
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const orderNumber = 123456
const total = cartStore.totalCost

const goToOrders = () => {
  router.push('/orders')
}
</script>