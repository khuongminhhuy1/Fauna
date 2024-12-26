<template lang="">
  <div class="overflow-x-auto">
    <div class="py-4 flex flex-row justify-between items-center">
      <h1 class="text-3xl">Category List</h1>
      <router-link to="/register"
        ><button class="btn">
          <i class="fa-solid fa-plus"></i>
        </button></router-link
      >
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.categoryId }}</td>
          <td class="flex flex-row">
            <UpdateProduct :product="product" @updated="fetchData" />
            <DeleteProduct :productId="product.id" @updated="fetchData" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { GetProducts } from '@/services/productServices'
import UpdateProduct from './Modal/UpdateProduct.vue'
import DeleteProduct from './Modal/DeleteProduct.vue'
export default {
  name: 'ShowProduct',
  components: {
    UpdateProduct,
    DeleteProduct,
  },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await GetProducts()
        if (response && response.data) {
          this.products = response.data
        } else {
          this.products = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
  },
  mounted() {
    this.fetchData() // Fetches products when component is mounted
  },
}
</script>
