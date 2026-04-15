<script setup>
import { Trophy, Medal, Award } from 'lucide-vue-next'

defineProps({
  students: {
    type: Array,
    required: true
  }
})

const getRankIcon = (rank) => {
  if (rank === 1) return { icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' }
  if (rank === 2) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-100', border: 'border-gray-200' }
  if (rank === 3) return { icon: Award, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200/50' }
  return null
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead class="text-xs text-gray-500 bg-gray-50/50 uppercase font-bold border-b border-gray-100">
        <tr>
          <th scope="col" class="px-6 py-4 rounded-tl-xl text-center w-16">Peringkat</th>
          <th scope="col" class="px-6 py-4">Nama Siswa</th>
          <th scope="col" class="px-6 py-4">Kursus Aktif</th>
          <th scope="col" class="px-6 py-4 text-right rounded-tr-xl">Total Poin</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100/80">
        <tr v-for="student in students" :key="student.rank" class="hover:bg-gray-50/30 transition-colors group">
          
          <!-- Rank Column -->
          <td class="px-6 py-4 font-bold text-center">
            <template v-if="student.rank <= 3">
              <div 
                class="w-10 h-10 mx-auto rounded-full flex items-center justify-center border shadow-sm"
                :class="[getRankIcon(student.rank).bg, getRankIcon(student.rank).border, getRankIcon(student.rank).color]"
              >
                <component :is="getRankIcon(student.rank).icon" class="w-5 h-5" />
              </div>
            </template>
            <template v-else>
              <span class="text-gray-400 text-lg w-10 inline-block text-center">{{ student.rank }}</span>
            </template>
          </td>

          <!-- Student Name Column -->
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shadow-sm">
                {{ student.student_name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-base">{{ student.student_name }}</p>
                <div class="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  <span class="bg-gray-100 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Level {{ student.level }}</span>
                </div>
              </div>
            </div>
          </td>

          <!-- Active Courses Column -->
          <td class="px-6 py-4 font-medium text-gray-700">
            <div class="flex flex-wrap gap-1">
              <span v-for="(course, idx) in student.active_courses" :key="idx" class="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs border border-blue-100">
                {{ course }}
              </span>
            </div>
          </td>

          <!-- Points Column -->
          <td class="px-6 py-4 text-right">
            <div class="inline-flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
              <span class="font-black text-amber-600 text-lg tracking-tight">{{ student.total_points.toLocaleString('id-ID') }}</span>
              <span class="text-amber-500 text-xs font-bold">Poin</span>
            </div>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>
