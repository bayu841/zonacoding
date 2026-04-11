<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import CourseForm from '../../../components/admin/courses/CourseForm.vue'

const route = useRoute()
const router = useRouter()
const courseId = route.params.courseId

// Mock data - in real app, fetch by courseId
const initialData = ref({
   title: 'Mastering Vue 3: From Zero to Hero',
   description: 'Pelajari Vue 3 dengan mendalam menggunakan pola-pola canggih dan best practices industri.',
   category: 'Frontend',
   mentor: 'Andi Setiawan',
   price: 250000,
   level: 'Intermediate',
   status: 'Published',
   modules: [
     { title: 'Persiapan Lingkungan Kerja', lessons: ['Install Node.js', 'Vite Overview'] },
     { title: 'Reactivity System', lessons: ['ref vs reactive', 'computed properties'] }
   ]
})

const handleCancel = () => {
  router.push('/admin/courses')
}

const handleSubmit = (formData) => {
  console.log('Updating course:', formData)
  alert('Kursus berhasil diperbarui!')
  router.push('/admin/courses')
}
</script>

<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Kursus</h2>
      <p class="mt-2 text-lg text-gray-500">Perbarui informasi untuk kursus ID: <span class="text-indigo-600 font-mono">{{ courseId }}</span></p>
    </div>

    <CourseForm 
      :initialData="initialData" 
      :isEdit="true"
      @cancel="handleCancel" 
      @submit="handleSubmit" 
    />
  </div>
</template>
