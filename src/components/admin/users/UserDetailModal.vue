<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'edit'])

const closeModal = () => {
  emit('close')
}

const openEditModal = () => {
  emit('edit', props.user)
}
</script>

<template>
  <div v-if="show && user" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-screen overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="border-b border-gray-200 pb-5">
          <h2 class="text-2xl font-bold text-gray-900">Detail Pengguna</h2>
          <p class="mt-2 text-sm text-gray-500">Informasi lengkap pengguna</p>
        </div>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Profile Info -->
      <div class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-500">Nama Lengkap</label>
          <p class="mt-1 text-lg font-semibold text-gray-900">{{ user.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-500">Email</label>
          <p class="mt-1 text-base text-gray-900">{{ user.email }}</p>
        </div>

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-gray-500">Role</label>
          <p class="mt-1">
            <span :class="[
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
              {
                'bg-purple-100 text-purple-800 border-purple-200': user.role === 'admin',
                'bg-blue-100 text-blue-800 border-blue-200': user.role === 'mentor',
                'bg-gray-100 text-gray-800 border-gray-200': user.role === 'student'
              }
            ]">
              {{ user.role === 'admin' ? 'Admin' : user.role === 'mentor' ? 'Mentor' : 'Siswa' }}
            </span>
          </p>
        </div>


        <!-- Joined Date -->
        <div>
          <label class="block text-sm font-medium text-gray-500">Tanggal Bergabung</label>
          <p class="mt-1 text-base text-gray-900">{{ new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="pt-5 border-t border-gray-200 flex justify-between gap-3 mt-8">
        <button
          @click="closeModal"
          class="flex-1 bg-white py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Tutup
        </button>
        <button
          @click="openEditModal"
          class="flex-1 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Edit Pengguna
        </button>

      </div>
    </div>
  </div>
</template>
