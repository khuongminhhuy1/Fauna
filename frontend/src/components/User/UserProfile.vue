<template>
  <div class="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
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

      <!-- Edit Profile Form -->
      <form @submit.prevent="updateProfile" class="space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="user.name"
            type="text"
            id="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            disabled
          />
        </div>

        <!-- Update Button -->
        <div class="text-right">
          <button
            type="submit"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { GetUserById, UpdateUser } from '@/services/userServices' // Adjust import path as needed

export default {
  name: 'ProfilePage',
  setup() {
    const user = ref({
      id: '',
      userId: '',
      name: '',
      email: '',
      avatar: '',
      role: '',
    })

    const avatarPreview = ref(null)
    const loading = ref(true)

    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (!storedUser || !storedUser.userId) {
          throw new Error('User ID not found in local storage')
        }
        const response = await GetUserById(storedUser.userId)
        Object.assign(user.value, response.data) // Populate user object with backend data
        console.log('User:', user.value)
      } catch (error) {
        console.error('Error fetching user:', error)
        alert('Failed to load profile')
      } finally {
        loading.value = false
      }
    }

    // Handle avatar upload and preview
    const handleAvatarChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        avatarPreview.value = URL.createObjectURL(file)
        user.value.avatar = avatarPreview.value // Update avatar locally for preview
      }
    }

    // Update user profile
    const updateProfile = async () => {
      try {
        await UpdateUser(user.value.id, {
          name: user.value.name,
          avatar: user.value.avatar,
        })
        // Update local storage with new data
        localStorage.setItem('user', JSON.stringify(user.value))
        alert('Profile updated successfully')
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Failed to update profile')
      }
    }

    onMounted(fetchUser)

    return {
      user,
      avatarPreview,
      loading,
      handleAvatarChange,
      updateProfile,
    }
  },
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
