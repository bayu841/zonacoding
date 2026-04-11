<script setup>
import { Edit, Trash2, Eye, User, Tag, Calendar, Layout } from 'lucide-vue-next'

defineProps({
  courses: Array
})

defineEmits(['view-detail', 'view-edit', 'delete-course'])

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
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100">
        <thead>
          <tr class="bg-gray-50/80">
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thumbnail</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul & Kategori</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mentor</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="course in courses" :key="course.id" class="hover:bg-indigo-50/30 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-12 w-20 bg-indigo-100 rounded-lg overflow-hidden flex items-center justify-center text-indigo-500 font-bold border border-indigo-200 shadow-sm group-hover:scale-105 transition-transform">
                 <Layout class="w-5 h-5 opacity-50" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-semibold text-gray-900 mb-1">{{ course.title }}</div>
              <div class="flex items-center gap-1.5">
                <Tag class="w-3 h-3 text-gray-400" />
                <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider', getCategoryClass(course.category)]">
                    {{ course.category }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs ring-2 ring-white shadow-sm">
                    {{ course.mentor.charAt(0) }}
                </div>
                <div class="text-sm text-gray-700 font-medium">{{ course.mentor }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border', getStatusClass(course.status)]">
                {{ course.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">Rp {{ course.price.toLocaleString('id-ID') }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end gap-1">
                <button @click="$emit('view-edit', course)" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                  <Edit class="w-4 h-4" />
                </button>
                <button @click="$emit('delete-course', course)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="courses.length === 0">
            <td colspan="6" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Layout class="w-6 h-6 text-gray-400" />
                </div>
                <p class="text-gray-500 font-medium">Tidak ada kursus ditemukan</p>
                <p class="text-sm text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
