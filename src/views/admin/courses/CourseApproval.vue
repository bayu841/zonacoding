<script setup>
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'
import ModerationTable from '../../../components/admin/courses/ModerationTable.vue'
import CoursePreview from '../../../components/admin/courses/CoursePreview.vue'
import ModerationActions from '../../../components/admin/courses/ModerationActions.vue'

const searchQuery = ref('')
const filterStatus = ref('Pending')

// Dummy Moderation Queue
const submissions = ref([
  { id: 1, title: 'Mastering Go Lang Microservices', mentor: 'Rahmat Hidayat', submittedAt: '12 Apr 2026', status: 'Pending', expectedPrice: 'Rp 450.000', modules: 12 },
  { id: 2, title: 'Desain Sistem untuk Pemula', mentor: 'Siti Rahma', submittedAt: '11 Apr 2026', status: 'Pending', expectedPrice: 'Rp 200.000', modules: 8 },
  { id: 3, title: 'Fullstack Next.js & Supabase', mentor: 'Budi Santoso', submittedAt: '10 Apr 2026', status: 'Approved', expectedPrice: 'Rp 350.000', modules: 15 },
  { id: 4, title: 'Belajar Fundamental Docker', mentor: 'Arief Muhammad', submittedAt: '09 Apr 2026', status: 'Rejected', expectedPrice: 'Gratis', modules: 5, rejectReason: 'Audio pada modul 3 sangat tidak jelas dan dipenuhi noise.' },
])

const filteredSubmissions = computed(() => {
  return submissions.value.filter(sub => {
    const matchesSearch = sub.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          sub.mentor.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'Semua' || sub.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const isModerationModalOpen = ref(false)
const selectedCourse = ref(null)

const openModeration = (course) => {
  selectedCourse.value = { ...course }
  isModerationModalOpen.value = true
}

const handleModerationResult = (result) => {
  const index = submissions.value.findIndex(s => s.id === result.id)
  if (index !== -1) {
    submissions.value[index].status = result.action === 'approve' ? 'Approved' : 'Rejected'
    if (result.action === 'reject') {
      submissions.value[index].rejectReason = result.reason
    }
  }
  isModerationModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Persetujuan Kursus</h2>
      <p class="text-gray-500 text-sm mt-1">Tinjau dan verifikasi materi yang dikirim oleh para mentor sebelum dipublikasikan.</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
        <button v-for="status in ['Semua', 'Pending', 'Approved', 'Rejected']" :key="status"
          @click="filterStatus = status"
          class="px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap"
          :class="filterStatus === status ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'"
        >
          {{ status }}
        </button>
      </div>

      <div class="flex-1 max-w-sm w-full relative">
        <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari kursus atau mentor..." 
          class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 outline-none text-sm rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" 
        />
      </div>
    </div>

    <!-- Data Table Component -->
    <ModerationTable 
      :submissions="filteredSubmissions" 
      @review="openModeration" 
    />

    <!-- Moderation Modal -->
    <BaseModal
      :is-open="isModerationModalOpen"
      @close="isModerationModalOpen = false"
      title="Tinjauan Materi Kursus"
      size="3xl"
    >
      <div v-if="selectedCourse" class="mt-4 w-full flex flex-col md:flex-row gap-6">
        <!-- Content Preview (Left) -->
        <CoursePreview :course="selectedCourse" />
        
        <!-- Decision Actions (Right) -->
        <ModerationActions 
          :course="selectedCourse" 
          @submit="handleModerationResult" 
          @cancel="isModerationModalOpen = false" 
        />
      </div>
    </BaseModal>
  </div>
</template>
