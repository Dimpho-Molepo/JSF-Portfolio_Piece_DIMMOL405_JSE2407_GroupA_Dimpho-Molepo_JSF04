/**
 * @module productStore
 * @description Pinia store for managing product data and state
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product
 * @property {string} title - The title of the product
 * @property {number} price - The price of the product
 * @property {string} description - The description of the product
 * @property {string} category - The category of the product
 * @property {string} image - The URL of the product image
 * @property {Object} rating - The rating information of the product
 * @property {number} rating.rate - The average rating of the product
 * @property {number} rating.count - The number of ratings for the product
 */

/**
 * @typedef {Object} ProductState
 * @property {Product[]} products - Array of all products
 * @property {string[]} categories - Array of all product categories
 * @property {boolean} loading - Loading state for async operations
 * @property {string|null} error - Error message, if any
 * @property {string} selectedCategory - Currently selected category for filtering
 * @property {string} selectedSort - Currently selected sorting method
 * @property {Product|null} currentProduct - Currently viewed product details
 */

/**
 * Pinia store for managing product state and actions
 * @type {import('pinia').StoreDefinition}
 */
export const useProductStore = defineStore('product', () => {
  /**
   * @returns {ProductState}
   */
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedCategory = ref('')
  const selectedSort = ref('')
  const currentProduct = ref(null)

  /**
   * Fetches all products from the API
   * @async
   */
  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      products.value = await response.json()
      loading.value = false
      error.value = null
    } catch (err) {
      loading.value = false
      error.value = err.message
    }
  }

  /**
   * Fetches all product categories from the API
   * @async
   */
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      categories.value = await response.json()
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      error.value = err.message
    }
  }

  /**
   * Fetches a single product by ID from the API
   * @async
   * @param {number} id - The ID of the product to fetch
   */
  const fetchProductById = async (id) => {
    loading.value = true
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      currentProduct.value = await response.json()
      loading.value = false
      error.value = null
    } catch (err) {
      loading.value = false
      error.value = err.message
    }
  }

  /**
   * Sets the selected category for filtering
   * @param {string} category - The category to set
   */

  const setSelectedCategory = (category) => {
    selectedCategory.value = category
  }

  /**
   * Sets the selected sorting method
   * @param {string} sort - The sorting method to set
   */
  const setSelectedSort = (sort) => {
    selectedSort.value = sort
  }

  /**
   * Returns filtered and sorted products based on selected category and sort method
   * @returns {Product[]}
   */
  const filteredSortedProducts = computed(() => {
    let filteredProducts = selectedCategory.value
      ? products.value.filter((p) => p.category === selectedCategory.value)
      : products.value

    if (selectedSort.value === 'lowToHigh') {
      return [...filteredProducts].sort((a, b) => a.price - b.price)
    } else if (selectedSort.value === 'highToLow') {
      return [...filteredProducts].sort((a, b) => b.price - a.price)
    } else {
      return [...filteredProducts].sort((a, b) => a.id - b.id)
    }
  })

  return {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    selectedSort,
    currentProduct,
    fetchProducts,
    fetchCategories,
    fetchProductById,
    setSelectedCategory,
    setSelectedSort,
    filteredSortedProducts
  }
})
