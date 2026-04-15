<script setup>
import { ref } from "vue";
import { useImage } from "@/composables/useImage";

const isOpen = ref(false);
const { getProxyUrl, handleImageError } = useImage();
</script>

<template>
  <nav class="bg-white shadow-md fixed w-full top-0 left-0 z-50 px-12 font-poppins">
    <div class="flex justify-between items-center px-6 py-4">

      <!-- Logo -->
    <img src="../assets/images/logo.webp" alt="NextSkill"
    class="w-6" @error="handleImageError">

      <!-- Menu Desktop -->
      <ul class="hidden md:flex gap-8 text-gray-700 font-medium">
        <li>
        <router-link to="/" class="hover:text-blue-500">
          Beranda
        </router-link>
      </li>

      <li>
        <router-link to="/class" class="hover:text-blue-500">
          Kelas
        </router-link>
      </li>

      <li>
        <router-link to="/news" class="hover:text-blue-500">
          Berita
        </router-link>
      </li>

      <li>
        <router-link to="/faq" class="hover:text-blue-500">
          FAQ
        </router-link>
      </li>
      </ul>
   <router-link
      to="/login"
      class="hidden md:inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold text-center">
      Login
    </router-link>

      <!-- Hamburger Button -->
      <button 
        @click="isOpen = !isOpen"
        class="md:hidden text-gray-700"
      >
        ☰
      </button>
    </div>

    <!-- Menu Mobile -->
    <div v-if="isOpen" class="md:hidden px-6 pb-4">
      <ul class="flex flex-col gap-4 text-gray-700 font-medium">
      <li>
        <router-link to="/" class="hover:text-blue-500">
          Beranda
        </router-link>
      </li>

      <li>
        <router-link to="/class" class="hover:text-blue-500">
          Kelas
        </router-link>
      </li>

      <li>
        <router-link to="/news" class="hover:text-blue-500">
          Berita
        </router-link>
      </li>

      <li>
        <router-link to="/faq" class="hover:text-blue-500">
          FAQ
        </router-link>
      </li>
   <router-link
    to="/login"
    class="md:inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold text-center">
    Login
  </router-link>
      </ul>
    </div>
  </nav>
</template> 