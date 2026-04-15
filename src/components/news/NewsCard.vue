<script setup>
import GlareHover from "../GlareHover.vue";
import { useImage } from "@/composables/useImage";

const { getProxyUrl, handleImageError } = useImage();

const newsList = [
  {
    id: 1,
    title: "Belajar Coding dari Nol",
    desc: "Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.",
  },
  {
    id: 2,
    title: "Tips Produktivitas Developer",
    desc: "Tingkatkan efisiensi kerja kamu dengan tool dan teknik yang tepat untuk workflow harian.",
  },
];
</script>

<template>
  <h2 class="text-3xl font-semibold text-center text-gray-800 mb-2s font-poppins">
    Artikel Dan Berita Terbaru
  </h2>
 <p class="text-gray-600 font-poppins text-sm text-center pt-3">
    Temukan artikel dan berita terbaru seputar dunia teknologi, pemrograman, <br>
    dan perkembangan digital lainnya.
  </p>
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
        <router-link 
          to="/news/1"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold text-sm"
        >
          Baca Artikel
        </router-link>

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
        <router-link 
          to="/news/1"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold text-sm"
        >
          Baca Artikel
        </router-link>

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
        <router-link 
          to="/news/1"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold text-sm"
        >
          Baca Artikel
        </router-link>

      </div>

    </GlareHover>

    <GlareHover
      v-for="item in newsList"
      :key="item.id"
      class="w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      background="#ffffff"
      border-color="#e5e7eb"
      border-radius="12px"
      glare-color="#93c5fd"
      :glare-opacity="0.25"
      :glare-size="250"
      :transition-duration="700"
    >

      <!-- IMAGE -->
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

        <h3 class="text-lg font-semibold mb-2 font-poppins">
          {{ item.title }}
        </h3>
        
        <p class="text-sm text-gray-500 leading-relaxed">
          {{ item.desc }}
        </p>

        <!-- Button -->
        <router-link 
          :to="`/news/${item.id}`"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold text-sm"
        >
          Baca Artikel
        </router-link>

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
        <h3 class="text-lg font-semibold mb-2 font-poppins">
          Programming
        </h3>
        <p class="text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan coding kamu dengan langkah yang tepat. Pelajari dasar-dasar penting agar tidak bingung di awal.
        </p>
        <router-link 
          to="/news/1"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold"
        >
          Baca Artikel
        </router-link>
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
        <router-link 
          to="/news/1"
          class="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold text-sm"
        >
          Baca Artikel
        </router-link>

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

  <!-- PATTERN -->
  <div class="flex justify-end px-10 mt-10">
    <img 
      src="../../assets/images/pattern3.webp" 
      class="w-[200px] opacity-60 rotate-[12deg] ml-10"
    />
  </div>
</div>
</template>