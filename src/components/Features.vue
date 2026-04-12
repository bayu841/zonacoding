<script setup>
import { BookOpen, Zap, Target, Code2, LineChart, Award } from "lucide-vue-next";
</script>

<template>
  <!-- PATTERN TOP -->
  <div class="flex justify-end">
  <img src="../assets/images/pattern6.webp" alt="" class="w-[180px] ">
  </div>

  <section class="text-center px-6 mb-16">

    <p class="text-blue-500 font-medium mb-2">Fitur Unggulan</p>

    <h2 class="text-3xl font-semibold mb-10 font-poppins text-gray-800">
      Upgrade Skill Mu Bersama Fitur <br />
      Unggulan NextSkill
    </h2>

    <!-- GRID -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto font-poppins">

      <!-- CARD 1 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <BookOpen class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Materi Terstruktur</h3>
        <p class="text-gray-500 text-sm">
          Belajar dengan materi yang tersusun rapi dari dasar hingga mahir.
        </p>
      </div>

      <!-- CARD 2 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <Zap class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Belajar Cepat</h3>
        <p class="text-gray-500 text-sm">
          Metode pembelajaran yang membantu kamu memahami materi lebih cepat.
        </p>
      </div>

      <!-- CARD 3 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <Target class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Fokus Skill</h3>
        <p class="text-gray-500 text-sm">
          Fokus pada skill yang benar-benar dibutuhkan di dunia kerja.
        </p>
      </div>

      <!-- CARD 4 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <Code2 class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Praktik Langsung</h3>
        <p class="text-gray-500 text-sm">
          Belajar dengan praktik langsung agar lebih mudah dipahami.
        </p>
      </div>

      <!-- CARD 5 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <LineChart class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Progress Tracking</h3>
        <p class="text-gray-500 text-sm">
          Pantau perkembangan belajar kamu secara real-time.
        </p>
      </div>

      <!-- CARD 6 -->
      <div class="p-6 bg-gray-50 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
          <Award class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-800">Sertifikat</h3>
        <p class="text-gray-500 text-sm">
          Dapatkan sertifikat sebagai bukti kemampuan kamu.
        </p>
      </div>

    </div>
  </div>
</section>
  <img src="../assets/images/pattern7.webp" alt="" class="w-[100px] float mb-2 ml-3 ">
</template>