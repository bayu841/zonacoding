<script setup>
import { ref } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import BaseModal from '../../shared/BaseModal.vue'

const props = defineProps({
  courses: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['apply'])

const isModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const selectedCourse = ref(null)

const openApplyConfirm = (course) => {
  selectedCourse.value = course
  isModalOpen.value = true
}

const confirmApply = () => {
  if (selectedCourse.value) {
    emit('apply', selectedCourse.value)
    isModalOpen.value = false
    isSuccessModalOpen.value = true
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="course in courses" :key="course.id" class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all p-6 flex flex-col h-full duration-300">
        <div class="flex items-start justify-between mb-4">
          <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">{{ course.category }}</span>
          <span class="text-xs text-gray-400 font-medium">{{ course.level }}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">{{ course.title }}</h3>
        <p class="text-sm text-gray-500 mb-6 flex-1">Kursus ini mencari instruktur yang ahli di bidang {{ course.category.toLowerCase() }}.</p>
        <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
          <div class="text-sm text-gray-500">
            Kuota: <span class="font-bold text-gray-700">{{ course.quota }} siswa</span>
          </div>
          <button
            @click="openApplyConfirm(course)"
            class="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Ajukan Diri
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="courses.length === 0" class="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
      <BookOpen class="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-bold text-gray-900 mb-1">Tidak ada kursus tersedia</h3>
      <p class="text-gray-500">Semua kursus saat ini telah terisi oleh mentor lain.</p>
    </div>

    <!-- Confirmation Modal -->
    <BaseModal 
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @confirm="confirmApply"
      title="Konfirmasi Pengajuan"
      :message="`Apakah Anda yakin ingin mengajukan diri sebagai mentor untuk kursus '${selectedCourse?.title}'?`"
      type="info"
      confirmText="Ya, Ajukan"
      cancelText="Batal"
      showCancel
    />

    <!-- Success Modal -->
    <BaseModal 
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Pengajuan Berhasil"
      message="Pengajuan Anda telah berhasil dikirim! Silakan menunggu persetujuan dari Admin."
      type="success"
      confirmText="Tutup"
    />
  </div>
</template>
