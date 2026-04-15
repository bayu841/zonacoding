<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import CourseForm from '../../../components/admin/courses/CourseForm.vue'
import { getCourse, updateCourse } from '@/api/course'
import { useAlert } from '../../../composables/useAlert'

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const courseId = route.params.courseId
const loading = ref(true)

const initialData = ref({
  title: '',
  description: '',
  category_id: '',
  user_id: '',
  thumbnail: null,
  price: 0,
  level: 'beginner',
  status: 'draft',
  is_certificate: 0
})

const fetchCourseDetails = async () => {
  try {
    const response = await getCourse(courseId)
    const data = response.data
    initialData.value = {
      title: data.title,
      description: data.description,
      category_id: data.category?.id || '',
      user_id: data.mentor?.id || '',
      thumbnail: data.thumbnail,
      price: data.price,
      level: data.level,
      status: data.status,
      is_certificate: data.is_certificate
    }
  } catch (err) {
    showAlert('Error', 'Gagal mengambil detail kursus', 'error')
    router.push('/admin/courses')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourseDetails()
})

const handleCancel = () => {
  router.push('/admin/courses')
}

const handleSubmit = async (formData) => {
  try {
    await updateCourse(courseId, formData)
    showAlert('Berhasil', 'Kursus berhasil diperbarui!', 'success')
    router.push('/admin/courses')
  } catch (err) {
    showAlert('Gagal', err.message || 'Terjadi kesalahan saat memperbarui kursus.', 'error')
  }
}
</script>


<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Kursus</h2>
      <p class="mt-2 text-lg text-gray-500">Perbarui informasi untuk kursus ID: <span class="text-indigo-600 font-mono">{{ courseId }}</span></p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <CourseForm 
      v-else
      :initialData="initialData" 
      :isEdit="true"
      @cancel="handleCancel" 
      @submit="handleSubmit" 
    />
  </div>
</template>
