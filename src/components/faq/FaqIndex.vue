<script setup>
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";

// data FAQ
const faqs = ref([
  {
    question: "Apa itu ZonaCoding?",
    answer:
      "ZonaCoding adalah platform pembelajaran online untuk meningkatkan skill kamu dengan mudah dan praktis.",
    open: false,
  },
  {
    question: "Apakah belajar di ZonaCoding gratis?",
    answer:
      "Ada kelas gratis dan juga kelas premium. Kamu bisa pilih sesuai kebutuhan kamu.",
    open: false,
  },
  {
    question: "Bagaimana cara mulai belajar?",
    answer:
      "Cukup daftar akun, pilih kelas, lalu kamu bisa langsung mulai belajar.",
    open: false,
  },
  {
    question: "Apakah bisa belajar kapan saja?",
    answer:
      "Bisa banget! Kamu bisa belajar kapan pun dan di mana pun tanpa batas waktu.",
    open: false,
  },
]);

const toggleFAQ = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};
</script>

<template>
  <section class="max-w-4xl mx-auto px-4">
    <h2
      class="text-3xl font-semibold text-center text-gray-800 mb-10 font-poppins"
    >
      Frequently Asked Questions
    </h2>

    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="border rounded-xl bg-white shadow-sm overflow-hidden transition"
      >
        <!-- QUESTION -->
        <button
          @click="toggleFAQ(index)"
          class="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
        >
          <span class="font-medium text-gray-800 font-poppins">
            {{ faq.question }}
          </span>

          <!-- ICON ROTATE -->
          <ChevronDown
            class="w-5 h-5 text-gray-500 transition-transform duration-300"
            :class="faq.open ? 'rotate-180' : ''"
          />
        </button>

        <!-- ANSWER (SMOOTH ANIMATION) -->
        <transition name="faq">
          <div
            v-show="faq.open"
            class="px-5 pb-5 text-gray-600 text-sm leading-relaxed font-poppins"
          >
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>
  </section>
  <div class="flex justify-end px-10 mt-10">
    <img
      src="../../assets/images/pattern3.webp"
      alt=""
      class="w-[200px] opacity-60 rotate-[12deg] mr-10"
    />
  </div>
</template>
