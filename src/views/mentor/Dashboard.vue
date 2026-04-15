<script setup>
import { onMounted, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  BarElement
} from 'chart.js'
import { Loader2 } from 'lucide-vue-next'
import DashboardHeader from '../../components/mentor/dashboard/MentorDashboardHeader.vue'
import LineChartCard from '../../components/admin/dashboard/LineChartCard.vue'
import RecentStudents from '../../components/mentor/dashboard/RecentStudents.vue'
import DropOffChart from '../../components/mentor/dashboard/DropOffChart.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  BarElement
)

const dashboardStore = useDashboardStore()
const loading = computed(() => dashboardStore.loading)
const dashboardData = computed(() => dashboardStore.dashboardData)

onMounted(async () => {
  await dashboardStore.fetchDashboard()
})

const monthlyEnrollmentChartData = computed(() => {
  if (!dashboardData.value?.pendaftaran_bulanan) return null
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  
  return {
    labels: dashboardData.value.pendaftaran_bulanan.map(item => monthNames[item.bulan - 1]),
    datasets: [{
      label: 'Total Pendaftaran',
      data: dashboardData.value.pendaftaran_bulanan.map(item => item.total),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }
})

const totalEnrollments = computed(() => {
  return dashboardData.value?.pendaftaran_bulanan?.reduce((acc, curr) => acc + curr.total, 0) || 0
})
</script>

<template>
  <div class="space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 class="w-10 h-10 text-emerald-600 animate-spin" />
      <p class="text-gray-500 font-medium italic">Menyiapkan data dashboard mentor...</p>
    </div>

    <template v-else-if="dashboardData">
      <!-- Stats Cards Grid -->
      <DashboardHeader :stats-data="dashboardData" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <!-- Main Chart + Drop-off Analytics -->
        <div class="lg:col-span-2 space-y-6">
          <LineChartCard 
            title="Pendaftaran Siswa Bulanan" 
            :data="monthlyEnrollmentChartData"
            total-label="Total Pendaftaran"
            :total-value="String(totalEnrollments)"
          />
          <DropOffChart :categories="dashboardData.kategori_populer" />
        </div>

        <!-- Recent Students Sidebar -->
        <RecentStudents :students="dashboardData.siswa_baru" />
      </div>
    </template>
  </div>
</template>

