<script setup>
import { FileText, Download, ExternalLink, Info } from 'lucide-vue-next'

defineProps({
  lesson: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="p-6 md:p-10 bg-white">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Downloadable Material</span>
      <span class="text-sm text-gray-400 font-semibold flex items-center"><FileText class="w-3.5 h-3.5 mr-1" /> {{ lesson?.fileSize || '2.4 MB' }}</span>
    </div>
    
    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{{ lesson?.title }}</h1>
    
    <p class="text-gray-600 text-lg mb-10 leading-relaxed">
      {{ lesson?.description || 'Silakan unduh materi di bawah ini untuk dipelajari secara offline. Materi ini berisi panduan lengkap dan referensi tambahan untuk modul ini.' }}
    </p>

    <!-- Download Card -->
    <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-blue-200 hover:bg-blue-50/30 transition-all">
      <div class="flex items-center gap-6 text-center md:text-left">
        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
          <FileText class="w-8 h-8" />
        </div>
        <div>
          <h4 class="text-xl font-bold text-gray-900">{{ lesson?.fileName || 'materi-pembelajaran.pdf' }}</h4>
          <p class="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">{{ lesson?.fileType || 'Adobe PDF Document' }}</p>
        </div>
      </div>
      
      <a 
        href="#" 
        @click.prevent 
        class="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95"
      >
        <Download class="w-5 h-5" />
        Unduh Materi
      </a>
    </div>

    <!-- Info Box -->
    <div class="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
      <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
        <Info class="w-6 h-6" />
      </div>
      <div class="space-y-1">
        <p class="font-bold text-amber-900">Tips Belajar</p>
        <p class="text-sm text-amber-700 leading-relaxed">Kami merekomendasikan untuk membaca materi ini sebelum melanjutkan ke kuis atau proyek akhir. Jangan ragu untuk mencatat poin-poin penting.</p>
      </div>
    </div>
  </div>
</template>
