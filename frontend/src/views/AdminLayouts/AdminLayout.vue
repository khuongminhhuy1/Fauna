<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-blue-900 text-white">
        <div class="p-4 text-center text-xl font-bold">
          Admin Panel
        </div>
        <nav>
          <ul>
            <li v-for="link in links" :key="link.name">
              <router-link
                :to="link.path"
                class="block px-4 py-2 hover:bg-blue-700"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Content -->
        <main class="flex-1 p-6 overflow-auto">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { name: 'Dashboard', path: '/' },
          { name: 'Users', path: '/users' },
        ],
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style>
  /* You can add custom styles here */
  </style>
  