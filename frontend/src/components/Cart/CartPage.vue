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
        <PaymentMethods @update:paymentMethod="updatePaymentMethod" />
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
            @click="goToCheckout"
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
      cartItems: [], // All cart items
      selectedItems: [], // IDs of selected items
      currentPage: 1,
      itemsPerPage: 5,
      paymentMethod: '', // Selected payment method
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
      return this.paginatedItems.every((item) => this.selectedItems.includes(item.id))
    },
  },
  methods: {
    updatePaymentMethod(method) {
      this.paymentMethod = method // Update selected payment method
    },
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
          } else {
            console.error('Unexpected response structure:', response)
          }
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error)
        })
    },
    updateSelection({ id, isSelected }) {
      if (isSelected) {
        if (!this.selectedItems.includes(id)) {
          this.selectedItems.push(id)
        }
      } else {
        this.selectedItems = this.selectedItems.filter((selectedId) => selectedId !== id)
      }
    },
    updateQuantity({ id, quantity }) {
      const item = this.cartItems.find((item) => item.id === id)
      if (item) item.quantity = quantity
    },
    toggleSelectAll() {
      if (this.isSelectAllChecked) {
        this.selectedItems = this.selectedItems.filter(
          (id) => !this.paginatedItems.some((item) => item.id === id),
        )
      } else {
        this.selectedItems = [
          ...new Set([...this.selectedItems, ...this.paginatedItems.map((item) => item.id)]),
        ]
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    async removeItem(itemId) {
      await removeItemFromCart(itemId).then(() => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
        this.selectedItems = this.selectedItems.filter((id) => id !== itemId)
      })
    },
    goToCheckout() {
      const selectedProducts = this.cartItems.filter((item) => this.selectedItems.includes(item.id))

      this.$router.push({
        name: 'checkout',
        query: {
          products: JSON.stringify(selectedProducts),
          paymentMethod: this.paymentMethod,
        },
      })
    },
  },
  mounted() {
    this.fetchCartItems()
  },
}
</script>
