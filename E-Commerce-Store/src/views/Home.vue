<template>
  <main>
    <Couresel />
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
import Couresel from '@/components/Couresel.vue'

/**
 * Instance of the product store
 * @type {ReturnType<typeof useProductStore>}
 */
const productStore = useProductStore()

/**
 * Resets the filters by clearing the selected category and sort options
 * @function
 */
const resetFilters = () => {
  /**
   * Clears the selected category
   */
  productStore.selectedCategory = ''

  /**
   * Clears the selected sort option
   */
  productStore.selectedSort = ''
}
</script>
