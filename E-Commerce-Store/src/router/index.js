import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products/:id',
      name: 'ProductDetailView',
      component: ProductDetailView
    }
  ]
})

export default router
