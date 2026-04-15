<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  mode: String, // 'create' or 'edit'
  userData: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      password: '',
      role: 'student'
    })
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({ ...props.userData })

watch(() => props.userData, (newVal) => {
  form.value = { ...newVal }
}, { deep: true })

const closeModal = () => {
  emit('close')
}

const submitForm = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-screen overflow-y-auto">
      <!-- Header dengan Close Button -->
      <div class="flex items-center justify-between mb-6">
        <div class="border-b border-gray-200 pb-5">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ mode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna' }}
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            {{ mode === 'create'
              ? 'Daftarkan pengguna baru dengan email dan password unik.'
              : 'Ubah informasi pengguna yang ada.'
            }}
          </p>
        </div>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Form -->
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Masukkan nama lengkap..."
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="user@example.com"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>

        <div v-if="mode === 'create'">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Minimal 8 karakter"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="form.role"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 text-gray-900"
          >
            <option value="student">Siswa</option>
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="pt-5 border-t border-gray-200 flex justify-between gap-3 mt-8">
        <button
          @click="closeModal"
          class="flex-1 bg-white py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          @click="submitForm"
          class="flex-1 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {{ mode === 'create' ? 'Tambah Pengguna' : 'Simpan Perubahan' }}
        </button>

      </div>
    </div>
  </div>
</template>
