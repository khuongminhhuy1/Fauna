<template>
  <div class="w-full mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">My Profile</h1>
    <div v-if="loading" class="text-center text-lg font-semibold text-gray-600">
      Loading profile...
    </div>
    <div v-else>
      <!-- Profile Information -->
      <div class="flex items-center space-x-6 mb-8">
        <!-- Avatar -->
        <div>
          <img
            :src="avatarPreview || user.avatar"
            alt="User Avatar"
            class="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <div class="mt-4">
            <input type="file" id="avatar-upload" @change="handleAvatarChange" class="hidden" />
            <label
              for="avatar-upload"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Change Avatar
            </label>
          </div>
        </div>
        <!-- User Info -->
        <div>
          <h2 class="text-xl font-bold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
          <p class="text-gray-500 capitalize">{{ user.role }}</p>
        </div>
      </div>

      <div class="w-full flex flex-row">
        <!-- Menu -->
        <div class="w-4/12 text-black">
          <ul class="menu rounded-lg w-56">
            <li>
              <details open>
                <summary>Basic Profile</summary>
                <ul>
                  <router-link to="/profile/information">
                    <li><a>Account</a></li>
                  </router-link>
                  <router-link to="/profile/address">
                    <li><a>Address</a></li>
                  </router-link>
                </ul>
              </details>
            </li>
            <router-link to="/profile/orders">
              <li><a>My Orders</a></li>
            </router-link>
          </ul>
        </div>

        <!-- Content Area -->
        <div class="flex-grow">
          <router-view :user="user" @update-profile="handleProfileUpdate"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { GetUserById } from '@/services/userServices'

export default {
  name: 'ProfilePage',
  setup() {
    const user = ref({
      userId: '',
    })

    const avatarPreview = ref(null)
    const loading = ref(true)

    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (!storedUser || !storedUser.userId) {
          throw new Error('User ID not found in local storage')
        }
        const response = await GetUserById(storedUser.userId)
        Object.assign(user.value, response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        loading.value = false
      }
    }

    const handleAvatarChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        avatarPreview.value = URL.createObjectURL(file)
        user.value.avatar = avatarPreview.value
      }
    }

    const handleProfileUpdate = (updatedUser) => {
      // Handle profile update by receiving updated user data
      Object.assign(user.value, updatedUser)
      localStorage.setItem('user', JSON.stringify(user.value)) // Update local storage
      alert('Profile updated successfully')
    }

    onMounted(fetchUser)

    return {
      user,
      avatarPreview,
      loading,
      handleAvatarChange,
      handleProfileUpdate,
    }
  },
}
</script>
