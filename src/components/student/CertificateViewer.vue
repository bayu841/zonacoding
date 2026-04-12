<script setup>
import { Award, DownloadCloud } from 'lucide-vue-next'
import BaseModal from '../shared/BaseModal.vue'

defineProps({
  isOpen: { type: Boolean, required: true },
  cert: { type: Object, default: null }
})

const emit = defineEmits(['close', 'download'])
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    @close="emit('close')"
    title="Pratinjau Sertifikat"
    size="5xl"
  >
    <div v-if="cert" class="w-full h-full flex flex-col items-center justify-center relative p-2 md:p-8">

      <!-- Certificate Body -->
      <div class="w-full aspect-[4/3] relative bg-[#fafafa] rounded-sm shadow-xl flex flex-col items-center justify-center overflow-hidden border-[12px] border-[#cbd5e1] outline outline-4 outline-slate-300/50 outline-offset-4 mb-8">

        <!-- Corner decorations -->
        <div class="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-indigo-700 m-6 opacity-80"></div>
        <div class="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-indigo-700 m-6 opacity-80"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-indigo-700 m-6 opacity-80"></div>
        <div class="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-indigo-700 m-6 opacity-80"></div>

        <!-- Watermark Background -->
        <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Award class="w-[500px] h-[500px]" />
        </div>

        <Award class="w-20 h-20 text-indigo-300 mb-6 relative z-10" />
        <h1 class="font-serif text-3xl md:text-5xl font-black tracking-widest text-[#1e293b] uppercase mb-4 text-center relative z-10">Certificate of Completion</h1>
        <p class="text-sm md:text-base text-gray-500 uppercase tracking-widest font-bold mb-2 relative z-10">Diberikan Kepada</p>
        <p class="font-serif text-4xl md:text-6xl text-indigo-700 italic border-b-2 border-indigo-200/50 px-16 pb-2 mb-8 relative z-10">Student User</p>
        <p class="text-sm md:text-base text-gray-500 mb-2 relative z-10">Atas kelulusannya dalam menyelesaikan kelas</p>
        <h2 class="font-bold text-2xl md:text-3xl text-gray-900 mb-16 max-w-2xl text-center relative z-10">{{ cert.title }}</h2>

        <!-- Footer Signatures -->
        <div class="absolute bottom-16 flex justify-between w-full px-24 items-end z-10">
          <div class="text-center">
            <span class="block text-xs text-gray-400 uppercase font-bold tracking-widest mb-2 border-b border-gray-300 pb-1 w-32 mx-auto">Diterbitkan Pada</span>
            <p class="text-sm font-semibold text-gray-800">{{ cert.issueDate }}</p>
            <span class="block text-[10px] mt-1 text-indigo-600 font-mono">ID: {{ cert.credentialID }}</span>
          </div>
          <div class="text-center flex flex-col items-center">
            <div class="w-48 h-16 border-b border-gray-300 mb-2 relative flex items-center justify-center">
              <span class="font-signature font-thin text-5xl text-slate-800 transform -rotate-12 absolute bottom-2">NextSkill CEO</span>
            </div>
            <p class="text-[10px] uppercase tracking-widest font-bold text-gray-500">Chief Executive Officer</p>
          </div>
        </div>

      </div>

      <!-- Custom Buttons -->
      <div class="flex space-x-3 w-full">
        <button @click="emit('close')" class="flex-1 py-3 px-4 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors">Batal</button>
        <button @click="emit('download')" class="flex items-center justify-center flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
          <DownloadCloud class="w-5 h-5 mr-3" /> Unduh PDF Resolusi Tinggi
        </button>
      </div>

    </div>
  </BaseModal>
</template>
