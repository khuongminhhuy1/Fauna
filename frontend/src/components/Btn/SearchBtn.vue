<template>
  <div class="flex justify-center items-center">
    <div class="relative">
      <input
        type="text"
        class="bg-transparent border border-transparent focus:border-emerald-600 h-[42px] px-5 pr-10 rounded-lg text-white text-sm focus:bg-gray-900 focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64"
        placeholder="Search..."
        onfocus="this.classList.remove('w-12'); this.classList.add('w-64');"
        onblur="if(this.value === '') { this.classList.remove('w-64'); this.classList.add('w-12'); }"
      />
      <button type="submit" class="absolute right-0 top-0 mt-2 mr-[22px] text-emerald-600">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBtn',
}
</script>
