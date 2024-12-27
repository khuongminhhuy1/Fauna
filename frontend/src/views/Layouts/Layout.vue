<template>
  <div class="flex flex-col min-h-screen">
    <main class="w-full">
      <div class="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <MainHeader />
      </div>
      <div class="w-full flex flex-col justify-center items-center flex-grow">
        <div class="w-full">
          <div class="bg-black w-full max-h-screen">
            <div
              class="hero min-h-screen"
              style="background-image: url(../../../public/images/wallpaper.png)"
            >
              <div class="hero-overlay bg-opacity-60"></div>
              <slot name="body"></slot>
            </div>
          </div>
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
