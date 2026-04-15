<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Maximize,
  Volume2,
  X,
  Send,
  UploadCloud,
  ExternalLink,
  Award, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Calendar,
  ChevronRight,
  HelpCircle
} from 'lucide-vue-next'
import BaseModal from '../../components/shared/BaseModal.vue'
import { useAlert } from '../../composables/useAlert'

// Modular Components
import VideoLesson from '../../components/student/learning/VideoLesson.vue'
import TextLesson from '../../components/student/learning/TextLesson.vue'
import ProjectSubmission from '../../components/student/learning/ProjectSubmission.vue'
import SyllabusSidebar from '../../components/student/learning/SyllabusSidebar.vue'
import DiscussionDrawer from '../../components/student/learning/DiscussionDrawer.vue'
import QuizLesson from '../../components/student/learning/QuizLesson.vue'
import FileLesson from '../../components/student/learning/FileLesson.vue'

const { showAlert } = useAlert()
const router = useRouter()
const route = useRoute()

// 1. Progress State
const finishedLessons = ref(['l1', 'l2']) // Already finished

// 2. Assignment State
const assignmentLink = ref('')
const isSubmitted = ref(false)
const assignmentScore = ref(null)
const assignmentStatus = ref('Unsubmitted') // 'Unsubmitted', 'Pending', 'Graded'

// Today is 11 April 2026. Let's set deadline to 13 April 2026
const deadline = new Date('2026-04-13T23:59:59')
const timeRemaining = ref('')

const updateCountdown = () => {
    const now = new Date()
    const diff = deadline - now
    if (diff <= 0) {
        timeRemaining.value = 'WAKTU HABIS'
        return
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    timeRemaining.value = `${days}h ${hours}j tersisa`
}
updateCountdown()
setInterval(updateCountdown, 60000)

// Dummy Syllabus Data
const syllabus = ref([
  {
    id: 'm1',
    title: 'Modul 1: Pengenalan Dasar',
    isOpen: true,
    lessons: [
      { id: 'l1', title: 'Apa itu Web Development?', type: 'video', duration: '12:40', isCompleted: true },
      { id: 'l2', title: 'Persiapan Tools & Instalasi', type: 'text', readTime: '5 min read', isCompleted: true },
      { 
        id: 'q1', 
        title: 'Kuis Basic Web', 
        type: 'quiz', 
        isCompleted: false,
        quizData: [
          {
            type: 'multiple-choice',
            text: 'Apa kepanjangan dari HTML?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink Text Management List', 'Home Tool Markup Level'],
            correctIndex: 0
          },
          {
            type: 'matching',
            text: 'Pasangkanlah istilah web berikut dengan fungsinya.',
            leftItems: [
              { id: 'l1', text: 'HTML' },
              { id: 'l2', text: 'CSS' },
              { id: 'l3', text: 'JavaScript' }
            ],
            rightItems: [
              { id: 'r1', text: 'Kerangka Dasar (Structure)' },
              { id: 'r2', text: 'Tampilan & Gaya (Presentative)' },
              { id: 'r3', text: 'Logika Interaktif (Behavior)' }
            ],
            pairs: {
              'l1': 'r1',
              'l2': 'r2',
              'l3': 'r3'
            }
          }
        ]
      },
    ]
  },
  {
    id: 'm2',
    title: 'Modul 2: Konsep Inti',
    isOpen: true,
    lessons: [
      { id: 'l3', title: 'Mengenal DOM & Struktur HTML', type: 'video', duration: '24:15', isCompleted: false },
      { id: 'l4', title: 'Styling dengan CSS Modern', type: 'text', readTime: '8 min read', isCompleted: false },
      { 
        id: 'f1', 
        title: 'Cheat Sheet JavaScript ES6+', 
        type: 'file', 
        fileName: 'js-es6-cheatsheet.pdf', 
        fileType: 'Adobe PDF Document', 
        fileSize: '1.2 MB', 
        isCompleted: false 
      },
      { id: 'l5', title: 'JavaScript Logic Building', type: 'video', duration: '35:10', isCompleted: false },
      { 
        id: 'l6', 
        title: 'Proyek Akhir: Aplikasi Dashboard', 
        type: 'project', 
        isCompleted: false,
        deadline: 5,
        instructions: 'Bangunlah sebuah aplikasi dashboard manajemen inventaris menggunakan Vue 3 dan Tailwind CSS. Aplikasi harus memiliki fitur CRUD dan visualisasi data sederhana menggunakan Chart.js.'
      }
    ]
  }
])

const currentLessonId = ref('q1') 

const currentLesson = computed(() => {
  for (const mod of syllabus.value) {
    for (const lesson of mod.lessons) {
      if (lesson.id === currentLessonId.value) return lesson
    }
  }
  return null
})

const checkLessonLocked = (lessonId) => {
  const flatLessons = syllabus.value.flatMap(m => m.lessons)
  const idx = flatLessons.findIndex(l => l.id === lessonId)
  if (idx <= 0) return false 
  return !finishedLessons.value.includes(flatLessons[idx-1].id)
}

const selectLesson = (id) => {
  if (checkLessonLocked(id)) {
      showAlert('Akses Terkunci', 'Selesaikan materi sebelumnya terlebih dahulu untuk membuka bagian ini.', 'warning')
      return
  }
  currentLessonId.value = id
}

const markAsComplete = () => {
    if (!finishedLessons.value.includes(currentLessonId.value)) {
        finishedLessons.value.push(currentLessonId.value)
    }
    const flatLessons = syllabus.value.flatMap(m => m.lessons)
    const idx = flatLessons.findIndex(l => l.id === currentLessonId.value)
    if (idx < flatLessons.length - 1) {
        currentLessonId.value = flatLessons[idx+1].id
    }
}

const toggleModule = (modId) => {
  const mod = syllabus.value.find(m => m.id === modId)
  if (mod) mod.isOpen = !mod.isOpen
}

const isDiscussionOpen = ref(false)
const newComment = ref('')

const discussions = ref([
  { id: 1, author: 'Budi Santoso', isMentor: true, text: 'Halo semuanya! Ada yang kesulitan mengatur environment variable di Next.js?', time: '1 jam lalu', avatar: 'B' },
  { id: 2, author: 'Andi Saputra', isMentor: false, text: 'Iya kak, kadang process.env.NEXT_PUBLIC undefined saat di client-side.', time: '45 menit lalu', avatar: 'A' }
])

const postComment = () => {
  if (!newComment.value.trim()) return
  discussions.value.push({
    id: Date.now(),
    author: authStore.user?.name || 'Student User',
    isMentor: false,
    text: newComment.value,
    time: 'Baru saja',
    avatar: authStore.user?.name?.charAt(0).toUpperCase() || 'S'
  })
  newComment.value = ''
}

const submitAssignment = () => {
    if (!assignmentLink.value.trim()) return
    isSubmitted.value = true
    assignmentStatus.value = 'Pending'
    
    // Simulate grading after 3 seconds for demonstration
    setTimeout(() => {
       assignmentStatus.value = 'Graded'
       assignmentScore.value = 92
    }, 4000)
}

const goBack = () => {
  router.push('/student/courses')
}

// Dummy Article Content (shown when type === 'text')
const articleContent = `
  <p class="mb-4 text-gray-700 leading-relaxed">
    Dalam pelajaran ini, kita akan membahas ekosistem styling modern. Berbeda dengan pendekatan klasik, penggunaan framework utility-first seperti Tailwind CSS atau pre-processor seperti SASS membuat arsitektur UI kita menjadi jauh lebih konsisten.
  </p>
  <img src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1200&h=600" alt="Code Screenshot" class="w-full rounded-2xl shadow-md my-6" />
  <h3 class="text-xl font-bold text-gray-900 mb-3 mt-8">Mengapa Utility-First?</h3>
  <p class="mb-4 text-gray-700 leading-relaxed">
    Utility-first paradigm memungkinkan developer untuk tetap berada dalam dokumen HTML (markup) tanpa perlu terus menerus melakukan context-switching ke file CSS. Meskipun pada pandangan pertama terlihat seperti inline-styles, utility class menyimpan sistem desain terpusat (design tokens).
  </p>
  <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl my-6">
    <p class="text-indigo-800 font-medium"><strong>Catatan Mentor:</strong> Pastikan Anda telah menginstal ekstensi Intellisense di VSCode Anda agar pengalaman menggunakan utility classes ini lebih mulus.</p>
  </div>
`
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col md:flex-row -m-6"> <!-- Negative margin to break out of Layout standard padding -->
    
    <!-- Left Panel : Main Content Area (70%) -->
    <div class="flex-1 flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      <!-- Top Action Bar -->
      <div class="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-20">
        <button @click="goBack" class="flex items-center text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke Kursus
        </button>
        <div class="flex items-center gap-3">
          <button @click="isDiscussionOpen = true" class="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
            <MessageSquare class="w-4 h-4 mr-1.5" /> Diskusi
          </button>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          
          <VideoLesson 
            v-if="currentLesson?.type === 'video'" 
            :lesson="currentLesson" 
          />

          <TextLesson 
            v-else-if="currentLesson?.type === 'text'" 
            :lesson="currentLesson" 
            :content="articleContent" 
          />

          <ProjectSubmission 
            v-else-if="currentLesson?.type === 'project'" 
            :lesson="currentLesson"
            v-model:assignmentLink="assignmentLink"
            :assignment-status="assignmentStatus"
            :assignment-score="assignmentScore"
            :time-remaining="timeRemaining"
            @submit="submitAssignment"
            @view-certificates="router.push('/student/certificates')"
          />

          <QuizLesson 
            v-else-if="currentLesson?.type === 'quiz'" 
            :lesson="currentLesson"
            @complete="markAsComplete"
          />

          <FileLesson 
            v-else-if="currentLesson?.type === 'file'" 
            :lesson="currentLesson"
          />

          <!-- Next Up: Quiz CTA (Discoverability Improvement) -->
          <div 
            v-if="currentLesson?.type !== 'quiz' && syllabus[0].lessons[2].id === 'q1' && !syllabus[0].lessons[2].isCompleted"
            class="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <HelpCircle class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs font-bold text-indigo-100 uppercase tracking-widest">Selanjutnya</p>
                <h4 class="text-lg font-black uppercase tracking-tight">Kuis: Basic Web Development</h4>
              </div>
            </div>
            <button 
              @click="selectLesson('q1')"
              class="px-5 py-2.5 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg"
            >
              Mulai Kuis
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>

        </div>

        <!-- Navigation Buttons -->
        <div class="max-w-4xl mx-auto mt-8 flex items-center justify-between">
          <button class="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Materi Sebelumnya
          </button>
          <button @click="markAsComplete" class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Selesai & Lanjut
          </button>
        </div>
      </div>
    </div>

    <!-- Right Panel : Syllabus Sidebar -->
    <SyllabusSidebar 
      :syllabus="syllabus"
      :current-lesson-id="currentLessonId"
      :finished-lessons="finishedLessons"
      :check-lesson-locked="checkLessonLocked"
      @select-lesson="selectLesson"
      @toggle-module="toggleModule"
    />

    <!-- Forum Diskusi Drawer -->
    <DiscussionDrawer 
      :is-open="isDiscussionOpen"
      :current-lesson="currentLesson"
      :discussions="discussions"
      v-model:new-comment="newComment"
      @close="isDiscussionOpen = false"
      @post="postComment"
    />

    <!-- Overlay Desktop/Mobile -->
    <transition
      enter-active-class="ease-in-out duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isDiscussionOpen" @click="isDiscussionOpen = false" class="fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity z-40"></div>
    </transition>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
