<template>
  <div class="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">My Orders</h1>
    <div v-if="loading" class="text-center text-lg font-semibold text-gray-600">
      Loading orders...
    </div>
    <div v-else-if="orders.length === 0" class="text-center text-lg font-semibold text-gray-600">
      No orders found.
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="mb-6 border p-4 rounded-lg">
        <h2 class="font-bold text-lg mb-2">Order #: {{ order.orderNumber }}</h2>
        <p>
          Status: <span class="capitalize">{{ order.status }}</span>
        </p>
        <p>Total Amount: ${{ order.totalAmount.toFixed(2) }}</p>
        <div>
          <h3 class="font-semibold mt-4">Items:</h3>
          <ul class="list-disc ml-6">
            <li v-for="item in order.orderItems" :key="item.id">
              {{ item.product.name }} - {{ item.quantity }} x ${{ item.price.toFixed(2) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getOrdersByUser } from '@/services/orderServices'

export default {
  name: 'OrderPage',
  setup() {
    const orders = ref([])
    const loading = ref(true)

    const fetchOrders = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (!storedUser || !storedUser.id) {
        alert('User not logged in')
        return
      }

      try {
        const response = await getOrdersByUser(storedUser.id)
        orders.value = response
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchOrders)

    return { orders, loading }
  },
}
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
