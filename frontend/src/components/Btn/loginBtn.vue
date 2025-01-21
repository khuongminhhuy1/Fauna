<template>
  <div class="flex flex-row">
    <!-- Show Login Button when the user is not logged in -->
    <button
      v-if="!isLoggedIn"
      @click="redirectToLogin"
      class="text-emerald-600 bg-gray-900 hover:bg-gray-700 border border-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
    >
      Login
    </button>

    <!-- Show User Info dropdown when the user is logged in -->
    <div v-else class="user-info">
      <div class="dropdown dropdown-end ml-2">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <!-- Display user avatar or default avatar -->
            <img
              alt="Avatar"
              :src="user.avatar || 'default-avatar.png'"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-gray-900 text-white border border-emerald-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <router-link to="/cart"><a class="justify-between">Cart</a></router-link>
          </li>
          <li>
            <router-link to="/profile/information"
              ><a class="justify-between">Profile</a></router-link
            >
          </li>
          <li><a>Settings</a></li>
          <li><button @click="logout">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { GetUserById } from '@/services/userServices' // Assuming this is where GetUserById is defined

export default {
  name: 'LoginBtn',
  setup() {
    const isLoggedIn = ref(false)
    const user = ref({ avatar: '', name: '', email: '' })
    const router = useRouter()
    const toast = useToast()

    // Fetch user data from backend after login
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (storedUser.userId) {
        try {
          const response = await GetUserById(storedUser.userId) // Fetch data using the stored userId
          if (response) {
            Object.assign(user.value, response.data) // Set the fetched user data
            isLoggedIn.value = true
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          toast.error('Failed to fetch user data')
          isLoggedIn.value = false
        }
      }
    }

    // Check authentication state when component mounts
    onMounted(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        fetchUserData() // Fetch user data if logged in
      }
    })

    // Redirect to login page if the user is not logged in
    const redirectToLogin = () => {
      router.push('/login')
    }

    // Logout functionality
    const logout = () => {
      localStorage.removeItem('user')
      localStorage.setItem('isLoggedIn', 'false')
      isLoggedIn.value = false
      toast.success('Logged out successfully!')
      router.push('/')
    }

    return {
      isLoggedIn,
      user,
      redirectToLogin,
      logout,
    }
  },
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
