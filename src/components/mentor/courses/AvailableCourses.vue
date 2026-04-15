<script setup>
import { ref } from 'vue'
import { BookOpen, PencilLine } from 'lucide-vue-next'
import BaseModal from '../../shared/BaseModal.vue'
import { applyAsMentor } from '@/api/course'
import { useAlert } from '@/composables/useAlert'

import { useImage } from '@/composables/useImage'

const props = defineProps({
  courses: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['apply', 'refresh'])

const isModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const isSubmitting = ref(false)
const selectedCourse = ref(null)
const motivation = ref('')
const { showAlert } = useAlert()
const { getProxyUrl, handleImageError } = useImage()

const openApplyConfirm = (course) => {
  selectedCourse.value = course
  motivation.value = ''
  isModalOpen.value = true
}

const confirmApply = async () => {
  if (!selectedCourse.value || !motivation.value.trim()) {
    showAlert('Peringatan', 'Silakan isi motivasi Anda terlebih dahulu.', 'warning')
    return
  }

  isSubmitting.value = true
  try {
    const response = await applyAsMentor(selectedCourse.value.id, {
      motivation: motivation.value
    })

    if (response.status) {
      isModalOpen.value = false
      isSuccessModalOpen.value = true
      emit('refresh')
    }
  } catch (err) {
    console.error('Apply for course error:', err)
    showAlert('Gagal', err.message || 'Terjadi kesalahan saat mengajukan diri.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="course in courses" :key="course.id" class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full duration-300 overflow-hidden group">
        <!-- Thumbnail -->
        <div class="relative h-48 overflow-hidden">
          <img
            :src="getProxyUrl(course.thumbnail)"
            :alt="course.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            @error="handleImageError"
          />
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm border border-emerald-100">{{ course.category.name }}</span>
          </div>
          <div class="absolute top-4 right-4">
             <span class="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold rounded-lg uppercase shadow-sm border border-gray-100">{{ course.level }}</span>
          </div>
        </div>

        <div class="p-6 flex flex-col flex-1">
          <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">{{ course.title }}</h3>
          <p class="text-xs text-gray-500 mb-6 line-clamp-2">{{ course.description || `Kesempatan mengajar kursus ${course.category.name} untuk tingkat ${course.level}.` }}</p>

          <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Harga Kursus</span>
              <span class="text-lg font-black text-emerald-600">{{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(course.price) }}</span>
            </div>
            <button
              @click="openApplyConfirm(course)"
              class="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 active:scale-95"
            >
              Ajukan Diri
            </button>
          </div>
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
      type="info"
      size="xl"
    >
      <div class="space-y-6 text-left">
        <div class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
          <BookOpen class="w-5 h-5 text-blue-600 mt-1" />
          <p class="text-sm text-blue-800 leading-relaxed">
            Anda akan mengajukan diri sebagai mentor untuk kursus <span class="font-black">'{{ selectedCourse?.title }}'</span>.
            Pastikan Anda memiliki keahlian yang relevan sebelum melanjutkan.
          </p>
        </div>

        <div class="space-y-3">
          <label class="flex items-center gap-2 text-sm font-black text-gray-700">
            <PencilLine class="w-4 h-4 text-emerald-600" />
            Motivasi Mengajar
          </label>
          <div class="relative group">
            <textarea
              v-model="motivation"
              rows="5"
              class="w-full p-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 bg-gray-50/50 text-sm transition-all duration-300 group-hover:bg-white resize-none outline-none font-medium text-gray-700"
              placeholder="Ceritakan mengapa Anda adalah orang yang tepat untuk mengajar kursus ini..."
            ></textarea>
            <div class="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400">
              {{ motivation.length }} karakter
            </div>
          </div>
          <p class="text-[10px] text-gray-400 italic flex items-center gap-1">
             * Motivasi ini akan ditinjau langsung oleh tim Admin.
          </p>
        </div>

        <!-- Restoration of Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            @click="isModalOpen = false"
            class="flex-1 py-3.5 px-6 border-2 border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm"
          >
            Batal
          </button>
          <button
            @click="confirmApply"
            :disabled="isSubmitting || !motivation.trim()"
            class="flex-1 py-3.5 px-6 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-200 text-sm flex items-center justify-center gap-2"
          >
            <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
             Ya, Ajukan Sekarang
          </button>
        </div>
      </div>
    </BaseModal>

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
