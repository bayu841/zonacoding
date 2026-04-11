<script setup>
import { Pie } from 'vue-chartjs'
import { createPieChartConfig } from '../../../composables/useChartConfigs.js'

const { pieChartData, pieChartOptions } = createPieChartConfig()
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
    <div class="px-6 pt-6 pb-2">
      <div class="flex items-center justify-between">
        <h3 class="flex items-center text-lg font-semibold text-gray-800">
          <div class="mr-3 h-6 w-1.5 rounded-full bg-gradient-to-b from-purple-500 to-purple-600"></div>
          Distribusi Kategori Kursus
        </h3>
        <span class="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
          86 kursus total
        </span>
      </div>
      <p class="mt-1 text-sm text-gray-500">Persentase berdasarkan jumlah kursus</p>
    </div>

    <div class="min-h-[340px] flex-1 p-4">
      <Pie :data="pieChartData" :options="pieChartOptions" />
    </div>
  </div>
</template>
