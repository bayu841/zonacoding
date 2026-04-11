<script setup>
import { Edit, Trash2, Tag, Layout, Users, Clock } from 'lucide-vue-next'

defineProps({
  courses: Array
})

defineEmits(['view-edit', 'delete-course'])

const getStatusClass = (status) => {
  return status === 'Published'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-amber-50 text-amber-700 border-amber-200'
}

const getCategoryClass = (category) => {
  const classes = {
    Frontend: 'bg-blue-50 text-blue-700 border-blue-200',
    Backend: 'bg-purple-50 text-purple-700 border-purple-200',
    Design: 'bg-pink-50 text-pink-700 border-pink-200'
  }
  return classes[category] || 'bg-gray-50 text-gray-700 border-gray-200'
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <div
      v-for="course in courses"
      :key="course.id"
      class="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <!-- Thumbnail Section -->
      <div class="aspect-video bg-indigo-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
        <Layout class="w-12 h-12 text-indigo-200 group-hover:scale-110 transition-transform duration-500" />
        <div class="absolute top-3 left-3">
          <span :class="['inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border shadow-sm uppercase tracking-wider', getCategoryClass(course.category)]">
            {{ course.category }}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <span :class="['inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border shadow-sm uppercase tracking-wider', getStatusClass(course.status)]">
            {{ course.status }}
          </span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="p-5 flex-1 flex flex-col">
        <h3 class="font-bold text-gray-900 line-clamp-2 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
          {{ course.title }}
        </h3>
        
        <div class="space-y-3 mt-auto">
          <!-- Mentor -->
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-[10px]">
              {{ course.mentor.charAt(0) }}
            </div>
            <span class="text-xs text-gray-600 font-medium">{{ course.mentor }}</span>
          </div>

          <!-- Price and Actions -->
          <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
            <div class="text-sm font-bold text-indigo-600">
              Rp {{ course.price.toLocaleString('id-ID') }}
            </div>
            <div class="flex items-center gap-1">
              <button @click="$emit('view-edit', course)" class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                <Edit class="w-4 h-4" />
              </button>
              <button @click="$emit('delete-course', course)" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="courses.length === 0" class="col-span-full py-16 text-center">
      <div class="flex flex-col items-center justify-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Layout class="w-8 h-8 text-gray-300" />
        </div>
        <p class="text-gray-600 font-bold text-lg">Tidak ada kursus ditemukan</p>
        <p class="text-gray-400 mt-1 max-w-sm mx-auto">Coba gunakan kata kunci lain atau ubah filter pencarian Anda.</p>
      </div>
    </div>
  </div>
</template>
