<script setup>
import { PlayCircle } from 'lucide-vue-next'

defineProps({
  course: { type: Object, required: true }
})

const emit = defineEmits(['click'])
</script>

<template>
  <div class="group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:border-indigo-100 transition-all relative overflow-hidden cursor-pointer" @click="emit('click')">
    <div class="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
      <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path class="text-gray-100" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path :class="`text-${course.color}-500`" stroke-width="3" :stroke-dasharray="`${course.progress}, 100`" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div :class="`w-10 h-10 bg-${course.color}-50 rounded-full flex items-center justify-center z-10`">
        <PlayCircle :class="`w-5 h-5 text-${course.color}-500`" />
      </div>
    </div>

    <div class="flex-1 w-full">
      <h3 class="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-lg line-clamp-1">{{ course.title }}</h3>
      <p class="text-sm text-gray-500 mt-1 flex items-center gap-2">
        Oleh <span class="font-semibold text-gray-700">{{ course.mentor }}</span> 
        <span class="w-1 h-1 bg-gray-300 rounded-full"></span> 
        {{ course.lastAccessed }}
      </p>
      
      <div class="mt-4 flex items-center gap-3">
        <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div :class="`h-full bg-${course.color}-500 rounded-full`" :style="{ width: `${course.progress}%` }"></div>
        </div>
        <span class="text-xs font-bold text-gray-600 w-10">{{ course.progress }}%</span>
      </div>
    </div>

    <button class="w-full sm:w-auto mt-2 sm:mt-0 px-5 py-2.5 bg-gray-50 text-gray-700 font-bold text-sm rounded-xl border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-colors whitespace-nowrap">
      Lanjutkan
    </button>
  </div>
</template>
