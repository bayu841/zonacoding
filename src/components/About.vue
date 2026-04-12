<script setup>
import { ref, onMounted } from "vue";

const isVisible = ref(false);

onMounted(() => {
  const section = document.querySelector("#about");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.5 }
  );

  if (section) observer.observe(section);
});
</script>

<template>
  <section 
    id="about"
    class="py-14 px-20 md:px-6 transition-all duration-500"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <!-- FIX TYPO DI SINI -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      <!-- IMAGE -->
      <div 
        class="flex justify-center transition-all duration-500 delay-200"
        :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
      >
        <img 
          src="../assets/images/logo.webp"
          alt="About Image"
          class="w-40 sm:w-56 md:w-80"
        />
      </div>

      <!-- TEXT -->
      <div>
        <p class="text-blue-500 font-medium">
          Tentang Kami
        </p>
        <div class="flex items-center gap-20 mb-2">
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-800 font-poppins">
            Apa Itu NextSkill ?
          </h1>
          <img src="../assets/images/pattern1.webp" alt="" class="w-[69px] float">
       </div>
        <p class="text-gray-600 mb-4">
          Kami adalah platform pembelajaran online yang membantu kamu belajar coding dengan cara yang lebih mudah, cepat, dan menyenangkan.
        </p>

        <p class="text-gray-600 mb-6">
          Dengan materi yang terstruktur, mentor berpengalaman, dan project nyata, kamu bisa meningkatkan skill dan siap masuk dunia kerja.
        </p>
      </div>

    </div>
  </section>
</template>