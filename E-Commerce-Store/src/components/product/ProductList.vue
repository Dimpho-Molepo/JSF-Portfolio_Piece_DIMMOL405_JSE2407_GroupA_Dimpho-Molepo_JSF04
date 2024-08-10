<template>
  <div>
    <div v-if="productStore.loading" class="grid justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <CardSkeleton v-for="i in 20" :key="i" />
      </div>
    </div>
    <div v-else-if="productStore.error" class="grid justify-center">
      <p>Error: {{ productStore.error }}</p>
    </div>
    <div v-else class="grid lg:flex gap-y-4 gap-x-40 lg:items-start mt-3 mx-auto justify-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductCard
          v-for="product in productStore.filteredSortedProducts"
          :key="product.id"
          v-bind="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @module ProductList
 * @description Component for displaying a list of products
 */
import { useProductStore } from '@/stores/productStore'
import ProductCard from './ProductCard.vue'
import CardSkeleton from './CardSkeleton.vue'
import { onMounted } from 'vue'

const productStore = useProductStore()

/**
 * Fetches products and categories when component is mounted
 */
onMounted(() => {
  productStore.fetchProducts()
  productStore.fetchCategories()
})
</script>
