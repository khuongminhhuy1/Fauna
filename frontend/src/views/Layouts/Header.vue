<template lang="">
  <div
    class="navbar bg-transparent backdrop-blur-sm sticky top-0 bg-opacity-50 border-b border-gray-300 "
  >
    <div class="navbar-start">
      <HeaderSideBar />
    </div>
    <div class="navbar-center">
      <img src="../../../public/images/logo.png" alt="Go back to main page" class="w-[150px]" />
    </div>
    <div class="navbar-end">
      <loginBtn />
    </div>
  </div>
</template>
<script>
import loginBtn from '@/components/Btn/loginBtn.vue'
import HeaderSideBar from '@/components/Btn/HeaderSideBar.vue'
export default {
  name: 'MainHeader',
  components: { loginBtn, HeaderSideBar },
}
</script>
