<template>
  <div class="">In stock</div>
</template>
<script>
import { GetProducts } from '@/services/productServices'
export default {
  name: 'ProductSector',
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
    this.fetchData() // Fetches products when component is mounted
  },
}
</script>
