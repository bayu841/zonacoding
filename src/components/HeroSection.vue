<script setup>
import { ref, onMounted, computed } from "vue";
import heroBg from '../assets/images/herobg.png'

// FULL TEXT (gabung semua)
const fullText = "Belajar Coding Lebih Mudah di NextSkill";

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
  return typedText.value.replace("NextSkill", "");
});

const highlightText = computed(() => {
  return typedText.value.includes("NextSkill") ? "NextSkill" : "";
});
</script>
<template>
     <section class="pt-24 px-6 bg-no-repeat bg-right bg-contain"
         :style="{ backgroundImage: `url(${heroBg})` }"

>
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
    
    <!-- KIRI (TEXT) -->
    <div class="md:w-1/2 text-center md:text-left px-10">
      <h1 class="font-poppins text-4xl md:text-5xl font-bold leading-tight">
            {{ beforeText }}
          <span class="text-blue-600">{{ highlightText }}</span>
      </h1>

      <p class="mt-4 text-gray-600 text-lg">
        Tingkatkan skill kamu dengan materi berkualitas, mentor berpengalaman, dan pembelajaran yang fleksibel.
      </p>

      <div class="mt-6 flex justify-center md:justify-start gap-4">
        <button class="bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white px-6 py-3 rounded-lg 
        hover:scale-105 transition">
          Mulai Belajar
        </button>

        <button class="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
          Lihat Kelas
        </button>
      </div>
    </div>

    <!-- KANAN (IMAGE) -->
   <div class="md:w-1/2">
  <img 
    src="/src/assets/images/hero.png" 
    alt="Hero Image"
    class="w-full max-w-md mx-auto py-3 transition-all duration-700 ease-out"
    :class="showImage 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-10'"
  />
</div>
  </div>
</section>
</template>