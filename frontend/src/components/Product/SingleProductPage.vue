<template>
  <div class="flex flex-col items-center p-6">
    <div v-if="loading" class="text-lg font-semibold text-gray-700">Loading product details...</div>
    <div
      v-else-if="product"
      class="w-full max-w-5xl p-4 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6"
    >
      <!-- Product Image -->
      <div class="w-full lg:w-1/2">
        <img
          :src="product.images[0]?.url"
          alt="Product Image"
          class="w-full h-auto object-cover rounded-lg shadow"
        />
      </div>
      <!-- Product Details -->
      <div class="w-full lg:w-1/2 flex flex-col">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
        <p class="text-gray-600 text-base md:text-lg mb-4">{{ product.description }}</p>
        <div class="text-xl font-semibold text-emerald-600 mb-4">Price: ${{ product.price }}</div>
        <button
          class="btn bg-emerald-500 hover:bg-emerald-600 text-white rounded px-6 py-3 text-base md:text-lg"
          @click="addToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else class="text-red-500 text-lg font-semibold">
      Failed to load product details. Please try again.
    </div>
  </div>
</template>

<script>
import { getSingleProduct } from '@/services/productServices'

export default {
  name: 'SingleProductPage',
  data() {
    return {
      product: null,
      loading: true,
      error: null,
    }
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id
      try {
        const response = await getSingleProduct(productId)
        this.product = response.data
        this.loading = false
      } catch (error) {
        console.error('Error fetching product:', error)
        this.loading = false
        this.error = error
      }
    },
    addToCart() {
      alert(`Added ${this.product.name} to the cart!`)
    },
  },
  created() {
    this.fetchProduct()
  },
}
</script>

<style scoped>
/* Add any specific styles for the product page */
</style>
