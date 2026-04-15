<script setup>
import { Eye, Mail, BookOpen, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

defineProps({
  mentors: Array
})

defineEmits(['view-detail'])

const getStatusClass = (status) => {
  const classes = {
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Rejected: 'bg-red-50 text-red-700 border-red-200'
  }
  return classes[status] || 'bg-gray-50 text-gray-700 border-gray-200'
}

const getStatusIcon = (status) => {
  if (status === 'Verified') return CheckCircle2
  if (status === 'Pending') return AlertCircle
  if (status === 'Rejected') return XCircle
  return AlertCircle
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100">
        <thead>
          <tr class="bg-gray-50/80">
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Profil Mentor</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kontak</th>
            <th scope="col" class="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Kursus</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Verifikasi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="mentor in mentors" :key="mentor.id" class="hover:bg-indigo-50/30 transition-colors duration-200 group">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-11 w-11 relative">
                  <div class="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {{ mentor.name.charAt(0) }}
                  </div>
                  <div v-if="mentor.status === 'Verified'" class="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 class="w-4 h-4 text-emerald-500 fill-emerald-50" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ mentor.name }}</div>
                  <div class="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock class="w-3 h-3" />
                    Bergabung Apr 2026
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <Mail class="w-4 h-4 text-gray-400" />
                {{ mentor.email }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 text-sm font-semibold text-gray-700">
                <BookOpen class="w-4 h-4 text-indigo-500" />
                {{ mentor.coursesCount }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300', getStatusClass(mentor.status)]">
                <component :is="getStatusIcon(mentor.status)" class="w-3.5 h-3.5" />
                {{ mentor.status }}
              </span>
            </td>

          </tr>
          <!-- Empty State -->
          <tr v-if="mentors.length === 0">
            <td colspan="5" class="px-6 py-20 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle class="w-8 h-8 text-gray-300" />
                </div>
                <p class="text-gray-600 font-bold text-lg">Tidak ada mentor ditemukan</p>
                <p class="text-gray-400 mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
