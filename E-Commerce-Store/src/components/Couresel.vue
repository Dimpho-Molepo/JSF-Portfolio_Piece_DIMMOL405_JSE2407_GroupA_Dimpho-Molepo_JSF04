<template>
  <div v-if="wishlistStore.filteredSortedProducts.length > 0" class="container mx-auto p-6">
    <h2 class="text-3xl font-bold text-center mb-8">Wishlist Carousel</h2>
    <div class="overflow-hidden w-full relative" ref="carousel">
      <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div class="min-w-[calc(100%/4)] box-border p-2.5" v-for="product in wishlistStore.filteredSortedProducts" :key="product.id">
          <ProductCard v-bind="product" />
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-2.5">
      <button @click="prevSlide" :disabled="currentSlide === 0" class="bg-[#03045e] text-white py-2.5 px-5 rounded-md cursor-pointer" :class="{ 'bg-gray-300 cursor-not-allowed': isDisabled }">Prev</button>
      <button @click="nextSlide" :disabled="currentSlide === maxSlides - 1" class="bg-[#03045e] text-white py-2.5 px-5 rounded-md cursor-pointer" :class="{ 'bg-gray-300 cursor-not-allowed': isDisabled }">Next</button>
    </div>
  </div>
</template>

<script setup>
/**
 * Import necessary dependencies from Vue and the wishlist store
 */
 import { ref, computed, onMounted } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'
import ProductCard from '@/components/product/ProductCard.vue'

/**
 * Initialize the wishlist store
 */
const wishlistStore = useWishlistStore()

/**
 * Initialize the current slide index
 */
const currentSlide = ref(0)

/**
 * Define the number of items to display per slide
 */
const itemsPerSlide = 4

/**
 * Compute the maximum number of slides based on the number of products in the wishlist
 * @returns {number} The maximum number of slides
 */
const maxSlides = computed(() => {
  return Math.ceil(wishlistStore.filteredSortedProducts.length / itemsPerSlide)
})

/**
 * Navigate to the next slide
 */
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++
  }
}

/**
 * Navigate to the previous slide
 */
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

/**
 * Load the wishlist from local storage when the component is mounted
 */
onMounted(() => {
  wishlistStore.loadFromLocalStorage()
})
</script>