<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus, Search, Trash2, Edit2, ArrowLeft, Clock, Trophy, ListFilter, HelpCircle, FileText } from 'lucide-vue-next'
import { getCourseQuizzes, deleteQuiz } from '@/api/quiz'
import { useAlert } from '@/composables/useAlert'
import BaseModal from '@/components/shared/BaseModal.vue'

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const courseId = route.params.courseId

const loading = ref(true)
const quizzes = ref([])
const searchQuery = ref('')

const modalState = ref({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  quizId: null
})

const fetchQuizzes = async () => {
  loading.value = true
  try {
    const res = await getCourseQuizzes(courseId)
    if (res.status) {
      quizzes.value = res.data
    }
  } catch (err) {
    showAlert('Gagal', 'Terjadi kesalahan saat memuat kuis.', 'error')
  } finally {
    loading.value = false
  }
}

const confirmDelete = (quiz) => {
  modalState.value = {
    isOpen: true,
    title: 'Hapus Kuis',
    message: `Apakah Anda yakin ingin menghapus kuis "${quiz.title}"? Tindakan ini tidak dapat dibatalkan.`,
    type: 'warning',
    quizId: quiz.id
  }
}

const handleDelete = async () => {
  const id = modalState.value.quizId
  modalState.value.isOpen = false
  try {
    const res = await deleteQuiz(id)
    if (res.status) {
      showAlert('Berhasil', 'Kuis telah dihapus.', 'success')
      fetchQuizzes()
    }
  } catch (err) {
    showAlert('Gagal', 'Gagal menghapus kuis.', 'error')
  }
}

onMounted(fetchQuizzes)
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
      <div class="space-y-4">
        <button 
          @click="router.push('/mentor/courses')" 
          class="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors w-fit group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Kursus
        </button>
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Kuis</h1>
          <p class="text-gray-500 mt-2 font-medium">Kelola evaluasi dan soal-soal untuk kursus Anda.</p>
        </div>
      </div>
      
      <button 
        @click="router.push(`/mentor/courses/${courseId}/upload-quiz`)"
        class="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
      >
        <Plus class="w-5 h-5" />
        Buat Kuis Baru
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <FileText class="w-6 h-6" />
        </div>
        <div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Kuis</p>
          <p class="text-xl font-bold text-gray-900">{{ quizzes.length }}</p>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row gap-4 items-center">
      <div class="relative flex-1 group w-full">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari judul kuis atau tipe..."
          class="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400 font-medium"
        />
      </div>
    </div>

    <!-- Quiz Grid -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <p class="text-gray-400 font-medium animate-pulse">Memuat daftar kuis...</p>
    </div>

    <div v-else-if="quizzes.length === 0" class="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 p-16 flex flex-col items-center justify-center text-center">
      <div class="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
        <HelpCircle class="w-10 h-10 text-gray-300" />
      </div>
      <h3 class="text-xl font-bold text-gray-900">Belum Ada Kuis</h3>
      <p class="text-gray-500 mt-2 max-w-sm font-medium leading-relaxed">Anda belum membuat kuis untuk kursus ini. Mulai dengan membuat evaluasi pertama Anda.</p>
      <button 
        @click="router.push(`/mentor/courses/${courseId}/upload-quiz`)"
        class="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
      >
        Buat Kuis Sekarang
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="quiz in quizzes" 
        :key="quiz.id" 
        class="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
      >
        <!-- Card Header -->
        <div class="p-6 pb-4 flex items-start justify-between">
          <div :class="[
            'px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest',
            quiz.type === 'Matching' ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
          ]">
            {{ quiz.type === 'Matching' ? 'Mencocokkan' : 'Multiple Choice' }}
          </div>
          <div class="flex gap-1.5">
            <button 
              @click="router.push(`/mentor/courses/${courseId}/quizzes/edit/${quiz.id}`)"
              class="p-2 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            >
              <Edit2 class="w-4 h-4" />
            </button>
            <button @click="confirmDelete(quiz)" class="p-2 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="px-6 pb-6 flex-1 space-y-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{{ quiz.title }}</h3>
            <p v-if="quiz.description" class="text-sm text-gray-400 mt-2 line-clamp-2 font-medium">{{ quiz.description }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <div class="p-3 bg-gray-50/80 rounded-2xl border border-gray-100/50 space-y-1">
              <div class="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Clock class="w-3 h-3 text-indigo-400" /> Waktu
              </div>
              <p class="text-sm font-bold text-gray-700">{{ quiz.time_limit }} Menit</p>
            </div>
            <div class="p-3 bg-gray-50/80 rounded-2xl border border-gray-100/50 space-y-1">
              <div class="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Trophy class="w-3 h-3 text-emerald-400" /> Lulus
              </div>
              <p class="text-sm font-bold text-gray-700">{{ quiz.minimum_score }}%</p>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
           <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div class="w-5 h-5 rounded-full border border-white bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-600">
                  {{ quiz.matchings?.length || quiz.questions?.length || 0 }}
                </div>
              </div>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Butir Soal</span>
           </div>
           <div class="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-tighter">
              ID: #{{ quiz.id }}
           </div>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <BaseModal
      :is-open="modalState.isOpen"
      :title="modalState.title"
      :message="modalState.message"
      :type="modalState.type"
      confirm-text="Ya, Hapus"
      @confirm="handleDelete"
      @close="closeModal"
    />
  </div>
</template>
