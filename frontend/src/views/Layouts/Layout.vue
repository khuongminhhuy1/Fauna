<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="p-4 w-full">
      <div class="w-full flex flex-col justify-center items-center flex-grow">
        <div class="w-10/12">
          <slot name="body"></slot>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
  },
}
</script>
