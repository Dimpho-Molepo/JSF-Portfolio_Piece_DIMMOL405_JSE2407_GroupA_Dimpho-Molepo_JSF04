import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useComparisonStore = defineStore('comparison', () => {
  const products = ref([])
  const MAX_PRODUCTS = 4

  const addItem = (product) => {
    if (products.value.length < MAX_PRODUCTS && !products.value.find(item => item.id === product.id)) {
      products.value.push(product)
    }
  }

  const removeItem = (productId) => {
    products.value = products.value.filter(item => item.id !== productId)
  }

  const clearList = () => {
    products.value = []
  }

  const canAddMore = computed(() => products.value.length < MAX_PRODUCTS)

  return {
    products,
    addItem,
    removeItem,
    clearList,
    canAddMore
  }
})