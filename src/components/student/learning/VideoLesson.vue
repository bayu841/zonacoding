<script setup>
import { PlayCircle } from "lucide-vue-next";

defineProps({
  lesson: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col">
    <!-- Mock Player -->
    <div
      class="w-full aspect-video bg-gray-900 relative group flex items-center justify-center isolate overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200&h=675"
        alt="Video Thumbnail"
        class="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div
        class="w-20 h-20 bg-indigo-600/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-indigo-500 transition-all z-10 shadow-[0_0_30px_rgba(79,70,229,0.5)]"
      >
        <PlayCircle class="w-10 h-10 ml-1" />
      </div>
    </div>

    <!-- Video Info -->
    <div class="p-6 md:p-8">
      <div class="flex items-center gap-2 mb-3">
        <span
          class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
          >Video Lesson</span
        >
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
        {{ lesson?.title }}
      </h1>
      <p class="text-gray-600 leading-relaxed">
        Platform ZonaCoding memastikan resolusi otomatis menyesuaikan dengan
        kualitas koneksi internet Anda. Jangan lupa menyiapkan catatan.
      </p>
    </div>
  </div>
</template>
