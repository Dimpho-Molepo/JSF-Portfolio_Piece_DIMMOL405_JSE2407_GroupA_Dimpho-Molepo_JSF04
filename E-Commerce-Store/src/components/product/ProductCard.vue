<template>
  <div
    class="flex flex-col max-h-[130rem] max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
  >
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
              class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              {{ title }}
            </div>
          </h2>
        </header>
        <Rating :rating="rating.rate" :count="rating.count" />
        <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
          <h2>R{{ price }}</h2>
        </div>
      </div>

      <div class="flex mt-1 space-x-2">
        <div class="justify-start flex-1">
          <span
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >
            {{ category }}
          </span>
        </div>
      </div>

      <div class="flex mt-3">
        <button
          @click="addToCart"
          class="flex items-center justify-between w-full px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import Rating from '../Rating.vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cartStore.js'

/**
 * @module ProductCard
 * @description Component for displaying a single product card
 */

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Object,
    default: () => ({ rate: 0, count: 0 })
  }
})

const router = useRouter()
const cartStore = useCartStore()
/**
 * Navigates to the product detail page
 */
const handleClick = () => {
  router.push(`/products/${props.id}`)
}

const addToCart = () => {
  cartStore.addItem({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image
  })
}
</script>
