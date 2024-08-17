import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref([])

  const addToWishlist = (product) => {
    // const existingProduct = products.value.find((item) => item.id === product.id)
    // if (existingProduct) {
    //   existingProduct.quantity++
    // } else {
    products.value.push({ ...product })
    // }
    saveToLocalStorage()
  }

  const removeProduct = (productId) => {
    products.value = products.value.filter((item) => item.id !== productId)
    saveToLocalStorage()
  }

  //   const updateQuantity = (productId, quantity) => {
  //     const item = products.value.find((item) => item.id === productId)
  //     if (item) {
  //       item.quantity = quantity
  //       saveToLocalStorage()
  //     }
  //   }

  const clearWishlist = () => {
    products.value = []
    saveToLocalStorage()
  }

  const totalProducts = computed(() => {
    return products.value.reduce((total, item) => total + item, 0)
  })

  //   const totalCost = computed(() => {
  //     return Number(
  //       products.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  //     )
  //   })

  const saveToLocalStorage = () => {
    localStorage.setItem(`Wishlist`, JSON.stringify(products.value))
  }

  const loadFromLocalStorage = () => {
    const savedWishlist = localStorage.getItem(`Wishlist`)
    if (savedWishlist) {
      products.value = JSON.parse(savedWishlist)
    }
  }

  return {
    products,
    addToWishlist,
    removeProduct,
    // updateQuantity,
    clearWishlist,
    totalProducts,
    // totalCost,
    loadFromLocalStorage
  }
})
