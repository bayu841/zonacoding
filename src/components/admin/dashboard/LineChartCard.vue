<script setup>
import { Eye } from 'lucide-vue-next'
import { Line } from 'vue-chartjs'
import { createLineChartConfig } from '../../../composables/useChartConfigs.js'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Statistik'
  },
  subtitle: {
    type: String,
    default: 'Tren data terbaru'
  },
  data: {
    type: Object,
    default: null
  },
  totalLabel: {
    type: String,
    default: 'Total'
  },
  totalValue: {
    type: String,
    default: '-'
  }
})

const { lineChartData, lineChartOptions } = createLineChartConfig()

// Use props data if provided, otherwise fallback to default
const chartData = computed(() => props.data || lineChartData)

// Update tooltip label specifically for income if it looks like income data
const finalOptions = computed(() => {
  const options = { ...lineChartOptions }
  if (props.title.toLowerCase().includes('pendapatan')) {
    options.plugins.tooltip.callbacks.label = (context) => `Rp ${context.parsed.y.toLocaleString('id-ID')}`
    options.scales.y.ticks.callback = (value) => `Rp ${value.toLocaleString('id-ID')}`
  }
  return options
})
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
    <div class="px-6 pt-6 pb-2">
      <div class="flex items-center justify-between">
        <h3 class="flex items-center text-lg font-semibold text-gray-800">
          <div class="mr-3 h-6 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-600"></div>
          {{ title }}
        </h3>
        <button
          class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
          title="Refresh data"
        >
          <Eye class="h-4 w-4" />
        </button>
      </div>
      <p class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
    </div>

    <div class="min-h-[340px] flex-1 p-4">
      <Line :data="chartData" :options="finalOptions" />
    </div>

    <div class="border-t border-gray-100 bg-gray-50/50 px-6 py-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">{{ totalLabel }}</span>
        <span class="font-semibold text-gray-900">{{ totalValue }}</span>
      </div>
    </div>
  </div>
</template>
