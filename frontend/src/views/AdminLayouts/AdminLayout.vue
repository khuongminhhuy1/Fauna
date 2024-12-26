<template lang="">
  <div>
    <AdminHeader :toggleSidebar="toggleSidebar" />

    <div class="flex">
      <AdminSideBar :isSidebarOpen="isSidebarOpen" />
      <main class="p-4 w-full h-screen overflow-y-auto">
        <div class="w-full flex flex-col justify-center items-center flex-grow">
          <div class="w-10/12">
            <slot name="body"></slot>
          </div>
        </div>
      </main>
    </div>
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

<style lang=""></style>
