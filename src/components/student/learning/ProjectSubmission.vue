<script setup>
import { UploadCloud, CheckCircle2, Award, Calendar, Clock } from 'lucide-vue-next'

defineProps({
  lesson: { type: Object, required: true },
  assignmentStatus: { type: String, required: true },
  assignmentScore: { type: Number, default: null },
  timeRemaining: { type: String, default: '' },
  assignmentLink: { type: String, default: '' }
})

const emit = defineEmits(['submit', 'update:assignmentLink', 'view-certificates'])

const handleInput = (e) => {
  emit('update:assignmentLink', e.target.value)
}
</script>

<template>
  <div class="p-6 md:p-12 text-center flex flex-col items-center">
    
    <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6">
      <UploadCloud v-if="assignmentStatus === 'Unsubmitted'" class="w-10 h-10" />
      <CheckCircle2 v-else-if="assignmentStatus === 'Pending'" class="w-10 h-10 text-amber-500 animate-pulse" />
      <Award v-else class="w-10 h-10 text-emerald-500" />
    </div>

    <h1 class="text-3xl font-black text-gray-900 mb-2">{{ lesson?.title }}</h1>

    <!-- Instructions -->
    <div v-if="lesson?.instructions" class="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl max-w-lg w-full text-left">
       <span class="text-[10px] font-black text-rose-500 uppercase tracking-widest block mb-1">Instruksi Mentor</span>
       <p class="text-sm text-gray-700 font-medium leading-relaxed">{{ lesson.instructions }}</p>
    </div>

    <!-- Deadline Badges -->
    <div v-if="assignmentStatus === 'Unsubmitted'" class="mb-10 flex flex-col md:flex-row gap-2 justify-center">
       <div class="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-xl border border-red-100">
          <Calendar class="w-4 h-4" />
          <span class="text-[10px] font-black uppercase tracking-widest">Target: {{ lesson?.deadline || 7 }} Hari Lagi</span>
       </div>
       <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-xl border border-gray-800 animate-pulse">
          <Clock class="w-4 h-4" />
          <span class="text-[10px] font-black uppercase tracking-widest">{{ timeRemaining }}</span>
       </div>
    </div>
    <p v-else class="text-gray-500 max-w-md mx-auto mb-10 text-sm font-medium">Langkah terakhir untuk sertifikasi.</p>

    <!-- Status View -->
    <div v-if="assignmentStatus === 'Unsubmitted'" class="w-full max-w-lg space-y-4 text-left">
      <div class="space-y-2">
        <label class="text-[10px] font-black uppercase tracking-widest text-gray-400">Tautan Proyek (GitHub/Behance/Drive)</label>
        <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 pl-4 rounded-2xl focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
          <input 
            :value="assignmentLink"
            @input="handleInput"
            type="text" 
            placeholder="https://github.com/username/project" 
            class="flex-1 bg-transparent border-none outline-none text-sm py-2 font-medium" 
          />
          <button @click="emit('submit')" class="px-6 py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            Kirim Proyek
          </button>
        </div>
      </div>
      <p class="text-[10px] text-gray-400 italic">*Penting: Pastikan tautan proyek dapat dibuka secara publik agar Mentor dapat memberikan nilai.</p>
    </div>

    <div v-else-if="assignmentStatus === 'Pending'" class="bg-amber-50 border border-amber-100 p-8 rounded-3xl w-full max-w-md">
       <h4 class="font-bold text-amber-800 text-lg mb-2">Sedang Ditinjau Admin/Mentor</h4>
       <p class="text-sm text-amber-700 opacity-80 mb-6">Proyek Anda sudah masuk ke antrean. Mentor biasanya memberikan nilai dalam waktu 24 jam.</p>
       <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold text-amber-700 border border-amber-100">
         <Clock class="w-4 h-4" /> ID Pengajuan: SUB-8829
       </div>
    </div>

    <div v-else class="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl w-full max-w-md relative overflow-hidden">
       <div class="absolute -right-4 -top-4 opacity-10"><Award class="w-32 h-32" /></div>
       <h4 class="font-bold text-emerald-800 text-lg mb-1">Selamat! Proyek Lulus</h4>
       <p class="text-sm text-emerald-700 opacity-80 mb-6 font-medium">Mentor telah memberikan nilai untuk kerja keras Anda.</p>
       
       <div class="flex items-center justify-center gap-12">
         <div class="text-center">
           <p class="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Skor Anda</p>
           <p class="text-4xl font-black text-gray-900">{{ assignmentScore }}</p>
         </div>
         <div class="w-px h-10 bg-emerald-200"></div>
         <div class="text-center">
           <p class="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Status</p>
           <span class="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-md">Lulus</span>
         </div>
       </div>

       <button @click="emit('view-certificates')" class="w-full mt-8 py-3 bg-white text-emerald-700 font-black rounded-xl border border-emerald-200 shadow-sm hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
         Lihat Sertifikat <Award class="w-4 h-4" />
       </button>
    </div>
  </div>
</template>
