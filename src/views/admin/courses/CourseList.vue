<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CourseListHeader from '../../../components/admin/courses/CourseListHeader.vue'
import CourseListTable from '../../../components/admin/courses/CourseListTable.vue'
import CourseListGrid from '../../../components/admin/courses/CourseListGrid.vue'
import { getCourses, deleteCourse, updateCourse } from '@/api/course'
import { getCategories } from '@/api/category'

import { useAlert } from '../../../composables/useAlert'

const { showAlert } = useAlert()
const router = useRouter()

const courses = ref([])
const categories = ref([])
const pagination = ref({
  total: 0,
  per_page: 5,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
const filterStatus = ref('all')
const filterCategory = ref('all')
const searchQuery = ref('')
const viewMode = ref('table') // 'table' atau 'grid'

const fetchCourses = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      status: filterStatus.value !== 'all' ? filterStatus.value.toLowerCase() : undefined,
      category: filterCategory.value !== 'all' ? filterCategory.value : undefined,
      search: searchQuery.value || undefined
    }
    const response = await getCourses(params)
    courses.value = response.data.data
    pagination.value = response.data.pagination
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response.data.data
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

onMounted(() => {
  fetchCourses()
  fetchCategories()
})


const handleEditCourse = (course) => {
  router.push(`/admin/courses/edit/${course.id}`)
}


const handleApprove = (course) => {
  showAlert(
    'Konfirmasi Moderasi',
    `Apakah Anda setuju untuk mempublikasikan "${course.title}"?`,
    'confirm',
    async () => {
      try {
        await updateCourse(course.id, { status: 'published' })
        fetchCourses(pagination.value.current_page)
        showAlert('Kursus Lulus Moderasi', 'Kursus sekarang aktif dan dapat diakses publik.', 'success')
      } catch (err) {
        showAlert('Gagal', 'Terjadi kesalahan saat mengupdate status.', 'error')
      }
    }
  )
}

const handleReject = (course) => {
  showAlert(
    'Tolak Kursus',
    `Apakah Anda ingin menolak kursus "${course.title}"?`,
    'confirm',
    async () => {
      try {
        await updateCourse(course.id, { status: 'draft' })
        fetchCourses(pagination.value.current_page)
        showAlert('Kursus Ditolak', 'Status kursus telah dikembalikan ke Draft.', 'warning')
      } catch (err) {
        showAlert('Gagal', 'Terjadi kesalahan saat mengupdate status.', 'error')
      }
    }
  )
}

const handleDeleteCourse = (course) => {
  showAlert(
    'Konfirmasi Hapus', 
    `Apakah Anda yakin ingin menghapus kursus "${course.title}"?`, 
    'confirm',
    async () => {
      try {
        await deleteCourse(course.id)
        fetchCourses(pagination.value.current_page)
        showAlert('Berhasil Dihapus', 'Kursus telah dihapus dari sistem.', 'success')
      } catch (err) {
        showAlert('Gagal', 'Terjadi kesalahan saat menghapus kursus.', 'error')
      }
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
      :categories="categories"
      @update:searchQuery="fetchCourses(1)"
      @update:filterStatus="fetchCourses(1)"
      @update:filterCategory="fetchCourses(1)"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- List Component -->
    <div v-else class="mt-8 transition-all duration-300">
      <CourseListTable
        v-if="viewMode === 'table'"
        :courses="courses"
        :pagination="pagination"
        @view-edit="handleEditCourse"
        @delete-course="handleDeleteCourse"
        @approve-course="handleApprove"
        @reject-course="handleReject"
        @change-page="fetchCourses"
      />
      
      <CourseListGrid
        v-else
        :courses="courses"
        :pagination="pagination"
        @view-edit="handleEditCourse"
        @delete-course="handleDeleteCourse"
        @change-page="fetchCourses"
      />
    </div>

  </div>
</template>
