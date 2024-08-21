import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

/**
 * Define the Cart store using Pinia
 * @returns {Object} The Cart store object
 */
export const useCartStore = defineStore('cart', () => {
  /**
   * Reactive reference to the cart items array
   * @type {ref<Array<Object>>}
   */
  const items = ref([])

  /**
   * Add an item to the cart
   * @param {Object} product The product to add to the cart
   */
  const addItem = (product) => {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  /**
   * Remove an item from the cart
   * @param {number} productId The ID of the product to remove
   */
  const removeItem = (productId) => {
    items.value = items.value.filter((item) => item.id !== productId)
    saveToLocalStorage()
  }

  /**
   * Update the quantity of an item in the cart
   * @param {number} productId The ID of the product to update
   * @param {number} quantity The new quantity
   */
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveToLocalStorage()
    }
  }

  /**
   * Clear the entire cart
   */
  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  /**
   * Computed property: total number of items in the cart
   * @type {number}
   */
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  /**
   * Computed property: total cost of the items in the cart
   * @type {number}
   */
  const totalCost = computed(() => {
    return Number(
      items.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    )
  })

  /**
   * Save the cart to local storage
   */
  const saveToLocalStorage = () => {
    localStorage.setItem(`Cart`, JSON.stringify(items.value))
  }

  /**
   * Load the cart from local storage
   */
  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem(`Cart`)
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

  /**
   * Lifecycle hook: load the cart from local storage when the component is mounted
   */
  onMounted(() => {
    loadFromLocalStorage()
  })

  /**
   * Return the Cart store object
   * @returns {Object} The Cart store object
   */
  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalCost,
    loadFromLocalStorage
  }
})
