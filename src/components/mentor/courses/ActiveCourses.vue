<script setup>
import { CheckCircle, BookMarked, Upload, HelpCircle } from 'lucide-vue-next'
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
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="course in courses" :key="course.id" class="relative bg-emerald-50/30 rounded-3xl border border-emerald-100/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full duration-300 overflow-hidden group">
        
        <!-- Watermark Icon -->
        <div class="absolute right-[-20px] top-6 opacity-[0.03] rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-700">
           <BookMarked class="w-40 h-40 text-emerald-900" />
        </div>

        <div class="p-6 flex flex-col flex-1 relative z-10">
          <!-- Badge -->
          <div class="mb-4">
             <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm border border-emerald-100/50">{{ course.category?.name || 'Frontend' }}</span>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight">{{ course.title }}</h3>
          <p class="text-sm text-gray-400 font-medium mb-6">{{ course.level || 'Beginner' }}</p>
          
          <div class="flex items-center gap-3 py-6 border-t border-emerald-100/50">
            <div class="w-10 h-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
              <CheckCircle class="w-5 h-5" />
            </div>
            <span class="text-sm font-bold text-gray-700">{{ course.students_count || 120 }} Siswa Aktif</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2 mt-auto pt-6 border-t border-emerald-100/50">
            <!-- Kelola Button -->
            <router-link
              :to="`/mentor/courses/${course.id}/lessons`"
              class="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl text-[11px] font-bold transition-all shadow-sm active:scale-95"
            >
              <BookMarked class="w-4 h-4" />
              Kelola
            </router-link>

            <!-- Upload Button -->
            <router-link
              :to="`/mentor/courses/${course.id}/upload-material`"
              class="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl text-[11px] font-bold transition-all shadow-sm active:scale-95"
            >
              <Upload class="w-4 h-4" />
              Upload
            </router-link>

            <!-- Quiz Button -->
            <router-link
              :to="`/mentor/courses/${course.id}/quizzes`"
              class="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[11px] font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <HelpCircle class="w-4 h-4" />
              Quiz
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="courses.length === 0" class="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <CheckCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-bold text-gray-900 mb-1">Belum ada kursus aktif</h3>
      <p class="text-gray-500">Anda belum disetujui untuk mengajar kursus apapun.</p>
    </div>
  </div>
</template>
