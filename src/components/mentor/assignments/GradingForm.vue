<script setup>
import { ref } from 'vue'
import { ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const gradeScore = ref(props.submission.score || 100)
const feedback = ref('')

const handleSubmit = () => {
  emit('submit', {
    id: props.submission.id,
    score: gradeScore.value,
    feedback: feedback.value
  })
}
</script>

<template>
  <div class="space-y-6 pt-4">
    <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Materi</p>
      <h4 class="font-bold text-gray-800">{{ submission.title }}</h4>
      <div class="mt-4 flex items-center justify-between">
        <p class="text-xs font-bold text-gray-600">{{ submission.student }}</p>
        <a :href="'https://' + submission.link" target="_blank" class="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
          Buka Tautan Tugas <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <div class="flex justify-between items-center mb-2">
           <label class="text-xs font-bold text-gray-700 uppercase">Input Skor (0-100)</label>
           <span class="text-lg font-black text-indigo-600">{{ gradeScore }}</span>
        </div>
        <input 
          v-model="gradeScore"
          type="range" min="0" max="100" 
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div>
         <label class="text-xs font-bold text-gray-700 uppercase block mb-2">Umpan Balik (Feedback)</label>
         <textarea 
           v-model="feedback"
           rows="4" 
           placeholder="Contoh: Sangat bagus, tapi perhatikan arsitektur clean-code di bagian..." 
           class="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
         ></textarea>
      </div>
    </div>

    <div class="flex gap-3 pt-2">
      <button @click="$emit('cancel')" class="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100">Batal</button>
      <button @click="handleSubmit" class="flex-[2] py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100">Kirim Penilaian</button>
    </div>
  </div>
</template>
