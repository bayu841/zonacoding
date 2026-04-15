<script setup>
import { ref, onMounted } from 'vue'
import { Trophy } from 'lucide-vue-next'
import LeaderboardTable from '../../components/shared/LeaderboardTable.vue'
import { getTopLearners } from '@/api/leaderboard'

const topStudents = ref([])
const loading = ref(true)
const error = ref(null)

const fetchLeaderboard = async () => {
  loading.value = true
  try {
    const response = await getTopLearners()
    topStudents.value = response.data
  } catch (err) {
    error.value = 'Gagal mengambil data papan peringkat.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLeaderboard()
})
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <!-- Header Page -->
    <div class="flex items-start justify-between bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-lg">
      <div class="relative z-10 text-white">
        <h1 class="text-3xl font-extrabold mb-2 tracking-tight flex items-center gap-3">
          <Trophy class="w-8 h-8 text-amber-300" />
          Papan Peringkat
        </h1>
        <p class="text-blue-100 max-w-xl">Pantau siswa dengan perolehan poin tertinggi di platform NextSkill. Medali emas menanti mereka yang pantang menyerah!</p>
      </div>
      <!-- Background decoration -->
      <div class="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute left-1/2 bottom-0 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-2xl translate-y-1/2"></div>
    </div>

    <!-- Leaderboard Table Section -->
  <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden relative min-h-[400px]">
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl transition-all duration-300">
        <div class="flex flex-col items-center gap-3">
          <div class="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p class="text-xs font-bold text-blue-600 animate-pulse uppercase tracking-widest">Memperbarui...</p>
        </div>
      </div>

      <!-- Feature Header inside card -->
      <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 class="font-bold text-gray-800">Top Learner Bulan Ini</h2>
        <span class="text-xs font-bold text-gray-500 uppercase tracking-wider bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
          April 2026
        </span>
      </div>

      <div v-if="error" class="p-12 text-center">
        <p class="text-red-500 font-medium">{{ error }}</p>
        <button @click="fetchLeaderboard" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Coba Lagi</button>
      </div>
      <LeaderboardTable v-else :students="topStudents" />
    </div>
  </div>
</template>
