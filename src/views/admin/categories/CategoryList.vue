<script setup>
import { ref, computed } from 'vue'
import { Plus, Edit2, Trash2, Search, Tags } from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'

// Data Dummy
const categories = ref([
  { id: 1, name: 'Frontend Development', description: 'HTML, CSS, JS, Vue, React', coursesCount: 12 },
  { id: 2, name: 'Backend Development', description: 'Node.js, Express, PHP, Laravel', coursesCount: 8 },
  { id: 3, name: 'UI/UX Design', description: 'Figma, Prototyping, Wireframing', coursesCount: 5 }
])

// State
const searchQuery = ref('')
const isFormModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const successMessage = ref('')

const formMode = ref('create') // 'create' | 'edit'
const formData = ref({ id: null, name: '', description: '' })
const selectedId = ref(null)

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  return categories.value.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

// Actions
const openCreateModal = () => {
  formMode.value = 'create'
  formData.value = { id: null, name: '', description: '' }
  isFormModalOpen.value = true
}

const openEditModal = (cat) => {
  formMode.value = 'edit'
  formData.value = { ...cat }
  isFormModalOpen.value = true
}

const openDeleteModal = (id) => {
  selectedId.value = id
  isDeleteModalOpen.value = true
}

const handleSave = () => {
  if (!formData.value.name.trim() || !formData.value.description.trim()) {
      return // Optional validation message could go to modal, but basic return is ok
  }

  if (formMode.value === 'create') {
    const newId = categories.value.length ? Math.max(...categories.value.map(c => c.id)) + 1 : 1
    categories.value.push({
      id: newId,
      name: formData.value.name,
      description: formData.value.description,
      coursesCount: 0
    })
    successMessage.value = 'Kategori baru berhasil ditambahkan!'
  } else {
    const index = categories.value.findIndex(c => c.id === formData.value.id)
    if (index !== -1) {
      categories.value[index] = { ...categories.value[index], name: formData.value.name, description: formData.value.description }
    }
    successMessage.value = 'Kategori berhasil diperbarui!'
  }
  
  isFormModalOpen.value = false
  setTimeout(() => isSuccessModalOpen.value = true, 300)
}

const confirmDelete = () => {
  categories.value = categories.value.filter(c => c.id !== selectedId.value)
  isDeleteModalOpen.value = false
  successMessage.value = 'Kategori berhasil dihapus!'
  setTimeout(() => isSuccessModalOpen.value = true, 300)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Kategori Kursus</h2>
        <p class="text-gray-500 text-sm mt-1">Kelola daftar kategori pembelajaran yang tersedia di platform.</p>
      </div>
      <button @click="openCreateModal" class="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-semibold text-sm">
        <Plus class="w-4 h-4 mr-2" />
        Tambah Kategori
      </button>
    </div>

    <!-- Search Tool -->
    <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center">
      <Search class="w-5 h-5 text-gray-400 mr-3" />
      <input v-model="searchQuery" type="text" placeholder="Cari nama kategori..." class="w-full bg-transparent outline-none text-sm" />
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-semibold">
            <tr>
              <th class="px-6 py-4 border-r border-white">Kategori</th>
              <th class="px-6 py-4 border-r border-white">Deskripsi</th>
              <th class="px-6 py-4 text-center border-r border-white">Jumlah Kursus</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="filteredCategories.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Data kategori tidak ditemukan.
              </td>
            </tr>
            <tr v-for="cat in filteredCategories" :key="cat.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 font-semibold text-gray-900">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Tags class="w-5 h-5" />
                  </div>
                  {{ cat.name }}
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600 truncate max-w-[250px]">{{ cat.description }}</td>
              <td class="px-6 py-4 text-center">
                <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold text-xs ring-1 ring-blue-100">{{ cat.coursesCount }}</span>
              </td>
              <td class="px-6 py-4">
                 <div class="flex items-center justify-center gap-2">
                    <button @click="openEditModal(cat)" class="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" title="Edit">
                      <Edit2 class="w-4 h-4" />
                    </button>
                    <button @click="openDeleteModal(cat.id)" class="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors" title="Hapus">
                      <Trash2 class="w-4 h-4" />
                    </button>
                 </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form Modal (Create / Edit) -->
    <BaseModal 
      :is-open="isFormModalOpen"
      @close="isFormModalOpen = false"
      :title="formMode === 'create' ? 'Tambah Kategori Baru' : 'Edit Kategori'"
      type="info"
    >
      <template #default>
        <div class="w-full text-left mt-2 space-y-4">
           <div>
             <label class="block text-sm font-semibold text-gray-700 mb-1.5">Nama Kategori</label>
             <input v-model="formData.name" type="text" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm" placeholder="Contoh: Frontend Development" />
           </div>
           <div>
             <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Singkat</label>
             <textarea 
               v-model="formData.description"
               rows="3"
               class="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
               placeholder="Contoh: HTML, CSS, JavaScript, React"
             ></textarea>
           </div>
           
           <div class="flex gap-3 mt-6">
             <button @click="isFormModalOpen = false" class="flex-1 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">Batal</button>
             <button @click="handleSave" class="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">Simpan Kategori</button>
           </div>
        </div>
      </template>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal
      :is-open="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
      @confirm="confirmDelete"
      title="Hapus Kategori?"
      message="Apakah Anda yakin ingin menghapus kategori ini? Data yang terkait mungkin akan kehilangan referensi. Aksi ini tidak dapat dibatalkan."
      type="danger"
      confirmText="Ya, Hapus"
      cancelText="Batal"
      showCancel
    />

    <!-- Success Modal -->
    <BaseModal
      :is-open="isSuccessModalOpen"
      @close="isSuccessModalOpen = false"
      @confirm="isSuccessModalOpen = false"
      title="Berhasil!"
      :message="successMessage"
      type="success"
      confirmText="Tutup"
    />
  </div>
</template>
