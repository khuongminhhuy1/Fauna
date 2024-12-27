<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <AdminHeader :toggleSidebar="toggleSidebar" />

    <!-- Main Content -->
    <div class="flex flex-grow h-full">
      <!-- Sidebar -->
      <AdminSideBar
        :isSidebarOpen="isSidebarOpen"
        class="transition-all duration-300"
        :class="[isSidebarOpen ? 'w-2/12' : 'w-0', 'md:w-2/12']"
      />

      <!-- Main Slot -->
      <div
        class="flex-grow p-4 transition-all duration-300"
        :class="[isSidebarOpen ? 'w-10/12' : 'w-full', 'md:w-10/12']"
      >
        <div class="w-full flex flex-col justify-center items-center">
          <div class="w-10/12">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from './AdminHeader.vue'
import AdminFooter from './AdminFooter.vue'
import AdminSideBar from './AdminSideBar.vue'

export default {
  name: 'AdminLayout',
  components: { AdminHeader, AdminFooter, AdminSideBar },
  data() {
    return {
      isSidebarOpen: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
  },
}
</script>

<style lang="scss"></style>
