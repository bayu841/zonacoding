<script setup>
import { ref, onMounted, computed } from "vue";

// FULL TEXT (gabung semua)
const fullText = "Pilih kelas favoritmu dan mulai belajar sekarang";

const typedText = ref("");
let index = 0;

// typing effect
onMounted(() => {
  const interval = setInterval(() => {
    if (index < fullText.length) {
      typedText.value += fullText[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 60);
});

// animasi gambar
const showImage = ref(false);

onMounted(() => {
  setTimeout(() => {
    showImage.value = true;
  }, 300);
});

// pisahkan teks biasa & highlight
const beforeText = computed(() => {
  return typedText.value.replace("sekarang", "");
});

const highlightText = computed(() => {
  return typedText.value.includes("sekarang") ? "sekarang" : "";
});
</script>
<template>
  <section class="min-h-screen flex items-center px-4 md:px-6 pt-20 
  bg-no-repeat bg-right bg-cover 
  bg-gradient-to-r from-[#f4f4f4] via-[#fbffff] to-[#e8fafa]">

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
      
      <!-- KIRI (TEXT) -->
      <div class="md:w-1/2 text-center md:text-left px-4 md:px-12 py-3">
        
        <h1 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
          {{ beforeText }}
          <span class="text-blue-500">{{ highlightText }}</span>
        </h1>

        <p class="mt-4 text-gray-600 text-base sm:text-lg">
            Belajar jadi lebih mudah dengan berbagai kelas yang bisa kamu pilih sesuai minat dan waktu belajarmu.
        </p>

        <div class="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
          
          <button class="bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white px-6 py-3 rounded-lg 
          hover:translate-y-[-4px] transition w-full sm:w-auto">
            Jelajahi Kelas
          </button>
        </div>
      </div>

      <!-- KANAN (IMAGE) -->
      <div class="md:w-1/2">
        <img 
          src="/src/assets/images/class/hero.png" 
          alt="Hero Image"
          class="w-60 sm:w-80 md:w-full max-w-md mx-auto transition-all duration-700 ease-out float"
        />
      </div>
    </div>
  </section>
  <img src="../../assets/images/pattern2.png" alt="" class="w-[200px] rotate-12">
</template>