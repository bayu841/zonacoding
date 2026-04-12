<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, default: '' },
  icon: { type: Object, required: true },
  color: { type: String, default: 'indigo' }
})
</script>

<template>
  <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center">
    <div :class="`w-12 h-12 bg-${color}-50 rounded-full flex items-center justify-center mr-4`">
      <component :is="icon" :class="`w-6 h-6 text-${color}-500`" />
    </div>
    <div>
      <p class="text-sm font-bold text-gray-500">{{ title }}</p>
      <p class="text-2xl font-black text-gray-900">
        {{ value }} <span v-if="unit" class="text-lg font-bold text-gray-400">{{ unit }}</span>
      </p>
    </div>
  </div>
</template>
