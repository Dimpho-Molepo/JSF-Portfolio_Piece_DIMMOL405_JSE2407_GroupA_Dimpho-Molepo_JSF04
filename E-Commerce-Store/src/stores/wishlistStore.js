import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

/**
 * Wishlist store
 *
 * @module WishlistStore
 * @description Manages the wishlist functionality
 */
export const useWishlistStore = defineStore('wishlist', () => {
  /**
   * @type {ref<products[]>}
   * @description The list of products in the wishlist
   */
  const products = ref([])

  /**
   * @type {import('@/stores/productStore').default}
   * @description The product store instance
   */
  const productStore = useProductStore()

  /**
   * @type {ref<string>}
   * @description The selected category for filtering
   */
  const selectedCategory = ref('')

  /**
   * @type {ref<string>}
   * @description The selected sorting method
   */
  const selectedSort = ref('')

  /**
   * Adds a product to the wishlist
   * @param {product} product - The product to add
   */
  const addToWishlist = (product) => {
    products.value.push({ ...product })
    saveToLocalStorage()
  }

  /**
   * Removes a product from the wishlist
   * @param {number} productId - The ID of the product to remove
   */
  const removeProduct = (productId) => {
    products.value = products.value.filter((item) => item.id !== productId)
    saveToLocalStorage()
  }

  /**
   * Clears the entire wishlist
   */
  const clearWishlist = () => {
    products.value = []
    saveToLocalStorage()
  }

  /**
   * @type {computed<number>}
   * @description The total number of products in the wishlist
   */
  const totalProducts = computed(() => products.value.length)

  /**
   * Saves the wishlist to local storage
   */
  const saveToLocalStorage = () => {
    localStorage.setItem(`Wishlist`, JSON.stringify(products.value))
  }

  /**
   * Loads the wishlist from local storage
   */
  const loadFromLocalStorage = () => {
    const savedWishlist = localStorage.getItem(`Wishlist`)
    if (savedWishlist) {
      products.value = JSON.parse(savedWishlist)
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
    addToWishlist,
    removeProduct,
    selectedCategory,
    selectedSort,
    setSelectedCategory,
    setSelectedSort,
    clearWishlist,
    totalProducts,
    filteredSortedProducts,
    loadFromLocalStorage,
    categories: computed(() => productStore.categories)
  }
})