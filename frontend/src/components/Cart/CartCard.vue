<template>
  <div
    class="flex flex-col lg:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
  >
    <!-- Left side: Checkbox + Image + Product Info -->
    <div class="flex items-center flex-grow space-x-4">
      <!-- Checkbox -->
      <input
        type="checkbox"
        :checked="isSelected"
        @change="updateSelection"
        class="mr-4 cursor-pointer"
      />

      <!-- Product Image -->
      <div class="flex-shrink-0">
        <img :src="item.image" :alt="item.name" class="w-[80px] h-[80px] rounded-lg object-cover" />
      </div>

      <!-- Product Info -->
      <div class="flex-grow">
        <h2 class="text-lg font-semibold text-gray-800 truncate">{{ item.name }}</h2>
        <p class="text-gray-600 text-sm">Price: ${{ item.price }}</p>

        <!-- Quantity Input -->
        <div class="flex items-center space-x-2 mt-2">
          <label class="text-sm text-gray-600">Quantity:</label>
          <input
            type="number"
            v-model="quantity"
            min="1"
            class="w-12 p-1 border border-gray-300 rounded"
            @change="updateQuantity"
          />
        </div>

        <!-- Total Price Calculation -->
        <p class="text-gray-600 text-sm mt-2">Total: ${{ totalPrice.toFixed(2) }}</p>
      </div>
    </div>

    <!-- Right side: Remove Button -->
    <div class="flex-shrink-0 mt-4 lg:mt-0">
      <button @click="removeItem" class="text-red-500 text-sm hover:underline focus:outline-none">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: {
    item: Object,
    isSelected: Boolean, // Receives the selection state from the parent
  },
  data() {
    return {
      quantity: this.item.quantity, // Use local state for quantity
    }
  },
  computed: {
    totalPrice() {
      return this.item.price * this.quantity // Calculate total price based on quantity
    },
  },
  methods: {
    updateSelection(event) {
      const isChecked = event.target.checked
      this.$emit('update:selected', { id: this.item.id, isSelected: isChecked })
    },
    removeItem() {
      this.$emit('removeItemFromCart', this.item.id) // Emit the item ID for removal
    },
    updateQuantity() {
      // Emit updated quantity to the parent to recalculate cart total
      this.$emit('update:quantity', {
        id: this.item.id,
        quantity: this.quantity,
        price: this.item.price,
      })
    },
  },
}
</script>

<style scoped>
/* Scoped styling */
</style>
