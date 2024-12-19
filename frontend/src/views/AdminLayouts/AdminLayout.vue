<template lang="">
  <div>
    <AdminHeader />
    <div class="flex">
      <AdminSidebar />
      <main class="p-4 w-full">
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
import AdminSidebar from './AdminSidebar.vue'

export default {
  name: 'AdminLayout',
  components: { AdminHeader, AdminFooter, AdminSidebar },
}
</script>

<style lang=""></style>
