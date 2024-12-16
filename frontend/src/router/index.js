import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import Verified from '@/components/Validation/Verified.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      meta: { noHeader: false },
    },
    {
      path: '/verified',
      name: 'verified',
      component: Verified,
      meta: { noHeader: false },
    },
  ],
})

export default router
