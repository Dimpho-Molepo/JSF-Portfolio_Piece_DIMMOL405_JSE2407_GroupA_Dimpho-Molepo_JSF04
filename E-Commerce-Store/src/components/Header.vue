<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-[#ebf5f2] border-b border-gray-200 bg-opacity-95">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-bold whitespace-nowrap text-black">
              SwiftCart
            </span>
          </button>
        </router-link>
        <button
          @click="toggleNavbar"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          :aria-expanded="isNavbarOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          :class="{ hidden: !isNavbarOpen, block: isNavbarOpen }"
          class="w-full md:block md:w-auto"
          id="navbar-default"
        >
          <div
            class="flex flex-col md:flex-row md:space-x-8 items-start md:mt-2 p-4 md:p-0 border border-gray-100 rounded-lg md:border-0"
          >
            <router-link
              to="/comparison"
              class="flex items-center pb-3 text-black hover:text-gray-700 font-bold"
            >
              <div class="relative flex gap-2">
                <div class="absolute left-3 -top-4">
                  <p
                    class="flex h-2 w-2 items-center justify-center rounded-full bg-[#03045e] p-3 text-xs text-white"
                  >
                    {{ comparisonStore.products.length }}
                  </p>
                </div>
                <svg
                  class="w-6 h-6 mr-1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  stroke="#000000"
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
                Compare
              </div>
            </router-link>

            <router-link
              to="/wishlist"
              class="flex items-center pb-3 text-black hover:text-gray-700 font-bold"
            >
              <div class="relative flex gap-2">
                <div class="absolute left-3 -top-4">
                  <p
                    class="flex h-2 w-2 items-center justify-center rounded-full bg-[#03045e] p-3 text-xs text-white"
                  >
                    {{ wishlistStore.totalProducts }}
                  </p>
                </div>
                <svg class="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                Wishlist
              </div>
            </router-link>

            <router-link
              to="/cart"
              class="flex items-center pb-3 text-black hover:text-gray-700 font-bold"
            >
              <div class="relative flex">
                <div class="absolute left-3 -top-4">
                  <p
                    class="flex h-2 w-2 items-center justify-center rounded-full bg-[#03045e] p-3 text-xs text-white"
                  >
                    {{ cartStore.totalItems }}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6 cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Cart
              </div>
            </router-link>

            <button>
              <router-link
                v-if="authStore.isAuthenticated"
                @click="logout"
                to="/login"
                class="block py-2 px-1 text-black font-bold rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Logout
              </router-link>
              <router-link
                v-else
                to="/login"
                class="block py-2 px-1 text-black rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Login
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '../stores/loginAuthenticate.js'
import { useCartStore } from '@/stores/cartStore'
import { useComparisonStore } from '@/stores/comparisonStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const cartStore = useCartStore()
const comparisonStore = useComparisonStore()
const authStore = useAuthenticationStore()
const router = useRouter()
const isNavbarOpen = ref(false)
const wishlistStore = useWishlistStore()

/**
 * Toggle the navbar
 */
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
