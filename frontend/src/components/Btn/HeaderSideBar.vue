<template lang="">
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn bg-transparent border-none shadow-none drawer-button"
        ><i class="fa-solid fa-bars"></i
      ></label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-gray-900 text-white min-h-full w-80 p-4 border-r border-emerald-600">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderSideBar',
}
</script>
