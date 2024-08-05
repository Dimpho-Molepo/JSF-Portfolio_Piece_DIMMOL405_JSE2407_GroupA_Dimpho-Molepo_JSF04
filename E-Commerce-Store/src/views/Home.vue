<template>
  <main >
    <FilterSort />
    <ProductList />
  </main>
</template>

<script>
import FilterSort from '@/components/FilterSort.vue'
import ProductList from '@/components/product/ProductList.vue'

/**
 * @module Home
 * @description Home page component displaying product list and filter/sort options
*/
export default {
  name: 'Home',
  components: {
    FilterSort,
    ProductList,
  }
}
</script>
