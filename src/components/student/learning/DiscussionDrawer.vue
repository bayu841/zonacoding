<script setup>
import { X, Send } from 'lucide-vue-next'

defineProps({
  isOpen: { type: Boolean, required: true },
  currentLesson: { type: Object, default: null },
  discussions: { type: Array, default: () => [] },
  newComment: { type: String, default: '' }
})

const emit = defineEmits(['close', 'post', 'update:newComment'])

const handleInput = (e) => {
  emit('update:newComment', e.target.value)
}
</script>

<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-300 sm:duration-500"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-300 sm:duration-500"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div v-if="isOpen" class="fixed inset-y-0 right-0 z-50 flex max-w-full pl-10 shadow-2xl">
      <div class="w-screen max-w-md">
        <div class="flex h-full flex-col bg-white shadow-xl">
          <!-- Header Drawer -->
          <div class="flex items-center justify-between px-6 py-5 bg-indigo-600">
            <div>
              <h2 class="font-bold text-lg text-white">Forum Diskusi</h2>
              <p class="text-xs text-indigo-200 mt-1">{{ currentLesson?.title }}</p>
            </div>
            <button @click="emit('close')" class="text-indigo-200 hover:text-white transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <!-- Chat List -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            <div v-for="chat in discussions" :key="chat.id" class="flex gap-4">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                :class="chat.isMentor ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-gray-200 text-gray-600'"
              >
                {{ chat.avatar }}
              </div>
              <div class="flex-1">
                <div class="flex items-baseline justify-between mb-1">
                  <h5 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {{ chat.author }}
                    <span v-if="chat.isMentor" class="bg-amber-50 text-amber-600 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Mentor</span>
                  </h5>
                  <span class="text-xs text-gray-400">{{ chat.time }}</span>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">{{ chat.text }}</p>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-6 bg-white border-t border-gray-100">
            <div class="flex items-end gap-3 w-full bg-gray-50 border border-gray-200 p-2 pl-4 rounded-3xl focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
              <input 
                :value="newComment"
                @input="handleInput"
                @keyup.enter="emit('post')"
                type="text" 
                placeholder="Ketik pertanyaan Anda..." 
                class="flex-1 bg-transparent border-none outline-none text-sm py-2"
              />
              <button 
                @click="emit('post')"
                class="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors flex-shrink-0 shadow-sm"
                :class="!newComment.trim() ? 'opacity-50 cursor-not-allowed' : ''"
              >
                <Send class="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
