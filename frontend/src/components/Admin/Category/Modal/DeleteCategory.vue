<template lang="">
  <div>
    <!-- Button to trigger delete modal -->
    <button class="btn text-red-500 bg-transparent border-none shadow-none" @click="openModal">
      <i class="fa-solid fa-trash"></i>
    </button>

    <!-- Modal -->
    <dialog ref="modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Do you want to delete this category?</h3>
        <div class="modal-action">
          <button class="btn btn-error" @click="deleteUser">Delete</button>
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script>
import { DeleteCategory } from '@/services/categoryServices'
export default {
  name: 'DeleteCategory',
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    // Open the modal using the dialog's reference
    openModal() {
      this.$refs.modal.showModal() // Show the modal
    },

    // Close the modal
    closeModal() {
      this.$refs.modal.close() // Close the modal
    },

    // Delete the user and emit an event to notify parent
    async deleteUser() {
      try {
        await DeleteCategory(this.id) // Call API to delete the user
        this.$emit('deleted') // Notify parent to refresh the user list
        this.closeModal() // Close modal after deletion
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    },
  },
}
</script>
<style lang=""></style>
