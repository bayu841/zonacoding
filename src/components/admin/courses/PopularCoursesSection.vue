<script setup>
import { ref } from 'vue'
import PopularCourseCard from './PopularCourseCard.vue'

const popularCourses = ref([
  {
    id: 1,
    title: 'Mastering Vue 3 Composition API',
    category: 'Frontend',
    students: 340,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    instructor: 'Sarah Johnson',
    level: 'Intermediate',
    trend: '+24%',
    isPopular: true
  },
  {
    id: 2,
    title: 'Advanced Tailwind CSS & Design Systems',
    category: 'Design',
    students: 215,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=200&fit=crop',
    instructor: 'Michael Chen',
    level: 'Advanced',
    trend: '+18%',
    isPopular: true
  },
  {
    id: 3,
    title: 'Node.js Microservices Architecture',
    category: 'Backend',
    students: 180,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
    instructor: 'David Kim',
    level: 'Advanced',
    trend: '+32%',
    isPopular: true
  },
  {
    id: 4,
    title: 'Python for Data Science & Machine Learning',
    category: 'Data',
    students: 420,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&h=200&fit=crop',
    instructor: 'Emily Rodriguez',
    level: 'Beginner',
    trend: '+45%',
    isPopular: true
  }
])
</script>

<template>
  <div>
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h3 class="flex items-center text-xl font-bold text-gray-800">
          <div class="mr-3 h-7 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-600"></div>
          Kursus Paling Diminati
        </h3>
        <p class="mt-1 text-sm text-gray-500">Kursus dengan performa terbaik minggu ini</p>
      </div>

      <button
        class="flex items-center gap-1 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
      >
        Lihat Semua
        <span class="text-lg">→</span>
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <PopularCourseCard
        v-for="course in popularCourses"
        :key="course.id"
        :id="course.id"
        :title="course.title"
        :category="course.category"
        :students="course.students"
        :rating="course.rating"
        :image="course.image"
        :instructor="course.instructor"
        :level="course.level"
        :trend="course.trend"
      />
    </div>
  </div>
</template>
