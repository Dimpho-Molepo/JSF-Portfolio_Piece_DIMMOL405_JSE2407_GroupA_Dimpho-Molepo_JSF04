import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

/**
 * Description placeholder
 *
 * @type {*}
 */
export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref([])
  const productStore = useProductStore()
  const selectedCategory = ref('')
  const selectedSort = ref('')

  const addToWishlist = (product) => {
    products.value.push({ ...product })
    saveToLocalStorage()
  }

  const removeProduct = (productId) => {
    products.value = products.value.filter((item) => item.id !== productId)
    saveToLocalStorage()
  }

  const clearWishlist = () => {
    products.value = []
    saveToLocalStorage()
  }

  const totalProducts = computed(() => products.value.length)

  const saveToLocalStorage = () => {
    localStorage.setItem(`Wishlist`, JSON.stringify(products.value))
  }

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
