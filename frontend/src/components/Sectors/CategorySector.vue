<template>
  <div class="">
    <h1 class="text-4xl text-white text-center py-10 font-extrabold tracking-tight sm:text-6xl">
      <span
        class="bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text"
        >Promise </span
      >we have
    </h1>
  </div>
  <div class="w-full">
    <div class="w-full h-96 rounded-lg flex overflow-hidden">
      <div
        class="flex-1 flex items-center justify-center transition-all duration-300 ease-in-out hover:flex-[2] group cursor-pointer relative overflow-hidden bg-[url('/images/IRyS-Background.png')] bg-cover bg-center"
      >
        <img
          src="/images/IRyS.png"
          alt=""
          class="w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-50"
        />
        <span
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-900 text-3xl font-semibold absolute inset-0 flex items-center justify-center"
        >
          Nendroid
        </span>
      </div>
      <div
        class="flex-1 flex items-center justify-center transition-all duration-300 ease-in-out hover:flex-[2] group cursor-pointer relative overflow-hidden bg-[url('/images/Ouro-Kronii-Background.png')] bg-cover bg-center"
      >
        <img
          src="/images/Ouro-Kronii-Smaller.png"
          alt=""
          class="w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-50"
        />
        <span
          class="opacity-0 group-hover:opacity-100 font-semibold transition-opacity duration-300 text-blue-900 text-3xl absolute inset-0 flex items-center justify-center"
        >
          Virtual Youtuber
        </span>
      </div>
      <div
        class="flex-1 flex items-center justify-center transition-all duration-300 ease-in-out hover:flex-[2] group cursor-pointer relative overflow-hidden bg-[url('/images/Ceres-Fauna-Background.png')] bg-cover bg-center"
      >
        <img
          src="/images/Ceres-Fauna.png"
          alt=""
          class="w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-50"
        />
        <span
          class="opacity-0 group-hover:opacity-100 font-semibold transition-opacity duration-300 text-green-600 text-3xl absolute inset-0 flex items-center justify-center"
        >
          Anime
        </span>
      </div>
      <div
        class="flex-1 flex items-center justify-center transition-all duration-300 ease-in-out hover:flex-[2] group cursor-pointer relative overflow-hidden bg-[url('/images/Mumei-Background.png')] bg-cover bg-center"
      >
        <img
          src="/images/Nanashi-Mumei.png"
          alt=""
          class="w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-50"
        />
        <span
          class="opacity-0 group-hover:opacity-100 font-semibold transition-opacity duration-300 text-yellow-900 text-3xl absolute inset-0 flex items-center justify-center"
        >
          Gundam
        </span>
      </div>
      <div
        class="flex-1 flex items-center justify-center transition-all duration-300 ease-in-out hover:flex-[2] group cursor-pointer relative overflow-hidden bg-[url('/images/Hakos-Baelz-Background.png')] bg-cover bg-center"
      >
        <img
          src="/images/Hakos-Baelz.png"
          alt=""
          class="w-full h-full object-cover object-top transition-opacity duration-300 group-hover:opacity-50"
        />
        <span
          class="opacity-0 group-hover:opacity-100 font-semibold transition-opacity duration-300 text-red-900 text-3xl absolute inset-0 flex items-center justify-center"
        >
          Game
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategorySector',
}
</script>
