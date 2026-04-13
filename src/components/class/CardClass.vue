<script setup>
import ShinyText from "../ShinyText.vue";
import GlareHover from "../GlareHover.vue";
import javaImg from "../../assets/images/java.webp";
import githubImg from "../../assets/images/github.webp";
import phpImg from "../../assets/images/php.webp";
import bootstrapImg from "../../assets/images/bootstrap.webp";

const categories = [
  { name: "Semua Kelas", color: "blue" },
  { name: "HTML & CSS", color: "orange" },
  { name: "JavaScript", color: "yellow" },
  { name: "UI/UX Design", color: "pink" },
  { name: "Framework", color: "green" },
];

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
  <section class="text-center pt-6">

    <!-- Title -->
    <ShinyText
      text="Jelajahi Kelas"
      color="#3f58ee"
      shineColor="#53c1de"
      class="text-3xl font-semibold font-poppins pb-6"
    />

    <section class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 py-6">

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
              class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                     hover:bg-blue-50 hover:shadow-sm transition group border border-gray-100"
            >
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="font-medium text-gray-700 group-hover:text-blue-600">
                {{ cat.name }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Decoration -->
        <div class="rotate-12 py-20 hidden sm:block">
          <img src="../../assets/images/class/pattern1.png" class="w-[180px] opacity-70" />
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
            <div class="group hover:-translate-y-2 transition duration-300">

              <!-- Image -->
              <div class="relative overflow-hidden">
                <img
                  :src="item.image"
                  class="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                />

                <!-- Badge -->
                <span class="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full shadow text-gray-600">
                  {{ item.category }}
                </span>
              </div>

              <!-- Content -->
              <div class="p-4 text-left">

                <!-- Title -->
                <h3 class="font-semibold text-sm leading-snug group-hover:text-blue-600 transition">
                  {{ item.title }}
                </h3>

                <!-- Author -->
                <p class="text-xs text-gray-400 mt-1">
                  By Next Skill
                </p>

                <!-- Price -->
                <div class="flex justify-between items-center mt-4">
                  <span
                    :class="item.price === 'Gratis!'
                      ? 'text-purple-600 font-bold'
                      : 'text-blue-600 font-bold'"
                  >
                    {{ item.price }}
                  </span>

                  <button class="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition">
                    Detail
                  </button>
                </div>

              </div>
            </div>
          </GlareHover>

        </div>

      </div>

    </section>
  </section>
</template>