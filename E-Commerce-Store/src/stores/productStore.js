import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: '',
    selectedSort: ''
  }),

  actions: {
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

    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    setSelectedSort(sort) {
      this.selectedSort = sort
    }
  },

  getters: {
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
