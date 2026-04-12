<script setup>
import { CheckCircle, BookMarked, Upload, HelpCircle } from 'lucide-vue-next'

defineProps({
  courses: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="course in courses" :key="course.id" class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100/50 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-all">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <BookMarked class="w-24 h-24 text-emerald-600 -mr-4 -mt-4 transform rotate-12" />
        </div>
        <div class="relative z-10">
          <span class="px-2.5 py-1 bg-white text-emerald-700 text-xs font-semibold border border-emerald-100 rounded-lg inline-block mb-3 shadow-[0_2px_4px_rgba(16,185,129,0.05)]">{{ course.category }}</span>
          <h3 class="text-xl font-bold text-gray-900 mb-1">{{ course.title }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ course.level }}</p>
          <div class="flex items-center gap-2 pt-4 border-t border-emerald-200/50">
            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200 shadow-sm">
              <CheckCircle class="w-4 h-4" />
            </div>
            <span class="text-sm font-medium text-gray-700">{{ course.students }} Siswa Aktif</span>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-emerald-200/50">
            <router-link 
              :to="`/mentor/courses/${course.id}/upload-material`"
              class="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold transition-all hover:shadow-sm"
            >
              <Upload class="w-3.5 h-3.5" />
              Upload Materi
            </router-link>
            <router-link 
              :to="`/mentor/courses/${course.id}/upload-quiz`"
              class="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-200"
            >
              <HelpCircle class="w-3.5 h-3.5" />
              Upload Quiz
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
