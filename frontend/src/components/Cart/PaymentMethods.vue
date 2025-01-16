<template>
  <div class="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
    <label for="payment-method" class="block text-lg font-semibold mb-2"
      >Select Payment Method:</label
    >

    <select
      v-model="selectedMethod"
      id="payment-method"
      class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
        {{ method.label }}
      </option>
    </select>

    <div v-if="selectedMethod" class="mt-4">
      <p class="text-gray-700">
        You have selected: <span class="font-semibold">{{ getSelectedMethodLabel }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethods',
  data() {
    return {
      selectedMethod: '',
      paymentMethods: [
        { label: 'Credit Card', value: 'credit-card' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank Transfer', value: 'bank-transfer' },
        { label: 'Cash on Delivery', value: 'cod' },
      ],
    }
  },
  computed: {
    getSelectedMethodLabel() {
      const method = this.paymentMethods.find((method) => method.value === this.selectedMethod)
      return method ? method.label : ''
    },
  },
}
</script>

<style scoped>
/* You can add any additional styling here */
</style>
