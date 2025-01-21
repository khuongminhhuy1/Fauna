<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Your Addresses</h1>
    <!-- Address List -->
    <div class="">
      <AddNewAddress :userId="userId" class="py-2 flex items-end justify-end" />
      <!-- Display Addresses -->
      <div v-if="addresses.length > 0" class="space-y-4">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="flex items-center justify-between bg-gray-100 p-4 rounded"
        >
          <div>
            <p>
              {{ address.address }}, {{ address.city }}, {{ address.state }}, {{ address.zipCode }}
            </p>
            <p>{{ address.phone }} | {{ address.country }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="editAddress(address)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteAddress(address.id)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500">No addresses found. Add one above.</p>
    </div>

    <!-- Include the AddNewAddress Modal Component -->
  </div>
</template>

<script>
import { getUserInformation, deleteUserInformation } from '@/services/userServices'
import AddNewAddress from './Modal/AddNewAddress.vue'

export default {
  name: 'UserAddress',
  components: {
    AddNewAddress,
  },
  data() {
    return {
      addresses: [], // Stores the user's addresses
      userId: 'null', // To store the userId fetched from localStorage
    }
  },
  methods: {
    async fetchUserAddress() {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        this.userId = user ? String(user.userId) : null

        if (this.userId) {
          const response = await getUserInformation(this.userId)
          if (response && response.data) {
            this.addresses = [response.data] // assuming we only store one address
          } else {
            this.addresses = []
          }
        } else {
          console.error('User ID not found in localStorage')
        }
      } catch (error) {
        console.error('Error fetching user information:', error)
      }
    },
    async deleteAddress(addressId) {
      if (confirm('Are you sure you want to delete your address?')) {
        try {
          if (!this.userId) {
            console.error('User ID is missing')
            return
          }
          await deleteUserInformation(this.userId)
          this.addresses = [] // Clear addresses after deletion
        } catch (error) {
          console.error('Error deleting user address:', error)
        }
      }
    },
  },
  mounted() {
    this.fetchUserAddress()
  },
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
