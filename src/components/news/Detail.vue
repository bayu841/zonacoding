<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Ambil ID dari URL
const id = route.params.id;

// Dummy data
const newsList = [
  {
    id: 1,
    title: "Belajar Coding dari Nol",
    image: new URL("../../assets/images/news/newsimg.webp", import.meta.url)
      .href,
    author: "Zona Coding",
    date: "12 April 2026",
    content: `Belajar coding dari nol bukan hal yang sulit jika dilakukan dengan cara yang tepat. 
    Kamu bisa mulai dari HTML, CSS, lalu lanjut ke JavaScript. Dengan latihan yang konsisten, 
    kamu akan terbiasa dan bisa membuat project sendiri.

    Selain itu, penting untuk memahami konsep dasar terlebih dahulu sebelum masuk ke framework. 
    Jangan terburu-buru, nikmati proses belajarnya.`,
  },
];

// Ambil data berdasarkan ID
const news = newsList.find((item) => item.id == id);
</script>

<template>
  <section class="py-24 px-4 md:px-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- BACK -->
      <button
        @click="router.back()"
        class="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Kembali
      </button>

      <!-- NOT FOUND -->
      <div v-if="!news" class="text-center text-gray-500 py-20">
        Berita tidak ditemukan
      </div>

      <!-- CONTENT -->
      <div v-else>
        <!-- IMAGE HERO -->
        <div class="relative mb-6">
          <img
            :src="news.image"
            class="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md"
          />

          <!-- overlay gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"
          ></div>

          <!-- title di atas gambar -->
          <h1
            class="absolute bottom-4 left-4 right-4 text-white text-xl md:text-2xl font-semibold leading-tight"
          >
            {{ news.title }}
          </h1>
        </div>

        <!-- META INFO -->
        <div
          class="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6"
        >
          <span
            class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ news.author }}
          </span>
          <span>•</span>
          <span>{{ news.date }}</span>
        </div>

        <!-- CONTENT -->
        <div
          class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ news.content }}
          </p>
        </div>

        <!-- ACTION -->
        <div class="mt-8 flex justify-end items-center">
          <button
            @click="router.back()"
            class="text-gray-600 hover:text-blue-600 transition"
          >
            ← Kembali ke berita
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
