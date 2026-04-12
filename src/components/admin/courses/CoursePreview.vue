<script setup>
import { ref } from 'vue'
import { 
  PlayCircle, 
  FileText, 
  ChevronLeft, 
  Play, 
  RotateCcw, 
  Volume2, 
  Settings, 
  Maximize,
  AlertCircle
} from 'lucide-vue-next'

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const isPreviewing = ref(false)
const previewTitle = ref('')

const startPreview = (title) => {
  previewTitle.value = title
  isPreviewing.value = true
}
</script>

<template>
  <div class="flex-1 space-y-6 min-h-[400px] flex flex-col">
    <template v-if="!isPreviewing">
      <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-inner text-left">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Draft</span>
          <span class="text-xs text-gray-500">{{ course.submittedAt }}</span>
        </div>
        <h3 class="text-xl font-bold text-gray-900 leading-tight mb-4">{{ course.title }}</h3>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-500 font-bold mb-1">Diajukan Oleh</p>
            <p class="text-sm font-semibold text-gray-800">{{ course.mentor }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 font-bold mb-1">Harga Target</p>
            <p class="text-sm font-semibold text-gray-800">{{ course.expectedPrice }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Syllabus Review -->
      <div class="text-left">
        <h4 class="font-bold text-gray-900 text-sm mb-3">Pratinjau Modul Konten</h4>
        <div class="space-y-2 border border-gray-100 rounded-xl overflow-hidden bg-white">
          <div class="flex items-center gap-3 p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <PlayCircle class="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <div class="flex-1"><p class="text-sm font-semibold text-gray-700">1. Pengenalan & Setup Lingkungan</p></div>
            <span class="text-xs font-bold text-gray-400">14:20</span>
          </div>
          <div class="flex items-center gap-3 p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <FileText class="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div class="flex-1"><p class="text-sm font-semibold text-gray-700">2. Dasar-dasar Arsitektur (Bacaan)</p></div>
            <span class="text-xs font-bold text-gray-400">5 min</span>
          </div>
          <div @click="startPreview('3. Implementasi Kode Pertama')" class="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer group">
            <PlayCircle class="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <div class="flex-1"><p class="text-sm font-semibold text-gray-700 group-hover:text-indigo-600">3. Implementasi Kode Pertama</p></div>
            <span class="text-xs text-indigo-600 bg-indigo-100 px-2 rounded-md font-bold transition-transform group-hover:scale-105">Simulasi Tonton</span>
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-2 italic">*Admin harus memastikan video dan artikel mematuhi standar resolusi dan konten platform.</p>
      </div>
    </template>

    <template v-else>
      <!-- Video Player Simulation -->
      <div class="flex-1 flex flex-col text-left">
        <button @click="isPreviewing = false" class="flex items-center text-sm font-bold text-indigo-600 mb-4 hover:translate-x-[-4px] transition-transform w-fit">
          <ChevronLeft class="w-4 h-4 mr-1" /> Kembali ke Detail
        </button>

        <div class="relative flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl group flex flex-col items-center justify-center min-h-[250px]">
          <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 opacity-60"></div>
          <div class="relative z-10 flex flex-col items-center">
            <div class="w-16 h-16 rounded-full bg-indigo-600/30 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
              <Play class="w-8 h-8 text-white fill-white" />
            </div>
            <p class="text-white font-bold tracking-wide uppercase text-[10px] opacity-60">Pratinjau Moderasi</p>
            <h4 class="text-white text-base font-bold mt-1 text-center">{{ previewTitle }}</h4>
          </div>

          <!-- Controls UI (Mock) -->
          <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
             <div class="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div class="w-1/3 h-full bg-indigo-500"></div>
             </div>
             <div class="flex items-center justify-between text-white">
                <div class="flex items-center gap-3">
                  <Play class="w-3 h-3 fill-white" />
                  <RotateCcw class="w-3 h-3" />
                  <span class="text-[10px] font-mono whitespace-nowrap">05:12 / 12:45</span>
                </div>
                <div class="flex items-center gap-3">
                  <Volume2 class="w-3 h-3" />
                  <Settings class="w-3 h-3" />
                  <Maximize class="w-3 h-3" />
                </div>
             </div>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3">
           <AlertCircle class="w-5 h-5 text-indigo-600 flex-shrink-0" />
           <p class="text-[11px] text-indigo-800 font-medium italic">Sistem Verifikasi: Konten 1080p Aman. Audio Jernih. Tidak ada elemen terlarang.</p>
        </div>
      </div>
    </template>
  </div>
</template>
