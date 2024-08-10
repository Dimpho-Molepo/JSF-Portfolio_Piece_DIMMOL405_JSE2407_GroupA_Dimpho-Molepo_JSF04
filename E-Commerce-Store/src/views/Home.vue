<template>
  <main>
    <FilterSort />
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
</script>
