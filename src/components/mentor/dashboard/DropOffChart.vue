<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const chartData = computed(() => ({
  labels: props.categories.map(c => c.category),
  datasets: [
    {
      label: 'Jumlah Siswa',
      backgroundColor: '#10b981',
      data: props.categories.map(c => c.jumlah_siswa),
      borderRadius: 8
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6">
    <div class="mb-6">
      <h2 class="text-lg font-bold text-gray-800">Kategori Populer</h2>
      <p class="text-sm text-gray-500 mt-1">Distribusi siswa berdasarkan kategori kursus Anda.</p>
    </div>
    <div class="h-64">
      <Bar v-if="categories.length" :data="chartData" :options="chartOptions" />
      <div v-else class="h-full flex items-center justify-center text-gray-400 italic text-sm">
        Belum ada data kategori
      </div>
    </div>
  </div>
</template>

