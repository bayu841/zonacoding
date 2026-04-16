<script setup>
import { ref, h } from "vue";

import { useImage } from "@/composables/useImage";
import GlareHover from "@/components/GlareHover.vue";
import ShinyText from "@/components/ShinyText.vue";

const { handleImageError } = useImage();

const activeCategory = ref("Web Development");

const getIcon = (icon) => {
  const baseClass = "w-5 h-5";

  switch (icon) {
    case "globe":
      return h("svg", { class: baseClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "1.8",
          d: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 3 2.5 17 0 20m0-20c-2.5 3-2.5 17 0 20M2 12h20"
        })
      ]);

    case "device-phone-mobile":
      return h("svg", { class: baseClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "1.8",
          d: "M7 4h10v16H7z"
        })
      ]);

    case "paint-brush":
      return h("svg", { class: baseClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "1.8",
          d: "M7 16c.5-2 2-3 4-3s3.5 1 4 3m-8 0a2 2 0 104 0m4 0a2 2 0 104 0"
        })
      ]);

    case "chart-bar":
      return h("svg", { class: baseClass, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "1.8",
          d: "M4 20V10m6 10V4m6 16v-6"
        })
      ]);
  }
};

const categories = [
  { name: "Web Development", icon: "globe" },
  { name: "Mobile Development", icon: "device-phone-mobile" },
  { name: "UI/UX Design", icon: "paint-brush" },
  { name: "Data Science", icon: "chart-bar" },
];

const classes = [
  {
    id: 1,
    title: "HTML Dasar",
    category: "Web Development",
    image: new URL("@/assets/images/html.webp", import.meta.url).href,
    price: "Gratis!",
  },
  {
    id: 2,
    title: "CSS Layouting",
    category: "Frontend",
    image: new URL("@/assets/images/css.webp", import.meta.url).href,
    price: "Rp. 100.000",
  },
  {
    id: 3,
    title: "JavaScript DOM",
    category: "Programming",
    image: new URL("@/assets/images/js.webp", import.meta.url).href,
    price: "Rp. 150.000",
  },
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

    <section class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 py-6">
      
      <!-- SIDEBAR -->
      <div class="lg:w-1/4 w-full">
        <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24">

          <h3 class="text-lg font-semibold mb-5 text-gray-800">
            Kategori Kelas
          </h3>

          <ul class="space-y-3">
            <li
              v-for="(cat, i) in categories"
              :key="i"
              @click="activeCategory = cat.name"
              class="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border"
              :class="activeCategory === cat.name
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border-transparent'
                : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-100'"
            >
              <div class="flex items-center gap-3">
                <component :is="getIcon(cat.icon)" />

                <span class="text-sm font-medium">
                  {{ cat.name }}
                </span>
              </div>

              <span
                v-if="activeCategory === cat.name"
                class="w-2 h-2 bg-white rounded-full"
              ></span>
            </li>
          </ul>

        </div>
      </div>

      <!-- CONTENT -->
      <div class="lg:w-3/4 w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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
                @error="handleImageError"
              />

              <span class="absolute top-3 left-3 bg-white/90 text-xs px-3 py-1 rounded-full shadow text-gray-600">
                {{ item.category }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-5 text-left">
              <h3 class="font-semibold text-base leading-snug group-hover:text-blue-600 transition">
                {{ item.title }}
              </h3>

              <p class="text-xs text-gray-400 mt-1">By Zona Coding</p>

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
          </GlareHover>

        </div>
      </div>
    </section>
  </section>
  <img src="../../assets/images/class/pattern1.png" alt="" class="w-40 ml-10">
</template>