<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <AdminHeader :toggleSidebar="toggleSidebar" />

    <!-- Main Content -->
    <div class="flex flex-grow h-full">
      <!-- Sidebar -->
      <AdminSideBar :isSidebarOpen="isSidebarOpen" class="transition-all duration-300" />

      <!-- Main Content Area -->
      <div class="flex-grow p-4">
        <router-view></router-view>
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
      isSidebarOpen: true,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
  },
}
</script>
