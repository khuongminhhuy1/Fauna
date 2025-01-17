<template>
  <div class="max-w-6xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
    <!-- Profile Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          class="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h1 class="text-3xl font-bold">{{ user.name }}</h1>
          <p class="text-lg text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <button
        @click="editProfile"
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
      >
        Edit Profile
      </button>
    </div>

    <!-- Edit Profile Form -->
    <div v-if="isEditing" class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
      <form @submit.prevent="saveProfile">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="editedUser.name"
            type="text"
            id="name"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="editedUser.email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <!-- Save Button -->
        <div class="flex items-center justify-end">
          <button
            type="submit"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>

    <!-- Address Information -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Address Information</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg">{{ user.address }}</p>
            <p class="text-gray-500">{{ user.city }}, {{ user.state }}</p>
          </div>
          <button
            @click="editAddress"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
          >
            Edit Address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { GetUserById, UpdateUser } from '@/services/userServices'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {},
      isEditing: false,
      editedUser: {
        name: '',
        email: '',
      },
    }
  },
  created() {
    this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await GetUserById() // Get user data from the backend
        this.user = response.data
        this.editedUser = { ...this.user }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    },
    editProfile() {
      this.isEditing = true
    },
    async saveProfile() {
      try {
        const response = await UpdateUser(this.editedUser) // Update user data in the backend
        this.user = response.data
        this.isEditing = false
        alert('Profile updated successfully')
      } catch (error) {
        console.error('Error saving profile:', error)
        alert('Failed to update profile')
      }
    },
  },
}
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
