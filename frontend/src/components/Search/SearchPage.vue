<template>
    <div>
      <h1>Search Results for "{{ searchQuery }}"</h1>
      <!-- Render the search results based on the searchQuery -->
      <div v-if="products.length">
        <div v-for="product in products" :key="product.id">
          <h3>{{ product.name }}</h3>
          <!-- Display other product details -->
        </div>
      </div>
      <p v-else>No products found for "{{ searchQuery }}"</p>
    </div>
  </template>
  
  <script>
  import { SearchProduct } from '@/services/productService'; // Adjust the import path as needed
  
  export default {
    name: 'SearchPage',
    data() {
      return {
        searchQuery: this.$route.query.query || '', // Get query from URL
        products: [], // Store search results
      };
    },
    watch: {
      // Watch for changes in the search query in case the URL changes
      '$route.query.query': 'fetchSearchResults'
    },
    mounted() {
      this.fetchSearchResults();
    },
    methods: {
      async fetchSearchResults() {
        try {
          if (this.searchQuery) {
            const results = await SearchProduct(this.searchQuery); // Fetch search results
            this.products = results; // Update products based on search query
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    }
  }
  </script>
  