<template>
  <div class="overflow-x-auto">
    <div class="py-4 flex flex-row justify-between items-center">
      <h1 class="text-3xl">Users List</h1>
      <router-link to="/register"
        ><button class="btn"><i class="fa-solid fa-plus"></i></button
      ></router-link>
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Joined Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td class="flex flex-row">
            <!-- Pass user ID to the UpdateUser component -->
            <UpdateUser :userId="user.id" @updated="fetchData" />
            <DeleteUser :userId="user.id" @updated="fetchData" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GetUsers } from '@/services/userServices'
import UpdateUser from './Modal/UpdateUser.vue'
import DeleteUser from './Modal/DeleteUser.vue'

export default {
  name: 'ShowUsers',
  components: {
    UpdateUser,
    DeleteUser,
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await GetUsers()
        if (response && response.data) {
          this.users = response.data
        } else {
          console.log('Error', response)
        }
      } catch (error) {
        console.error(error)
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
    this.fetchData() // Fetches users when component is mounted
  },
}
</script>
