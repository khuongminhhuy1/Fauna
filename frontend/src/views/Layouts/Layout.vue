<template>
  <div class="flex flex-col min-h-screen">
    <MainHeader />
    <main class="p-4 w-full">
      <div class="w-full flex flex-col justify-center items-center flex-grow">
        <div class="w-10/12">
          <slot name="body"></slot>
        </div>
      </div>
    </main>
    <MainFooter />
  </div>
</template>
<script>
import MainHeader from './Header.vue'
import MainFooter from './Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    MainFooter,
  },
}
</script>
