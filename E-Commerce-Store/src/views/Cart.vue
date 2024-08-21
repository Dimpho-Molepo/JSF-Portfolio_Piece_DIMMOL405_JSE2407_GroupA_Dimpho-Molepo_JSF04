<template>
  <div class="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 h-[100vh]">
    <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Shopping Cart</h2>
    <div class="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="col-span-2">
          <div class="flex flex-col space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex flex-col sm:flex-row items-center sm:justify-between border-b pb-4 gap-4 sm:gap-2 dark:border-gray-700"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="w-20 h-20 sm:w-16 sm:h-16 object-contain rounded"
              />

              <span
                class="flex-1 text-center sm:text-left text-lg font-medium text-gray-800 dark:text-gray-200"
              >
                {{ item.title }}
              </span>

              <input
                type="number"
                v-model="item.quantity"
                @change="updateQuantity(item.id, item.quantity)"
                class="w-20 border rounded p-1 text-center text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                min="1"
              />

              <span class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                R{{ (item.price * item.quantity).toFixed(2) }}
              </span>

              <button
                @click="removeItem(item.id)"
                class="flex items-center text-red-500 hover:text-red-700 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div class="bg-gray-50 p-4 rounded-lg shadow dark:bg-gray-700">
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h3>
            <div class="flex justify-between mb-2">
              <span class="font-medium text-gray-800 dark:text-gray-200">Total:</span>
              <span class="font-bold text-lg text-gray-800 dark:text-gray-200"
                >R{{ cartStore.totalCost.toFixed(2) }}</span
              >
            </div>
            <button
              @click="clearCart"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="proceedToCheckout"
      class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Proceed to Checkout
    </button>
  </div>
  <Toast v-if="showToast" :type="toastType" @closed="closeToast">
    {{ toastMessage }}
  </Toast>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import Toast from '@/components/Toast.vue';

/**
 * The message of the toast notification
 * @type {String}
 */
const toastMessage = ref('')

/**
 * The cart store instance
 * @type {Object}
 */
const cartStore = useCartStore()

/**
 * The router instance
 * @type {Object}
 */
const router = useRouter()

/**
 * Update the quantity of an item in the cart
 * @param {Number} id The ID of the item
 * @param {Number} quantity The new quantity
 */
const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}

/**
 * Remove an item from the cart
 * @param {Number} id The ID of the item
 */
const removeItem = (id) => {
  cartStore.removeItem(id)
}

/**
 * Clear the entire cart
 */
const clearCart = () => {
  cartStore.clearCart()
}

/**
 * Show a toast notification with the specified type and message
 * @param {String} type The type of the toast notification
 * @param {String} message The message of the toast notification
 */
const showToastNotification = (type, message) => {
  toastType.value = type
  toastMessage.value = message
  showToast.value = true
}

/**
 * Close the toast notification
 */
const closeToast = () => {
  showToast.value = false
}

/**
 * Proceed to the checkout page if the cart is not empty
 */
const proceedToCheckout = () => {
  if (cartStore.totalItems > 0) {
    router.push('/checkout')
  } else {
    showToastNotification('error', 'Your cart is empty')
  }
}
</script>