<script setup>
import { ref, onMounted, computed } from "vue";

// FULL TEXT (gabung semua)
const fullText = "Belajar  Lebih Mudah di NextSkill";

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
     <section class="min-h-screen flex items-center px-6 pt-12 bg-no-repeat bg-right bg-cover bg-gradient-to-r from-[#f4f4f4]  via-[#fbffff] to-[#e8fafa]">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
    
    <!-- KIRI (TEXT) -->
    <div class="md:w-1/2 text-center md:text-left px-12 py-3">
      <h1 class="font-poppins text-4xl md:text-5xl font-bold leading-tight text-gray-800 gap-3">
            {{ beforeText }}
          <span class="text-blue-500">{{ highlightText }}</span>
      </h1>

      <p class="mt-4 text-gray-600 text-lg">
        Tingkatkan skill kamu dengan materi berkualitas, mentor berpengalaman, dan pembelajaran yang fleksibel.
      </p>

      <div class="mt-6 flex justify-center md:justify-start gap-4">
        <button class="bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white px-6 py-3 rounded-lg 
        hover:translate-y-[-4px] transition">
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
    class="w-full max-w-md mx-auto  transition-all duration-700 ease-out"
    :class="showImage 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-10'"
  />
</div>
  </div>
</section>
</template>