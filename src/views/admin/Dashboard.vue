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
  Filler
} from 'chart.js'
import DashboardHeader from '../../components/admin/dashboard/DashboardHeader.vue'
import LineChartCard from '../../components/admin/dashboard/LineChartCard.vue'
import PieChartCard from '../../components/admin/dashboard/PieChartCard.vue'
import PopularCoursesSection from '../../components/admin/courses/PopularCoursesSection.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)
</script>

<template>
  <div class="space-y-8">
    <!-- Stats Cards Grid -->
    <DashboardHeader />

    <!-- Charts Row -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <LineChartCard />
      <PieChartCard />
    </div>

    <!-- Popular Courses -->
    <PopularCoursesSection />
  </div>
</template>
