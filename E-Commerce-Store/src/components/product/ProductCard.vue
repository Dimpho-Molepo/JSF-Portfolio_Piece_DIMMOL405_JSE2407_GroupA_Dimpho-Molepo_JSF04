<template>
  <div
    class="flex flex-col max-h-[130rem] max-w-80 hover:-translate-y-1 hover:scale-101 duration-300 bg-[#f8f9fa] dark:bg-gray-700 border border-slate-300 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
  >
    <div class="flex justify-between top-3 p-2">
      <button @click="toggleWishlist" class="focus:outline-none">
        <svg
          class="h-6 w-6"
          :class="{ 'text-[#da1e37]': isWished, 'text-gray-400': !isWished }"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="isWished"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>

      <div class="">
        <span
          class="bg-blue-200 text-blue-700 text-xs font-bold py-1 px-2 rounded-lg ring-blue-700/10"
        >
          {{ category }}
        </span>
      </div>
    </div>

    <img
      @click="handleClick"
      class="object-contain h-48 mt-3 cursor-pointer"
      :src="image"
      alt="{title}"
    />
    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <header class="mb-2 flex-2">
          <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
            <div
              class="text-slate-600 dark:text-slate-50 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              {{ title }}
            </div>
          </h2>
        </header>
        <Rating :rating="rating.rate" :count="rating.count" />
        <div
          class="text-base line-clamp-2 font-extrabold text-slate-500 dark:text-slate-50 leading-snug"
        >
          <h2>R{{ price }}</h2>
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-3">
        <button
          @click="addToCart"
          class="flex items-center justify-between w-full px-4 py-2 hover:bg-[#0408f7] text-white font-semibold rounded-lg shadow-md bg-[#03045e] focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Add to cart
          <svg
            class="w-5 h-5 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </button>

        <button
          @click="addToComparison"
          class="flex items-center justify-between w-full px-4 py-2 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Compare
          <svg
            class="w-5 h-5 ml-2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M2 4h9v1H3v15h8v1H2zm10 19h1V2h-1zM8.283 10.283l-.566-.566L4.934 12.5l2.783 2.783.566-.566L6.566 13H11v-1H6.566zM14 12h4.08l-1.54-1.54.92-.92 2.96 2.96-2.96 2.96-.92-.92L18.08 13H14v8h9V4h-9z"
              ></path>
              <path fill="none" d="M0 0h24v24H0z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <Toast v-if="showToast" :type="toastType" @closed="closeToast">
    {{ toastMessage }}
  </Toast>
</template>

<script setup>
/**
 * @module ProductCard
 * @description Component for displaying a single product card
 */

import Rating from '../Rating.vue'
import { useRouter } from 'vue-router'
import { defineProps, computed, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'
import { useComparisonStore } from '@/stores/comparisonStore.js'
import { useWishlistStore } from '@/stores/wishlistStore.js'
import Toast from '../Toast.vue'

/**
 * Define the props for the product card component
 */
const props = defineProps({
  /**
   * The ID of the product
   * @type {Number}
   * @required
   */
  id: {
    type: Number,
    required: true
  },
  /**
   * The title of the product
   * @type {String}
   * @required
   */
  title: {
    type: String,
    required: true
  },
  /**
   * The image URL of the product
   * @type {String}
   * @required
   */
  image: {
    type: String,
    required: true
  },
  /**
   * The price of the product
   * @type {Number}
   * @required
   */
  price: {
    type: Number,
    required: true
  },
  /**
   * The category of the product
   * @type {String}
   * @required
   */
  category: {
    type: String,
    required: true
  },
  /**
   * The rating of the product
   * @type {Object}
   * @default {{ rate: 0, count: 0 }}
   */
  rating: {
    type: Object,
    default: () => ({ rate: 0, count: 0 })
  },
  /**
   * The description of the product
   * @type {String}
   * @required
   */
  description: {
    type: String,
    required: true
  }
})

/**
 * Initialize the comparison store
 */
const comparisonStore = useComparisonStore()

/**
 * Initialize the router
 */
const router = useRouter()

/**
 * Initialize the cart store
 */
const cartStore = useCartStore()

/**
 * Initialize the wishlist store
 */
const wishlistStore = useWishlistStore()

/**
 * Whether to show the toast notification
 * @type {Boolean}
 */
const showToast = ref(false)

/**
 * The type of the toast notification
 * @type {String}
 */
const toastType = ref('success')

/**
 * The message of the toast notification
 * @type {String}
 */
const toastMessage = ref('')

/**
 * Navigate to the product detail page
 */
const handleClick = () => {
  router.push(`/products/${props.id}`)
}

/**
 * Show a toast notification with the specified type and message
 * @param {String} type The type of the toast notification
 * @param {String} message The message of the toast notification
 */
const showToastNotification = (type, message) => {
  toastType.value = type
  toastMessage.value = message
  showToast.value = true
}

/**
 * Close the toast notification
 */
const closeToast = () => {
  showToast.value = false
}

/**
 * Add the product to the cart
 */
const addToCart = () => {
  cartStore.addItem({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image
  })
  showToastNotification('success', 'Product added to cart')
}

/**
 * Add the product to the comparison list
 */
const addToComparison = () => {
  comparisonStore.addProduct({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    description: props.description,
    rating: props.rating
  })
  showToastNotification('success', 'Product added to comparison')
}

/**
 * Whether the product is in the wishlist
 * @returns {Boolean} Whether the product is in the wishlist
 */
const isWished = computed(() => {
  return wishlistStore.products.some((product) => product.id === props.id)
})

/**
 * Toggle the product in the wishlist
 */
const toggleWishlist = () => {
  if (isWished.value) {
    wishlistStore.removeProduct(props.id)
    showToastNotification('warning', 'Product removed from wishlist')
  } else {
    wishlistStore.addToWishlist({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      description: props.description,
      rating: props.rating,
      category: props.category
    })
    showToastNotification('success', 'Product added to wishlist')
  }
  console.log(`Product ${isWished.value ? 'removed from' : 'added to'} wishlist`)
}
</script>