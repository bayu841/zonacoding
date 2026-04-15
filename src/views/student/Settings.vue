<script setup>
import { ref, onMounted } from 'vue'
import { Save } from 'lucide-vue-next'
import BaseModal from '../../components/shared/BaseModal.vue'
import { useAuthStore } from '@/stores/authStore'
import { updateUser } from '@/api/user'
import { useAlert } from '@/composables/useAlert'

const authStore = useAuthStore()
const { showAlert } = useAlert()
const isModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const isSaving = ref(false)

const profile = ref({
  name: '',
  email: '',
  phone: '',
  bio: ''
})

onMounted(() => {
  if (authStore.user) {
    profile.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || '',
      bio: authStore.user.bio || ''
    }
  }
})

const handleSave = () => {
  isModalOpen.value = true
}

const confirmSave = async () => {
  isModalOpen.value = false
  isSaving.value = true
  try {
    const payload = {
      ...profile.value,
      role: authStore.user.role
    }
    const response = await updateUser(authStore.user.id, payload)
    if (response) {
      authStore.updateUser(profile.value)
      isSuccessModalOpen.value = true
    }
  } catch (err) {
    showAlert('Gagal', err.message || 'Gagal memperbarui profil.', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6 pb-10">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Pengaturan Profil</h2>
      <p class="text-gray-500 text-sm mt-1">Perbarui informasi pribadi dan preferensi akun Anda.</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div class="p-6 md:p-8 space-y-6">

        <!-- Avatar Section -->
        <div class="flex items-center gap-6 pb-6 border-b border-gray-100">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg ring-4 ring-indigo-50">
            {{ profile.name.charAt(0) }}
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg">Foto Profil</h3>
            <p class="text-sm text-gray-500 mb-3">Format JPG/PNG maksimal 2MB</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-indigo-50 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-100 transition-colors">Ubah Foto</button>
              <button class="px-4 py-2 text-gray-500 hover:text-red-500 font-bold text-sm rounded-xl transition-colors">Hapus</button>
            </div>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <input v-model="profile.name" type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm" />
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700">Email Utama</label>
            <input v-model="profile.email" type="email" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm" />
          </div>

          <div class="space-y-1.5 md:col-span-2">
            <label class="text-sm font-semibold text-gray-700">Nomor Telepon</label>
            <input v-model="profile.phone" type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm" />
          </div>

          <div class="space-y-1.5 md:col-span-2">
            <label class="text-sm font-semibold text-gray-700">Tentang Saya (Bio)</label>
            <textarea v-model="profile.bio" rows="4" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"></textarea>
            <p class="text-xs text-gray-400 text-right">Maksimal 300 karakter</p>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-6 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
        <button class="px-6 py-2.5 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
        <button @click="handleSave" class="flex items-center px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <Save class="w-4 h-4 mr-2" />
          Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- Modals -->
    <BaseModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @confirm="confirmSave"
      title="Simpan Perubahan?"
      message="Apakah Anda yakin ingin menyimpan perubahan pada profil Anda?"
      type="info"
      confirmText="Ya, Simpan"
      cancelText="Batal"
      showCancel
    />

    <BaseModal
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Berhasil!"
      message="Pengaturan profil berhasil diperbarui."
      type="success"
      confirmText="Tutup"
    />
  </div>
</template>
