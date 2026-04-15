<script setup>
import { Edit, Trash2, Eye, User, Tag, Calendar, Layout, CheckCircle, XCircle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  courses: Array,
  pagination: Object
})

defineEmits(['view-detail', 'view-edit', 'delete-course', 'approve-course', 'reject-course', 'change-page'])

const { getProxyUrl, handleImageError, isEmoji } = useImage()

const getStatusClass = (status) => {
  const s = status ? status.toLowerCase() : 'draft'
  if (s === 'published') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (s === 'pending') return 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm animate-pulse'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

const getCategoryClass = (categoryName) => {
  const name = categoryName ? categoryName.toLowerCase() : ''
  if (name.includes('frontend')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (name.includes('backend')) return 'bg-purple-50 text-purple-700 border-purple-200'
  if (name.includes('design')) return 'bg-pink-50 text-pink-700 border-pink-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
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
          <tr v-for="course in courses" :key="course.id" class="hover:bg-indigo-50/30 transition-colors duration-200 group">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-12 w-20 bg-indigo-50 rounded-lg overflow-hidden flex items-center justify-center text-indigo-500 font-bold border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                 <template v-if="course.thumbnail && isEmoji(course.thumbnail)">
                   <span class="text-2xl">{{ course.thumbnail.includes('/storage/') ? course.thumbnail.split('/').pop() : course.thumbnail }}</span>
                 </template>
                 <img v-else-if="course.thumbnail" :src="getProxyUrl(course.thumbnail)" :alt="course.title" class="w-full h-full object-cover" @error="handleImageError" />
                 <Layout v-else class="w-5 h-5 opacity-40 text-indigo-400" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-semibold text-gray-900 mb-1 max-w-[200px] truncate" :title="course.title">{{ course.title }}</div>
              <div class="flex items-center gap-1.5" v-if="course.category">
                <Tag class="w-3 h-3 text-gray-400" />
                <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider', getCategoryClass(course.category.name)]">
                    {{ course.category.name }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs ring-2 ring-white shadow-sm overflow-hidden">
                    <img v-if="course.mentor && course.mentor.avatar" :src="getProxyUrl(course.mentor.avatar)" :alt="course.mentor.name" class="w-full h-full object-cover" @error="handleImageError" />
                    <span v-else>{{ (course.mentor?.name || '?').charAt(0) }}</span>
                </div>
                <div class="text-sm text-gray-700 font-medium">{{ course.mentor?.name || 'Belum Ada' }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize', getStatusClass(course.status)]">
                {{ course.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-gray-900">
                {{ course.price > 0 ? `Rp ${Number(course.price).toLocaleString('id-ID')}` : 'Gratis' }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end gap-1">
                <button v-if="course.status === 'pending'" @click="$emit('approve-course', course)" class="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Setujui">
                  <CheckCircle class="w-4 h-4" />
                </button>
                <button v-if="course.status === 'pending'" @click="$emit('reject-course', course)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Tolak">
                  <XCircle class="w-4 h-4" />
                </button>
                <button @click="$emit('view-edit', course)" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                  <Edit class="w-4.5 h-4.5" />
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

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
      <p class="text-sm text-gray-500">
        Menampilkan <span class="font-medium text-gray-700">{{ courses.length }}</span> dari <span class="font-medium text-gray-700">{{ pagination.total }}</span> kursus
      </p>
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('change-page', pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2 text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-400 px-2 font-bold uppercase tracking-widest">{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        </div>

        <button 
          @click="$emit('change-page', pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2 text-gray-600 hover:bg-white hover:border-gray-200 border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

