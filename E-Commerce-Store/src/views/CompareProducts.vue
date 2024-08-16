<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-6">Product Comparison</h1>
    <div v-if="comparisonStore.products.length === 0" class="text-center py-8 text-gray-600">
      No products to compare. Add some products to compare!
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-4 text-left">Product</th>
            <th v-for="product in comparisonStore.products" :key="product.id" class="border p-4 text-center">
              <img :src="product.image" :alt="product.title" class="w-24 h-24 object-contain mx-auto" />
              <button @click="removeProduct(product.id)" class="mt-2 text-red-500 hover:underline">
                Remove
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-50">
            <td class="border p-4 font-bold">Title</td>
            <td v-for="product in comparisonStore.products" :key="product.id" class="border p-4 text-center">
              {{ product.title }}
            </td>
          </tr>
          <tr>
            <td class="border p-4 font-bold">Description</td>
            <td v-for="product in comparisonStore.products" :key="product.id" class="border p-4 text-center">
              {{ product.description }}
            </td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border p-4 font-bold">Price</td>
            <td v-for="product in comparisonStore.products" :key="product.id" class="border p-4 text-center">
              R{{ product.price }}
            </td>
          </tr>
          <tr>
            <td class="border p-4 font-bold">Rating</td>
            <td v-for="product in comparisonStore.products" :key="product.id" class="border p-4 text-center">
              {{ product.rating.rate }} ({{ product.rating.count }} reviews)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      @click="clearList"
      class="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
    >
      Clear Comparison List
    </button>
  </div>
</template>

<script setup>
import { useComparisonStore } from '@/stores/comparisonStore'

const comparisonStore = useComparisonStore()

const removeProduct = (productId) => {
  comparisonStore.removeProduct(productId)
}

const clearList = () => {
  comparisonStore.clearList()
}
</script>

