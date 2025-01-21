<template>
  <div
    class="navbar bg-transparent backdrop-blur-sm sticky top-0 bg-opacity-50 border-b border-gray-300"
  >
    <!-- Left Section: Sidebar Button -->
    <div class="navbar-start">
      <HeaderSideBar />
    </div>

    <!-- Center Section: Logo -->
    <div class="navbar-center">
      <img
        src="/images/logo.png"
        alt="Go back to main page"
        class="w-[150px] cursor-pointer"
        @click="gotoHome"
      />
    </div>

    <!-- Right Section: Login Button -->
    <div class="navbar-end">
      <SearchBtn v-model="searchQuery" />
      <LoginBtn />
    </div>
  </div>
</template>

<script>
import LoginBtn from '@/components/Btn/LoginBtn.vue'
import HeaderSideBar from '@/components/Btn/HeaderSideBar.vue'
import SearchBtn from '@/components/Btn/SearchBtn.vue'

export default {
  name: 'MainHeader',
  components: { LoginBtn, HeaderSideBar, SearchBtn },
  data() {
    return {
      searchQuery: '', // Holds the search query value
    }
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
