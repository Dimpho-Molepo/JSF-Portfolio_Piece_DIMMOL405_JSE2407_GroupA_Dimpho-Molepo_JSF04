<template>
  <main class=" bg-gray-200">
    <FilterSort />
    <ProductList />
  </main>
</template>

<script>
import FilterSort from '@/components/FilterSort.vue'
import ProductList from '@/components/product/ProductList.vue'

export default {
  name: 'Home',
  components: {
    FilterSort,
    ProductList,
  }
}
</script>
