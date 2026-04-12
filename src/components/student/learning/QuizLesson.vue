<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  Info, 
  ListFilter, 
  AlertTriangle,
  ShieldAlert,
  Power,
  Maximize2
} from 'lucide-vue-next'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['complete'])

// --- State ---
const quizStarted = ref(false)
const currentQuestionIdx = ref(0)
const selectedOption = ref(null) 
const matchingPairs = ref({}) 
const answers = ref([])
const isFinished = ref(false)
const score = ref(0)

const isDisqualified = ref(false)
const cheatWarnings = ref(0)
const maxWarnings = 1 

const quizContainer = ref(null)
const scrollContainer = ref(null)
const lines = ref([]) 

const questions = computed(() => props.lesson.quizData || [])
const currentQuestion = computed(() => questions.value[currentQuestionIdx.value])
const progress = computed(() => ((currentQuestionIdx.value + 1) / questions.value.length) * 100)
const finalScorePercentage = computed(() => Math.round((score.value / questions.value.length) * 100))
const isRemedial = computed(() => finalScorePercentage.value < 75)

const startExam = async () => {
  if (!quizContainer.value) return
  try {
    const el = quizContainer.value
    if (el.requestFullscreen) await el.requestFullscreen()
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen()
  } catch (err) {}
  quizStarted.value = true
}

const selectOption = (idx) => {
  if (selectedOption.value !== null) return
  selectedOption.value = idx
}

const selectedLeft = ref(null)
const selectLeft = (id) => {
  if (isDisqualified.value) return
  if (selectedLeft.value === id) {
      selectedLeft.value = null
  } else {
      if (matchingPairs.value[id]) {
          delete matchingPairs.value[id]
          updateLines()
      }
      selectedLeft.value = id
  }
}
const selectRight = (id) => {
  if (isDisqualified.value || !selectedLeft.value) return
  
  Object.keys(matchingPairs.value).forEach(key => {
      if (matchingPairs.value[key] === id) delete matchingPairs.value[key]
  })

  matchingPairs.value[selectedLeft.value] = id
  selectedLeft.value = null
  updateLines()
}

const updateLines = () => {
  nextTick(() => {
    if (!quizContainer.value || !scrollContainer.value || !quizStarted.value) return
    const container = quizContainer.value
    const scroller = scrollContainer.value
    const scrollerRect = scroller.getBoundingClientRect()
    
    // Position of the scroll content relative to scroller
    const scrollT = scroller.scrollTop
    const scrollL = scroller.scrollLeft

    const newLines = []

    Object.entries(matchingPairs.value).forEach(([leftId, rightId]) => {
      const leftEl = container.querySelector(`[data-match-left="${leftId}"]`)
      const rightEl = container.querySelector(`[data-match-right="${rightId}"]`)
      
      if (leftEl && rightEl) {
        const lRect = leftEl.getBoundingClientRect()
        const rRect = rightEl.getBoundingClientRect()

        // relative to scroller rect + current scroll position = static content coordinate
        newLines.push({
          id: `${leftId}-${rightId}`,
          x1: (lRect.right - scrollerRect.left) + scrollL,
          y1: (lRect.top + (lRect.height / 2) - scrollerRect.top) + scrollT,
          x2: (rRect.left - scrollerRect.left) + scrollL,
          y2: (rRect.top + (rRect.height / 2) - scrollerRect.top) + scrollT
        })
      }
    })
    lines.value = newLines
  })
}

watch(currentQuestionIdx, () => {
    lines.value = []
    matchingPairs.value = {}
    selectedLeft.value = null
    selectedOption.value = null
})

watch(quizStarted, (val) => {
    if (val) nextTick(() => updateLines())
})

const handleNext = () => {
  if (isDisqualified.value) return
  let isCorrect = false
  if (currentQuestion.value.type === 'multiple-choice' || !currentQuestion.value.type) {
    isCorrect = selectedOption.value === currentQuestion.value.correctIndex
    if (isCorrect) score.value++
  } else if (currentQuestion.value.type === 'matching') {
    const correctPairs = currentQuestion.value.pairs
    isCorrect = Object.entries(correctPairs).every(([leftId, rightId]) => matchingPairs.value[leftId] === rightId)
    if (isCorrect) score.value++
  }
  answers.value.push({ questionIdx: currentQuestionIdx.value, isCorrect })
  
  // FIX: Using questions.value.length instead of questions.length
  if (currentQuestionIdx.value < questions.value.length - 1) {
    currentQuestionIdx.value++
  } else {
    isFinished.value = true
    if (document.fullscreenElement) document.exitFullscreen()
  }
}

const restartQuiz = () => {
  quizStarted.value = false
  currentQuestionIdx.value = 0
  selectedOption.value = null
  matchingPairs.value = {}
  lines.value = []
  score.value = 0
  isFinished.value = false
  isDisqualified.value = false
  cheatWarnings.value = 0
  answers.value = []
}

const finishQuiz = () => {
  if (!isRemedial.value) emit('complete', { score: finalScorePercentage.value })
  else restartQuiz()
}

const handleCheatDetected = (isInstantDQ = false) => {
  if (!quizStarted.value || isFinished.value || isDisqualified.value) return
  if (isInstantDQ) isDisqualified.value = true
  else {
    cheatWarnings.value++
    if (cheatWarnings.value >= maxWarnings) isDisqualified.value = true
  }
  if (isDisqualified.value && document.fullscreenElement) document.exitFullscreen()
}

onMounted(() => {
  const vh = () => document.visibilityState === 'hidden' && handleCheatDetected()
  const bh = () => handleCheatDetected()
  const fh = () => !document.fullscreenElement && quizStarted.value && !isFinished.value && handleCheatDetected(true)

  document.addEventListener('visibilitychange', vh)
  window.addEventListener('blur', bh)
  document.addEventListener('fullscreenchange', fh)
  
  const ro = new ResizeObserver(() => updateLines())
  if (quizContainer.value) ro.observe(quizContainer.value)
  
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', vh)
    window.removeEventListener('blur', bh)
    document.removeEventListener('fullscreenchange', fh)
    ro.disconnect()
  })
})
</script>

<template>
  <div class="relative w-full bg-white min-h-[600px] overflow-hidden rounded-3xl" ref="quizContainer">
    
    <!-- DQ SCREEN -->
    <div v-if="isDisqualified" class="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-red-600 text-white min-h-[600px] rounded-3xl z-[100] relative">
      <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border-2 border-white animate-pulse">
          <ShieldAlert class="w-8 h-8" />
      </div>
      <h2 class="text-2xl md:text-3xl font-black mb-3 uppercase tracking-tight leading-none">DISKUALIFIKASI!</h2>
      <p class="text-red-100 max-w-sm font-medium text-sm md:text-base mb-8">Percobaan curang terdeteksi. Silakan ulangi dari awal.</p>
      <button @click="restartQuiz" class="px-6 py-3 bg-white text-red-600 font-bold rounded-xl shadow-md active:scale-95 transition-all text-sm">
        ULANGI UJIAN
      </button>
    </div>

    <!-- START SCREEN -->
    <div v-else-if="!quizStarted && !isFinished" class="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[600px] bg-gradient-to-br from-indigo-50/50 to-white rounded-3xl">
      <div class="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-100">
        <ShieldAlert class="w-10 h-10" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Security Access</h2>
      <p class="text-gray-500 font-medium text-sm mb-8 max-w-sm">Klik tombol di bawah untuk masuk ke mode ujian aman (Layar Penuh).</p>
      <div class="max-w-sm w-full space-y-3 mb-10 text-left">
        <div class="bg-white p-3 rounded-lg border border-gray-100 flex gap-2 shadow-sm border-l-4 border-l-indigo-500">
          <Maximize2 class="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <p class="text-xs font-bold text-gray-700">Wajib Mode Fullscreen. Keluar dari fullscreen = Gagal.</p>
        </div>
        <div class="bg-white p-3 rounded-lg border border-gray-100 flex gap-2 shadow-sm border-l-4 border-l-red-500">
          <AlertTriangle class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p class="text-xs font-bold text-gray-700">Dilarang pindah tab browser atau buka aplikasi lain.</p>
        </div>
      </div>
      <button @click="startExam" class="px-6 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all">
        MASUK UJIAN
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>

    <!-- QUIZ ACTIVE -->
    <div v-else-if="quizStarted && !isFinished" class="flex flex-col h-full min-h-[600px] relative">
      <div class="px-4 md:px-6 py-4 md:py-5 border-b border-gray-50 flex justify-between items-center bg-white z-[60]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 md:w-10 md:h-10 bg-indigo-50 rounded-lg md:rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldAlert class="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
              <h2 class="text-sm md:text-lg font-black text-gray-900 tracking-tight leading-none line-clamp-1">{{ lesson.title }}</h2>
              <span class="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1 block">
                  <Power class="w-3 h-3 inline mr-1" /> SECURE MODE ACTIVE
              </span>
          </div>
        </div>
        <div class="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <span class="text-xl font-bold text-indigo-600 leading-none tabular-nums">{{ currentQuestionIdx + 1 }}<span class="text-gray-300 mx-1 text-base">/</span>{{ questions.length }}</span>
        </div>
      </div>

      <!-- THE SCROLLABLE CONTENT -->
      <div class="flex-1 overflow-y-auto relative custom-scrollbar" ref="scrollContainer">
        <!-- THE SVG (Moves with content) -->
        <svg v-if="currentQuestion.type === 'matching'" class="absolute top-0 left-0 w-full pointer-events-none z-0 overflow-visible" 
             style="height: 2000px;">
          <defs>
             <filter id="ropeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
             <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
             </linearGradient>
          </defs>
          <g v-for="line in lines" :key="line.id">
            <path 
              :d="`M ${line.x1} ${line.y1} C ${line.x1 + 80} ${line.y1}, ${line.x2 - 80} ${line.y2}, ${line.x2} ${line.y2}`" 
              fill="none" 
              stroke="url(#ropeGrad)" 
              stroke-width="5" 
              stroke-linecap="round" 
              stroke-dasharray="10,8"
              class="animate-dash"
              filter="url(#ropeShadow)"
            />
            <circle :cx="line.x1" :cy="line.y1" r="7" fill="#4f46e5" stroke="white" stroke-width="2" />
            <circle :cx="line.x2" :cy="line.y2" r="7" fill="#10b981" stroke="white" stroke-width="2" />
          </g>
        </svg>

        <div class="max-w-3xl mx-auto py-10 px-6 space-y-10 relative z-10 pb-20">
          <div class="space-y-4">
              <h3 class="text-3xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight">{{ currentQuestion.text }}</h3>
              <p class="text-gray-500 font-bold text-sm flex items-center gap-2 italic">
                  <Info class="w-5 h-5 text-indigo-300" />
                  {{ currentQuestion.type === 'matching' ? 'Tarik garis imajiner dengan mengklik kotak di kiri lalu di kanan.' : 'Pilih jawaban yang paling benar.' }}
              </p>
          </div>

          <!-- Multiple Choice -->
          <div v-if="currentQuestion.type === 'multiple-choice' || !currentQuestion.type" class="grid gap-4">
              <button v-for="(opt, idx) in currentQuestion.options" :key="idx" @click="selectOption(idx)"
                class="p-4 rounded-xl border-2 text-left transition-all active:scale-[0.99]"
                :class="selectedOption === null 
                  ? 'border-gray-50 bg-white hover:border-indigo-600 hover:shadow-md' 
                  : (selectedOption === idx ? 'border-indigo-600 bg-indigo-50/50 shadow-inner' : 'border-gray-50 opacity-40 grayscale')">
                <div class="flex items-center gap-4">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                         :class="selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'">
                        {{ String.fromCharCode(65 + idx) }}
                    </div>
                    <span class="text-sm font-medium text-gray-800">{{ opt }}</span>
                </div>
              </button>
          </div>

          <!-- Matching -->
          <div v-else-if="currentQuestion.type === 'matching'" class="grid grid-cols-2 gap-x-8 md:gap-x-24 lg:gap-x-40 gap-y-4 md:gap-y-6 pt-6">
            <div class="space-y-4 md:space-y-6">
              <button v-for="item in currentQuestion.leftItems" :key="item.id" :data-match-left="item.id" @click="selectLeft(item.id)"
                class="w-full p-4 md:p-5 rounded-2xl border-2 text-left font-bold text-xs md:text-sm transition-all relative z-40"
                :class="selectedLeft === item.id 
                    ? 'border-indigo-600 bg-white shadow-xl scale-[1.02]' 
                    : (matchingPairs[item.id] ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-50 bg-white hover:border-indigo-200')">
                  <div class="flex items-center justify-between gap-1 md:gap-2">
                      <span class="break-words">{{ item.text }}</span>
                      <div class="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg flex items-center justify-center shrink-0"
                           :class="matchingPairs[item.id] ? 'bg-emerald-600 text-white' : (selectedLeft === item.id ? 'bg-indigo-600 text-white' : 'bg-gray-50')">
                          <CheckCircle2 v-if="matchingPairs[item.id]" class="w-4 h-4 md:w-5 md:h-5" />
                          <div v-else class="w-2.5 h-2.5 rounded-full bg-current opacity-20"></div>
                      </div>
                  </div>
              </button>
            </div>
            <div class="space-y-4 md:space-y-6">
              <button v-for="item in currentQuestion.rightItems" :key="item.id" :data-match-right="item.id" @click="selectRight(item.id)"
                class="w-full p-4 md:p-5 min-h-[64px] md:min-h-[76px] rounded-2xl border-2 text-left font-bold text-xs md:text-sm transition-all relative z-40 flex items-center"
                :class="Object.values(matchingPairs).includes(item.id) 
                    ? 'border-emerald-100 bg-emerald-50/10 opacity-50 scale-[0.98]' 
                    : 'border-gray-50 bg-gray-50 hover:border-indigo-300 hover:bg-white hover:shadow-xl'">
                <span class="text-gray-600 break-words">{{ item.text }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="px-8 py-6 border-t border-gray-100 flex justify-end bg-white z-[60]">
        <button v-if="(currentQuestion.type !== 'matching' && selectedOption !== null) || (currentQuestion.type === 'matching' && Object.keys(matchingPairs).length === currentQuestion.leftItems.length)"
          @click="handleNext" 
          class="px-8 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all">
          {{ currentQuestionIdx === questions.length - 1 ? 'SELESAIKAN' : 'LANJUTKAN' }}
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- RESULTS -->
    <div v-else-if="isFinished" class="flex flex-col items-center justify-center p-8 md:p-12 text-center min-h-[600px] bg-white rounded-3xl">
      <div class="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md shadow-indigo-200">
        <Trophy class="w-10 h-10" />
      </div>
      <h2 class="text-3xl md:text-4xl font-black mb-2 tracking-tight text-gray-900 leading-none">{{ isRemedial ? 'COBA LAGI!' : 'LULUS!' }}</h2>
      <p class="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest mb-8">{{ isRemedial ? 'PELAJARI MATERI KEMBALI' : 'KAMU MEMANG HEBAT!' }}</p>
      
      <div class="w-full max-w-xs bg-gray-50 rounded-3xl p-8 mb-10 border border-gray-100 shadow-sm flex flex-col items-center">
        <span class="text-5xl md:text-6xl font-black text-indigo-600 tracking-tighter leading-none">{{ finalScorePercentage }}</span>
        <span class="text-xs font-bold text-gray-400 mt-2 tracking-widest text-center block">SKOR AKHIR</span>
      </div>

      <div class="flex gap-4 w-full max-w-sm pb-10">
          <button @click="restartQuiz" v-if="!isRemedial" class="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 text-sm transition-colors">
            <RotateCcw class="w-4 h-4" /> ULANGI
          </button>
          <button @click="finishQuiz" class="flex-1 px-6 py-3 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
            :class="isRemedial ? 'bg-red-600 shadow-red-200 hover:bg-red-700' : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'">
            {{ isRemedial ? 'Mulai Remidi' : 'Lanjutkan' }}
          </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes dash { to { stroke-dashoffset: 0; } }
.animate-dash { 
    stroke-dashoffset: 200; 
    animation: dash 15s linear infinite; 
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: white;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 20px;
  border: 2px solid white;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

:fullscreen { background: white; }
:-webkit-full-screen { background: white; }
</style>
