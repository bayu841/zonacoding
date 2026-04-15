<script setup>
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
import DashboardHeader from '../../components/mentor/dashboard/MentorDashboardHeader.vue'
import LineChartCard from '../../components/admin/dashboard/LineChartCard.vue'
import RecentStudents from '../../components/mentor/dashboard/RecentStudents.vue'
import DropOffChart from '../../components/mentor/dashboard/DropOffChart.vue'

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
</script>

<template>
  <div class="space-y-8 pb-10 px-4 sm:px-6 lg:px-8">
    <!-- Stats Cards Grid -->
    <DashboardHeader />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <!-- Main Chart + Drop-off Analytics -->
      <div class="lg:col-span-2 space-y-6">
        <LineChartCard title="Pendaftaran Siswa Bulanan" />
        <DropOffChart />
      </div>

      <!-- Recent Students Sidebar -->
      <RecentStudents />
    </div>
  </div>
</template>
