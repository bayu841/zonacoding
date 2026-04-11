<script setup>
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'confirm'])

const closeDeleteModal = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('confirm')
}
</script>

<template>
  <div v-if="show && user" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 transform transition-all">
      <!-- Warning Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <Trash2 class="w-8 h-8 text-red-600" />
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">Hapus Pengguna?</h2>

      <!-- Message -->
      <p class="text-center text-gray-500 mb-2">
        Anda akan menghapus pengguna <span class="font-semibold text-gray-900">{{ user.name }}</span>
      </p>
      <p class="text-center text-sm text-gray-400 mb-8">
        Tindakan ini tidak dapat diubah.
      </p>

      <!-- Buttons -->
      <div class="flex gap-3">
        <button
          @click="closeDeleteModal"
          class="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          @click="confirmDelete"
          class="flex-1 bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>
