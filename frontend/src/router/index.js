import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/Main/MainPage.vue'
import UserVerify from '@/components/Validation/Verified.vue'
import UserLogin from '@/components/User/UserLogin.vue'
import UserRegister from '@/components/User/UserRegister.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
import ShowUsers from '@/components/Admin/User/ShowUsers.vue'
import ShowCategory from '@/components/Admin/Category/ShowCategory.vue'
import ShowProduct from '@/components/Admin/Product/ShowProduct.vue'
import ProductPage from '@/components/Product/ProductPage.vue'
import SingleProductPage from '@/components/Product/SingleProductPage.vue'
import CartPage from '@/components/Cart/CartPage.vue'
import UserProfile from '@/components/User/UserProfile.vue'

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
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta: { noHeader: false, layout: 'default' },
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
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
    {
      path: '/admin/categories',
      name: '/admin/categories',
      component: ShowCategory,
      meta: { noHeader: false, requiresAuth: true, role: 'Admin', layout: 'admin' },
    },
    {
      path: '/admin/products',
      name: '/admin/products',
      component: ShowProduct,
      meta: { noHeader: false, requiresAuth: true, role: 'Admin', layout: 'admin' },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductPage,
      meta: { noHeader: false, layout: 'default' },
    },
    {
      path: '/products/:id',
      name: 'single-product',
      component: SingleProductPage,
      meta: { noHeader: false, layout: 'default' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const token = localStorage.getItem('token') // Or session token if using session

  if (to.meta.requiresAuth && !isLoggedIn) {
    toast.error('You need to log in to access this page.')
    return next('/login')
  }

  if (to.meta.role && token) {
    try {
      // Fetch the user data from the backend to get the role dynamically
      const response = await axios.get('/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const userRole = response.data.role

      // Check if user has the required role
      if (userRole !== to.meta.role) {
        toast.error('You do not have permission to access this page.')
        return next('/')
      }

      // Proceed with navigation
      next()
    } catch (error) {
      toast.error('Error fetching user role.')
      next('/')
    }
  } else {
    // If no role is required, proceed with navigation
    next()
  }
})

export default router

