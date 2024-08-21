<template>
  <div class="container mx-auto p-6 ">
    <h2 class="text-3xl font-bold text-center mb-8">Wishlist</h2>
    <FilterSort
      :categories="wishlistStore.categories"
      v-model:selectedSort="wishlistStore.selectedSort"
      v-model:selectedCategory="wishlistStore.selectedCategory"
      @reset="resetFilters"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductCard
        v-for="product in wishlistStore.filteredSortedProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>
    <button @click="clearWishlist" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
      Clear Wishlist
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'
import ProductCard from '@/components/product/ProductCard.vue'
import FilterSort from '@/components/FilterSort.vue'

/**
 * Wishlist store instance
 * @type {import('../stores/wishlistStore').default}
 */
const wishlistStore = useWishlistStore()

/**
 * Clears the wishlist
 */
const clearWishlist = () => {
  wishlistStore.clearWishlist()
}

/**
 * Resets the filters to their default state
 */
const resetFilters = () => {
  wishlistStore.selectedCategory = ''
  wishlistStore.selectedSort = ''
}

/**
 * Loads the wishlist from local storage on mount
 */
onMounted(() => {
  wishlistStore.loadFromLocalStorage()
})
</script>
