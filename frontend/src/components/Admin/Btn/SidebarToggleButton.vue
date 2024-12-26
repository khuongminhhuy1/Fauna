<template>
    <button
      class="bg-blue-600 text-white p-2 rounded-md focus:outline-none md:hidden"
      @click="$emit('toggle')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12h18m-6-6h6M3 18h6"
        />
      </svg>
    </button>
  </template>
  
  <script>
  export default {
    name: "SidebarToggleButton",
  };
  </script>
  