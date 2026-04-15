<script setup>
import { useRouter } from 'vue-router'
import CourseForm from '../../../components/admin/courses/CourseForm.vue'
import { createCourse } from '@/api/course'
import { useAlert } from '../../../composables/useAlert'

const router = useRouter()
const { showAlert } = useAlert()

const handleCancel = () => {
  router.push('/admin/courses')
}

const handleSubmit = async (formData) => {
  try {
    await createCourse(formData)
    showAlert('Berhasil', 'Kursus baru berhasil dibuat!', 'success')
    router.push('/admin/courses')
  } catch (err) {
    showAlert('Gagal', err.message || 'Terjadi kesalahan saat membuat kursus.', 'error')
  }
}
</script>


<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Buat Kursus Baru</h2>
      <p class="mt-2 text-lg text-gray-500">Mulai petualangan baru dengan membagikan ilmu Anda.</p>
    </div>

    <CourseForm 
      @cancel="handleCancel" 
      @submit="handleSubmit" 
    />
  </div>
</template>
