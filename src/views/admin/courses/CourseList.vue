<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CourseListHeader from '../../../components/admin/courses/CourseListHeader.vue'
import CourseListTable from '../../../components/admin/courses/CourseListTable.vue'
import CourseListGrid from '../../../components/admin/courses/CourseListGrid.vue'

const router = useRouter()

const courses = ref([
  { id: 1, title: 'Mastering Vue 3: From Zero to Hero', category: 'Frontend', mentor: 'Andi Setiawan', status: 'Published', price: 250000 },
  { id: 2, title: 'Advanced Tailwind CSS: Building Premium UI', category: 'Design', mentor: 'Budi Santoso', status: 'Published', price: 150000 },
  { id: 3, title: 'Dasar UI/UX Design System', category: 'Design', mentor: 'Siti Aminah', status: 'Draft', price: 0 },
  { id: 4, title: 'Node.js Backend Architecture', category: 'Backend', mentor: 'Rudi Hartono', status: 'Published', price: 300000 },
  { id: 5, title: 'Fullstack Laravel & Vue 3', category: 'Frontend', mentor: 'Maya Sari', status: 'Draft', price: 450000 },
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

const handleDeleteCourse = (course) => {
  if (confirm(`Apakah Anda yakin ingin menghapus kursus "${course.title}"?`)) {
    courses.value = courses.value.filter(c => c.id !== course.id)
    alert('Kursus berhasil dihapus')
  }
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
