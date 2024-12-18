import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import UserVerify from '@/components/Validation/Verified.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserRegister from '@/components/User/UserRegister.vue'

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
      component: UserLogin,
      meta: { noHeader: true },
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
      meta: { noHeader: true },
    },
    {
      path: '/verified',
      name: 'verified',
      component: UserVerify,
      meta: { noHeader: false },
    },
  ],
})

export default router
