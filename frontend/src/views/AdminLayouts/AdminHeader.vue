<template>
  <div class="navbar bg-neutral text-neutral-content">
    <SidebarToggleButton @toggle="toggleSidebar" />
    <button class="btn btn-ghost text-xl">daisyUI</button>
  </div>
</template>

<script>
import SidebarToggleButton from '@/components/Admin/Btn/SidebarToggleButton.vue'
export default {
  name: 'AdminHeader',
  components: {
    SidebarToggleButton,
  },
  props: {
    toggleSidebar: {
      type: Function,
      required: true, // Ensure the parent provides a toggle function
    },
  },
}
</script>
