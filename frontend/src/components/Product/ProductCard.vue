<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img :src="product.images[0]?.url" alt="Product Image" class="w-full h-48 object-cover" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p class="text-gray-600">{{ product.description }}</p>
      <div class="card-actions justify-between items-center mt-4">
        <span class="text-lg font-bold text-success">${{ product.price }}</span>
        <button class="btn btn-primary" @click="$emit('add-to-cart', product)">Add to Cart</button>
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
}
</script>
