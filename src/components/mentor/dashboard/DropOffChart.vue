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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Modul 1', 'Modul 2', 'Modul 3', 'Modul 4', 'Modul 5', 'Modul 6'],
  datasets: [
    {
      label: 'Siswa Aktif',
      backgroundColor: '#10b981',
      data: [350, 320, 280, 150, 120, 100],
      borderRadius: 8
    }
  ]
}

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
      <h2 class="text-lg font-bold text-gray-800">Analitik Drop-off Modul</h2>
      <p class="text-sm text-gray-500 mt-1">Identifikasi di mana siswa mulai berhenti belajar.</p>
    </div>
    <div class="h-64">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <div class="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
      <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
        !
      </div>
      <div>
        <p class="text-xs font-bold text-amber-800">Insight Mentor</p>
        <p class="text-[11px] text-amber-700 leading-relaxed font-medium mt-0.5">
          Terjadi penurunan signifikan (46%) pada Modul 4. Pertimbangkan untuk menyederhanakan materi atau menambahkan video penjelasan tambahan di bagian tersebut.
        </p>
      </div>
    </div>
  </div>
</template>
