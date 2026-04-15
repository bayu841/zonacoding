<script setup>
import { X, Video, FileText, Globe, Clock, Layout, Calendar } from 'lucide-vue-next'

defineProps({
  show: Boolean,
  lesson: Object
})

defineEmits(['close'])
</script>

<template>
  <div v-if="show && lesson" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all animate-in zoom-in-95 duration-200 overflow-hidden">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-extrabold text-gray-900 tracking-tight">Detail Lesson</h3>
          <p class="text-xs text-gray-400 mt-1 uppercase font-black">ID: {{ lesson.id }}</p>
        </div>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
        <!-- Title & Basic Info -->
        <div class="flex items-start gap-4">
          <div class="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
            <Video v-if="lesson.vidio_url" class="w-8 h-8" />
            <FileText v-else class="w-8 h-8" />
          </div>
          <div>
            <h4 class="text-2xl font-bold text-gray-900">{{ lesson.title }}</h4>
            <div class="flex items-center gap-4 mt-2">
              <div class="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                <Clock class="w-4 h-4 text-indigo-400" />
                Urutan Ke-{{ lesson.order_number }}
              </div>
              <div :class="[
                'px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
                lesson.is_preview ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'
              ]">
                {{ lesson.is_preview ? 'PRATINJAU GRATIS' : 'TERKUNCI' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div v-if="lesson.content" class="space-y-3">
          <h5 class="text-xs font-black text-gray-400 uppercase tracking-widest">Konten Materi</h5>
          <div 
            class="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed prose prose-sm max-w-none"
            v-html="lesson.content"
          ></div>
        </div>

        <!-- Media Links -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="lesson.vidio_url" class="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
             <div class="text-[10px] font-black text-gray-400 uppercase">Video URL</div>
             <a :href="lesson.vidio_url" target="_blank" class="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-sm truncate">
                <Globe class="w-4 h-4" />
                {{ lesson.vidio_url }}
             </a>
          </div>
          <div v-if="lesson.file_path" class="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
             <div class="text-[10px] font-black text-gray-400 uppercase">Lampiran File</div>
             <a :href="lesson.file_path" target="_blank" class="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-bold text-sm truncate">
                <FileText class="w-4 h-4" />
                Download Attachment
             </a>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-6 font-bold uppercase tracking-widest">
           <div class="flex items-center gap-2">
              <Calendar class="w-3.5 h-3.5" />
              Dibuat: {{ lesson.created_at }}
           </div>
           <div class="flex items-center gap-2">
              <Calendar class="w-3.5 h-3.5" />
              Update: {{ lesson.updated_at }}
           </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-8 py-6 bg-gray-50 border-t border-gray-100">
        <button 
          @click="$emit('close')" 
          class="w-full px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
        >
          Tutup Detail
        </button>
      </div>
    </div>
  </div>
</template>
