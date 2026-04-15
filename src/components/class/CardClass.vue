<script setup>
import { useImage } from "@/composables/useImage";
import GlareHover from "@/components/GlareHover.vue";
import ShinyText from "@/components/ShinyText.vue";

const { getProxyUrl, handleImageError } = useImage();

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
];

const classes = [
  { id: 1, title: "HTML Dasar", info: "Dasar pembuatan website" },
  { id: 2, title: "CSS Layouting", info: "Belajar Flexbox & Grid" },
  { id: 3, title: "JavaScript DOM", info: "Interaksi pada website" },
];
</script>

<template>
  <section class="text-center pt-6" id="class">
    <!-- Title -->
    <ShinyText
      text="Jelajahi Kelas"
      color="#3f58ee"
      shineColor="#53c1de"
      class="text-3xl font-semibold font-poppins"
    />
    <p class="text-gray-600 font-poppins text-sm py-2">
      Temukan berbagai macam kelas yang sesuai dengan minat dan keahlian Anda.
    </p>
    <section
      class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 py-6"
    >
      <!-- SIDEBAR -->
      <div class="lg:w-1/4 w-full text-left">
        <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 class="text-lg font-semibold mb-5 text-gray-800">
            Kategori Kelas
          </h3>

          <ul class="space-y-3 text-sm">
            <li
              v-for="(cat, i) in categories"
              :key="i"
              class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-50 hover:shadow-sm transition group border border-gray-100"
            >
              {{ cat }}
            </li>
          </ul>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="lg:w-3/4 w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- CARD -->
          <GlareHover
            v-for="(item, index) in classes"
            :key="index"
            class="rounded-2xl overflow-hidden"
            background="#ffffff"
            border-color="#e5e7eb"
            border-radius="16px"
            glare-color="#93c5fd"
            :glare-opacity="0.2"
            :glare-size="250"
            :transition-duration="700"
          >
            <div class="p-7 text-start">
              <!-- Icon -->
              <div
                class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-orange-100 p-2"
              >
                <img
                  :src="getProxyUrl('courses/1776173443_69de4183a9c58.jpg')"
                  alt="HTML Icon"
                  @error="handleImageError"
                />
              </div>

              <!-- Title -->
              <h3 class="text-lg font-semibold mb-2 font-poppins">
                {{ item.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm text-gray-500 leading-relaxed">
                {{ item.info }}
              </p>

              <!-- Button -->
              <button
                class="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:to-blue-400 font-semibold"
              >
                Coba Kelas
              </button>
            </div>
          </GlareHover>
        </div>
      </div>
    </section>
  </section>
</template>
