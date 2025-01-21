<template>
  <div class="relative">
    <input
      type="text"
      v-bind:value="searchQuery"
      v-on:input="onSearchChange"
      v-on:keydown.enter="onEnterPress"
      class="bg-transparent border border-transparent focus:border-emerald-600 h-[42px] px-5 pr-10 rounded-lg text-white text-sm focus:bg-gray-900 focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64"
      placeholder="Search..."
      @focus="expandSearchBar"
      @blur="collapseSearchBar"
    />
    <button type="submit" class="absolute right-0 top-0 mt-2 mr-[22px] text-emerald-600">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>

<script>
import { SearchProduct } from '@/services/productServices' // Adjust the import path as needed

export default {
  name: 'SearchBtn',
  props: {
    searchQuery: {
      // Receive the searchQuery prop from the parent component
      type: String,
      default: '',
    },
  },
  methods: {
    // Emit the updated search query back to the parent component
    onSearchChange(event) {
      const updatedQuery = event.target.value // Get the input value
      this.$emit('update:searchQuery', updatedQuery) // Emit the update event
    },
    onEnterPress() {
      // When Enter is pressed, redirect to the search page with the query
      this.$router.push({ name: 'search', query: { query: this.searchQuery } })
    },
    expandSearchBar() {
      this.$refs.searchInput.classList.remove('w-12')
      this.$refs.searchInput.classList.add('w-64')
    },
    collapseSearchBar() {
      if (this.searchQuery === '') {
        this.$refs.searchInput.classList.remove('w-64')
        this.$refs.searchInput.classList.add('w-12')
      }
    },
  },
}
</script>
