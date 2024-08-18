<template>
  <main>
    <FilterSort
      :categories="productStore.categories"
      v-model:selectedSort="productStore.selectedSort"
      v-model:selectedCategory="productStore.selectedCategory"
      @reset="resetFilters"
    />
    <ProductList />
  </main>
</template>

<script setup>
/**
 * @module Home
 * @description Home page component displaying product list and filter/sort options
 */
import FilterSort from '@/components/FilterSort.vue'
import ProductList from '@/components/product/ProductList.vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const resetFilters = () => {
  productStore.selectedCategory = ''
  productStore.selectedSort = ''
}
</script>
