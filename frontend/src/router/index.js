import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import UserVerify from '@/components/Validation/Verified.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
import ShowUsers from '@/components/Admin/User/ShowUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      meta: { noHeader: false, layout: 'default' },
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
      meta: { noHeader: true, layout: 'default' },
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
      meta: { noHeader: true, layout: 'default' },
    },
    {
      path: '/verified',
      name: 'verified',
      component: UserVerify,
      meta: { noHeader: false, layout: 'default' },
    },
    {
      path: '/admin',
      name: '/admin',
      component: AdminDashboard,
      meta: { noHeader: false, requiresAuth: true, role: 'Admin', layout: 'admin' },
    },
    {
      path: '/admin/users',
      name: '/admin/users',
      component: ShowUsers,
      meta: { noHeader: false, requiresAuth: true, role: 'Admin', layout: 'admin' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      // If not logged in, redirect to login
      return next('/login')
    }

    if (to.meta.role && to.meta.role !== user.role) {
      // If role doesn't match, redirect to unauthorized or home page
      return next('/')
    }
  }

  next() // Proceed to the route
})

export default router
