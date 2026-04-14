<script setup>
import ShinyText from "../components/ShinyText.vue";
import GlareHover from "../components/GlareHover.vue";
import javaImg from "../assets/images/java.webp";
import githubImg from "../assets/images/github.webp";
import phpImg from "../assets/images/php.webp";
import bootstrapImg from "../assets/images/bootstrap.webp";

const classes = [
  {
    title: "Java Fundamental Programming",
    category: "Pemrograman Desktop",
    image: javaImg,
    price: "Rp. 300.000",
  },
  {
    title: "Tutorial Github untuk Pemula",
    category: "Version Control",
    image: githubImg,
    price: "Gratis!",
  },
  {
    title: "Web Development dengan PHP Native",
    category: "Backend Development",
    image: phpImg,
    price: "Rp. 150.000",
  },
  {
    title: "Frontend dengan Bootstrap",
    category: "Frontend Development",
    image: bootstrapImg,
    price: "Rp. 300.000",
  },
];
</script>

<template>
  <!-- Background Pattern -->
  <div class="flex justify-end mr-4">
    <img
      src="../assets/images/pattern3.webp"
      class="w-[200px] rotate-12 opacity-70"
    />
  </div>

  <!-- Section -->
  <section
    class="text-center py-12 bg-gray-50 font-poppins text-gray-800"
    id="topclass"
  >
    <!-- Title -->
    <ShinyText
      text="Jelajahi Kelas Terbaik di ZonaCoding"
      color="#1d4ed8"
      shineColor="#60a5fa"
      class="text-3xl font-bold font-poppins pb-6"
    />

    <p class="text-gray-500 mb-10 text-sm sm:text-base pt-2 px-5">
      Tingkatkan skill kamu dengan kelas berkualitas dari ZonaCoding.
    </p>

    <!-- Grid -->
    <div
      class="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <!-- CARD -->
      <GlareHover
        v-for="(item, index) in classes"
        :key="index"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden group"
      >
        <!-- Image -->
        <div class="relative overflow-hidden">
          <img
            :src="item.image"
            class="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
          />

          <!-- Badge -->
          <span
            class="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full shadow text-gray-600"
          >
            {{ item.category }}
          </span>
        </div>

        <!-- Content -->
        <div class="p-5 text-left">
          <!-- Title -->
          <h3
            class="font-semibold text-base leading-snug group-hover:text-blue-600 transition"
          >
            {{ item.title }}
          </h3>

          <!-- Author -->
          <p class="text-xs text-gray-400 mt-1">By Zona Coding</p>

          <!-- Price + Button -->
          <div class="flex justify-between items-center mt-4">
            <span
              :class="
                item.price === 'Gratis!'
                  ? 'text-purple-600 font-bold'
                  : 'text-blue-600 font-bold'
              "
            >
              {{ item.price }}
            </span>
            <button
              class="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Detail
            </button>
          </div>
        </div>
      </GlareHover>
    </div>

    <!-- Button -->
    <RouterLink
      to="/class"
      class="mt-12 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl"
    >
      Lihat Semua Kelas
    </RouterLink>
  </section>
</template>
