<template>
  <div class="p-8 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-primary mb-8">Our Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script>
import { GetProducts } from '@/services/productServices'
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductPage',
  components: { ProductCard },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    gotoProduct(id) {
      this.$router.push({ name: 'SingleProduct', params: { id } })
    },
    async fetchData() {
      try {
        const response = await GetProducts()
        if (response && response.data) {
          console.log(response.data)
          this.products = response.data
        } else {
          this.products = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleAddToCart(product) {
      alert(`Added ${product.name} to the cart!`)
    },
  },
  mounted() {
    this.fetchData()
  },
}
</script>
