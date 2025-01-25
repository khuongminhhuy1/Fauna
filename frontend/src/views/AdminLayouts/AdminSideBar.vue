<template>
  <div
    class="transition-transform duration-300 ease-in-out transform h-full bg-gray-800 text-white flex flex-col justify-between py-6"
    :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full', 'md:translate-x-0 md:w-[80px]']"
  >
    <!-- Top Section -->
    <ul class="space-y-6">
      <li>
        <router-link
          to="/admin/users"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-solid fa-users text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link
          to="/admin/categories"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-solid fa-icons text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link
          to="/admin/products"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-brands fa-product-hunt text-xl"></i>
        </router-link>
      </li>
      <li>
        <router-link
          to="/admin/orders"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-brands fa-product-hunt text-xl"></i>
        </router-link>
      </li>
    </ul>

    <!-- Bottom Section -->
    <ul class="space-y-6">
      <li>
        <router-link
          to="/admin/settings"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-solid fa-gear"></i>
        </router-link>
      </li>
      <li>
        <router-link
          to="/logout"
          class="block p-4 hover:bg-gray-600 text-center"
          active-class="bg-gray-600"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdminSideBar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
