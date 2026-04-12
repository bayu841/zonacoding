<script setup>
import { Users, Award, Clock, FileCheck } from 'lucide-vue-next'

defineProps({
  submissions: {
    type: Array,
    required: true
  }
})

defineEmits(['grade'])
</script>

<template>
  <div v-if="submissions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="sub in submissions" :key="sub.id" 
      class="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between min-h-[280px]"
    >
      <div>
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users v-if="sub.status === 'Pending'" class="w-5 h-5" />
            <Award v-else class="w-5 h-5 text-emerald-500" />
          </div>
          <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
            :class="sub.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'">
            {{ sub.status }}
          </span>
        </div>

        <h3 class="font-bold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">{{ sub.title }}</h3>
        <p class="text-xs text-gray-500 font-bold mb-4">{{ sub.course }}</p>

        <div class="flex items-center gap-2 mb-6">
          <div class="w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold flex items-center justify-center text-gray-600 border border-white">
            {{ sub.student.charAt(0) }}
          </div>
          <span class="text-xs font-bold text-gray-700">{{ sub.student }}</span>
        </div>
      </div>

      <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div class="text-[10px] font-bold text-gray-400 flex items-center gap-1">
          <Clock class="w-3 h-3" /> {{ sub.date }}
        </div>
        
        <button v-if="sub.status === 'Pending'" @click="$emit('grade', sub)" class="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          Beri Nilai
        </button>
        <div v-else class="flex flex-col items-end">
          <span class="text-xs font-black text-emerald-600">Terima Kasih!</span>
          <span class="text-base font-black text-gray-900">{{ sub.score }}/100</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="col-span-full py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 text-center">
    <FileCheck class="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p class="text-gray-500 font-bold">Tidak ada antrean tugas di sini.</p>
  </div>
</template>
