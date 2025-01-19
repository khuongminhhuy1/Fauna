<template>
  <div class="overflow-x-auto">
    <div class="py-4 flex flex-row justify-between items-center">
      <h1 class="text-3xl">Category List</h1>
      <router-link to="/register"
        ><button class="btn">
          <i class="fa-solid fa-plus"></i></button
      ></router-link>
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Total Products</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.total }}</td>
          <td class="flex flex-row">
            <UpdateCategory :categoryId="category.id" @updated="fetchData" />
            <DeleteCategory :categoryId="category.id" @updated="fetchData" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GetCategories } from '@/services/categoryServices'
import UpdateCategory from './Modal/UpdateCategory.vue'
import DeleteCategory from './Modal/DeleteCategory.vue'
export default {
  name: 'ShowCategory',
  components: {
    UpdateCategory,
    DeleteCategory,
  },
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await GetCategories()
        if (response && response.data) {
          this.categories = response.data
        } else {
          console.log('Error', response)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.fetchData() // Fetches products when component is mounted
  },
}
</script>
