<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Clock, Search, UserCheck, XCircle, Layout, Mail, FileText, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-vue-next'
import { getCourseMentorApplications, updateCourseMentorApplicationStatus } from '@/api/courseMentorApplication'
import { useAlert } from '@/composables/useAlert'
import BaseModal from '@/components/shared/BaseModal.vue'

const router = useRouter()
const { showAlert } = useAlert()

const applications = ref([])
const pagination = ref({
  total: 0,
  per_page: 5,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('pending') // Default to pending for verification view

// Modal State (for BaseModal notifications)
const modalState = ref({
  isOpen: false,
  title: '',
  message: '',
  type: 'info'
})

const fetchApplications = async (page = 1) => {
  loading.value = true
  try {
    const response = await getCourseMentorApplications({
      page,
      search: searchQuery.value,
      status: statusFilter.value
    })
    applications.value = response.data.data
    pagination.value = response.data.pagination
  } catch (error) {
    showAlert('Kesalahan', 'Gagal mengambil data aplikasi mentor.', 'danger')
  } finally {
    loading.value = false
  }
}

const handleStatusUpdate = async (id, status, reason = null) => {
  try {
    await updateCourseMentorApplicationStatus(id, { status, rejection_reason: reason })
    modalState.value = {
        isOpen: true,
        title: 'Berhasil!',
        message: `Aplikasi mentor telah ${status === 'approved' ? 'disetujui' : 'ditolak'}.`,
        type: status === 'approved' ? 'success' : 'warning'
    }
    fetchApplications(pagination.value.current_page)
  } catch (error) {
    showAlert('Kesalahan', 'Gagal memperbarui status aplikasi.', 'danger')
  }
}

const approve = (app) => {
    handleStatusUpdate(app.id, 'approved')
}

const reject = (id) => {
  const reason = prompt('Masukkan alasan penolakan:')
  if (reason !== null) {
    handleStatusUpdate(id, 'rejected', reason)
  }
}

const closeModal = () => {
  modalState.value.isOpen = false
}

onMounted(() => {
  fetchApplications()
})

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-200'
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200'
    default: return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}
</script>

<template>
  <div class="space-y-8 max-w-6xl mx-auto pb-12">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-8">
      <div>
        <button 
          @click="router.back()" 
          class="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-2 group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Mentor
        </button>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          Verifikasi Aplikasi Mentor
          <span v-if="pagination.total > 0" class="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold ring-4 ring-indigo-50">
            {{ pagination.total }}
          </span>
        </h2>
        <p class="text-gray-500 mt-1">Tinjau permohonan mentor untuk mengajar kursus tertentu.</p>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 relative">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          v-model="searchQuery"
          @input="fetchApplications(1)"
          type="text" 
          placeholder="Cari user atau judul kursus..." 
          class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
        />
      </div>
      <div class="flex gap-2">
        <select 
          v-model="statusFilter"
          @change="fetchApplications(1)"
          class="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm font-bold text-gray-600"
        >
          <option value="">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div class="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 font-bold animate-pulse">Memuat data aplikasi...</p>
    </div>

    <!-- Requests Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        v-for="app in applications" 
        :key="app.id" 
        class="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4"
      >
        <div class="p-8 flex-1 space-y-6">
          <!-- User Profile Header -->
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100 shadow-sm transition-transform group-hover:rotate-2 group-hover:scale-105">
                {{ app.user.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 tracking-tight">{{ app.user.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Mail class="w-3.5 h-3.5" />
                  {{ app.user.email }}
                </div>
              </div>
            </div>
            <div :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-widest shadow-sm', getStatusBadgeClass(app.status)]">
                <Clock class="w-3.5 h-3.5" />
                {{ new Date(app.created_at).toLocaleDateString('id-ID') }}
            </div>
          </div>

          <!-- Course Application Box -->
          <div class="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 group-hover:bg-indigo-50 transition-colors">
            <div class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Aplikasi Untuk Kursus</div>
            <div class="text-sm font-bold text-gray-800">{{ app.course.title }}</div>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-[10px] font-medium text-gray-500 uppercase">{{ app.course.level }} Level</span>
            </div>
          </div>

          <!-- Motivation & Info -->
          <div class="space-y-4">
            <div class="relative">
              <div class="flex items-center gap-2 text-xs font-black text-gray-400 uppercase mb-2">
                <FileText class="w-3.5 h-3.5 text-indigo-500" />
                Motivasi & Alasan
              </div>
              <div class="p-5 bg-gray-50/80 rounded-2xl text-sm border border-gray-100 text-gray-600 italic leading-relaxed relative">
                <span class="absolute -top-3 -left-1 text-4xl text-indigo-200 font-serif opacity-50">"</span>
                {{ app.motivation || 'Tidak ada motivasi yang dicantumkan.' }}
              </div>
            </div>

            <div v-if="app.rejection_reason" class="p-4 bg-rose-50 rounded-xl border border-rose-100">
                <div class="text-[10px] font-black text-rose-400 uppercase mb-1">Alasan Penolakan</div>
                <div class="text-sm text-rose-700 italic">{{ app.rejection_reason }}</div>
            </div>
          </div>
        </div>

        <!-- Action Footer -->
        <div v-if="app.status === 'pending'" class="bg-gray-50/50 p-6 flex gap-4 border-t border-gray-100">
          <button 
            @click="reject(app.id)" 
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all active:scale-95"
          >
            <XCircle class="w-4 h-4" />
            Tolak
          </button>
          <button 
            @click="approve(app)" 
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <UserCheck class="w-4 h-4" />
            Setujui
          </button>
        </div>
        <div v-else class="bg-gray-50/50 p-6 flex items-center justify-center border-t border-gray-100">
            <div v-if="app.status === 'approved'" class="text-emerald-500 flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <CheckCircle class="w-4 h-4" />
                Aplikasi Disetujui
            </div>
            <div v-if="app.status === 'rejected'" class="text-rose-500 flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <XCircle class="w-4 h-4" />
                Aplikasi Ditolak
            </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="applications.length === 0" 
        class="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center"
      >
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-gray-25">
          <Layout class="w-10 h-10 text-gray-300" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900">Semua Permintaan Selesai</h3>
        <p class="text-gray-500 mt-2 max-w-sm text-center">Tidak ada aplikasi mentor kursus yang memerlukan perhatian saat ini.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.last_page > 1" class="flex items-center justify-center gap-3 mt-8">
        <button 
          @click="fetchApplications(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        <span class="text-sm font-bold text-gray-400">{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button 
          @click="fetchApplications(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all disabled:opacity-30"
        >
          <ArrowLeft class="w-5 h-5 rotate-180" />
        </button>
    </div>

    <!-- Notification Modal -->
    <BaseModal
      :is-open="modalState.isOpen"
      :title="modalState.title"
      :message="modalState.message"
      :type="modalState.type"
      confirm-text="Siap"
      @close="closeModal"
      @confirm="closeModal"
    />
  </div>
</template>
