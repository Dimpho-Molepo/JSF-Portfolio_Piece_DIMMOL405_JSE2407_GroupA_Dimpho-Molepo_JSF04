<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="absolute top-20 left-4 sm:left-6 lg:left-8">
      <button
        @click="goBack"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
      >
        Back to Products
      </button>
    </div>

    <div class="mt-28 sm:mt-32">
      <div v-if="productStore.error" class="text-red-500 text-xl font-bold text-center">
        {{ productStore.error }}
      </div>
      <div v-else-if="productStore.loading">
        <ProductDetailSkeleton />
      </div>
      <div
        v-else-if="product"
        class="mt-6 sm:mt-8 lg:flex lg:items-start lg:max-w-6xl xl:max-w-7xl mx-auto"
      >
        <div class="w-full h-full items-center justify-center flex lg:w-2/5 mb-8 lg:mb-0">
          <img :src="product.image" :alt="product.title" class="w-[50%] h-auto object-contain" />
        </div>
        <div class="w-full lg:w-3/5 lg:pl-8 space-y-4">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">{{ product.title }}</h1>
          <div v-if="product.rating" class="flex items-center gap-2 text-sm sm:text-base">
            <Rating :rating="product.rating.rate" />
            <span>{{ product.rating.rate }}</span>
            <span>Reviews: {{ product.rating.count }}</span>
          </div>
          <span
            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >
            {{ product.category }}
          </span>
          <h3 class="text-xl sm:text-2xl font-bold">R{{ product.price }}</h3>
          <button
            class="bg-cyan-700 hover:bg-cyan-900 w-full sm:w-auto text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Add To Cart
          </button>
          <h2 class="text-lg font-bold mt-6">Description</h2>
          <p class="text-sm sm:text-base">{{ product.description }}</p>
        </div>
      </div>
      <div v-else class="text-red-500 text-xl font-bold text-center">Product not found</div>
    </div>
  </div>
</template>

<script setup>
/**
 * @module ProductDetail
 * @description Component for displaying detailed information about a single product
*/
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { computed, onMounted, ref } from 'vue'
import Rating from '@/components/Rating.vue'
import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const productId = computed(() => route.params.id)
const product = ref(null)

/**
 * Fetches product details when component is mounted
 */
onMounted(async () => {
  await productStore.fetchProductById(productId.value)
  product.value = productStore.currentProduct
})
/**
 * Navigates back to the product list
 */
function goBack() {
  router.push('/')
}
</script>
