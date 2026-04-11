<script setup>
import { ref, computed } from 'vue'
import UserListHeader from '../../../components/admin/users/UserListHeader.vue'
import UserListTable from '../../../components/admin/users/UserListTable.vue'
import UserListGrid from '../../../components/admin/users/UserListGrid.vue'
import UserFormModal from '../../../components/admin/users/UserFormModal.vue'
import UserDetailModal from '../../../components/admin/users/UserDetailModal.vue'
import UserDeleteModal from '../../../components/admin/users/UserDeleteModal.vue'

// Data pengguna (ditambah beberapa data contoh untuk tampilan lebih kaya)
const users = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'student', status: 'Aktif', joined: '2026-03-12', avatar: null },
  { id: 2, name: 'Siti Aminah', email: 'siti@example.com', role: 'mentor', status: 'Verifikasi', joined: '2026-02-05', avatar: null },
  { id: 3, name: 'Andi Setiawan', email: 'andi@example.com', role: 'admin', status: 'Aktif', joined: '2025-12-01', avatar: null },
  { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'student', status: 'Aktif', joined: '2026-01-20', avatar: null },
  { id: 5, name: 'Rudi Hartono', email: 'rudi@example.com', role: 'mentor', status: 'Tidak Aktif', joined: '2025-10-15', avatar: null },
  { id: 6, name: 'Maya Sari', email: 'maya@example.com', role: 'student', status: 'Aktif', joined: '2026-04-01', avatar: null },
])

const filterRole = ref('all')
const searchQuery = ref('')
const viewMode = ref('table') // 'table' atau 'grid'

// Modal states
const showFormModal = ref(false)
const modalMode = ref('create') // 'create' atau 'edit'
const editingUserId = ref(null)
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'student'
})

const showDetailModal = ref(false)
const selectedUser = ref(null)

const showDeleteModal = ref(false)
const userToDelete = ref(null)

// Filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesRole = filterRole.value === 'all' || user.role === filterRole.value
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesRole && matchesSearch
  })
})

// Modal functions
const openCreateModal = () => {
  modalMode.value = 'create'
  form.value = { name: '', email: '', password: '', role: 'student' }
  showFormModal.value = true
}

const openEditModal = (user) => {
  modalMode.value = 'edit'
  editingUserId.value = user.id
  form.value = {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role
  }
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  form.value = { name: '', email: '', password: '', role: 'student' }
  editingUserId.value = null
}

const handleFormSubmit = (formData) => {
  if (modalMode.value === 'create') {
    const newUser = {
      id: Math.max(...users.value.map(u => u.id), 0) + 1,
      ...formData,
      status: 'Aktif',
      joined: new Date().toISOString().split('T')[0]
    }
    users.value.push(newUser)
    console.log('Menambah pengguna:', newUser)
  } else {
    const userIndex = users.value.findIndex(u => u.id === editingUserId.value)
    if (userIndex !== -1) {
      users.value[userIndex] = {
        ...users.value[userIndex],
        ...formData
      }
      console.log('Mengupdate pengguna:', users.value[userIndex])
    }
  }
  alert(modalMode.value === 'create' ? 'Pengguna berhasil ditambahkan!' : 'Pengguna berhasil diperbarui!')
  closeFormModal()
}

const openDeleteModal = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  userToDelete.value = null
}

const confirmDelete = () => {
  if (userToDelete.value) {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    console.log('Pengguna berhasil dihapus')
    closeDeleteModal()
    if (showDetailModal.value) {
      closeDetailModal()
    }
  }
}

const openDetailModal = (user) => {
  selectedUser.value = user
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedUser.value = null
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header with UserListHeader Component -->
    <UserListHeader
      :filterRole="filterRole"
      :searchQuery="searchQuery"
      :viewMode="viewMode"
      @update:filterRole="filterRole = $event"
      @update:searchQuery="searchQuery = $event"
      @update:viewMode="viewMode = $event"
      @open-create="openCreateModal"
    />

    <!-- Table View Component -->
    <UserListTable
      v-if="viewMode === 'table'"
      :users="filteredUsers"
      @view-detail="openDetailModal"
      @view-edit="openEditModal"
      @delete-user="openDeleteModal"
    />

    <!-- Grid View Component -->
    <UserListGrid
      v-else
      :users="filteredUsers"
      @view-detail="openDetailModal"
      @view-edit="openEditModal"
      @delete-user="openDeleteModal"
    />

    <!-- Modals -->
    <UserFormModal
      :show="showFormModal"
      :mode="modalMode"
      :userData="form"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <UserDetailModal
      :show="showDetailModal"
      :user="selectedUser"
      @close="closeDetailModal"
      @edit="openEditModal"
    />

    <UserDeleteModal
      :show="showDeleteModal"
      :user="userToDelete"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>
