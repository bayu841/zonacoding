<script setup>
import { PlayCircle, Award, CheckCircle2 } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  course: { type: Object, required: true }
})

const emit = defineEmits(['click'])
const { getProxyUrl, handleImageError, isEmoji } = useImage()
</script>

<template>
  <!-- Ongoing Style -->
  <div v-if="course.status === 'ongoing'" 
       @click="emit('click')"
       class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all">
    <div class="aspect-video relative overflow-hidden bg-gray-100 flex items-center justify-center">
      <template v-if="course.cover && isEmoji(course.cover)">
        <span class="text-6xl">{{ course.cover.includes('/storage/') ? course.cover.split('/').pop() : course.cover }}</span>
      </template>
      <img v-else :src="getProxyUrl(course.cover)" alt="Cover" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" @error="handleImageError" />
      <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
        <div class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          <PlayCircle class="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    </div>
    <div class="p-5">
      <h4 class="font-bold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">{{ course.title }}</h4>
      <p class="text-sm text-gray-500 font-medium mb-4">Mentor: {{ course.mentor }}</p>
      
      <div class="space-y-2">
        <div class="flex justify-between text-sm font-bold text-gray-600">
          <span>Progres Kelas</span>
          <span :class="`text-${course.color}-600`">{{ course.progress }}%</span>
        </div>
        <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div :class="`h-full bg-${course.color}-500 rounded-full transition-all duration-1000`" :style="{ width: `${course.progress}%` }"></div>
        </div>
        <p class="text-xs font-semibold text-gray-400 text-right">{{ course.completedLessons }} dari {{ course.totalLessons }} Materi</p>
      </div>
    </div>
  </div>

  <!-- Completed Style -->
  <div v-else 
       @click="emit('click')"
       class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 flex gap-4 items-center cursor-pointer hover:border-emerald-200 transition-colors group">
    <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
      <CheckCircle2 class="w-8 h-8" />
    </div>
    <div class="flex-1">
      <h4 class="font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">{{ course.title }}</h4>
      <p class="text-sm text-gray-500">{{ course.totalLessons }} Materi Selesai</p>
      <div class="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 inline-flex items-center px-2 py-1 rounded-md border border-emerald-100">
        <Award class="w-3.5 h-3.5 mr-1" /> Unduh Sertifikat
      </div>
    </div>
  </div>
</template>
