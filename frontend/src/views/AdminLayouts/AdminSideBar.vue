<template>
  <div class="relative h-screen flex">
    <!-- Sidebar -->
    <div
      :class="[
        ' transition-transform duration-300 ease-in-out transform h-full bg-white flex flex-col justify-between items-center py-6 border',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:w-[80px]',
      ]"
    >
      <!-- Top Section -->
      <div class="space-y-8">
        <ul class="flex flex-col items-center space-y-8">
          <li class="text-gray-600">
            <i class="fa-solid fa-gear text-xl"></i>
          </li>
          <!-- Add more icons here if needed -->
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <router-link to="/admin/users"><i class="fa-solid fa-users text-xl"></i></router-link>
          </li>
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <router-link to="/admin/categories"
              ><i class="fa-solid fa-icons text-xl"></i
            ></router-link>
          </li>
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <router-link to="/admin/products"
              ><i class="fa-brands fa-product-hunt text-xl"></i
            ></router-link>
          </li>
        </ul>
      </div>

      <!-- Bottom Section -->
      <div class="flex flex-col items-center space-y-8">
        <ul class="flex flex-col items-center space-y-8">
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <i class="fa-solid fa-comment"></i>
          </li>
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <i class="fa-solid fa-list-check"></i>
          </li>
          <li class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <i class="fa-solid fa-right-from-bracket"></i>
          </li>
        </ul>
      </div>
    </div>
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
