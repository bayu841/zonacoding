<script setup>
import { useRouter } from 'vue-router'
import CourseForm from '../../../components/admin/courses/CourseForm.vue'

const router = useRouter()

const handleCancel = () => {
  router.push('/admin/courses')
}

const handleSubmit = (formData) => {
  console.log('Creating new course:', formData)
  alert('Kursus baru berhasil dibuat!')
  router.push('/admin/courses')
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
