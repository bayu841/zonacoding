<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ArrowLeft,
  Search
} from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'
import CourseGrid from '../../../components/mentor/assignments/CourseGrid.vue'
import SubmissionTable from '../../../components/mentor/assignments/SubmissionTable.vue'
import GradingForm from '../../../components/mentor/assignments/GradingForm.vue'
import { getCoursesPendingTasks } from '@/api/assignment'

const selectedCourse = ref(null)
const searchQuery = ref('')
const filterStatus = ref('Pending')
const loading = ref(false)
const activeCourses = ref([])

// Dummy Submissions (Keep for now until detail endpoint is confirmed)
const submissions = ref([
  { id: 1, student: 'Budi Kurniawan', course: 'Mastering Go Lang', title: 'Tugas: Arsitektur Microservices', date: '11 Apr 2026', status: 'Pending', link: 'github.com/budi/go-micro' },
  { id: 2, student: 'Sari Indah', course: 'UI/UX Premium', title: 'Proyek: Redesign Aplikasi Bank', date: '10 Apr 2026', status: 'Pending', link: 'behance.net/sari/bank-redesign' },
  { id: 3, student: 'Andi Pratama', course: 'Next.js Advanced', title: 'Tugas: Middleware Auth', date: '09 Apr 2026', status: 'Graded', score: 95, dateGraded: '10 Apr 2026' },
  { id: 4, student: 'Rina Nose', course: 'Mastering Go Lang', title: 'Tugas: Arsitektur Microservices', date: '08 Apr 2026', status: 'Graded', score: 88, dateGraded: '09 Apr 2026' },
])

const fetchCourses = async () => {
  loading.value = true
  try {
    const res = await getCoursesPendingTasks()
    if (res.status) {
      activeCourses.value = res.data.map(c => ({
        id: c.id,
        name: c.course_name,
        total: c.total_tasks,
        pending: c.pending_grading
      }))
    }
  } catch (err) {
    console.error('Fetch courses error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourses()
})

const filteredSubmissions = computed(() => {
  return submissions.value.filter(s => {
    const matchesCourse = !selectedCourse.value || s.course === selectedCourse.value
    const matchesSearch = s.student.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'Semua' || s.status === filterStatus.value
    return matchesCourse && matchesSearch && matchesStatus
  })
})

const isGradingModalOpen = ref(false)
const selectedSub = ref(null)

const openGrading = (sub) => {
  selectedSub.value = { ...sub }
  isGradingModalOpen.value = true
}

const handleGradeSubmission = (result) => {
  const index = submissions.value.findIndex(s => s.id === result.id)
  if (index !== -1) {
    submissions.value[index].status = 'Graded'
    submissions.value[index].score = result.score
    submissions.value[index].feedback = result.feedback
    submissions.value[index].dateGraded = 'Hari Ini'
  }
  isGradingModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-black text-gray-900">
          {{ selectedCourse ? 'Daftar Tugas: ' + selectedCourse.name : 'Penilaian Tugas' }}
        </h2>
        <p class="text-gray-500 text-sm mt-1 font-medium">
          {{ selectedCourse ? 'Menampilkan semua pengajuan tugas untuk kelas ini.' : 'Pilih kelas untuk mulai memberikan penilaian.' }}
        </p>
      </div>
      <button v-if="selectedCourse" @click="selectedCourse = null" class="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm shadow-sm">
        <ArrowLeft class="w-4 h-4 mr-2" /> Kembali ke Daftar Kelas
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !isGradingModalOpen" class="flex flex-col items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 font-bold animate-pulse">Memuat data...</p>
    </div>

    <!-- VIEW 1: Course Selection -->
    <CourseGrid
      v-if="!selectedCourse && !loading"
      :courses="activeCourses"
      @select="course => selectedCourse = course"
    />

    <!-- VIEW 2: Submissions for Selected Course -->
    <div v-else-if="selectedCourse && !loading" class="space-y-6">
      <!-- Filters & Search -->
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100">
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <button v-for="status in ['Semua', 'Pending', 'Graded']" :key="status"
            @click="filterStatus = status"
            class="px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
            :class="filterStatus === status ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-500 hover:bg-gray-50'"
          >
            {{ status }}
          </button>
        </div>

        <div class="relative w-full md:w-80">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama siswa..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl outline-none text-sm font-medium focus:ring-4 focus:ring-indigo-50"
          />
        </div>
      </div>

      <SubmissionTable
        :submissions="filteredSubmissions"
        @grade="openGrading"
      />
    </div>

    <!-- Grading Modal -->
    <BaseModal :is-open="isGradingModalOpen" @close="isGradingModalOpen = false" title="Evaluasi Proyek Siswa" size="md">
      <GradingForm
        v-if="selectedSub"
        :submission="selectedSub"
        @submit="handleGradeSubmission"
        @cancel="isGradingModalOpen = false"
      />
    </BaseModal>
  </div>
</template>
