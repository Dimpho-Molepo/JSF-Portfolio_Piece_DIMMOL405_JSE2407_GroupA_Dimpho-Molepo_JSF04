/**
 * @module productStore
 * @description Pinia store for managing product data and state
 */

import { defineStore } from 'pinia'

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
export const useProductStore = defineStore('product', {
  /**
   * @returns {ProductState}
   */
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: '',
    selectedSort: '',
    currentProduct: null
  }),

  actions: {
    /**
     * Fetches all products from the API
     * @async
     */
    async fetchProducts() {
      this.loading = true
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        this.products = await response.json()
        this.loading = false
        this.error = null
      } catch (error) {
        this.loading = false
        this.error = error.message
      }
    },

    /**
     * Fetches all product categories from the API
     * @async
     */
    async fetchCategories() {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        this.categories = await response.json()
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        this.error = error.message
      }
    },

    /**
     * Fetches a single product by ID from the API
     * @async
     * @param {number} id - The ID of the product to fetch
     */
    async fetchProductById(id) {
      this.loading = true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        this.currentProduct = await response.json()
        this.loading = false
        this.error = null
      } catch (error) {
        this.loading = false
        this.error = error.message
      }
    },

    /**
     * Sets the selected category for filtering
     * @param {string} category - The category to set
     */
    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    /**
     * Sets the selected sorting method
     * @param {string} sort - The sorting method to set
     */
    setSelectedSort(sort) {
      this.selectedSort = sort
    }
  },

  getters: {
    /**
     * Returns filtered and sorted products based on selected category and sort method
     * @returns {Product[]}
     */
    filteredSortedProducts: (state) => {
      let filteredProducts = state.selectedCategory
        ? state.products.filter((p) => p.category === state.selectedCategory)
        : state.products

      if (state.selectedSort === 'lowToHigh') {
        return [...filteredProducts].sort((a, b) => a.price - b.price)
      } else if (state.selectedSort === 'highToLow') {
        return [...filteredProducts].sort((a, b) => b.price - a.price)
      } else {
        return [...filteredProducts].sort((a, b) => a.id - b.id)
      }
    }
  }
})
