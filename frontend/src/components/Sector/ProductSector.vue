<template>
  <div class="flex flex-col items-center p-8 bg-transparent min-h-screen rounded-lg w-full">
    <h1
      class="text-4xl font-bold text-center text-primary mb-8 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text"
    >
      Our Products
    </h1>
    <div class="flex flex-wrap gap-2 flex-row justify-center">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="gotoProduct(product.id)"
        class="w-[250px] md:w-[30%] lg:w-[22%]"
      />
    </div>
  </div>
</template>

<script>
import { GetProducts } from '@/services/productServices'
import ProductCard from '../Product/ProductCard.vue'

export default {
  name: 'ProductSector',
  components: { ProductCard },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    gotoProduct(id) {
      this.$router.push({ name: 'single-product', params: { id } })
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
  },
  mounted() {
    this.fetchData() // Fetches products when component is mounted
  },
}
</script>
