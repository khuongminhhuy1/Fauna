<template>
  <main class="flex-grow w-full">
    <!-- Hero Section (First Section) -->
    <div class="flex flex-col justify-center items-center h-screen px-4 text-white text-center">
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
        Welcome to
        <span
          class="bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text"
        >
          Faumart
        </span>
      </h1>
      <p class="pt-8 sm:pt-10 text-lg max-w-3xl mx-auto">
        Welcome to Faumart, your ultimate destination for premium-quality collectible figures and
        memorabilia! Whether you're an avid collector, an anime enthusiast, a superhero fan, or just
        looking for the perfect gift, we've got you covered.
      </p>
      <div class="flex flex-col sm:flex-row w-full justify-center items-center pt-20">
        <img src="/images/angy-fauna.jpeg" class="w-[200px] h-[150px] rounded-lg" alt="" />
        <p class="text-center sm:text-left sm:ml-4">
          Plssssssssssss buy something for this cute kirin or she angy
        </p>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-full h-0.5 bg-gray-200 my-8"></div>

    <!-- Category Section (Scrollable Content) -->
    <div class="w-full sm:w-10/12 mx-auto">
      <CategorySector />
    </div>

    <!-- Divider -->
    <div class="w-full h-0.5 bg-gray-200 my-8"></div>

    <div class="w-full sm:w-10/12 mx-auto justify-center items-center">
      <BenefitSector />
    </div>

    <!-- Divider -->
    <div class="w-full h-0.5 bg-gray-200 my-8"></div>

    <div class="">
      <ProducSector />
    </div>
  </main>
</template>

<script>
import CategorySector from '@/components/Sector/CategorySector.vue'
import BenefitSector from '../Sector/BenefitSector.vue'
import ProducSector from '../Sector/ProductSector.vue'
export default {
  name: 'MainPage',
  components: {
    CategorySector,
    BenefitSector,
    ProducSector,
  },
}
</script>
