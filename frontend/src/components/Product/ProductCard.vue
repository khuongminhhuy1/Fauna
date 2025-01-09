<template>
  <div class="card cursor-pointer border border-emerald-600 p-3 backdrop-blur-md">
    <div class="overflow-hidden rounded-lg">
      <img
        :src="product.images[0]?.url"
        alt="Product Image"
        class="w-full h-[300px] object-cover object-top transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
    <div class="card-body p-0 pt-3">
      <h2 class="card-title text-white overflow-hidden whitespace-nowrap text-ellipsis">
        {{ product.name }}
      </h2>
      <div class="card-actions flex flex-col">
        <span class="text-lg font-bold text-success">${{ product.price }}</span>
        <p class="text-white">Release Date : {{ formatDate(product.createdAt) }}</p>
        <button
          class="btn bg-emerald-500 border-none text-white hover:bg-emerald-600 w-full"
          @click="$emit('add-to-cart', product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
  },
}
</script>
