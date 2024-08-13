import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import Login from '@/views/Login.vue'
import { useAuthenticationStore } from '@/stores/loginAuthenticate'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: Login,
      // meta: { requiresAuth: true }
    },
    // {
    //   path: '/wishlist',
    //   component: Wishlist,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/cart',
    //   component: Cart,
    //   meta: { requiresAuth: true }
    // },
  ]
})


router.beforeEach((to, from, next) => {
  const login = useAuthenticationStore()
  
  if (to.matched.some(record => record.meta.requiresAuth) && !login.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
