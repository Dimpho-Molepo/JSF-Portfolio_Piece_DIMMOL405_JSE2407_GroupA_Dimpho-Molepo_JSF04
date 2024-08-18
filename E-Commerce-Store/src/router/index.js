import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import Login from '@/views/Login.vue'
import { useAuthenticationStore } from '@/stores/loginAuthenticate'
import Wishlist from '@/views/Wishlist.vue'
import Cart from '@/views/Cart.vue'
import CompareProducts from '@/views/CompareProducts.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products/:id',
      name: 'ProductDetailView',
      component: ProductDetailView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/wishlist',
      component: Wishlist,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    {
      path: '/comparison',
      name: 'CompareProducts',
      component: CompareProducts,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const login = useAuthenticationStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !login.isAuthenticated) {
    login.setReturnTo(to.fullPath)
    next({ path: '/login', query: { returnTo: to.fullPath } })
  } else {
    next()
  }
})

export default router
