<script setup>
import { Star, User, Clock, Video } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  course: { type: Object, required: true }
})

const emit = defineEmits(['enroll'])
const { getProxyUrl, handleImageError, isEmoji } = useImage()
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden group hover:shadow-lg transition-all flex flex-col">
    <!-- Thumbnail -->
    <div class="aspect-[4/3] relative overflow-hidden bg-gray-100 flex items-center justify-center">
      <template v-if="course.image && isEmoji(course.image)">
        <span class="text-6xl">{{ course.image.includes('/storage/') ? course.image.split('/').pop() : course.image }}</span>
      </template>
      <img
        v-else
        :src="getProxyUrl(course.image)"
        :alt="course.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        @error="handleImageError"
      />
      <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 uppercase tracking-wide">
        {{ course.category }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-1 text-amber-500">
          <Star class="w-4 h-4 fill-current" />
          <span class="text-sm font-bold text-gray-800">{{ course.rating }}</span>
          <span class="text-xs text-gray-400 ml-1">({{ course.students }} siswa)</span>
        </div>
        <div class="bg-gray-50 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-gray-100">
          {{ course.level }}
        </div>
      </div>

      <h3 class="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{{ course.title }}</h3>
      <p class="text-gray-500 text-xs line-clamp-2 mb-4 h-8">{{ course.description }}</p>

      <div class="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <User class="w-4 h-4" />
        <span class="truncate">{{ course.mentor }}</span>
      </div>

      <!-- Bottom Meta -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-3 text-xs font-semibold text-gray-500">
          <span class="flex items-center gap-1"><Clock class="w-3.5 h-3.5" /> {{ course.hours }}</span>
          <span class="flex items-center gap-1"><Video class="w-3.5 h-3.5" /> {{ course.lessons }}</span>
        </div>

        <div class="font-black text-lg text-indigo-600">
          {{ course.price }}
        </div>
      </div>
    </div>

    <!-- Action Button inside card bottom -->
    <div class="px-5 pb-5 pt-0">
      <button @click="emit('enroll', course)" class="w-full py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white border border-indigo-100 transition-all">
        Beli
      </button>
    </div>
  </div>
</template>
