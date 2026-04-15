<script setup>
import { Edit, Trash2, Video, FileText, Globe, Clock, ChevronLeft, ChevronRight, Layout, Eye, BookOpen } from 'lucide-vue-next'

defineProps({
  lessons: Array,
  pagination: Object
})

defineEmits(['edit', 'delete', 'change-page', 'view-detail'])
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-100">
        <thead>
          <tr class="bg-gray-50/80">
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">No</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul & Detail</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Video URL</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="lesson in lessons" :key="lesson.id" class="hover:bg-indigo-50/30 transition-colors duration-200 group">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
              {{ lesson.order_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Video v-if="lesson.vidio_url" class="w-4 h-4" />
                  <FileText v-else class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900 mb-0.5">{{ lesson.title }}</div>
                  <div class="flex items-center gap-3">
                     <a 
                      v-if="lesson.file_path" 
                      :href="lesson.file_path" 
                      target="_blank"
                      class="text-[10px] text-emerald-600 flex items-center gap-1 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 hover:bg-emerald-100 transition-colors"
                     >
                        <FileText class="w-2.5 h-2.5" />
                        LIHAT LAMPIRAN
                     </a>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div v-if="lesson.vidio_url" class="flex items-center gap-2 max-w-[200px] truncate group/link">
                <Globe class="w-3.5 h-3.5 text-indigo-400" />
                <a :href="lesson.vidio_url" target="_blank" class="text-xs text-indigo-600 hover:text-indigo-800 hover:underline">
                  Tonton Video
                </a>
              </div>
              <span v-else class="text-xs text-gray-400 italic">Tidak ada video</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider',
                lesson.is_preview ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'
              ]">
                {{ lesson.is_preview ? 'PREVIEW' : 'TIDAK' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end gap-1">
                <button @click="$emit('view-detail', lesson)" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Detail">
                  <Eye class="w-4 h-4" />
                </button>
                <button @click="$emit('edit', lesson)" class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                  <Edit class="w-4 h-4" />
                </button>
                <button @click="$emit('delete', lesson)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="lessons.length === 0">
            <td colspan="5" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                   <BookOpen class="w-6 h-6" />
                </div>
                <p class="text-gray-500 font-medium">Belum ada lesson untuk kursus ini</p>
                <p class="text-sm text-gray-400 mt-1">Mulai tambahkan materi belajar sekarang</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('change-page', pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2 text-gray-600 hover:bg-white border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="text-xs text-gray-400 font-bold">{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button 
          @click="$emit('change-page', pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2 text-gray-600 hover:bg-white border border-transparent rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
