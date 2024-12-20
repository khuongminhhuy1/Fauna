<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input type="text" v-model="name" class="input input-bordered" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" v-model="email" class="input input-bordered" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Role</label>
      <select v-model="role" class="select select-bordered w-full">
        <option value="Admin">Admin</option>
        <option value="Costumer">Costumer</option>
      </select>
    </div>
    <div class="modal-action">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<script>
import { GetUserById, UpdateUser } from '@/services/userServices'

export default {
  name: 'UpdateUserForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      email: '',
      role: 'Costumer',
    }
  },
  async mounted() {
    // Fetch user data for the provided userId
    const response = await GetUserById(this.userId)
    if (response && response.data) {
      this.name = response.data.name
      this.email = response.data.email
      this.role = response.data.role || 'user'
    }
  },
  methods: {
    async submitForm() {
      try {
        await UpdateUser(this.userId, { name: this.name, email: this.email, role: this.role })
        this.$emit('updated') // Notify parent about the update
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
