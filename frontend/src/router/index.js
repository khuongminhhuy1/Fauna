import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import Verified from '@/components/Validation/Verified.vue'
import Login from '@/components/User/Login.vue'
import Register from '@/components/User/Register.vue'

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
      path: '/login',
      name: 'login',
      component: Login,
      meta: { noHeader: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { noHeader: true },
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
