<script setup>
import { computed, onMounted, ref } from 'vue'
import { BookOpen, CheckCircle, Clock } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { getCoursesNoMentor, getActiveCoursesByMentor } from '@/api/course'
import { getPendingMentorApplications } from '@/api/courseMentorApplication'

import AvailableCourses from '../../../components/mentor/courses/AvailableCourses.vue'
import ActiveCourses from '../../../components/mentor/courses/ActiveCourses.vue'
import PendingCourses from '../../../components/mentor/courses/PendingCourses.vue'

const router = useRouter()
const activeTab = ref('tersedia')

const availableCourses = ref([])
const activeCourses = ref([])
const pendingCourses = ref([])
const loading = ref(false)

const filteredAvailableCourses = computed(() => {
  const pendingCourseIds = new Set(pendingCourses.value.map(app => app.course_id))
  return availableCourses.value.filter(course => !pendingCourseIds.has(course.id))
})

const fetchAllData = async () => {
  loading.value = true
  try {
    const [avail, active, pending] = await Promise.all([
      getCoursesNoMentor(),
      getActiveCoursesByMentor(),
      getPendingMentorApplications()
    ])
    
    if (avail.status) availableCourses.value = avail.data
    if (active.status) activeCourses.value = active.data
    
    if (pending.status) {
      // Perkaya data pending dengan detail kursus jika tersedia di list available
      pendingCourses.value = pending.data.data.map(app => {
        const courseDetail = availableCourses.value.find(c => c.id === app.course_id)
        return {
          ...app,
          course: app.course || courseDetail
        }
      })
    }
  } catch (err) {
    console.error('Fetch dashboard data error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAllData()
})

const handleRefresh = () => {
  fetchAllData()
}
</script>

<template>
  <div class="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Page -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <div>
          <h1 class="text-2xl font-black text-gray-900 leading-none">Manajemen Kursus</h1>
          <p class="text-sm text-gray-500 mt-2 font-medium">Pilih kursus yang ingin Anda ajar dari daftar yang tersedia.</p>
        </div>
      </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-100 mb-8 bg-white/50 backdrop-blur-sm -mx-6 px-6 sticky top-0 z-20">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          @click="activeTab = 'tersedia'"
          :class="[
            activeTab === 'tersedia' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all'
          ]"
        >
          <BookOpen class="w-4 h-4" />
          Kursus Tersedia
          <span class="ml-1 bg-emerald-100 text-emerald-600 py-0.5 px-2 rounded-full text-xs font-bold">{{ filteredAvailableCourses.length }}</span>
        </button>

        <button
          @click="activeTab = 'aktif'"
          :class="[
            activeTab === 'aktif' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all'
          ]"
        >
          <CheckCircle class="w-4 h-4" />
          Kursus Aktif Anda
          <span class="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs font-bold">{{ activeCourses.length }}</span>
        </button>

        <button
          @click="activeTab = 'menunggu'"
          :class="[
            activeTab === 'menunggu' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all'
          ]"
        >
          <Clock class="w-4 h-4" />
          Menunggu Persetujuan
          <span class="ml-1 bg-amber-100 text-amber-600 py-0.5 px-2 rounded-full text-xs font-bold">{{ pendingCourses.length }}</span>
        </button>
      </nav>
    </div>

    <!-- Tab Contents -->
    <div class="mt-6">
      <AvailableCourses
        v-if="activeTab === 'tersedia'"
        :courses="filteredAvailableCourses"
        @refresh="handleRefresh"
      />

      <ActiveCourses
        v-if="activeTab === 'aktif'"
        :courses="activeCourses"
      />

      <PendingCourses
        v-if="activeTab === 'menunggu'"
        :courses="pendingCourses"
      />
    </div>
  </div>
</template>
