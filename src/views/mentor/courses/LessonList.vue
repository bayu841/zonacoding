<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Plus, Search, BookOpen, Layout } from 'lucide-vue-next'
import LessonListTable from '@/components/admin/courses/lessons/LessonListTable.vue'
import LessonFormModal from '@/components/admin/courses/lessons/LessonFormModal.vue'
import LessonDetailModal from '@/components/admin/courses/lessons/LessonDetailModal.vue'
import { getLessons, deleteLesson } from '@/api/lesson'
import { getCourse } from '@/api/course'
import { useAlert } from '@/composables/useAlert'

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()

const courseId = route.params.courseId
const course = ref(null)
const lessons = ref([])
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
const searchQuery = ref('')
const showModal = ref(false)
const showDetailModal = ref(false)
const selectedLesson = ref(null)

const fetchCourse = async () => {
  try {
    const res = await getCourse(courseId)
    course.value = res.data
  } catch (err) {
    console.error('Error fetching course:', err)
  }
}

const fetchLessons = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      search: searchQuery.value || undefined
    }
    const res = await getLessons(courseId, params)
    lessons.value = res.data.data
    pagination.value = res.data.pagination
  } catch (err) {
    console.error('Error fetching lessons:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourse()
  fetchLessons()
})

const goBack = () => {
  router.push('/mentor/courses')
}

const openCreateModal = () => {
  selectedLesson.value = null
  showModal.value = true
}

const openEditModal = (lesson) => {
  selectedLesson.value = lesson
  showModal.value = true
}

const openDetailModal = (lesson) => {
  selectedLesson.value = lesson
  showDetailModal.value = true
}

const handleDelete = (lesson) => {
  showAlert(
    'Hapus Lesson',
    `Apakah Anda yakin ingin menghapus lesson "${lesson.title}"?`,
    'confirm',
    async () => {
      try {
        await deleteLesson(courseId, lesson.id)
        fetchLessons(pagination.value.current_page)
        showAlert('Berhasil', 'Lesson telah dihapus.', 'success')
      } catch (err) {
        showAlert('Gagal', 'Terjadi kesalahan saat menghapus lesson.', 'error')
      }
    }
  )
}

const handleModalSuccess = () => {
  showModal.value = false
  fetchLessons(pagination.value.current_page)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <button @click="goBack" class="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          <ChevronLeft class="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <span class="w-1.5 h-7 bg-indigo-500 rounded-full mr-3"></span>
            Manage Lessons
          </h2>
          <p v-if="course" class="text-sm text-gray-500 mt-1">Kursus: <span class="font-semibold text-indigo-600">{{ course.title }}</span></p>
        </div>
      </div>
      <button 
        @click="openCreateModal"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Plus class="w-4 h-4" />
        Tambah Lesson
      </button>
    </div>

    <!-- Search bar -->
    <div class="flex items-center gap-4">
      <div class="relative flex-1 sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          @input="fetchLessons(1)"
          type="text"
          placeholder="Cari lesson..."
          class="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-shadow shadow-sm"
        />
      </div>
    </div>

    <!-- Content -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
    <div v-else>
      <LessonListTable 
        :lessons="lessons" 
        :pagination="pagination"
        @view-detail="openDetailModal"
        @edit="openEditModal"
        @delete="handleDelete"
        @change-page="fetchLessons"
      />
    </div>

    <!-- Form Modal -->
    <LessonFormModal 
      v-if="showModal"
      :show="showModal"
      :courseId="courseId"
      :initialData="selectedLesson"
      @close="showModal = false"
      @success="handleModalSuccess"
    />

    <!-- Detail Modal -->
    <LessonDetailModal
      v-if="showDetailModal"
      :show="showDetailModal"
      :lesson="selectedLesson"
      @close="showDetailModal = false"
    />
  </div>
</template>
