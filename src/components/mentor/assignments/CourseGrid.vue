<script setup>
import { BookOpen, Users, ChevronRight } from 'lucide-vue-next'

defineProps({
  courses: {
    type: Array,
    required: true
  }
})

defineEmits(['select'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="course in courses" :key="course.name" 
      @click="$emit('select', course)"
      class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <Users class="w-20 h-20" />
      </div>

      <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <BookOpen class="w-6 h-6" />
      </div>

      <h3 class="text-lg font-black text-gray-900 mb-2 leading-tight">{{ course.name }}</h3>

      <div class="flex items-center gap-4 mt-6">
        <div class="flex flex-col">
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Tugas</span>
          <span class="text-lg font-black text-gray-900">{{ course.total }}</span>
        </div>
        <div v-if="course.pending > 0" class="w-px h-8 bg-gray-100"></div>
        <div v-if="course.pending > 0" class="flex flex-col">
          <span class="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none mb-1">Perlu Nilai</span>
          <span class="text-lg font-black text-amber-600">{{ course.pending }}</span>
        </div>
      </div>

      <div class="mt-8 flex items-center justify-between">
         <span class="text-xs font-bold text-indigo-600 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
           Lihat Tugas <ChevronRight class="w-4 h-4" />
         </span>
      </div>
    </div>
  </div>
</template>
