<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, Trash2, ArrowLeft, HelpCircle, Layout, ListFilter, Save, CheckCircle2 } from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'

const router = useRouter()
const route = useRoute()
const courseId = route.params.courseId

const quiz = ref({
  title: '',
  questions: [
    {
      type: 'multiple-choice',
      id: Date.now(),
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0
    }
  ]
})

const questions = quiz.value.questions

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
    questions.push({
      type: 'multiple-choice',
      id: Date.now(),
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0
    })
  } else if (type === 'matching') {
    questions.push({
      type: 'matching',
      id: Date.now(),
      text: 'Pasangkanlah item di kiri dengan definisi atau pasangannya di sebelah kanan.',
      leftItems: [
        { id: 'l1', text: '' },
        { id: 'l2', text: '' }
      ],
      rightItems: [
        { id: 'r1', text: '' },
        { id: 'r2', text: '' }
      ],
      pairs: {
        'l1': 'r1',
        'l2': 'r2'
      }
    })
  }
}

const addMatchingItem = (qIdx) => {
  const q = questions[qIdx]
  const newId = q.leftItems.length + 1
  q.leftItems.push({ id: 'l' + newId, text: '' })
  q.rightItems.push({ id: 'r' + newId, text: '' })
  q.pairs['l' + newId] = 'r' + newId
}

const handleSubmit = () => {
  if (!quiz.value.title || questions.length === 0) {
    showModal('Oops!', 'Mohon isi judul quiz dan minimal 1 soal.', 'warning')
    return
  }
  showModal('Berhasil!', 'Quiz baru telah berhasil dipublikasikan.', 'success')
}

const handleModalConfirm = () => {
  modalState.value.isOpen = false
  if (modalState.value.type === 'success') {
    router.push('/mentor/courses')
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
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Buat Kuis Baru</h1>
          <p class="text-gray-500 mt-1 text-sm font-medium">Buat evaluasi soal secara manual.</p>
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

    <!-- Title Card -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div class="space-y-2">
        <label class="block text-xs font-bold text-gray-500 ml-1">Judul Set Soal</label>
        <input 
          v-model="quiz.title"
          type="text" 
          placeholder="Contoh: Kuis Akhir Bab 1"
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
        />
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
          <div v-if="q.type === 'multiple-choice'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(_, oIdx) in q.options" :key="oIdx" class="relative group/option flex items-center">
              <div 
                class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm mr-3 transition-colors"
                :class="q.correctIndex === oIdx ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'"
              >
                {{ String.fromCharCode(65 + oIdx) }}
              </div>
              <input 
                v-model="q.options[oIdx]"
                class="w-full px-4 py-2.5 bg-white border rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-gray-700"
                :class="q.correctIndex === oIdx ? 'border-emerald-300' : 'border-gray-200'"
                :placeholder="'Jawaban ' + String.fromCharCode(65 + oIdx)"
              />
              <div class="absolute right-3 translate-y-1/2 bottom-1/2 flex items-center justify-center">
                <button 
                    @click="q.correctIndex = oIdx"
                    title="Tandai Sebagai Jawaban Benar"
                    class="p-1.5 rounded-lg transition-colors bg-white"
                    :class="q.correctIndex === oIdx ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-500'"
                >
                    <CheckCircle2 class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- TYPE: MATCHING -->
          <div v-else-if="q.type === 'matching'" class="space-y-4">
            <div v-for="(item, iIdx) in q.leftItems" :key="iIdx" class="flex gap-3 items-center">
              <div class="flex-1">
                <label class="block text-xs font-bold text-gray-500 mb-1" v-if="iIdx===0">Premis (Kiri)</label>
                <input 
                  v-model="q.leftItems[iIdx].text"
                  class="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="Contoh: HTML"
                />
              </div>
              <div class="text-gray-400 flex items-center justify-center mt-5">
                <Layout class="w-4 h-4" />
              </div>
              <div class="flex-1 pb-0 relative">
                <label class="block text-xs font-bold text-emerald-600 mb-1" v-if="iIdx===0">Pasangan (Kanan)</label>
                <input 
                  v-model="q.rightItems[iIdx].text"
                  class="w-full px-3 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg focus:border-emerald-500 outline-none transition-all text-sm text-emerald-800"
                  placeholder="Contoh: Menampilkan Struktur"
                />
                <button @click="q.leftItems.splice(iIdx, 1); q.rightItems.splice(iIdx, 1); delete q.pairs[q.leftItems[iIdx].id]" class="absolute -right-8 top-1/2 mt-2.5 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            <!-- ADD PAIR -->
            <button 
              @click="addMatchingItem(qIdx)"
              class="w-full py-3 border-2 border-dashed border-gray-200 mt-2 rounded-xl text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
            >
              <Plus class="w-4 h-4" />
              Tambah Pasangan
            </button>
          </div>

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
          Simpan Kuis
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
