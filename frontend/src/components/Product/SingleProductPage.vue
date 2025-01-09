<template>
  <div class="flex flex-col items-center p-6">
    <div v-if="loading" class="text-lg font-semibold text-gray-700">Loading product details...</div>
    <div
      v-else-if="product"
      class="w-full max-w-5xl p-4 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6"
    >
      <!-- Product Image -->
      <div class="w-full lg:w-1/2 border p-2 rounded-md backdrop-blur border-emerald-600">
        <img
          :src="activeImage"
          alt="Product Image"
          class="w-full h-auto object-cover rounded-lg shadow"
        />
        <!-- Image Carousel -->
        <div class="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image.url"
            :alt="`Product Image ${index + 1}`"
            class="w-20 h-20 object-cover rounded-md cursor-pointer border-2"
            :class="{
              'border-emerald-600': activeImage === image.url,
              'border-gray-300': activeImage !== image.url,
            }"
            @click="activeImage = image.url"
          />
        </div>
      </div>
      <!-- Product Details -->
      <div class="w-full lg:w-1/2 flex flex-col">
        <div class="w-full border p-2 border-emerald-600 rounded-md backdrop-blur">
          <div class="w-full flex flex-col items-center gap-4">
            <h1 class="text-2xl font-bold mb-4 text-white">{{ product.name }}</h1>
            <p class="text-white text-base md:text-lg mb-4">{{ product.description }}</p>
            <div class="text-xl font-semibold text-emerald-600 mb-4 w-full text-center">
              Price: ${{ product.price }}
            </div>
            <button
              class="btn bg-emerald-500 hover:bg-emerald-600 text-white rounded px-6 py-3 text-base md:text-lg w-full"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div
          class="w-full border border-emerald-600 h-96 mt-2 rounded-md backdrop-blur p-4 text-white"
        >
          <p class="font-semibold">
            FaunaMart Online Store <br />
            - All orders placed on the FaunaMart Online Store during the specified preorder period
            are guaranteed to be fulfilled.* <br />*Please note that this does not apply to orders
            with incorrect payment and/or shipping information provided. <br />
            *Dates and times listed are in Japan Standard Time (JST) unless otherwise stated.
          </p>
          <p class="font-semibold pt-8">
            ■International Partner Shops<br />
            This product is available from our partner shops.
          </p>
        </div>
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
      activeImage: null, // Tracks the currently displayed image
    }
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id
      try {
        const response = await getSingleProduct(productId)
        this.product = response.data
        this.activeImage = this.product.images[0]?.url // Set the first image as the default
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
.scrollbar-hide {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
