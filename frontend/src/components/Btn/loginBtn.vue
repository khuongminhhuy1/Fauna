<template lang="">
  <div class="">
    <button
      v-if="!isLoggedIn"
      @click="redirectToLogin"
      class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Login
    </button>
    <div v-else class="user-info">
      <span>Welcome, {{ userName }}</span>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'loginBtn',
  setup() {
    const isLoggedIn = ref(false)
    const userName = ref('')
    const router = useRouter()

    // Check authentication state on app load
    onMounted(() => {
      const user = localStorage.getItem('user')
      if (user) {
        const parsedUser = JSON.parse(user)
        isLoggedIn.value = true
        userName.value = parsedUser.name
      }
    })

    // Redirect to login page
    const redirectToLogin = () => {
      router.push('/login')
    }

    // Logout functionality
    const logout = () => {
      localStorage.removeItem('user')
      localStorage.setItem('isLoggedIn', 'false')
      isLoggedIn.value = false
      userName.value = ''
      router.push('/')
    }

    return {
      isLoggedIn,
      userName,
      redirectToLogin,
      logout,
    }
  },
}
</script>
