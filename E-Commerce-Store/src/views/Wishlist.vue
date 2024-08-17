<template>
  <div class="container mx-auto p-6 bg-gray-100">
    <h2 class="text-3xl font-bold text-center mb-8">Wishlist</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductCard
        v-for="product in wishlistStore.products"
        :key="product.id"
        v-bind="product"
      />
    </div>
    <button @click="clearWishlist"> clear</button>
  </div>
</template>

<script setup>
import { useWishlistStore } from '../stores/wishlistStore'
import ProductCard from '@/components/product/ProductCard.vue'

const wishlistStore = useWishlistStore()

const clearWishlist = () => {
  wishlistStore.clearWishlist()
}
</script>
