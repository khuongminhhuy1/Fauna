<template>
  <div class="container mx-auto p-6 font-sans">
    <h1 class="text-3xl font-bold mb-6 text-center">Order Review</h1>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Selected Products Section -->
      <div class="border rounded-lg shadow-sm p-4 bg-white">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Selected Products</h2>
        <div v-for="product in selectedProducts" :key="product.id" class="mb-4">
          <div class="flex items-center">
            <img
              :src="product.image"
              alt="Product Image"
              class="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div>
              <p class="font-semibold text-gray-800">{{ product.name }}</p>
              <p class="text-gray-600">{{ product.quantity }} x ${{ product.price }}</p>
            </div>
          </div>
        </div>
        <p class="mt-4 font-bold text-right">Total: ${{ totalAmount.toFixed(2) }}</p>
      </div>

      <!-- Order Summary Section -->
      <div class="border rounded-lg shadow-sm p-4 bg-white">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Order Details</h2>

        <p><strong>Payment Method:</strong> {{ paymentMethod }}</p>

        <div class="mt-4">
          <p class="text-gray-600">
            <strong>Address:</strong> {{ userInformation.address }}, {{ userInformation.city }},
            {{ userInformation.state }} - {{ userInformation.zipCode }}
          </p>
        </div>

        <button
          class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
          @click="confirmOrder"
          :disabled="!paymentMethod || !selectedProducts.length"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Checkout } from '@/services/orderServices'
import { getUserInformation } from '@/services/userServices'

export default {
  data() {
    return {
      selectedProducts: [], // Products passed from the cart page
      paymentMethod: '', // Payment method passed from the cart page
      userInformation: {}, // Fetched user information
    }
  },
  computed: {
    totalAmount() {
      return this.selectedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      )
    },
  },
  methods: {
    // Fetch user information based on the logged-in user
    fetchUserInformation() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !user.userId) {
        console.error('User ID not found')
        return
      }
      getUserInformation(user.userId)
        .then((response) => {
          if (response && response.data) {
            this.userInformation = response.data
          } else {
            console.error('Unexpected response:', response)
          }
        })
        .catch((error) => {
          console.error('Error fetching user information:', error)
        })
    },

    // Confirm the order and proceed to confirmation page
    async confirmOrder() {
      try {
        const orderData = {
          userId: JSON.parse(localStorage.getItem('user')).userId,
          addressId: this.userInformation.id,
          paymentMethod: this.paymentMethod,
        }

        const response = await Checkout(orderData) // Call backend API to place the order
        console.log('Order confirmed:', response)

        this.$router.push({
          name: 'order-confirmation',
        })
      } catch (error) {
        console.error('Error confirming order:', error)
        alert(error.error || 'An error occurred while confirming the order.')
      }
    },
  },
  mounted() {
    // Parse query parameters to initialize selectedProducts and paymentMethod
    const productsQuery = this.$route.query.products
    this.selectedProducts = productsQuery ? JSON.parse(productsQuery) : []
    this.paymentMethod = this.$route.query.paymentMethod || 'Not Selected'

    // Fetch user information for the order
    this.fetchUserInformation()
  },
}
</script>
