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
    { threshold: 0.6}
  );

  if (section) observer.observe(section);
});
</script>
<template>
  <section id="about"
  class="py-40 px-6 transition-all duration-500"
  :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
    <div class="max-w-6xl mx-auto grid md:  grid-cols-2 gap-10 items-center">
      
        <!-- IMAGE -->
        <div 
          class="flex justify-center transition-all duration-500 delay-200"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
          >
          <img 
            src="../assets/images/logo.png"
            alt="About Image"
            class="w-80"
          />
        </div>

      <!-- TEXT -->
      <div>
        <p class="font-bold text-blue-500 py-2 font-medium">Tentang Kami</p>
        <h1 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 font-poppins">
          Apa Itu NextSkill ?
        </h1>

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

<style scoped>
/* tambahan styling jika diperlukan */
</style>