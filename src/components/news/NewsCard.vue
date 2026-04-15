<script setup>
import GlareHover from "../GlareHover.vue";
import { useImage } from "@/composables/useImage";

const { getProxyUrl, handleImageError } = useImage();
</script>

<template>
  <h2 class="text-3xl font-semibold text-center text-gray-800 mb-4 font-poppins">
    Artikel Dan Berita Terbaru
  </h2>
  <section class="max-w-6xl mx-auto px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     
    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>

    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>

    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>

    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>

    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>

    <GlareHover
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- FULL IMAGE -->
      <div class="overflow-hidden rounded-t-xl">
        <img 
          src="../../assets/images/news/newsimg.webp" 
          alt="HTML"
          class="w-full h-48 object-cover transition duration-500 "
          @error="handleImageError"
        >
      </div>

      <!-- CONTENT -->
      <div class="p-6 text-start">

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
          Baca Artikel
        </button>

      </div>

    </GlareHover>
  </section>
   <div class="flex justify-end px-10 mt-10">
  
  <img 
    src="../../assets/images/pattern3.png" 
    alt="" 
    class="w-[200px] opacity-60 rotate-[12deg] ml-10"
    @error="handleImageError"
  />

</div>
</template>