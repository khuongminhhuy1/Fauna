<template lang="">
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input type="text" v-model="name" class="input input-bordered" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Total</span>
      </label>
      <input type="text" v-model="total" class="input input-bordered" readonly />
    </div>
    <div class="modal-action">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>
<script>
import { getSingleCategory } from '@/services/categoryServices'
import { UpdateCategory } from '@/services/categoryServices'

export default {
  name: 'UpdateCategoryForm',
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      total: '',
    }
  },
  async mounted() {
    // Fetch user data for the provided userId
    const response = await getSingleCategory(this.categoryId)
    if (response && response.data) {
      this.name = response.data.name
      this.total = response.data.total
    }
  },
  methods: {
    async submitForm() {
      try {
        await UpdateCategory(this.categoryId, { name: this.name, total: this.total })
        this.$emit('updated') // Notify parent about the update
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style lang=""></style>
