<script setup>
import { Edit, Trash2, Eye, Mail, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useImage } from '@/composables/useImage'

defineProps({
  users: Array,
  pagination: Object
})

defineEmits(['view-detail', 'view-edit', 'delete-user', 'change-page'])

const { getProxyUrl, handleImageError, isEmoji } = useImage()

const getInitials = (name) => {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'
}

const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-purple-100 text-purple-800 border-purple-200',
    mentor: 'bg-blue-100 text-blue-800 border-blue-200',
    student: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (user) => {
  return user.email_verified_at
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-gray-50 text-gray-600 border-gray-200'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div
        v-for="user in users"
        :key="user.id"
        class="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden"
      >
        <div class="p-5">
          <!-- Avatar dan Info Dasar -->
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md overflow-hidden">
              <template v-if="user.avatar && isEmoji(user.avatar)">
                <span class="text-2xl">{{ user.avatar.includes('/storage/') ? user.avatar.split('/').pop() : user.avatar }}</span>
              </template>
              <img v-else-if="user.avatar" :src="getProxyUrl(user.avatar)" :alt="user.name" class="w-full h-full object-cover" @error="handleImageError" />
              <span v-else>{{ getInitials(user.name) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 truncate">{{ user.name }}</h3>
              <p class="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Mail class="w-3 h-3" />
                <span class="truncate">{{ user.email }}</span>
              </p>
            </div>
          </div>

          <!-- Detail Tambahan -->
          <div class="mt-4 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">Peran</span>
              <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border', getRoleBadgeClass(user.role)]">
                {{ user.role === 'admin' ? 'Admin' : user.role === 'mentor' ? 'Mentor' : 'Siswa' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">Bergabung</span>
              <span class="text-sm text-gray-700">{{ formatDate(user.created_at) }}</span>
            </div>
          </div>

          <!-- Aksi -->
          <div class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <button @click="$emit('view-detail', user)" class="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Detail">
              <Eye class="w-4 h-4" />
            </button>
            <button @click="$emit('view-edit', user)" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
              <Edit class="w-4 h-4" />
            </button>
            <button @click="$emit('delete-user', user)" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="users.length === 0" class="col-span-full py-16 text-center">
        <div class="flex flex-col items-center justify-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Search class="w-6 h-6 text-gray-400" />
          </div>
          <p class="text-gray-500 font-medium">Tidak ada pengguna ditemukan</p>
          <p class="text-sm text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <p class="text-sm text-gray-500">
        Hal <span class="font-medium text-gray-700">{{ pagination.current_page }}</span> / {{ pagination.last_page }}
      </p>
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('change-page', pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button 
          @click="$emit('change-page', pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-all disabled:opacity-40"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
