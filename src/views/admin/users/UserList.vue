<script setup>
import { ref, computed, onMounted } from 'vue'
import UserListHeader from '../../../components/admin/users/UserListHeader.vue'
import UserListTable from '../../../components/admin/users/UserListTable.vue'
import UserListGrid from '../../../components/admin/users/UserListGrid.vue'
import UserFormModal from '../../../components/admin/users/UserFormModal.vue'
import UserDetailModal from '../../../components/admin/users/UserDetailModal.vue'
import UserDeleteModal from '../../../components/admin/users/UserDeleteModal.vue'
import { getUsers, createUser, updateUser, deleteUser, getUser } from '@/api/user'

// State
const users = ref([])
const pagination = ref({
  total: 0,
  per_page: 6,
  current_page: 1,
  last_page: 1
})
const loading = ref(false)
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

const fetchUsers = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      role: filterRole.value !== 'all' ? filterRole.value : undefined,
      search: searchQuery.value || undefined
    }
    const response = await getUsers(params)
    users.value = response.data.data
    pagination.value = response.data.pagination
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})

// Watchers (manual via events from header)
const handleFilterChange = (role) => {
  filterRole.value = role
  fetchUsers(1)
}

const handleSearchChange = (query) => {
  searchQuery.value = query
  fetchUsers(1)
}

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

const handleFormSubmit = async (formData) => {
  try {
    if (modalMode.value === 'create') {
      await createUser(formData)
    } else {
      // Don't send password if empty on edit
      const updateData = { ...formData }
      if (!updateData.password) {
        delete updateData.password
      }
      await updateUser(editingUserId.value, updateData)
    }
    fetchUsers(pagination.value.current_page)
    closeFormModal()
  } catch (err) {
    console.error('Save error:', err)
  }
}

const openDeleteModal = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  userToDelete.value = null
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      await deleteUser(userToDelete.value.id)
      fetchUsers(pagination.value.current_page)
      closeDeleteModal()
      if (showDetailModal.value) {
        closeDetailModal()
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }
}

const openDetailModal = async (user) => {
  try {
    const response = await getUser(user.id)
    selectedUser.value = response.data
    showDetailModal.value = true
  } catch (err) {
    console.error('Detail error:', err)
  }
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
      @update:filterRole="handleFilterChange"
      @update:searchQuery="handleSearchChange"
      @update:viewMode="viewMode = $event"
      @open-create="openCreateModal"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Table View Component -->
    <UserListTable
      v-else-if="viewMode === 'table'"
      :users="users"
      :pagination="pagination"
      @view-detail="openDetailModal"
      @view-edit="openEditModal"
      @delete-user="openDeleteModal"
      @change-page="fetchUsers"
    />

    <!-- Grid View Component -->
    <UserListGrid
      v-else
      :users="users"
      :pagination="pagination"
      @view-detail="openDetailModal"
      @view-edit="openEditModal"
      @delete-user="openDeleteModal"
      @change-page="fetchUsers"
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
