<script setup>
import ShinyText from "../ShinyText.vue";
import GlareHover from "../GlareHover.vue";
</script>

<template>
  <section class="text-center bg-cover bg-center pt-2">
    <ShinyText
      text="Jelajahi Kelas"
      color="#3f58ee"
      shineColor="#53c1de"
      className="text-3xl font-semibold font-poppins pb-4"
    />
    <section class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 py-10">
        <div class="lg:w-1/4 w-full text-left">
 <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full">

  <h3 class="text-lg font-semibold font-poppins mb-5 text-gray-800">
    Kategori Kelas
  </h3>

   <ul class=" text-sm">

  <!-- Semua Kelas -->
  <li class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
             bg-white hover:bg-blue-50 hover:shadow-sm
             transition-all duration-200 group border border-gray-100">

    <div class="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 text-blue-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    </div>

    <span class="font-medium text-gray-700 group-hover:text-blue-600">
      Semua Kelas
    </span>
  </li>

  <!-- HTML -->
  <li class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
             bg-white hover:bg-blue-50 hover:shadow-sm
             transition-all duration-200 group border border-gray-100">

    <div class="p-2 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 text-orange-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    </div>

    <span class="font-medium text-gray-700 group-hover:text-blue-600">
      HTML & CSS
    </span>
  </li>

  <!-- JavaScript -->
  <li class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
             bg-white hover:bg-blue-50 hover:shadow-sm
             transition-all duration-200 group border border-gray-100">

    <div class="p-2 rounded-lg bg-yellow-100 group-hover:bg-yellow-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 text-yellow-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m2 4v-4m-2 0h2m-2 4h2" />
      </svg>
    </div>

    <span class="font-medium text-gray-700 group-hover:text-blue-600">
      JavaScript
    </span>
  </li>

  <!-- UI/UX -->
  <li class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
             bg-white hover:bg-blue-50 hover:shadow-sm
             transition-all duration-200 group border border-gray-100">

    <div class="p-2 rounded-lg bg-pink-100 group-hover:bg-pink-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 text-pink-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c1.5-2 4-2 5.5 0S18 13 16 15l-4 4-4-4C6 13 6 10 7.5 8S10.5 6 12 8z" />
      </svg>
    </div>

    <span class="font-medium text-gray-700 group-hover:text-blue-600">
      UI/UX Design
    </span>
  </li>

  <!-- Framework -->
  <li class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
             bg-white hover:bg-blue-50 hover:shadow-sm
             transition-all duration-200 group border border-gray-100">

    <div class="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5 text-green-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4" />
      </svg>
    </div>

    <span class="font-medium text-gray-700 group-hover:text-blue-600">
      Framework
    </span>
  </li>

</ul>
    </div>
<div class="rotate-12 py-24 hidden sm:block">
  <img src="../../assets/images/class/pattern1.png" alt="" class="w-[200px] ml-8 float">
</div>
</div>
<div class="lg:w-3/4 w-full">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2 ">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>

    </div>
</GlareHover>
 <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2 ">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>

    </div>
</GlareHover>
        <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>

    </div>
</GlareHover>
        <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>

    </div>
</GlareHover>
        <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>

    </div>
</GlareHover>
        <GlareHover
            class="w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="12px"
            glare-color="#93c5fd"
            :glare-opacity="0.25"
            :glare-size="250"
            :transition-duration="700"
            >
        <div class="p-7 text-start">
        
        <!-- Icon -->
        <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2">
        <img src="../../assets/images/html.png" alt="HTML Icon">
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2 font-poppins">
        Kelas HTML Dasar
        </h3>
        
        <!-- Description -->
        <p class="text-sm text-gray-500 leading-relaxed">
            Kelas HTML Dasar adalah kelas yang mempelajari dasar-dasar pembuatan website menggunakan HTML, mulai dari struktur halaman, teks, gambar, link, hingga form sederhana.
        </p>

        <!-- Button -->
        <button class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold">
        Coba Kelas
        </button>
    </div>
    </GlareHover>
    </div>
    </div>
    </section>
  </section>
</template>