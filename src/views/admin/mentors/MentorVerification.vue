<script setup>
import { ref } from 'vue'
import { ArrowLeft, Clock, ExternalLink, UserCheck, XCircle, UserPlus, Mail, FileText } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BaseModal from '../../../components/shared/BaseModal.vue'

const router = useRouter()

const pendingMentors = ref([
  { id: 101, name: 'Bastian Tegar', email: 'bastian@example.com', portfolioLink: 'https://github.com/bastian', reason: 'Ingin berbagi ilmu React.js dan menanamkan pola pikir arsitektur yang kuat bagi pemula.', date: '2 jam yang lalu' },
  { id: 102, name: 'Lina Ayu', email: 'lina@example.com', portfolioLink: 'https://dribbble.com/lina', reason: 'Fokus pada materi UI/UX Design dasar dengan pendekatan studi kasus industri riil.', date: 'Kemarin' },
])

// Modal State
const modalState = ref({
  isOpen: false,
  title: '',
  message: '',
  type: 'info'
})

const closeModal = () => {
  modalState.value.isOpen = false
}

const showModal = (title, message, type = 'info') => {
  modalState.value = {
    isOpen: true,
    title,
    message,
    type
  }
}

const approve = (id) => {
    pendingMentors.value = pendingMentors.value.filter(m => m.id !== id)
    showModal('Berhasil!', 'Mentor telah berhasil disetujui.', 'success')
}

const reject = (id) => {
    pendingMentors.value = pendingMentors.value.filter(m => m.id !== id)
    showModal('Verifikasi Ditolak', 'Permintaan verifikasi mentor telah ditolak.', 'warning')
}
</script>

<template>
  <div class="space-y-8 max-w-6xl mx-auto">
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
          Verifikasi Calon Mentor
          <span v-if="pendingMentors.length > 0" class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold ring-4 ring-indigo-50">
            {{ pendingMentors.length }}
          </span>
        </h2>
        <p class="text-gray-500 mt-1">Tinjau portofolio dan motivasi pendaftar mentor baru.</p>
      </div>
    </div>

    <!-- Requests Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        v-for="mentor in pendingMentors" 
        :key="mentor.id" 
        class="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4"
      >
        <div class="p-8 flex-1">
          <!-- User Profile Header -->
          <div class="flex items-start justify-between mb-8">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100 shadow-sm transition-transform group-hover:rotate-2 group-hover:scale-110">
                {{ mentor.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 tracking-tight">{{ mentor.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Mail class="w-3.5 h-3.5" />
                  {{ mentor.email }}
                </div>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100 uppercase tracking-widest shadow-sm">
                <Clock class="w-3.5 h-3.5" />
                {{ mentor.date }}
            </div>
          </div>

          <!-- Content Body -->
          <div class="space-y-6">
            <div class="relative">
              <div class="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 ml-1">
                <FileText class="w-4 h-4 text-indigo-500" />
                Motivasi & Alasan
              </div>
              <div class="p-5 bg-gray-50/80 rounded-2xl text-sm border border-gray-100 text-gray-600 italic leading-relaxed relative">
                <span class="absolute -top-3 -left-1 text-4xl text-indigo-200 font-serif opacity-50">"</span>
                {{ mentor.reason }}
              </div>
            </div>

            <div class="pt-2">
              <a 
                :href="mentor.portfolioLink" 
                target="_blank" 
                class="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50/50 px-4 py-2.5 rounded-xl transition-all hover:bg-indigo-100/50 group/link"
              >
                Lihat Portofolio Lengkap
                <ExternalLink class="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="bg-gray-50/50 p-6 flex gap-4 border-t border-gray-100">
          <button 
            @click="reject(mentor.id)" 
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all active:scale-95"
          >
            <XCircle class="w-4 h-4" />
            Tolak
          </button>
          <button 
            @click="approve(mentor.id)" 
            class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <UserCheck class="w-4 h-4" />
            Verifikasi
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="pendingMentors.length === 0" 
        class="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center animate-in zoom-in duration-500"
      >
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-gray-25">
          <UserPlus class="w-10 h-10 text-gray-300" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900">Semua Permintaan Selesai</h3>
        <p class="text-gray-500 mt-2 max-w-sm text-center">Tidak ada permintaan verifikasi mentor baru yang memerlukan perhatian saat ini.</p>
        <button @click="router.push('/admin/mentors')" class="mt-8 font-bold text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
          Lihat Daftar Mentor &rarr;
        </button>
      </div>
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
