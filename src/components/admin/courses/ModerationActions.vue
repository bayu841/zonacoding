<script setup>
import { ref } from 'vue'
import { CheckCircle, AlertCircle, XCircle } from 'lucide-vue-next'

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit', 'cancel'])

const moderationAction = ref(null) // 'approve' or 'reject'
const rejectReason = ref('')

const handleSubmit = () => {
  if (moderationAction.value === 'reject' && !rejectReason.value.trim()) {
    alert('Harap isi alasan penolakan agar mentor dapat melakukan revisi.')
    return
  }

  emit('submit', {
    id: props.course.id,
    action: moderationAction.value,
    reason: rejectReason.value
  })
}
</script>

<template>
  <div class="md:w-[320px] flex flex-col pt-2 text-left">
    <h4 class="font-bold text-gray-900 text-sm mb-3">Keputusan Moderasi</h4>

    <div v-if="course.status === 'Pending'" class="space-y-3">
       <button 
         @click="moderationAction = 'approve'"
         class="w-full flex items-center justify-between p-4 border rounded-xl transition-all"
         :class="moderationAction === 'approve' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'"
       >
         <div class="flex items-center gap-2">
           <CheckCircle class="w-5 h-5" :class="moderationAction === 'approve' ? 'text-emerald-600' : 'text-gray-400'" />
           <span class="font-bold text-sm" :class="moderationAction === 'approve' ? 'text-emerald-800' : 'text-gray-700'">Setujui Kursus</span>
         </div>
         <div v-if="moderationAction === 'approve'" class="w-4 h-4 rounded-full bg-emerald-500 shadow-inner"></div>
       </button>

       <button 
         @click="moderationAction = 'reject'"
         class="w-full flex items-center justify-between p-4 border rounded-xl transition-all"
         :class="moderationAction === 'reject' ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 hover:border-gray-300'"
       >
         <div class="flex items-center gap-2">
           <AlertCircle class="w-5 h-5" :class="moderationAction === 'reject' ? 'text-red-600' : 'text-gray-400'" />
           <span class="font-bold text-sm" :class="moderationAction === 'reject' ? 'text-red-800' : 'text-gray-700'">Tolak & Revisi</span>
         </div>
         <div v-if="moderationAction === 'reject'" class="w-4 h-4 rounded-full bg-red-500 shadow-inner"></div>
       </button>

       <!-- Rejection Reason input -->
       <transition
         enter-active-class="transition duration-300 ease-out"
         enter-from-class="opacity-0 -translate-y-2"
         enter-to-class="opacity-100 translate-y-0"
       >
         <div v-if="moderationAction === 'reject'" class="mt-4">
           <label class="block text-xs font-bold text-gray-700 mb-1">Alasan Penolakan (Wajib)</label>
           <textarea 
             v-model="rejectReason"
             rows="3" 
             placeholder="Contoh: Kualitas audio kurang, tolong perbaiki." 
             class="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none resize-none transition-all"
           ></textarea>
         </div>
       </transition>
    </div>

    <!-- Already Moderated Visuals -->
    <div v-else class="p-4 rounded-xl border border-dashed text-left" :class="course.status === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'">
      <div class="flex items-center gap-2 mb-2">
        <CheckCircle v-if="course.status === 'Approved'" class="w-5 h-5" />
        <XCircle v-else class="w-5 h-5" />
        <span class="font-bold whitespace-nowrap">Status: {{ course.status }}</span>
      </div>
      <p v-if="course.status === 'Rejected'" class="text-xs mt-3 opacity-90 italic">"{{ course.rejectReason }}"</p>
    </div>

    <!-- Modal Action Bottom -->
    <div class="mt-auto pt-6 flex gap-3">
       <button @click="$emit('cancel')" class="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
       <button 
         v-if="course.status === 'Pending'"
         @click="handleSubmit"
         :disabled="!moderationAction"
         class="flex-1 py-2.5 font-bold rounded-xl transition-all shadow-sm text-white"
         :class="!moderationAction ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'"
       >
         Simpan
       </button>
    </div>
  </div>
</template>
