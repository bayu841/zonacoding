<script setup>
import { Award } from 'lucide-vue-next'

defineProps({
  cert: { type: Object, required: true }
})

const emit = defineEmits(['view'])
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden group">
    <!-- Visual representation of certificate -->
    <div class="aspect-[4/3] bg-gradient-to-br from-indigo-50 to-white border-b border-gray-100 relative p-6 flex flex-col items-center justify-center text-center">
      <!-- Watermark -->
      <Award class="absolute w-32 h-32 text-indigo-100/50 -rotate-12 translate-x-12 translate-y-12 right-0 bottom-0 pointer-events-none" />

      <div class="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-3">
        <Award class="w-6 h-6" />
      </div>
      <h3 class="font-serif font-black text-gray-900 text-lg leading-tight">{{ cert.title }}</h3>
      <p class="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">SERTIFIKAT KELULUSAN</p>
    </div>

    <!-- Info -->
    <div class="p-5">
      <div class="space-y-2 mb-5">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">Diberikan pada</span>
          <span class="font-semibold text-gray-900">{{ cert.issueDate }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">Credential ID</span>
          <span class="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{{ cert.credentialID }}</span>
        </div>
      </div>

      <button @click="emit('view', cert)" class="w-full py-2.5 bg-gray-50 text-gray-600 font-bold text-sm rounded-xl border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-colors flex items-center justify-center gap-2">
        Lihat Detail Sertifikat
      </button>
    </div>
  </div>
</template>
