<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const props = defineProps({
  data: {
    type: Object,
    default: null
  },
  percentageChange: {
    type: String,
    default: '+0%'
  }
})

const defaultChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Pendapatan',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
      data: [0, 0, 0, 0, 0, 0],
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
    }
  ]
}

const displayData = computed(() => {
  if (props.data) return props.data
  return defaultChartData
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => `Rp ${context.parsed.y.toLocaleString('id-ID')}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        callback: (value) => `Rp ${value.toLocaleString('id-ID')}`
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
  <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-bold text-gray-800">Performa Pendapatan</h3>
      <div class="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold ring-1 ring-emerald-100">
        +24.5% dari Smt 1
      </div>
    </div>
    <div class="flex-1 min-h-[160px]">
      <Line v-if="displayData && displayData.labels" :data="displayData" :options="chartOptions" />
    </div>
  </div>
</template>
