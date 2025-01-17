<template>
  <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6 text-emerald-600">Save Your Address</h1>
    <form
      @submit.prevent="saveUserInformation"
      class="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <div>
        <label for="address" class="block text-gray-700 font-medium">Address</label>
        <input
          type="text"
          id="address"
          v-model="userInfo.address"
          placeholder="Enter your address"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label for="city" class="block text-gray-700 font-medium">City</label>
        <input
          type="text"
          id="city"
          v-model="userInfo.city"
          placeholder="Enter your city"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label for="state" class="block text-gray-700 font-medium">State</label>
        <input
          type="text"
          id="state"
          v-model="userInfo.state"
          placeholder="Enter your state"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label for="zipCode" class="block text-gray-700 font-medium">ZIP Code</label>
        <input
          type="text"
          id="zipCode"
          v-model="userInfo.zipCode"
          placeholder="Enter your ZIP code"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label for="phone" class="block text-gray-700 font-medium">Phone Number</label>
        <input
          type="text"
          id="phone"
          v-model="userInfo.phone"
          placeholder="Enter your phone number"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label for="country" class="block text-gray-700 font-medium">Country</label>
        <input
          type="text"
          id="country"
          v-model="userInfo.country"
          placeholder="Enter your country"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-emerald-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Save Information' }}
      </button>
    </form>

    <p v-if="message" :class="`mt-4 ${success ? 'text-green-600' : 'text-red-600'}`">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { saveUserInformation } from '@/services/userServices.js'

export default {
  name: 'SaveUserInformation',
  data() {
    return {
      userInfo: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        country: '',
      },
      loading: false,
      message: '',
      success: false,
    }
  },
  methods: {
    async saveUserInformation() {
      this.loading = true
      this.message = ''
      this.success = false

      try {
        const userId = JSON.parse(localStorage.getItem('user'))?.userId
        if (!userId) {
          throw new Error('User is not logged in')
        }

        await saveUserInformation(userId, ...this.userInfo)

        this.message = 'User information saved successfully!'
        this.success = true
      } catch (error) {
        console.error('Error saving user information:', error)
        this.message = error.response?.data?.message || 'Failed to save information'
        this.success = false
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
