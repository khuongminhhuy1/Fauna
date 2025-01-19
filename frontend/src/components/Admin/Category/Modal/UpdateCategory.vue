<template>
  <div>
    <!-- Button to open the modal -->
    <button class="btn text-blue-500 bg-transparent border-none shadow-none" @click="openModal">
      <i class="fa-solid fa-pen"></i>
    </button>

    <!-- Modal -->
    <dialog ref="modal" class="modal">
      <div class="modal-box">
        <!-- UpdateCategoryForm component -->
        <UpdateCategoryForm
          :categoryId="categoryId"
          @updated="onCategoryUpdated"
          @close="closeModal"
        />
      </div>
      <!-- Modal backdrop -->
      <form method="dialog" class="modal-backdrop" @click="closeModal">
        <button type="button">Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import UpdateCategoryForm from '../Form/UpdateCategoryForm.vue'
export default {
  name: 'UpdateCategory',
  components: {
    UpdateCategoryForm,
  },
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    openModal() {
      this.$refs.modal.showModal() // Open the modal
    },
    closeModal() {
      this.$refs.modal.close() // Close the modal
    },
    onCategoryUpdated() {
      // Trigger any necessary updates in the parent component or data
      this.closeModal()
      this.$emit('updated') // Notify parent of the update
    },
  },
}
</script>
