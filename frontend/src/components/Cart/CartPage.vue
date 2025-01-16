<template>
  <div class="container mx-auto p-6 font-sans">
    <h1 class="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items Section -->
      <div class="w-full lg:w-2/3">
        <div class="border rounded-lg shadow-sm p-4 bg-white">
          <div v-if="cartItems.length > 0">
            <!-- Select All Checkbox -->
            <div class="flex items-center mb-4">
              <input
                type="checkbox"
                :checked="isSelectAllChecked"
                @change="toggleSelectAll"
                class="mr-4"
              />
              <label>Select All</label>
            </div>

            <!-- Individual Cart Items -->
            <CartCard
              v-for="item in paginatedItems"
              :key="item.id"
              :item="item"
              :isSelected="selectedItems.includes(item.id)"
              @update:selected="updateSelection"
              @update:quantity="updateQuantity"
              @removeItemFromCart="removeItem"
            />

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-4">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                :disabled="currentPage === 1"
                @click="prevPage"
              >
                Previous
              </button>
              <span class="font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                :disabled="currentPage === totalPages"
                @click="nextPage"
              >
                Next
              </button>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-600 text-center py-6">Your cart is empty.</p>
          </div>
        </div>
      </div>

      <!-- Order Summary Section -->
      <div class="w-full lg:w-1/3">
        <PaymentMethods />
        <div class="border rounded-lg shadow-sm p-4 bg-white mt-4">
          <h2 class="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div class="mb-4">
            <p class="flex justify-between text-gray-600">
              <span>Selected Items:</span>
              <span>{{ selectedItems.length }}</span>
            </p>
            <p class="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${{ selectedTotal.toFixed(2) }}</span>
            </p>
          </div>
          <button
            class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            :disabled="selectedItems.length === 0"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCart, removeItemFromCart } from '@/services/cartServices'
import PaymentMethods from './PaymentMethods.vue'
import CartCard from './CartCard.vue'

export default {
  name: 'CartPage',
  components: {
    CartCard,
    PaymentMethods,
  },
  data() {
    return {
      cartItems: [],
      selectedItems: [], // Stores IDs of selected items
      totalCharge: 0,
      currentPage: 1,
      itemsPerPage: 5,
    }
  },
  computed: {
    selectedTotal() {
      return this.cartItems
        .filter((item) => this.selectedItems.includes(item.id))
        .reduce((total, item) => total + item.price * item.quantity, 0)
    },
    totalPages() {
      return Math.ceil(this.cartItems.length / this.itemsPerPage)
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.cartItems.slice(start, end)
    },
    isSelectAllChecked() {
      return this.cartItems.length === this.selectedItems.length
    },
  },
  methods: {
    fetchCartItems() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !user.userId) {
        console.error('User ID not found')
        return
      }
      fetchCart(user.userId)
        .then((response) => {
          if (response && response.data) {
            this.cartItems = response.data.cartItems.map((item) => ({
              id: item.id,
              name: item.Product.name,
              price: item.Product.price,
              image: item.Product.images?.[0]?.url || '',
              quantity: item.quantity,
            }))
            this.totalCharge = response.data.totalCharge
          } else {
            console.error('Unexpected response structure:', response)
          }
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error)
        })
    },
    updateSelection(itemIds) {
      this.selectedItems = itemIds
    },
    updateQuantity({ id, quantity, price }) {
      const itemIndex = this.cartItems.findIndex((item) => item.id === id)
      if (itemIndex !== -1) {
        this.cartItems[itemIndex].quantity = quantity
        // Optionally update total charge or other calculations here
      }
    },
    updateSelectedItems(selectedItemIds) {
      this.selectedItems = selectedItemIds
    },
    toggleSelectAll() {
      if (this.isSelectAllChecked) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.cartItems.map((item) => item.id)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    removeItem(cartItemId) {
      removeItemFromCart(cartItemId)
        .then(() => {
          this.cartItems = this.cartItems.filter((item) => item.id !== cartItemId)
          this.selectedItems = this.selectedItems.filter((id) => id !== cartItemId)
          this.totalCharge = this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          )
        })
        .catch((error) => {
          console.error('Error removing cart item:', error)
        })
    },
  },
  mounted() {
    this.fetchCartItems()
  },
}
</script>
