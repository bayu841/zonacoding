<script setup>
import { ref } from 'vue'
import { Award } from 'lucide-vue-next'
import { useAlert } from '../../composables/useAlert'
import CertificateCard from '../../components/student/CertificateCard.vue'
import CertificateViewer from '../../components/student/CertificateViewer.vue'

// Dummy Data
const certificates = ref([
  { id: 'CERT-0992X', title: 'Git & GitHub Basics', issueDate: '10 April 2026', credentialID: 'NXS-89210-GH', pdfLink: '#' },
  { id: 'CERT-1025Y', title: 'Frontend Web Development dengan HTML & CSS', issueDate: '02 Maret 2026', credentialID: 'NXS-92318-FE', pdfLink: '#' },
  { id: 'CERT-3102Z', title: 'Pemrograman Dasar Python', issueDate: '15 Januari 2026', credentialID: 'NXS-11928-PY', pdfLink: '#' }
])

const { showAlert } = useAlert()
const isDownloadModalOpen = ref(false)
const selectedCert = ref(null)

const openViewer = (cert) => {
  selectedCert.value = cert
  isDownloadModalOpen.value = true
}

const simulateDownload = () => {
  showAlert('Download Dimulai', `Sertifikat "${selectedCert.value.title}" sedang disiapkan.`, 'success')
}
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Sertifikat Saya</h2>
        <p class="text-gray-500 text-sm mt-1">Kelola dan unduh sertifikat kelulusan dari kursus yang telah Anda selesaikan.</p>
      </div>
    </div>

    <!-- Certificate Grid -->
    <div v-if="certificates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CertificateCard 
        v-for="cert in certificates" 
        :key="cert.id"
        :cert="cert"
        @view="openViewer"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
      <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
        <Award class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Belum Ada Sertifikat</h3>
      <p class="text-gray-500 max-w-sm mx-auto">Selesaikan setidaknya satu kursus hingga 100% untuk mendapatkan sertifikat kelulusan pertama Anda.</p>
    </div>

    <!-- Immersive Visual Viewer Modal -->
    <CertificateViewer 
      :is-open="isDownloadModalOpen"
      :cert="selectedCert"
      @close="isDownloadModalOpen = false"
      @download="simulateDownload"
    />
  </div>
</template>
