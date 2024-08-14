import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const userId = ref(null)

  const addItem = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveToLocalStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalCost = computed(() => {
    return Number(items.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))
  })

  const saveToLocalStorage = () => {
    localStorage.setItem(`Cart-${userId.value}`, JSON.stringify(items.value))
  }

  const loadFromLocalStorage = (id) => {
    userId.value = id
    const savedCart = localStorage.getItem(`cart-${id}`)
    if (savedCart) {
      items.value = JSON.parse(savedCart)
    }
  }

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