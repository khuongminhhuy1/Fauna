<template lang="">
  <div class="flex flex-row">
    <button
      v-if="!isLoggedIn"
      @click="redirectToLogin"
      class="text-emerald-600 bg-gray-900 hover:bg-gray-700 border border-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
    >
      Login
    </button>
    <div v-else class="user-info">
      <div class="dropdown dropdown-end ml-2">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Avatar" src="/images/Chibi-fauna.png" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-gray-900 text-white border border-emerald-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <router-link to="/cart"> <a class="justify-between"> Cart </a></router-link>
          </li>

          <li>
            <a class="justify-between"> Profile </a>
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

export default {
  name: 'loginBtn',
  components: {},
  setup() {
    const isLoggedIn = ref(false)
    const userName = ref('')
    const router = useRouter()
    const toast = useToast()
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
      toast.success('Logged out successfully !')
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
