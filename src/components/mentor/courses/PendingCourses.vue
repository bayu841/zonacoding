<script setup>
import { Clock } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  courses: {
    type: Array,
    required: true
  }
})

const { getProxyUrl, handleImageError } = useImage()
</script>

<template>
  <div class="space-y-4">
    <div v-for="app in courses" :key="app.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-amber-100/60 rounded-2xl shadow-sm hover:shadow-md transition-all gap-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 border border-amber-200 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-sm shrink-0 overflow-hidden">
          <img 
            v-if="app.course?.thumbnail"
            :src="getProxyUrl(app.course?.thumbnail)" 
            :alt="app.course?.title" 
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <Clock v-else class="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h4 class="font-bold text-gray-900 text-lg">{{ app.course?.title || `Kursus ID: ${app.course_id.substring(0, 8)}...` }}</h4>
          <div class="flex items-center flex-wrap gap-2 sm:gap-3 text-sm text-gray-500 mt-1">
            <span class="px-2 py-0.5 bg-gray-100 rounded-md text-xs font-semibold">{{ app.course?.category?.name || 'Aplikasi Pending' }}</span>
            <span class="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Diajukan: {{ new Date(app.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
          </div>
        </div>
      </div>
      <div class="shrink-0 flex justify-end">
        <span class="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200 shadow-sm flex items-center capitalize">
          <span class="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></span>
          {{ app.status }}
        </span>
      </div>
    </div>

    <div v-if="courses.length === 0" class="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
        <Clock class="w-8 h-8 text-gray-300" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Tidak ada pengajuan</h3>
      <p class="text-gray-500 max-w-sm">Anda tidak memiliki pengajuan kursus yang menunggu persetujuan Admin saat ini.</p>
    </div>
  </div>
</template>
