<script setup>
import { Star, TrendingUp, Users2, PlayCircle } from 'lucide-vue-next'

defineProps({
  id: Number,
  title: String,
  category: String,
  students: Number,
  rating: Number,
  image: String,
  instructor: String,
  level: String,
  trend: String
})
</script>

<template>
  <div
    class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div class="relative h-40 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div class="absolute top-3 left-3">
        <span
          class="inline-flex items-center rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-lg"
        >
          🔥 Populer
        </span>
      </div>

      <div class="absolute top-3 right-3">
        <span
          class="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow backdrop-blur-sm"
        >
          {{ level }}
        </span>
      </div>
    </div>

    <div class="p-5">
      <div class="mb-2 flex items-start justify-between">
        <div class="flex-1">
          <h4
            class="line-clamp-1 font-semibold text-gray-900 transition-colors group-hover:text-blue-600"
          >
            {{ title }}
          </h4>
          <p class="mt-0.5 text-sm text-gray-500">{{ instructor }}</p>
        </div>
      </div>

      <div class="mb-3 flex items-center gap-2">
        <span
          class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
        >
          {{ category }}
        </span>
      </div>

      <div class="mb-4 flex items-center justify-between text-sm">
        <div class="flex items-center gap-1">
          <Star class="h-4 w-4 fill-amber-400 text-amber-400" />
          <span class="font-semibold text-gray-900">{{ rating }}</span>
          <span class="text-xs text-gray-400">({{ students }})</span>
        </div>

        <div
          class="flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600"
        >
          <TrendingUp class="mr-0.5 h-3 w-3" />
          {{ trend }}
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-gray-100 pt-3">
        <div class="flex items-center text-sm text-gray-500">
          <Users2 class="mr-1 h-4 w-4" />
          {{ students }} siswa
        </div>

        <button
          class="group/btn flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          <PlayCircle class="h-4 w-4" />
          <span>Pratinjau</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
