<script setup>
import { ref } from 'vue'
import { Save } from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'

const isModalOpen = ref(false)
const isSuccessModalOpen = ref(false)

const openSaveConfirm = () => {
  isModalOpen.value = true
}

const confirmSave = () => {
  isModalOpen.value = false
  setTimeout(() => {
     isSuccessModalOpen.value = true
  }, 200)
}
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Page -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Pengaturan Profil</h1>
        <p class="text-sm text-gray-500 mt-1">Perbarui informasi profil mentor Anda.</p>
      </div>
    </div>

    <!-- Form Section -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6">
      <form @submit.prevent="openSaveConfirm" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
          <input type="text" value="Danu Mentor" class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:bg-white transition-all outline-none" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
          <input type="email" value="mentor@nextskill.com" class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:bg-white transition-all outline-none" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Keahlian utama (Pisahkan dengan koma)</label>
          <input type="text" value="Web Development, UI/UX" class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:bg-white transition-all outline-none" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Biografi Singkat</label>
          <textarea rows="4" class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:bg-white transition-all outline-none">Saya adalah seorang instruktur Web Development berpengalaman lebih dari 5 tahun di bidang IT dan Software Engineering.</textarea>
        </div>
        <div class="pt-4 border-t border-gray-100">
          <button
            type="submit"
            class="flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm ml-auto active:scale-95"
          >
            <Save class="w-4 h-4 mr-2" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>

    <!-- Confirmation Modal -->
    <BaseModal 
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @confirm="confirmSave"
      title="Simpan Perubahan"
      message="Apakah Anda yakin informasi yang diubah sudah benar?"
      type="info"
      confirmText="Simpan Sekarang"
      cancelText="Batal"
      showCancel
    />

    <!-- Success Modal -->
    <BaseModal 
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Suskes Menyimpan"
      message="Profil mentor Anda berhasil diperbarui di sistem."
      type="success"
      confirmText="Tutup"
    />
  </div>
</template>
