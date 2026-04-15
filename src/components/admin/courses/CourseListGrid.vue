<script setup>
import { Edit, Trash2, Tag, Layout, Users, Clock, ChevronLeft, ChevronRight, User } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  courses: Array,
  pagination: Object
})

defineEmits(['view-edit', 'delete-course', 'change-page'])

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
  <div class="space-y-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="course in courses"
        :key="course.id"
        class="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
      >
        <!-- Thumbnail Section -->
        <div class="aspect-video bg-indigo-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
          <template v-if="course.thumbnail && isEmoji(course.thumbnail)">
            <span class="text-4xl">{{ course.thumbnail.includes('/storage/') ? course.thumbnail.split('/').pop() : course.thumbnail }}</span>
          </template>
          <img v-else-if="course.thumbnail" :src="getProxyUrl(course.thumbnail)" :alt="course.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" @error="handleImageError" />
          <Layout v-else class="w-12 h-12 text-indigo-200 group-hover:scale-110 transition-transform duration-500" />
          
          <div class="absolute top-3 left-3" v-if="course.category">
            <span :class="['inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border shadow-sm uppercase tracking-wider', getCategoryClass(course.category.name)]">
              {{ course.category.name }}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span :class="['inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border shadow-sm uppercase tracking-wider capitalize', getStatusClass(course.status)]">
              {{ course.status }}
            </span>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-5 flex-1 flex flex-col">
          <h3 class="font-bold text-gray-900 line-clamp-2 mb-3 leading-tight group-hover:text-indigo-600 transition-colors h-10" :title="course.title">
            {{ course.title }}
          </h3>
          
          <div class="space-y-3 mt-auto">
            <!-- Mentor -->
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-[10px] ring-2 ring-white shadow-sm overflow-hidden">
                <img v-if="course.mentor && course.mentor.avatar" :src="getProxyUrl(course.mentor.avatar)" :alt="course.mentor.name" class="w-full h-full object-cover" @error="handleImageError" />
                <span v-else>{{ (course.mentor?.name || '?').charAt(0) }}</span>
              </div>
              <span class="text-xs text-gray-600 font-medium truncate">{{ course.mentor?.name || 'Belum Ada' }}</span>
            </div>

            <!-- Price and Actions -->
            <div class="pt-4 border-t border-gray-50 flex flex-col gap-4">
              <div class="text-sm font-bold text-indigo-600">
                {{ course.price > 0 ? `Rp ${Number(course.price).toLocaleString('id-ID')}` : 'Gratis' }}
              </div>
              <div class="flex gap-2">
                <button 
                  @click="$emit('view-edit', course)"
                  class="px-3 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                >
                  <Edit class="w-3.5 h-3.5" />
                </button>
                <button 
                  @click="$emit('delete-course', course)"
                  class="px-3 py-2 bg-white border border-gray-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 transition-all shadow-sm"
                >
                  <Trash2 class="w-3.5 h-3.5" />
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

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="flex items-center justify-center gap-2 pt-4">
      <button 
        @click="$emit('change-page', pagination.current_page - 1)"
        :disabled="pagination.current_page === 1"
        class="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all disabled:opacity-40"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>

      <div class="px-6 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
        <span class="text-sm font-bold text-indigo-600">{{ pagination.current_page }}</span>
        <span class="mx-2 text-gray-300 text-xs">/</span>
        <span class="text-xs text-gray-400 font-medium">{{ pagination.last_page }}</span>
      </div>

      <button 
        @click="$emit('change-page', pagination.current_page + 1)"
        :disabled="pagination.current_page === pagination.last_page"
        class="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all disabled:opacity-40"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
