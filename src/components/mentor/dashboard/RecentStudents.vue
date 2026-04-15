<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  }
})

const recentStudents = computed(() => {
  return props.students.slice(0, 5).map(s => ({
    id: s.id,
    name: s.name,
    initials: s.name ? s.name.charAt(0).toUpperCase() : '?',
    color: ['emerald', 'blue', 'purple', 'amber', 'rose'][s.id % 5] || 'emerald',
    time: s.joined_at || 'Baru Saja'
  }))
})
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full lg:min-h-[400px]">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-lg font-bold text-gray-800">Siswa Terbaru</h2>
        <p class="text-sm text-gray-500 mt-1">Siswa yang baru mendaftar</p>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto pr-2 space-y-4">
      <div v-if="!recentStudents.length" class="flex flex-col items-center justify-center py-10 text-gray-400 italic text-sm">
        Belum ada siswa baru
      </div>
      <div v-for="student in recentStudents" :key="student.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
         <div :class="`w-10 h-10 rounded-full bg-${student.color}-100 text-${student.color}-600 font-bold flex items-center justify-center shrink-0`">
           {{ student.initials }}
         </div>
         <div>
           <p class="font-bold text-gray-800 text-sm">{{ student.name }}</p>
           <p class="text-xs text-gray-500 truncate mt-0.5">Baru saja bergabung</p>
         </div>
         <span class="ml-auto text-[10px] font-bold text-gray-400">
           {{ student.time }}
         </span>
      </div>
    </div>

    <button @click="router.push('/mentor/students')" class="mt-4 w-full py-2.5 bg-gray-50 border border-gray-200 text-sm font-bold text-gray-600 rounded-xl hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all">
      Lihat Semua Siswa
    </button>
  </div>
</template>

