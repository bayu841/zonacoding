<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Plus, Edit2, Trash2, Search, Tags, ChevronLeft, ChevronRight,
  Code, Database, Globe, Smartphone, Palette, PenTool, Layout, 
  Layers, Megaphone, BarChart, Users, Briefcase, PieChart, 
  TrendingUp, Settings, HelpCircle, Book, Video, Monitor, 
  Terminal, Cpu, HardDrive, Music, Camera, Zap, Heart, Star
} from 'lucide-vue-next'
import BaseModal from '../../../components/shared/BaseModal.vue'
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/api/category'
import { useImage } from '@/composables/useImage'

const { isEmoji } = useImage()

// Curated Icons
const availableIcons = [
  { name: 'Code', icon: Code },
  { name: 'Database', icon: Database },
  { name: 'Globe', icon: Globe },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Palette', icon: Palette },
  { name: 'PenTool', icon: PenTool },
  { name: 'Layout', icon: Layout },
  { name: 'Layers', icon: Layers },
  { name: 'Megaphone', icon: Megaphone },
  { name: 'BarChart', icon: BarChart },
  { name: 'Users', icon: Users },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'PieChart', icon: PieChart },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Monitor', icon: Monitor },
  { name: 'Terminal', icon: Terminal },
  { name: 'Cpu', icon: Cpu },
  { name: 'HardDrive', icon: HardDrive },
  { name: 'Music', icon: Music },
  { name: 'Camera', icon: Camera },
  { name: 'Zap', icon: Zap },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Book', icon: Book },
  { name: 'Video', icon: Video },
  { name: 'Settings', icon: Settings },
  { name: 'HelpCircle', icon: HelpCircle }
];


// State
const categories = ref([])
const pagination = ref({
  total: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
const searchQuery = ref('')
const isFormModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const successMessage = ref('')

const formMode = ref('create') // 'create' | 'edit'
const formData = ref({ id: null, name: '', description: '', icon: '' })
const selectedId = ref(null)

const fetchCategories = async (page = 1) => {
  loading.value = true
  try {
    const response = await getCategories({ page, search: searchQuery.value })
    categories.value = response.data.data
    pagination.value = response.data.pagination
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})

const openCreateModal = () => {
  formMode.value = 'create'
  formData.value = { id: null, name: '', description: '', icon: '' }
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

const handleSave = async () => {
  if (!formData.value.name.trim()) return

  try {
    if (formMode.value === 'create') {
      await createCategory(formData.value)
      successMessage.value = 'Kategori baru berhasil ditambahkan!'
    } else {
      await updateCategory(formData.value.id, formData.value)
      successMessage.value = 'Kategori berhasil diperbarui!'
    }
    
    isFormModalOpen.value = false
    fetchCategories(pagination.value.current_page)
    setTimeout(() => isSuccessModalOpen.value = true, 300)
  } catch (err) {
    console.error('Save error:', err)
  }
}

const confirmDelete = async () => {
  try {
    await deleteCategory(selectedId.value)
    isDeleteModalOpen.value = false
    successMessage.value = 'Kategori berhasil dihapus!'
    fetchCategories(pagination.value.current_page)
    setTimeout(() => isSuccessModalOpen.value = true, 300)
  } catch (err) {
    console.error('Delete error:', err)
  }
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
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-semibold">
            <tr>
              <th class="px-6 py-4 border-r border-white">Kategori</th>
              <th class="px-6 py-4 border-r border-white">Deskripsi</th>
              <th class="px-6 py-4 text-center border-r border-white">Icon</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="categories.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Data kategori tidak ditemukan.
              </td>
            </tr>
            <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 font-semibold text-gray-900">
                {{ cat.name }}
              </td>
              <td class="px-6 py-4 text-gray-600 truncate max-w-[250px]">{{ cat.description || '-' }}</td>
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center overflow-hidden">
                    <template v-if="cat.icon">
                      <!-- Prioritize Lucide icon if it's a known name -->
                      <component 
                        v-if="availableIcons.find(i => i.name === cat.icon || cat.icon.endsWith('/' + i.name))" 
                        :is="availableIcons.find(i => i.name === cat.icon || cat.icon.endsWith('/' + i.name))?.icon" 
                        class="w-5 h-5" 
                      />
                      <!-- Handle Emoji -->
                      <span v-else-if="isEmoji(cat.icon)" class="text-xl">
                        {{ cat.icon.includes('/storage/') ? cat.icon.split('/').pop() : cat.icon }}
                      </span>
                      <!-- Fallback to image if it's a full URL and not a keyword -->
                      <img 
                        v-else-if="cat.icon.startsWith('http')" 
                        :src="cat.icon" 
                        :alt="cat.name" 
                        class="w-full h-full object-cover" 
                      />
                      <Tags v-else class="w-5 h-5" />
                    </template>
                    <Tags v-else class="w-5 h-5" />
                  </div>
                </div>
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

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xs text-gray-500 font-medium">Halaman {{ pagination.current_page }} dari {{ pagination.last_page }}</span>
        <div class="flex gap-2">
          <button 
            @click="fetchCategories(pagination.current_page - 1)" 
            :disabled="pagination.current_page === 1"
            class="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button 
            @click="fetchCategories(pagination.current_page + 1)" 
            :disabled="pagination.current_page === pagination.last_page"
            class="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
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

           <div>
             <label class="block text-sm font-semibold text-gray-700 mb-2">Pilih Icon</label>
             <div class="grid grid-cols-6 sm:grid-cols-9 gap-2 p-3 border border-gray-200 rounded-xl max-h-48 overflow-y-auto">
               <button 
                 v-for="item in availableIcons" 
                 :key="item.name"
                 type="button"
                 @click="formData.icon = item.name"
                 class="aspect-square flex items-center justify-center rounded-lg border transition-all hover:bg-blue-50 hover:border-blue-200"
                 :class="formData.icon === item.name ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-gray-100 text-gray-400'"
                 :title="item.name"
               >
                 <component :is="item.icon" class="w-5 h-5" />
               </button>
             </div>
             <p v-if="formData.icon" class="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
               Selected: <span class="text-blue-600">{{ formData.icon }}</span>
             </p>
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
