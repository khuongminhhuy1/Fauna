<template>
  <div>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="localUser.name"
          type="text"
          id="name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="localUser.email"
          type="email"
          id="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          disabled
        />
      </div>

      <!-- Update Button -->
      <div class="text-right">
        <button
          type="submit"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserInfo', // Updated component name
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localUser: { ...this.user }, // Create a local copy to edit
    }
  },
  methods: {
    submitForm() {
      // Emit updated user data to parent component
      this.$emit('update-profile', this.localUser)
    },
  },
}
</script>
