<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CourseListHeader from '../../../components/admin/courses/CourseListHeader.vue'
import CourseListTable from '../../../components/admin/courses/CourseListTable.vue'
import CourseListGrid from '../../../components/admin/courses/CourseListGrid.vue'

import { useAlert } from '../../../composables/useAlert'

const { showAlert } = useAlert()
const router = useRouter()

const courses = ref([
  { id: 1, title: 'Mastering Vue 3: From Zero to Hero', category: 'Frontend', mentor: 'Andi Setiawan', status: 'Published', price: 250000 },
  { id: 2, title: 'Advanced Tailwind CSS: Building Premium UI', category: 'Design', mentor: 'Budi Santoso', status: 'Published', price: 150000 },
  { id: 3, title: 'Dasar UI/UX Design System', category: 'Design', mentor: 'Siti Aminah', status: 'Pending', price: 0 },
  { id: 4, title: 'Node.js Backend Architecture', category: 'Backend', mentor: 'Rudi Hartono', status: 'Published', price: 300000 },
  { id: 5, title: 'Fullstack Laravel & Vue 3', category: 'Frontend', mentor: 'Maya Sari', status: 'Pending', price: 450000 },
])

const filterStatus = ref('all')
const filterCategory = ref('all')
const searchQuery = ref('')
const viewMode = ref('table') // 'table' atau 'grid'

// Filtered courses
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesStatus = filterStatus.value === 'all' || course.status === filterStatus.value
    const matchesCategory = filterCategory.value === 'all' || course.category === filterCategory.value
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesCategory && matchesSearch
  })
})

const handleEditCourse = (course) => {
  router.push(`/admin/courses/edit/${course.id}`)
}

const handleApprove = (course) => {
  showAlert(
    'Konfirmasi Moderasi',
    `Apakah Anda setuju untuk mempublikasikan "${course.title}"?`,
    'confirm',
    () => {
      const idx = courses.value.findIndex(c => c.id === course.id)
      if (idx !== -1) courses.value[idx].status = 'Published'
      showAlert('Kursus Lulus Moderasi', 'Kursus sekarang aktif dan dapat diakses publik.', 'success')
    }
  )
}

const handleReject = (course) => {
  showAlert(
    'Tolak Kursus',
    `Apakah Anda ingin menolak kursus "${course.title}"? Berikan alasan pada mentor nantinya.`,
    'confirm',
    () => {
      const idx = courses.value.findIndex(c => c.id === course.id)
      if (idx !== -1) courses.value[idx].status = 'Draft'
      showAlert('Kursus Ditolak', 'Status kursus telah dikembalikan ke Draft.', 'warning')
    }
  )
}

const handleDeleteCourse = (course) => {
  showAlert(
    'Konfirmasi Hapus', 
    `Apakah Anda yakin ingin menghapus kursus "${course.title}"? Tindakan ini tidak dapat dibatalkan.`, 
    'confirm',
    () => {
      courses.value = courses.value.filter(c => c.id !== course.id)
      showAlert('Berhasil Dihapus', 'Kursus telah dihapus dari sistem.', 'success')
    }
  )
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Component -->
    <CourseListHeader
      v-model:searchQuery="searchQuery"
      v-model:filterStatus="filterStatus"
      v-model:filterCategory="filterCategory"
      v-model:viewMode="viewMode"
    />

    <!-- List Component -->
    <div class="mt-8 transition-all duration-300">
      <CourseListTable
        v-if="viewMode === 'table'"
        :courses="filteredCourses"
        @view-edit="handleEditCourse"
        @delete-course="handleDeleteCourse"
        @approve-course="handleApprove"
        @reject-course="handleReject"
      />
      
      <CourseListGrid
        v-else
        :courses="filteredCourses"
        @view-edit="handleEditCourse"
        @delete-course="handleDeleteCourse"
      />
    </div>
  </div>
</template>
