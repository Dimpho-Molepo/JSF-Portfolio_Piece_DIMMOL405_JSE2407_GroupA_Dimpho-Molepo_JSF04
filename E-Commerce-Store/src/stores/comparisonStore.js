import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Define the comparison store
 * @returns {Object} The comparison store
 */
export const useComparisonStore = defineStore('comparison', () => {
  /**
   * The list of products in the comparison
   * @type {Array<Object>}
   */
  const products = ref([])

  /**
   * The maximum number of products allowed in the comparison
   * @type {Number}
   */
  const MAX_PRODUCTS = 4

  /**
   * Add a product to the comparison
   * @param {Object} product The product to add
   */
  const addProduct = (product) => {
    if (products.value.length < MAX_PRODUCTS && !products.value.find(p => p.id === product.id)) {
      products.value.push(product)
    }
  }

  /**
   * Remove a product from the comparison
   * @param {Number} productId The ID of the product to remove
   */
  const removeProduct = (productId) => {
    products.value = products.value.filter(product => product.id !== productId)
  }

  /**
   * Clear the comparison list
   */
  const clearList = () => {
    products.value = []
  }

  /**
   * Whether the comparison list is not full
   * @returns {Boolean} Whether the comparison list is not full
   */
  const canAddMore = computed(() => products.value.length < MAX_PRODUCTS)

  return {
    /**
     * The list of products in the comparison
     * @type {Array<Object>}
     */
    products,
    /**
     * Add a product to the comparison
     * @param {Object} product The product to add
     */
    addProduct,
    /**
     * Remove a product from the comparison
     * @param {Number} productId The ID of the product to remove
     */
    removeProduct,
    /**
     * Clear the comparison list
     */
    clearList,
    /**
     * Whether the comparison list is not full
     * @returns {Boolean} Whether the comparison list is not full
     */
    canAddMore
  }
})