<script setup>
import { ref } from 'vue'
import { BookOpen, CheckCircle, Clock, Plus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import AvailableCourses from '../../../components/mentor/courses/AvailableCourses.vue'
import ActiveCourses from '../../../components/mentor/courses/ActiveCourses.vue'
import PendingCourses from '../../../components/mentor/courses/PendingCourses.vue'

const router = useRouter()
const activeTab = ref('tersedia') // 'tersedia' | 'aktif' | 'menunggu'

// DUMMY DATA
const availableCourses = ref([
  { id: 101, title: 'Dasar Pemrograman Python', category: 'Backend', level: 'Beginner', quota: 50, status: 'Open' },
  { id: 102, title: 'Mastering React 18', category: 'Frontend', level: 'Advanced', quota: 30, status: 'Open' },
  { id: 103, title: 'UI/UX untuk Aplikasi Mobile', category: 'Design', level: 'Intermediate', quota: 40, status: 'Open' },
  { id: 104, title: 'Node.js & Express API', category: 'Backend', level: 'Intermediate', quota: 35, status: 'Open' }
])

const activeCourses = ref([
  { id: 201, title: 'Membuat Website dengan HTML & CSS', category: 'Frontend', level: 'Beginner', students: 120 },
  { id: 202, title: 'Tailwind CSS dari Nol', category: 'Frontend', level: 'Beginner', students: 85 }
])

const pendingCourses = ref([
  { id: 301, title: 'Figma to Code', category: 'Design', level: 'Intermediate', appliedDate: 'Kemarin' }
])

const handleApply = (course) => {
  // Pindahkan dari kursus tersedia ke menunggu persetujuan
  availableCourses.value = availableCourses.value.filter(c => c.id !== course.id)
  pendingCourses.value.push({
    ...course,
    appliedDate: 'Baru Saja'
  })
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
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'tersedia'"
          :class="[
            activeTab === 'tersedia' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all'
          ]"
        >
          <BookOpen class="w-4 h-4" />
          Kursus Tersedia
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
          <span class="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{{ activeCourses.length }}</span>
        </button>
        <button
          @click="activeTab = 'menunggu'"
          :class="[
            activeTab === 'menunggu' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
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
        :courses="availableCourses" 
        @apply="handleApply"
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
