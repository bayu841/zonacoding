<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  BookOpen,
  ArrowRight,
  HelpCircle,
  Trophy,
  Flame,
  Clock,
  Loader2
} from 'lucide-vue-next'
import StatCard from '../../components/student/StatCard.vue'
import RecentCourseCard from '../../components/student/RecentCourseCard.vue'
import { useAuthStore } from '@/stores/authStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useImage } from '@/composables/useImage'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const { getProxyUrl } = useImage()

const loading = computed(() => dashboardStore.loading)
const dashboardData = computed(() => dashboardStore.dashboardData)

onMounted(async () => {
  await dashboardStore.fetchDashboard()
})

const getCourseColor = (index) => {
  const colors = ['indigo', 'pink', 'emerald', 'blue', 'amber']
  return colors[index % colors.length]
}

const formattedRecentCourses = computed(() => {
  return dashboardData.value?.lanjutkan_belajar?.map((course, index) => ({
    ...course,
    color: getCourseColor(index),
    mentor: course.mentor_name,
    lastAccessed: 'Lanjutkan belajar' // API doesn't provide this, using placeholder
  })) || []
})
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 class="w-10 h-10 text-indigo-600 animate-spin" />
      <p class="text-gray-500 font-medium italic">Sedang menyiapkan dashboard-mu...</p>
    </div>

    <template v-else-if="dashboardData">
      <!-- Hero Welcome Banner -->
      <div class="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-8 overflow-hidden shadow-xl border border-indigo-700/50">
        <!-- Decorative circles -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="text-white">
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Halo, {{ authStore.user?.name || 'Student' }}! 👋</h1>
            <p class="text-indigo-200 text-lg max-w-xl">Ayo lanjutkan belajarmu. Rata-rata siswa menghabiskan 4 jam sehari. Bisakah kamu melampauinya?</p>
          </div>
          <!-- Total XP Badge -->
          <div class="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center flex flex-col items-center">
            <Trophy class="w-8 h-8 text-amber-400 mb-2 drop-shadow-md" />
            <p class="text-indigo-100 text-xs uppercase font-bold tracking-wider mb-1">Total XP</p>
            <p class="text-white text-3xl font-black tracking-tight">{{ dashboardData.total_xp.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- Quiz Alert (Discoverability Improvement) -->
      <div v-if="dashboardData.ada_kuis_belum_selesai" class="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
            <HelpCircle class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-bold text-amber-900 text-lg">Kamu punya Kuis yang belum selesai!</h3>
            <p class="text-amber-700 text-sm">Selesaikan kuis untuk meningkatkan pemahamanmu dan mendapatkan XP tambahan.</p>
          </div>
        </div>
        <router-link 
          to="/student/my-courses" 
          class="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl shadow-lg shadow-amber-200 transition-all flex items-center justify-center gap-2"
        >
          Lihat Kursus
          <ArrowRight class="w-5 h-5" />
        </router-link>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Streak Belajar" :value="dashboardData.learning_stats.streak_days" unit="Hari" :icon="Flame" color="amber" />
        <StatCard title="Waktu Belajar" :value="dashboardData.learning_stats.learning_time" :icon="Clock" color="blue" />
        <StatCard title="Video Diselesaikan" :value="dashboardData.learning_stats.videos_completed" :icon="BookOpen" color="emerald" />
      </div>

      <!-- Main Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Lanjutkan Belajar Section (Takes 2 columns) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900">Lanjutkan Belajar</h2>
            <router-link to="/student/my-courses" class="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
              Lihat Semua <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>

          <div class="space-y-4">
            <div v-if="!formattedRecentCourses.length" class="bg-white rounded-3xl p-10 border border-dashed border-gray-300 text-center">
              <BookOpen class="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 class="font-bold text-gray-900 mb-1">Belum ada kursus yang aktif</h3>
              <p class="text-gray-500 mb-6">Mulai petualangan belajarmu sekarang juga!</p>
              <router-link to="/student/explore" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all">
                Cari Kursus
              </router-link>
            </div>
            <RecentCourseCard 
              v-for="course in formattedRecentCourses" 
              :key="course.id" 
              :course="course"
              @click="$router.push(`/student/courses/${course.id}/learn`)"
            />
          </div>
        </div>

        <!-- Rekomendasi (Right Column) -->
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-gray-900">Mungkin Anda Suka</h2>
          
          <div v-for="course in dashboardData.recommended_courses" :key="course.id" class="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div class="aspect-video bg-gray-200 relative overflow-hidden group cursor-pointer" @click="$router.push(`/student/explore`)">
              <img :src="getProxyUrl(course.thumbnail) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=450'" :alt="course.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div v-if="course.rating >= 4.5" class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-bold border border-white/10 uppercase tracking-widest">
                Populer
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100">{{ course.category }}</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-1">{{ course.title }}</h3>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <span class="font-black text-gray-900">Rp {{ course.price.toLocaleString() }}</span>
                <router-link :to="`/student/explore`" class="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1 transition-colors">
                  Lihat Detail
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

