<script setup>
import { ref, onMounted, computed } from "vue";

// FULL TEXT (FAQ HERO)
const fullText = "Masih Bingung? Yuk Cari Tahu Jawabannya di FAQ";

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
  }, 55);
});

// animasi gambar
const showImage = ref(false);

onMounted(() => {
  setTimeout(() => {
    showImage.value = true;
  }, 300);
});

// highlight kata "FAQ"
const beforeText = computed(() => {
  return typedText.value.replace("FAQ", "");
});

const highlightText = computed(() => {
  return typedText.value.includes("FAQ") ? "FAQ" : "";
});
</script>

<template>
  <section
    class="min-h-screen flex items-center px-4 md:px-6 pt-16 
    bg-gradient-to-r from-white via-blue-50 to-indigo-50"
  >
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20"
    >
      <!-- KIRI (TEXT) -->
      <div class="md:w-1/2 text-center md:text-left px-4 md:px-12 py-3">
        
        <h1 class="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
          {{ beforeText }}
          <span class="text-blue-600">{{ highlightText }}</span>
        </h1>

        <p class="mt-4 text-gray-600 text-base sm:text-lg">
          Temukan jawaban dari pertanyaan yang sering diajukan, atau hubungi tim support jika butuh bantuan lebih lanjut.
        </p>
      </div>

      <!-- KANAN (IMAGE) -->
      <div class="md:w-1/2">
        <img
          src="/src/assets/images/faq/herofaq.png"
          alt="FAQ Hero"
          class="w-72 sm:w-80 md:w-[500px] lg:w-[500px] max-w-none mx-auto transition-all duration-700 ease-out"
          :class="showImage
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'"
        />
      </div>
    </div>
  </section>

  <img
    src="../../assets/images/pattern2.webp"
    alt=""
    class="w-[200px] rotate-12 opacity-60"
  />
</template>