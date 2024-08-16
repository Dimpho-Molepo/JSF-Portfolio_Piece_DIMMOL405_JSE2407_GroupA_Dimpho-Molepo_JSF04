import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useComparisonStore = defineStore('comparison', () => {
  const products = ref([])
  const MAX_PRODUCTS = 4

  const addProduct = (product) => {
    if (products.value.length < MAX_PRODUCTS && !products.value.find(product => product.id === product.id)) {
      products.value.push(product)
    }
  }

  const removeProduct = (productId) => {
    products.value = products.value.filter(product => product.id !== productId)
  }

  const clearList = () => {
    products.value = []
  }

  const canAddMore = computed(() => products.value.length < MAX_PRODUCTS)

  return {
    products,
    addProduct,
    removeProduct,
    clearList,
    canAddMore
  }
})