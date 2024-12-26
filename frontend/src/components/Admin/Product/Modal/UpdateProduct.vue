<template lang="">
  <!-- Button to open the modal -->
  <button class="btn text-blue-500 bg-transparent border-none shadow-none" @click="openModal">
    <i class="fa-solid fa-pen"></i>
  </button>

  <!-- Modal -->
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <!-- UpdateUserForm component -->
      <UpdateUserForm :userId="userId" @updated="onUserUpdated" @close="closeModal" />
    </div>
    <!-- Modal backdrop -->
    <form method="dialog" class="modal-backdrop" @click="closeModal">
      <button type="button">Close</button>
    </form>
  </dialog>
</template>
<script>
export default {
    name: 'UpdateProduct',
}
</script>
<style lang="">
    
</style>