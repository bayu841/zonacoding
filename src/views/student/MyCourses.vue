<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MyCourseCard from '../../components/student/MyCourseCard.vue'

const router = useRouter()

// Dummy Data
const myCourses = ref([
  { id: 1, title: 'Fullstack Laravel & Vue', mentor: 'Budi Santoso', progress: 65, totalLessons: 45, completedLessons: 29, color: 'indigo', status: 'ongoing', cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Mastering UI/UX Design', mentor: 'Siti Rahma', progress: 30, totalLessons: 32, completedLessons: 10, color: 'pink', status: 'ongoing', cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 3, title: 'Git & GitHub Basics', mentor: 'Kevin Anggara', progress: 100, totalLessons: 15, completedLessons: 15, color: 'emerald', status: 'completed', cover: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=600&h=400' }
])

const enterLearningRoom = (course) => {
  router.push('/student/courses/' + course.id + '/learn')
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Kursus Saya</h2>
        <p class="text-gray-500 text-sm mt-1">Lanjutkan progres belajarmu dan pantau kursus yang telah diselesaikan.</p>
      </div>
      <div>
        <router-link to="/student/explore" class="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          Cari Kursus Baru
        </router-link>
      </div>
    </div>

    <!-- Grouped Ongoing vs Completed -->
    
    <!-- Ongoing Courses -->
    <div>
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-amber-400 rounded-full inline-block"></span>
        Sedang Berlangsung
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MyCourseCard 
          v-for="course in myCourses.filter(c => c.status === 'ongoing')" 
          :key="course.id"
          :course="course"
          @click="enterLearningRoom(course)"
        />
      </div>
    </div>

    <!-- Completed Courses -->
    <div class="pt-8">
      <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span class="w-2 h-6 bg-emerald-400 rounded-full inline-block"></span>
        Telah Diselesaikan
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MyCourseCard 
          v-for="course in myCourses.filter(c => c.status === 'completed')" 
          :key="'completed-'+course.id"
          :course="course"
          @click="enterLearningRoom(course)"
        />
      </div>
    </div>
  </div>
</template>
