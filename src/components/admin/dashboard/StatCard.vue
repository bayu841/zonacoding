<script setup>
import { TrendingUp, Minus } from 'lucide-vue-next'

defineProps({
  title: String,
  value: String,
  icon: Object,
  change: String,
  isPositive: [Boolean, null],
  color: String
})
</script>

<template>
  <div
    class="group relative flex h-full min-h-[120px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
  >
    <!-- Watermark -->
    <div
      class="pointer-events-none absolute -right-3 -top-3 h-24 w-24 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-10"
      :class="{
        'text-blue-500': color === 'blue',
        'text-emerald-500': color === 'emerald',
        'text-amber-500': color === 'amber',
        'text-purple-500': color === 'purple'
      }"
    >
      <component :is="icon" class="h-full w-full" />
    </div>

    <div class="relative flex-1 p-5">
      <div class="flex items-start gap-4">
        <!-- Main icon -->
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md"
          :class="{
            'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200':
              color === 'blue',
            'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-200':
              color === 'emerald',
            'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-200':
              color === 'amber',
            'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-200':
              color === 'purple'
          }"
        >
          <component :is="icon" class="h-6 w-6" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-500">
            {{ title }}
          </p>

          <div class="mt-1 flex flex-wrap items-center gap-2">
            <span class="break-words text-2xl font-bold leading-tight text-gray-900">
              {{ value }}
            </span>

            <span
              v-if="isPositive === true"
              class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600"
            >
              <TrendingUp class="mr-0.5 h-3 w-3" />
              {{ change }}
            </span>

            <span
              v-else-if="isPositive === false"
              class="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600"
            >
              {{ change }}
            </span>

            <span
              v-else
              class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600"
            >
              <Minus class="mr-0.5 h-3 w-3" />
              {{ change }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom accent -->
    <div
      class="h-1 w-full bg-gradient-to-r transition-all duration-300 group-hover:h-1.5"
      :class="{
        'from-blue-500 to-blue-300': color === 'blue',
        'from-emerald-500 to-emerald-300': color === 'emerald',
        'from-amber-500 to-amber-300': color === 'amber',
        'from-purple-500 to-purple-300': color === 'purple'
      }"
    ></div>
  </div>
</template>
