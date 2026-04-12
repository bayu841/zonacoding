<script setup>
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  FileText, 
  Award,
  HelpCircle,
  Download
} from 'lucide-vue-next'

defineProps({
  syllabus: { type: Array, required: true },
  currentLessonId: { type: String, required: true },
  finishedLessons: { type: Array, default: () => [] },
  checkLessonLocked: { type: Function, required: true }
})

const emit = defineEmits(['select-lesson', 'toggle-module'])
</script>

<template>
  <div class="w-full md:w-[350px] bg-white border-l border-gray-200 flex flex-col h-full shrink-0">
    <div class="p-5 border-b border-gray-100">
      <h3 class="font-black text-gray-900 text-lg">Silabus Kursus</h3>
      <p class="text-sm text-gray-500 font-medium">{{ finishedLessons.length }} dari 6 Materi diselesaikan ({{ Math.round(finishedLessons.length / 6 * 100) }}%)</p>
      <div class="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" :style="{ width: (finishedLessons.length / 6 * 100) + '%' }"></div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto custom-scrollbar p-3">
      <!-- Module Accordions -->
      <div v-for="mod in syllabus" :key="mod.id" class="mb-3">
        <button 
          @click="emit('toggle-module', mod.id)"
          class="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
        >
          <span class="font-bold text-gray-900 text-sm">{{ mod.title }}</span>
          <ChevronDown v-if="!mod.isOpen" class="w-4 h-4 text-gray-500" />
          <ChevronUp v-else class="w-4 h-4 text-gray-500" />
        </button>
        
        <!-- Lessons List -->
        <div v-show="mod.isOpen" class="pt-2 pb-1 space-y-1">
          <button 
            v-for="lesson in mod.lessons" :key="lesson.id"
            @click="emit('select-lesson', lesson.id)"
            :class="[
              'w-full flex items-start text-left p-3 rounded-xl transition-all',
              currentLessonId === lesson.id 
                ? 'bg-indigo-50 border border-indigo-100' 
                : 'hover:bg-gray-50 border border-transparent'
            ]"
          >
            <!-- Icon/Status Indicator -->
            <div class="mt-0.5 mr-3 flex-shrink-0">
              <CheckCircle2 v-if="finishedLessons.includes(lesson.id)" class="w-4 h-4 text-emerald-500" />
              <Lock v-else-if="checkLessonLocked(lesson.id)" class="w-4 h-4 text-gray-300" />
              <div v-else class="w-4 h-4 rounded-full border-2 border-indigo-200 animate-pulse"></div>
            </div>
            
            <!-- Meta -->
            <div class="flex-1">
              <h4 :class="[
                'text-sm font-semibold leading-snug line-clamp-2',
                currentLessonId === lesson.id ? 'text-indigo-700' : 'text-gray-700'
              ]">{{ lesson.title }}</h4>
              <div class="flex items-center gap-2 mt-1.5 text-[11px] font-medium text-gray-400">
                <PlayCircle v-if="lesson.type === 'video'" class="w-3.5 h-3.5" />
                <FileText v-else-if="lesson.type === 'text'" class="w-3.5 h-3.5" />
                <Award v-else-if="lesson.type === 'project'" class="w-3.5 h-3.5" />
                <HelpCircle v-else-if="lesson.type === 'quiz'" class="w-3.5 h-3.5" />
                <Download v-else-if="lesson.type === 'file'" class="w-3.5 h-3.5" />
                <span>{{ lesson.type === 'video' ? lesson.duration : (lesson.type === 'text' ? lesson.readTime : (lesson.type === 'quiz' ? 'Quiz' : (lesson.type === 'file' ? 'Download' : 'Submission'))) }}</span>
                <span v-if="checkLessonLocked(lesson.id)" class="ml-auto text-[9px] font-black text-gray-300 uppercase italic">Locked</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
