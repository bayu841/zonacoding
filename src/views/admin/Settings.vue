<script setup>
import { ref } from 'vue'
import { Save, Percent, Users, LayoutTemplate, ShieldAlert } from 'lucide-vue-next'
import BaseModal from '../../components/shared/BaseModal.vue'

const isSaving = ref(false)
const isSuccessModalOpen = ref(false)

// Mock Settings State
const settings = ref({
  platformCommission: 20,
  studentXPMultiplier: 1.5,
  heroBannerTitle: 'Tingkatkan Skillmu ke Level Berikutnya',
  isMaintenanceMode: false
})

const handleSave = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    isSuccessModalOpen.value = true
  }, 1000) // Simulate network delay
}
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto pb-10">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Pengaturan Platform</h2>
      <p class="text-gray-500 text-sm mt-1">Konfigurasi nilai tukar XP, persentase komisi, dan parameter sistem global lainnya.</p>
    </div>

    <!-- Core Form -->
    <div class="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div class="p-6 md:p-8 space-y-8">

        <!-- Revenue Settings -->
        <section>
          <div class="flex items-center gap-2 mb-4">
            <Percent class="w-5 h-5 text-indigo-600" />
            <h3 class="font-bold text-gray-900 text-lg">Konfigurasi Pendapatan</h3>
          </div>
          <div class="bg-gray-50 p-5 rounded-2xl border border-gray-200">
            <label class="block text-sm font-bold text-gray-700 mb-2">Potongan Komisi Platform (%)</label>
            <p class="text-xs text-gray-500 mb-3">Persentase pendapatan kotor dari setiap transaksi kursus yang masuk ke kas perusahaan. Sisanya ({{ 100 - settings.platformCommission }}%) akan menjadi hak Mentor.</p>
            <div class="flex items-center gap-4 w-full md:max-w-md">
              <input type="range" v-model="settings.platformCommission" min="5" max="50" step="5" class="flex-1 accent-indigo-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
              <span class="font-black text-xl text-indigo-600 w-16 text-right">{{ settings.platformCommission }}%</span>
            </div>
          </div>
        </section>

        <hr class="border-gray-100" />

        <!-- User Settings -->
        <section>
          <div class="flex items-center gap-2 mb-4">
            <Users class="w-5 h-5 text-indigo-600" />
            <h3 class="font-bold text-gray-900 text-lg">Konfigurasi Pembelajaran</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Pengali XP Siswa Global</label>
              <input type="number" v-model="settings.studentXPMultiplier" step="0.1" min="1" max="5" class="w-full border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-white" />
              <p class="text-xs text-gray-500 mt-2">Kalikan XP dasar. Sangat berguna jika sedang mengadakan event "Double XP Weekend".</p>
            </div>
          </div>
        </section>

        <hr class="border-gray-100" />

        <!-- UI & Security -->
        <section>
          <div class="flex items-center gap-2 mb-4">
            <LayoutTemplate class="w-5 h-5 text-indigo-600" />
            <h3 class="font-bold text-gray-900 text-lg">Tampilan & Keamanan Sistem</h3>
          </div>
          
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Judul Banner Utama (Pelajar)</label>
              <input type="text" v-model="settings.heroBannerTitle" class="w-full border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            <div class="flex items-start gap-4 p-4 rounded-xl border transition-colors" :class="settings.isMaintenanceMode ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'">
              <div class="flex items-center h-6">
                <!-- Simple custom toggle switch -->
                <button 
                  type="button" 
                  @click="settings.isMaintenanceMode = !settings.isMaintenanceMode"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  :class="settings.isMaintenanceMode ? 'bg-red-600' : 'bg-gray-200'"
                >
                  <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="settings.isMaintenanceMode ? 'translate-x-5' : 'translate-x-0'"></span>
                </button>
              </div>
              <div class="flex-1">
                <label class="font-bold text-gray-900 flex items-center gap-2">
                  Aktifkan Mode Perbaikan (Maintenance) 
                  <ShieldAlert v-if="settings.isMaintenanceMode" class="w-4 h-4 text-red-600" />
                </label>
                <p class="text-sm text-gray-500 mt-1">Jika aktif, seluruh siswa dan mentor akan dialihkan ke layar Maintenance dan tidak dapat mengakses kursus sementara waktu.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <!-- Footer Actions -->
      <div class="bg-gray-50 px-6 py-4 flex items-center justify-end border-t border-gray-100">
        <button 
          @click="handleSave"
          :disabled="isSaving"
          class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 flex items-center disabled:opacity-70 disabled:cursor-wait"
        >
          <span v-if="isSaving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
          <Save v-else class="w-5 h-5 mr-2" />
          Simpan Konfigurasi Sistem
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <BaseModal 
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Pengaturan Tersimpan"
      message="Pengaturan platform berhasil diperbarui dan diterapkan ke seluruh sistem (Redis Cache dimuat ulang)."
      type="success"
      confirmText="Lanjutkan"
    />
  </div>
</template>
