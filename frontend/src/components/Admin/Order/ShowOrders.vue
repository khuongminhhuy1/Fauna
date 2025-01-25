<template>
  <div class="overflow-x-auto">
    <div class="py-4 flex flex-row justify-between items-center">
      <h1 class="text-3xl">Order List</h1>
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Order Number</th>
          <th>Customer</th>
          <th>Products</th>
          <th>Status</th>
          <th>Total Amount</th>
          <th>Payment Method</th>
          <th>Day Ordered</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.orderNumber }}</td>
          <td
            v-html="
              order.userInfo ? `${order.userInfo.name}<br>(${order.userInfo.email})` : 'Loading...'
            "
          ></td>
          <td>
            <ul>
              <li v-for="item in order.orderItems" :key="item.id">
                {{ item.Product.name }} (x{{ item.quantity }})
              </li>
            </ul>
          </td>
          <td>{{ order.status }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>{{ order.paymentMethod }}</td>
          <td>{{ formatDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GetOrders } from '@/services/orderServices'
import { GetUserById } from '@/services/userServices'

export default {
  name: 'ShowOrders',
  data() {
    return {
      orders: [],
      users: {}, // Initialize users object to cache fetched users
    }
  },
  methods: {
    async fetchUser(userId) {
      // Check if user is already cached
      if (this.users[userId]) {
        return this.users[userId]
      }

      try {
        const response = await GetUserById(userId)
        if (response && response.data) {
          this.users[userId] = response.data // Cache user data
          return response.data
        } else {
          console.error('User data not found for userId:', userId)
          return null
        }
      } catch (error) {
        console.error('Error fetching user data for userId:', userId, error)
        return null
      }
    },
    async fetchData() {
      try {
        const response = await GetOrders()
        this.orders = response // Assign orders to component data

        // Loop through orders and fetch user data for each order
        for (let order of this.orders) {
          if (order.userId) {
            const user = await this.fetchUser(order.userId)
            if (user) {
              order.userInfo = user // Add user info to the order
            } else {
              console.warn(`No user found for order ${order.id}`)
            }
          } else {
            console.warn(`Order ${order.id} has no userId`)
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    },
  },
  mounted() {
    this.fetchData() // Fetch orders and user data when the component is mounted
  },
}
</script>
