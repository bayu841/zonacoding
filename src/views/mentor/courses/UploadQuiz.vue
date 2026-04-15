<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, Trash2, ArrowLeft, CheckCircle2, Save, Clock, Trophy, Info, Settings } from 'lucide-vue-next'
import { ListFilter } from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'
import MultipleChoiceBuilder from '../../../components/mentor/courses/quiz/MultipleChoiceBuilder.vue'
import MatchingBuilder from '../../../components/mentor/courses/quiz/MatchingBuilder.vue'
import { getQuiz, updateQuiz, createQuiz, addMatchingQuestions, addMcqQuestions } from '@/api/quiz'
import { useAlert } from '@/composables/useAlert'

const router = useRouter()
const route = useRoute()
const { showAlert } = useAlert()
const courseId = route.params.courseId
const quizId = route.params.quizId || null
const lessonId = route.query.lesson_id || null
const isEdit = !!quizId

const loading = ref(false)
const quiz = ref({
  title: '',
  description: '',
  instruction: '',
  type: 'Matching',
  quiz_scope: lessonId ? 'lesson' : 'final',
  time_limit: 60,
  minimum_score: 75,
  questions: []
})

// Stable reference for questions to avoid validation issues
const questions = computed(() => quiz.value.questions)

const fetchQuiz = async () => {
  if (!isEdit) return
  loading.value = true
  try {
    const res = await getQuiz(quizId)
    if (res.status) {
      const data = res.data
      
      // Update fields individually
      quiz.value.title = data.title
      quiz.value.description = data.description
      quiz.value.instruction = data.instruction
      quiz.value.type = data.type || 'Matching'
      quiz.value.quiz_scope = data.quiz_scope
      quiz.value.time_limit = data.time_limit
      quiz.value.minimum_score = data.minimum_score
      quiz.value.questions = [] // Reset
      
      // Map MCQs
      if (data.questions && data.questions.length > 0) {
        data.questions.forEach(q => {
          quiz.value.questions.push({
            id: q.id,
            type: 'multiple-choice',
            text: q.question,
            options: q.options?.map(o => o.option_text) || ['', '', '', ''],
            correctIndex: q.options?.findIndex(o => o.is_correct) ?? 0
          })
        })
      }

      // Map Matchings
      if (data.matchings && data.matchings.length > 0) {
        const leftItems = data.matchings.map(m => ({ id: 'l-' + m.id, text: m.left_text }))
        const rightItems = data.matchings.map(m => ({ id: 'r-' + m.id, text: m.right_text }))
        const pairs = {}
        data.matchings.forEach(m => {
          pairs['l-' + m.id] = 'r-' + m.id
        })

        quiz.value.questions.push({
          id: 'matching-' + Date.now(),
          type: 'matching',
          text: '',
          leftItems,
          rightItems,
          pairs
        })
      }
    }
  } catch (err) {
    showAlert('Gagal', 'Gagal memuat data kuis.', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchQuiz()
})

const modalState = ref({
  isOpen: false,
  title: '',
  message: '',
  type: 'info'
})

const closeModal = () => {
  modalState.value.isOpen = false
}

const showModal = (title, message, type = 'info') => {
  modalState.value = {
    isOpen: true,
    title,
    message,
    type
  }
}

const addQuestion = (type = 'multiple-choice') => {
  if (type === 'multiple-choice') {
    quiz.value.questions.push({
      type: 'multiple-choice',
      id: Date.now(),
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0
    })
  } else if (type === 'matching') {
    quiz.value.questions.push({
      type: 'matching',
      id: Date.now(),
      text: '',
      leftItems: [],
      rightItems: [],
      pairs: {}
    })
  }
}

const handleSubmit = async () => {
  if (!quiz.value.title) {
    showModal('Oops!', 'Mohon isi judul kuis.', 'warning')
    return
  }

  if (questions.value.length === 0) {
    showModal('Oops!', 'Mohon tambahkan minimal 1 soal ke dalam kuis.', 'warning')
    return
  }

  // Basic validation for questions
  for (let i = 0; i < questions.value.length; i++) {
    const q = questions.value[i]
    if (q.type === 'matching') {
        if (q.leftItems.some(item => !item.text) || q.rightItems.some(item => !item.text)) {
            showModal('Oops!', `Harap isi semua pasangan pada soal nomor ${i+1}.`, 'warning')
            return
        }
    } else if (q.type === 'multiple-choice') {
        if (!q.text || q.options.some(opt => !opt)) {
            showModal('Oops!', `Harap isi pertanyaan dan semua opsi pada soal nomor ${i+1}.`, 'warning')
            return
        }
    }
  }

  loading.value = true
  try {
    // 1. Prepare ALL questions for unified payload
    const mappedQuestions = questions.value.map(q => {
      if (q.type === 'matching') {
        return {
          type: 'Matching',
          pairs: q.leftItems.map(item => {
            const rightItemId = q.pairs[item.id]
            const rightItem = q.rightItems.find(r => r.id === rightItemId)
            return {
              left_text: item.text,
              right_text: rightItem ? rightItem.text : ''
            }
          }).filter(p => p.left_text && p.right_text)
        }
      } else {
        return {
          type: 'MCQ',
          question: q.text,
          options: q.options,
          correct_index: q.correctIndex
        }
      }
    })

    // 2. Prepare Payload
    const quizPayload = {
      course_id: courseId,
      lesson_id: lessonId,
      title: quiz.value.title,
      description: quiz.value.description,
      instruction: quiz.value.instruction,
      type: quiz.value.type,
      quiz_scope: quiz.value.quiz_scope,
      time_limit: quiz.value.time_limit,
      minimum_score: quiz.value.minimum_score,
      questions: mappedQuestions
    }

    const res = isEdit ? await updateQuiz(quizId, quizPayload) : await createQuiz(quizPayload)
    if (!res.status) throw new Error(res.message || 'Gagal menyimpan kuis.')
    
    showModal('Berhasil!', isEdit ? 'Kuis telah berhasil diperbarui.' : 'Quiz dan semua soal telah berhasil dipublikasikan.', 'success')
  } catch (err) {
    showModal('Galat', err.response?.data?.message || err.message, 'error')
  } finally {
    loading.value = false
  }
}

const handleModalConfirm = () => {
  modalState.value.isOpen = false
  if (modalState.value.type === 'success') {
    router.push(`/mentor/courses/${courseId}/quizzes`)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
    <!-- Header Area -->
    <div class="flex flex-col gap-2 border-b border-gray-100 pb-6">
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors w-fit group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar Kursus
      </button>
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight">{{ isEdit ? 'Edit Kuis' : 'Buat Kuis Baru' }}</h1>
          <p class="text-gray-500 mt-1 text-sm font-medium">{{ isEdit ? 'Perbarui detail dan soal kuis Anda.' : 'Buat evaluasi soal secara manual.' }}</p>
        </div>
      </div>
    </div>

    <!-- Pass Threshold Alert -->
    <div class="p-4 bg-emerald-50 rounded-xl flex items-center justify-between shadow-sm border border-emerald-100/50">
      <div class="flex items-center gap-3 text-emerald-700">
          <CheckCircle2 class="w-5 h-5 shrink-0" />
          <p class="text-sm font-medium">Kuis menggunakan aturan kelulusan ketat:</p>
      </div>
      <span class="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-sm">Passing Grade 75%</span>
    </div>

    <!-- Title & Basic Info -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div class="space-y-2">
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Judul Kuis</label>
            <input
              v-model="quiz.title"
              type="text"
              placeholder="Contoh: Kuis Akhir Bab 1"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Deskripsi (Optional)</label>
            <textarea
              v-model="quiz.description"
              rows="2"
              placeholder="Berikan gambaran singkat tentang kuis ini..."
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            ></textarea>
          </div>
          <div class="space-y-2">
            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest">Instruksi Pengerjaan</label>
            <textarea
              v-model="quiz.instruction"
              rows="3"
              placeholder="Contoh: Jawab semua pertanyaan dengan benar. Waktu maksimal 60 menit."
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Settings Sidebar -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <h3 class="font-bold text-gray-900 flex items-center gap-2">
            <Settings class="w-4 h-4 text-indigo-500" />
            Pengaturan Kuis
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Tipe Kuis</label>
              <select v-model="quiz.type" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all">
                <option value="MCQ">Multiple Choice (Pilihan Ganda)</option>
                <option value="Matching">Matching (Mencocokkan)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Cakupan Kuis</label>
              <select v-model="quiz.quiz_scope" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all">
                <option value="lesson">Materi (Lesson)</option>
                <option value="final">Ujian Akhir (Final)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                Batas Waktu
                <span class="text-indigo-600">Menit</span>
              </label>
              <div class="relative">
                <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input v-model.number="quiz.time_limit" type="number" class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all" />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                Skor Minimum
                <span class="text-emerald-600">%</span>
              </label>
              <div class="relative">
                <Trophy class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input v-model.number="quiz.minimum_score" type="number" class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex gap-3">
          <Info class="w-4 h-4 text-indigo-500 shrink-0" />
          <p class="text-[10px] text-indigo-600 font-medium leading-relaxed">Pastikan semua pengaturan sudah sesuai sebelum mempublikasikan kuis.</p>
        </div>
      </div>
    </div>

    <!-- Add Question Buttons -->
    <div class="flex gap-3">
        <button @click="addQuestion('multiple-choice')" class="flex items-center gap-2 px-4 py-2.5 bg-white border border-indigo-200 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-all shadow-sm">
          <Plus class="w-4 h-4" /> Pilihan Ganda
        </button>
        <button @click="addQuestion('matching')" class="flex items-center gap-2 px-4 py-2.5 bg-white border border-emerald-200 text-emerald-600 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-all shadow-sm">
          <ListFilter class="w-4 h-4" /> Mencocokkan
        </button>
    </div>

    <!-- Questions Loop -->
    <div class="space-y-6">
      <TransitionGroup name="list" tag="div" class="space-y-6">
      <div v-for="(q, qIdx) in quiz.questions" :key="q.id" class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group">
        <!-- Question Header -->
        <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">{{ qIdx + 1 }}</span>
            <div>
                <span class="font-bold text-gray-800 block text-sm">{{ q.type === 'matching' ? 'Kuis Mencocokkan' : 'Pilihan Ganda' }}</span>
                <span class="text-xs text-gray-500">{{ q.id }}</span>
            </div>
          </div>
          <button @click="quiz.questions.splice(qIdx, 1)" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <!-- Question Body -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-2">Pertanyaan Utama</label>
            <textarea
              v-model="q.text"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-sm text-gray-800 resize-none"
              placeholder="Masukkan soal ujian di sini..."
              rows="2"
            ></textarea>
          </div>

          <!-- TYPE: MULTIPLE CHOICE -->
          <MultipleChoiceBuilder v-if="q.type === 'multiple-choice'" :question="q" />

          <!-- TYPE: MATCHING -->
          <MatchingBuilder v-else-if="q.type === 'matching'" :question="q" />

        </div>
      </div>
      </TransitionGroup>
    </div>

    <!-- Final CTA Area -->
    <div class="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white border-t border-gray-100 z-40">
      <div class="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div class="hidden sm:block">
          <p class="text-sm font-bold text-gray-900">Periksa Soal</p>
          <p class="text-xs text-gray-500">{{ questions.length }} Soal Tersusun</p>
        </div>
        <button
          @click="handleSubmit"
          class="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Save class="w-4 h-4" />
          {{ isEdit ? 'Perbarui Kuis' : 'Simpan Kuis' }}
        </button>
      </div>
    </div>

    <!-- BaseModal -->
    <BaseModal
      :is-open="modalState.isOpen"
      :title="modalState.title"
      :message="modalState.message"
      :type="modalState.type"
      confirm-text="Paham"
      @confirm="handleModalConfirm"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
