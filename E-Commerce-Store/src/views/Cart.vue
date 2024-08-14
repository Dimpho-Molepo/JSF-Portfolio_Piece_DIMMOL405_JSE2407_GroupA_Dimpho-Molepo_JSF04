<template>
  <div class="container mx-auto p-6 bg-gray-100">
    <h2 class="text-3xl font-bold text-center mb-8">Shopping Cart</h2>
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="col-span-2">
          <div class="flex flex-col space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center justify-between border-b pb-4 gap-2">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-contain rounded" />
              <span class="flex-1 ml-4 text-lg font-medium">{{ item.title }}</span>
              <input
                type="number"
                v-model="item.quantity"
                @change="updateQuantity(item.id, item.quantity)"
                class="w-20 border rounded p-1 text-center"
                min="1"
              />
              <span class="text-lg font-semibold">R{{ (item.price * item.quantity).toFixed(2) }}</span>
              <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 font-semibold">Remove</button>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="bg-gray-50 p-4 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
            <div class="flex justify-between mb-2">
              <span class="font-medium">Total:</span>
              <span class="font-bold text-lg">R{{ cartStore.totalCost.toFixed(2) }}</span>
            </div>
            <button @click="clearCart" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const updateQuantity = (id, quantity) => {
  cartStore.updateQuantity(id, quantity)
}

const removeItem = (id) => {
  cartStore.removeItem(id)
}

const clearCart = () => {
  cartStore.clearCart()
}
</script>
