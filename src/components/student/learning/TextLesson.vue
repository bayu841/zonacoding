<script setup>
import { FileText } from 'lucide-vue-next'

defineProps({
  lesson: {
    type: Object,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="p-6 md:p-10">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Reading Material</span>
      <span class="text-sm text-gray-400 font-semibold flex items-center"><FileText class="w-3.5 h-3.5 mr-1" /> {{ lesson?.readTime }}</span>
    </div>
    
    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">{{ lesson?.title }}</h1>
    
    <!-- Injected Rich Text -->
    <div class="prose prose-indigo max-w-none prose-lg" v-html="content"></div>
  </div>
</template>
