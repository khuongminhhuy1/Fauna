import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import UserVerify from '@/components/Validation/Verified.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'

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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      meta: { noHeader: false, requiresAuth: true, role: 'Admin' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth) {
    if (!token) return next('/login')
    if (to.meta.role && to.meta.role !== role) return next('/dashboard')
  }

  next()
})

export default router
